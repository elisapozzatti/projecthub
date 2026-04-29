import jwt from "jsonwebtoken";

async function auth(ctx, next) {
  const authHeader = ctx.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      ctx.state.user = decoded;
    } catch (err) {
      ctx.state.user = null;
    }
  }

  await next();
}

export default auth;
