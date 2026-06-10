import { mailHandler } from "./mail.worker.js";
import { redisClient, redisConnect } from "../../redis/redis.js";
import { mailHandlerSucc, mailHandlerFail } from "./mail.utils.js";

await redisConnect();

while (true) {
    // do exception handling for redis
    try {
        const poppedObj = await redisClient.brPop("queue:email", 0);
        const taskObj = JSON.parse(poppedObj.element);
        const payload = taskObj.payload;
        const mailOutput = await mailHandler(
            process.env.SENDER_EMAIL,
            payload.to,
            payload.subject,
            payload.body,
        );
        console.log(mailOutput);
        if (mailOutput.error == null) mailHandlerSucc(taskObj);
        else mailHandlerFail();
    } catch (SocketClosedUnexpectedlyError) {
        console.log("Redis unexpectedly disconnected!");
    }
}
