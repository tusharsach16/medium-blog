import { Hono } from 'hono';
import { authMiddleware } from './middleware';
import { userRouter } from './routes/User';
import { blogRouter } from './routes/Blog';
import { signupInput } from '@tushar16/mediumblog-common';

const app = new Hono();

// app.use('/api/v1/blog/*', authMiddleware);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app;