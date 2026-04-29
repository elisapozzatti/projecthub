import Router from "koa-router";
import Project from "../models/Project.js";

const router = new Router({
  prefix: "/projects",
});

//get projects by org
router.get("/", async (ctx) => {
  const { organizationId } = ctx.query;

  if (!organizationId) {
    ctx.status = 400;
    ctx.body = { error: "organizationId required" };
    return;
  }

  ctx.body = await Project.find({ organizationId: organizationId });
});

//create project
router.post("/", async (ctx) => {
  const { name, organizationId } = ctx.request.body;

  const newProject = new Project({ name, organizationId });
  const savedProject = await newProject.save();

  ctx.body = { message: "Progetto creato con successo", savedProject };
  ctx.status = 200;
});

//edit project
router.patch("/:id", async (ctx) => {
  const { name } = ctx.request.body;

  const project = await Project.findOne({ _id: ctx.params.id });

  if (!project) {
    ctx.body = "Progetto non trovato";
    ctx.status = 404;
    return;
  }

  project.name = name;
  await project.save();

  ctx.body = {
    message: "Progetto modificato con successo",
    project,
  };
  ctx.status = 200;
});

router.delete("/:id", async (ctx) => {
  const user = ctx.state.user;

  if (!user) {
    ctx.status = 404;
    ctx.body = { error: "Non sei autorizzato" };
    return;
  }

  if (user.role !== "superuser") {
    ctx.status = 404;
    ctx.body = { error: "Non sei autorizzato (solo superuser)" };
    return;
  }

  const deleted = await Project.findOneAndDelete({
    _id: ctx.params.id,
    organizationId: user.organizationId,
  });

  if (!deleted) {
    ctx.status = 404;
    ctx.body = { error: "Progetto non trovato" };
    return;
  }

  ctx.body = {
    message: "Progetto cancellato con successo",
    project: deleted,
  };
  ctx.status = 200;
});

export default router;
