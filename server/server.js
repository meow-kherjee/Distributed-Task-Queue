import "dotenv/config";
import express from "express";
import cors from "cors";
import { redisConnect } from "../redis/redis.server.js";

import { routerNewTask } from "../route/new.task.js"; // route imports

const app = express();
const portExpress = process.env.PORT_EXPRESS;

redisConnect();

app.use(express.json()); // middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

app.use("/task", routerNewTask); // router

app.listen(portExpress, () => {
    console.log(`App running on port : ${portExpress}`);
});
