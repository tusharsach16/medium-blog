import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@tushar16/mediumblog-common";

type Bindings = {
  DATABASE_URL: string;
  SECRET_KEY: string;
};

export const userRouter = new Hono<{ Bindings: Bindings }>();

// Factory function for PrismaClient
const createPrismaClient = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is undefined. Check wrangler.toml or secrets.');
  }
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  }).$extends(withAccelerate());
};


userRouter.post('/signup', async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);

    // 1️⃣  Read raw JSON
    const body = await c.req.json();

    // 2️⃣  Validate + type‑narrows with Zod
    const parsed = signupInput.safeParse(body);
    if (!parsed.success) {
      // Zod ka detailed error front‑end ko bhej do (or log karo)
      return c.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        400
      );
    }
    // Ab yahan parsed.data ka type ✅ == SignupInput
    const { username, password, name } = parsed.data; /* typed */

    // 3️⃣  User uniqueness check
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    // 4️⃣  Hash + store
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, name, password: hashedPassword },
    });

    // 5️⃣  JWT sign
    const jwt = await sign({ id: user.id }, c.env.SECRET_KEY);

    return c.json(
      { message: 'User created successfully', userId: user.id, jwt },
      201
    );
  } catch (err) {
    // @ts-ignore
    console.error('Signup error:', err);
    return c.json(
      {
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      500
    );
  }
});

// Signin route
userRouter.post('/signin', async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);

    const body = await c.req.json();
    const parsed = signinInput.safeParse(body);
    if (!parsed.success) {
      // Zod ka detailed error front‑end ko bhej do (or log karo)
      return c.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        400
      );
    }
    const {username, password} = parsed.data;
    // if (!username || !password) {
    //   return c.json({ error: 'Username and password are required' }, 400);
    // } // this is not neccesary as upar kr lia ye handle

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return c.json({ error: 'Invalid password' }, 401);
    }

    const token = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ 
      Name: user.name,
       token 
      }, 200);
  } catch (err: unknown) {
    // @ts-ignore
    console.error('Signin Error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});


userRouter.get('/getAll', async(c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL); 
    const users = await prisma.user.findMany();            
    return c.json({ users }, 200);                          
  } catch(err : unknown) {
    //@ts-ignore
    console.error('Blog Fetch Error:', err); 
    return c.json({
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, 500);
  }
});
