import { mailHandler } from "./mail.worker.js";
import { redisClient, redisConnect } from "../../redis/redis.js";

await redisConnect();

while (true) {
    try {
        const popped = await redisClient.brPop("queue:mail", 0);
        const task = JSON.parse(popped.element);
        const payload = task.payload;
        task.status = "processsing";
        await mailHandler(
            process.env.SENDER_EMAIL,
            payload.to,
            payload.subject,
            payload.content,
        );
        task.status = "success";
        console.log(task);
    } catch (SocketClosedUnexpectedlyError) {
        console.log("Redis unexpectedly disconnected!");
    }
}
