import {
    redisConnect,
    redisClient,
} from "../../redis/redis.worker.1.non-blocking.js"; // non-blocking client is imported here
import { prisma } from "../../db/prisma.js";

await redisConnect();

async function mailHandlerSucc(taskObj) {
    await prisma.task.create({
        data: {
            taskId: taskObj.taskId,
            status: "SUCCESSFUL",
        },
    });
    await prisma.todo.delete({
        where: {
            taskId: taskObj.taskId,
        },
    });
}

async function mailHandlerFail() {
    // do the exception handling for prisma
    console.log("Error in mail-sender");
    const todos = await prisma.todo.findMany();
    for (const todo of todos) {
        // for async functions, dont use forEach, use for-of
        await todoHandler(todo);
    }
}

async function todoHandler(todo) {
    if (todo.retryCount <= todo.maxRetry) {
        await prisma.todo.update({
            where: {
                taskId: todo.taskId,
            },
            data: {
                retryCount: todo.retryCount + 1,
            },
        });
        const todoUpdated = {
            taskId: todo.taskId,
            retryCount: todo.retryCount + 1,
            maxRetry: todo.maxRetry,
            payload: todo.payload,
        };
        await redisClient.lPush("queue:email", JSON.stringify(todoUpdated));
    } else {
        await prisma.todo.delete({
            where: {
                taskId: todo.taskId,
            },
        });
        await prisma.task.create({
            data: {
                taskId: todo.taskId,
                status: "FAILED",
            },
        });
    }
}

export { mailHandlerSucc, mailHandlerFail };
