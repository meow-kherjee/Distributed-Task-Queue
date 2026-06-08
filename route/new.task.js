import express from "express";
import { CreateNewTask } from "../controller/new.task.js";

const routerNewTask = express.Router();

routerNewTask.post("/new", CreateNewTask);

export { routerNewTask };
