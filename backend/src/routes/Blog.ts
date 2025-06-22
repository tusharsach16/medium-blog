import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { authMiddleware } from "../middleware";
import { createBlogInput, updateBlogInput } from "@tushar16/mediumblog-common";

type Bindings = {
  DATABASE_URL: string;
  SECRET_KEY: string;
};


export const blogRouter = new Hono<{Bindings: Bindings}>();

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

// middlware
blogRouter.use("/*", authMiddleware);

// Blog routes (placeholders with basic Prisma implementation)
blogRouter.post('/postBlog', async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
      // Zod ka detailed error front‑end ko bhej do (or log karo)
      return c.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        400
      );
    }
    const { title, content } = parsed.data;

    // if (!title || !content) {
    //   return c.json({ error: 'Title and content are required' }, 400);
    // }


    // TODO: Add JWT middleware to get authorId
    const user = c.get('userId') as {id: number};
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: user.id, // Replace with authenticated user ID from JWT
      },
    });

    return c.json({ message: 'Blog created', blogId: blog.id }, 201);
  } catch (err: unknown) {
    // @ts-ignore
    console.error('Blog Create Error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});

blogRouter.put('/updateBlog', async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const parsed =  updateBlogInput.safeParse(body);
    if (!parsed.success) {
      // Zod ka detailed error front‑end ko bhej do (or log karo)
      return c.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        400
      );
    }
    const { id, title, content } = parsed.data;

    // if (!id) {
    //   return c.json({ error: 'Blog ID is required' }, 400);
    // }

    const blog = await prisma.blog.update({
      where: { id },
      data: { title, content },
    });

    return c.json({ message: 'Blog updated', blogId: blog.id }, 200);
  } catch (err: unknown) {
    // @ts-ignore
    console.error('Blog Update Error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});

blogRouter.get('/getBlog/:id', async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    const id = parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json({ error: 'Invalid blog ID' }, 400);
    }

    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    if (!blog) {
      return c.json({ error: 'Blog not found' }, 404);
    }

    return c.json({blog}, 200);
  } catch (err: unknown) {
    // @ts-ignore
    console.error('Blog Fetch Error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});


blogRouter.get("/bulk", async (c) => {
  {try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    
    return c.json({blogs}, 200);
  } catch(err : unknown) {
    // @ts-ignore
    console.error('Blog Fetch Error:', err);
    return c.json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }}
})


// changed the jwt_secret in cloudflare so that no can access it. 