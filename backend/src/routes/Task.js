import Router from "koa-router";
import Task from "../models/Task.js";

const router = new Router({
  prefix: "/tasks",
});

//get tasks by project + org
router.get("/:projectId", async (ctx) => {
  ctx.body = await Task.find({
    projectId: ctx.params.projectId,
    organizationId: ctx.params.organizationId,
  });
});

//create task
router.post("/", async (ctx) => {
  const { title, projectId, organizationId } = ctx.request.body;
  console.log("BODY:", ctx.request.body);
  const newTask = new Task({
    title,
    projectId,
    organizationId,
    status: "to do",
  });

  ctx.body = await newTask.save();
  ctx.status = 200;
});

//edit status task
router.put("/:id", async (ctx) => {
  const { status } = ctx.request.body;

  ctx.body = await Task.findByIdAndUpdate(
    ctx.params.id,
    { status },
    { returnDocument: "after" },
  );
});

//edit task
router.patch("/:id", async (ctx) => {
  const { title } = ctx.request.body;

  const task = await Task.findOne({ _id: ctx.params.id });

  if (!task) {
    ctx.body = "Task non trovato";
    ctx.status = 404;
    return;
  }

  task.title = title;
  await task.save();

  ctx.body = {
    message: "Task modificato con successo",
    task,
  };
  ctx.status = 200;
});

//delete task
router.delete("/:id", async (ctx) => {
  const user = ctx.state.user;

  if (!user) {
    ctx.status = 404;
    ctx.body = { error: "unauthorized" };
    return;
  }

  if (user.role !== "superuser") {
    ctx.status = 404;
    ctx.body = { error: "forbidden: superuser only" };
    return;
  }

  const deleted = await Task.findOneAndDelete({
    _id: ctx.params.id,
  });

  if (!deleted) {
    ctx.status = 404;
    ctx.body = { error: "task not found" };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: "task deleted successfully",
    task: deleted,
  };
  console.log("PARAM ID:", ctx.params.id);
  console.log("USER ORG:", user.organizationId);
});

export default router;
