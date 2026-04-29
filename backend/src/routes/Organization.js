import Router from "koa-router";
import Organization from "../models/Organization.js";

const router = new Router({
  prefix: "/organizations",
});

//get list organizations
router.get("/", async (ctx) => {
  ctx.body = await Organization.find();
});

//get single organization
import mongoose from "mongoose";

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 404;
    ctx.body = { error: "Id non valido" };
    return;
  }

  const org = await Organization.findById(id);

  if (!org) {
    ctx.status = 404;
    ctx.body = { error: "Organizzazione non trovata" };
    return;
  }

  ctx.body = org;
});

//create organization
router.post("/", async (ctx) => {
  const { name } = ctx.request.body;

  try {
    if (!name) {
      ctx.status = 404;
      ctx.body = { message: "Nome organizzazione obbligatorio" };
      return;
    }
    const newOrganization = new Organization({ name });
    const savedOrganization = await newOrganization.save();

    ctx.body = {
      message: "Organizzazione creata con successo",
      savedOrganization,
    };
    ctx.status = 200;
  } catch (err) {
    console.log("Creazione non riuscita", err);
    ctx.status = 404;
  }
});

export default router;
