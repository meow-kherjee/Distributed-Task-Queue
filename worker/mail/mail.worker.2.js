import { redisClient, redisConnect } from "../../redis/redis.js";
import { mailHandler } from "./mail.worker.js";

await redisConnect();

function delay() {
    const now = Date.now();
    while ((Date.now() - now) / 1000 < 10) {}
}

while (true) {
    try {
        const popped = await redisClient.brPop("queue:mail", 0);
        const task = JSON.parse(popped.element);
        delay();
        task.status = "success";
        console.log(task);
    } catch (SocketClosedUnexpectedlyError) {
        console.log("Connection issue from redis side!");
    }
}
