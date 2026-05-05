import Router from "koa-router";
import Organization from "../models/Organization.js";
import mongoose from "mongoose";

const router = new Router({
  prefix: "/organizations",
});

//route per le organizzazioni
//get - lista organizzazioni
router.get("/", async (ctx) => {
  //lista di tutte le organizzazioni
  ctx.body = await Organization.find();
});

//get - trova una organizzazione
router.get("/:id", async (ctx) => {
  const { id } = ctx.params;

  //controlla che l'id sia valido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 404;
    ctx.body = { error: "Id non valido" };
    return;
  }

  //trova l'organizzazione dall'id
  const org = await Organization.findById(id);

  if (!org) {
    ctx.status = 404;
    ctx.body = { error: "Organizzazione non trovata" };
    return;
  }

  ctx.body = org;
});

//post - crea una organizzazione
router.post("/", async (ctx) => {
  const { name } = ctx.request.body;

  try {
    //controlla che sia stato inserito il nome
    if (!name) {
      ctx.status = 404;
      ctx.body = { message: "Nome organizzazione obbligatorio" };
      return;
    }
    //salva l'organizzazione
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
