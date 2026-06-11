import "dotenv/config";
import { createClient } from "redis";

const portRedis = process.env.PORT_REDIS;

const redisClient = createClient({
    host: "127.0.0.1",
    port: portRedis,
});

async function redisConnect() {
    redisClient.on("connect", () => {
        console.log(`Redis connected and listening on port : ${portRedis}`);
    });
    redisClient.on("error", (error) => {
        console.log("Error :", error);
    });

    try {
        await redisClient.connect();
    } catch (error) {
        console.log("Error :", error);
    }
}

export { redisClient, redisConnect };
