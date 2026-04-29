import Router from "koa-router";
import User from "../models/User.js";

const router = new Router({
  prefix: "/user",
});

//get all users
router.get("/", async (ctx) => {
  const { organizationId } = ctx.query;
  ctx.body = await User.find({ organizationId: organizationId });
});

//get single user
router.get("/:id", async (ctx) => {
  ctx.body = await User.findById(ctx.params.id);
});

//edit user
router.patch("/:id", async (ctx) => {
  ctx.body = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
    new: true,
  });
});

//create user
router.post("/", async (ctx) => {
  const { name, email, password, role, organizationId, organizationName } =
    ctx.request.body;

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!isValidEmail(email)) {
    ctx.status = 404;
    ctx.body = { message: "Inserisci una email valida" };
  }

  try {
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !organizationId ||
      !organizationName
    ) {
      ctx.status = 404;
      ctx.body = { message: "Nome organizzazione obbligatorio" };
      return;
    }
    const newUser = new User({
      name,
      email,
      password,
      role,
      organizationId,
      organizationName,
    });
    const savedUser = await newUser.save();

    ctx.body = {
      message: "Utente creata con successo",
      savedUser,
    };
    ctx.status = 200;
  } catch (err) {
    console.log("Creazione non riuscita", err);
    ctx.status = 404;
  }
});

//delete user
router.delete("/:id", async (ctx) => {
  await User.findByIdAndDelete(ctx.params.id);
  ctx.body = { success: true };
});

export default router;
