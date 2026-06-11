import { mailHandler } from "./mail.handler.js";
import {
    redisClient,
    redisConnect,
} from "../../redis/redis.worker.1.blocking.js"; // blocking client is imported here
import { mailHandlerSucc, mailHandlerFail } from "./mail.utils.js";

await redisConnect();

while (true) {
    // do exception handling for redis
    try {
        const poppedObj = await redisClient.brPop("queue:email", 0); // this client is blocking in nature
        const taskObj = JSON.parse(poppedObj.element); // the standard : use one client for blocking operations
        const payload = taskObj.payload; // another for other non blocking commands
        const mailOutput = await mailHandler(
            process.env.SENDER_EMAIL,
            payload.to,
            payload.subject,
            payload.body,
        );
        console.log(mailOutput);
        if (mailOutput.error == null) await mailHandlerSucc(taskObj);
        else await mailHandlerFail();
    } catch (err) {
        console.log(err);
    }
}
