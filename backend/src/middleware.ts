import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

type UserPayload = {
  id: number;
}
// Define the middleware as a function
export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1]; // Assuming "Bearer <token>"
    const payload = await verify(token, c.env.SECRET_KEY) as UserPayload;

    if (payload && 'id' in payload) {
      // You can even attach user data to context for downstream use
      c.set('userId', payload);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (err) {
    c.status(401);
    return c.json({ error: "invalid token" });
  }
};
