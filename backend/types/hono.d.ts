import 'hono';
declare module 'hono' {
  interface ContextVariableMap {
    userId: {
      id: number;
    };
  }
}