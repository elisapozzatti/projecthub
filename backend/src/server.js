import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import mongoose from "mongoose";
import Task from "./routes/Task.js";
import Project from "./routes/Project.js";
import Auth from "./routes/Auth.js";
import Org from "./routes/Organization.js";
import User from "./routes/Users.js";
import dotenv from "dotenv";

dotenv.config();
const app = new Koa();
const router = new Router();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connesso a MongoDB con successo"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

app.use(cors());
app.use(bodyParser());

app.use(Task.routes()).use(Task.allowedMethods());

app.use(Project.routes()).use(Project.allowedMethods());

app.use(Auth.routes()).use(Auth.allowedMethods());

app.use(Org.routes()).use(Org.allowedMethods());

app.use(User.routes()).use(User.allowedMethods());

app.listen(process.env.PORT || 3001, () =>
  console.log("Backend running on port 3001"),
);
