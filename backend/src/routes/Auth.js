import Router from "koa-router";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = new Router();

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email });
  if (!user) {
    ctx.body = { error: "user not found" };
    return;
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    ctx.status = 401;
    ctx.body = { error: "wrong password" };
    return;
  }

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  ctx.body = {
    success: true,
    token,
  };
});

export default router;
