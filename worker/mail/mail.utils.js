import { redisClient } from "../../redis/redis.js";
import { prisma } from "../../db/prisma.js";

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
    todos.forEach(async (todo) => {
        if (todo.retryCount <= todo.maxRetry) {
            await prisma.todo.update({
                where: {
                    taskId: todo.taskId,
                },
                data: {
                    retryCount: todo.retryCount + 1,
                },
            });
            await redisClient.lPush("queue:email", todo.payload);
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
    });
}

export { mailHandlerSucc, mailHandlerFail };
