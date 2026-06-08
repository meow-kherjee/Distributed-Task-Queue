import { prisma } from "../db/prisma.js";
import { redisClient } from "../redis/redis.js";
import { v4 as uuidv4 } from "uuid";

async function CreateNewTask(req, res) {
    const taskData = req.body;
    const taskObj = {
        taskId: uuidv4(),
        retryCount: 0,
        maxRetry: 5,
        payload: {
            to: taskData.to,
            subject: taskData.subject,
            body: taskObj.body,
        },
    };
}

export { CreateNewTask };
