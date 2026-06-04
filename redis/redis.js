import { createClient } from "redis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const portRedis = process.env.PORT_REDIS;

const redisClient = createClient({
    host: "127.0.0.1",
    port: portRedis,
});

async function redisConnect() {
    // .on() sets up event listeners
    redisClient.on("connect", () => {
        console.log(`Redis connected and listening on port : ${portRedis}`);
    });
    redisClient.on("error", (error) => {
        console.log("Error :", error);
    }); // continuous error monitoring after connection is established

    try {
        await redisClient.connect();
    } catch (error) {
        console.log("Error :", error); // error at the time of client.connect()
    }
}

export { redisClient, redisConnect };
