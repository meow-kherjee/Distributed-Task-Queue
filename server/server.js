import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";
import { redisClient, redisConnect } from "../redis/redis.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const app = express();

const portExpress = process.env.PORT_EXPRESS;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

redisConnect();

app.post("/task/new", async (req, res) => {
    const formData = req.body;
    console.log(formData);
    await redisClient.lPush(
        "queue:mail",
        JSON.stringify({
            task_id: `mail:${uuidv4()}`,
            type: "email",
            status: "Enqueued",
            retry_count: 0,
            max_retry_count: 5,
            payload: formData,
        }),
    );
});

app.listen(portExpress, () => {
    console.log(`App running on port : ${portExpress}`);
});
