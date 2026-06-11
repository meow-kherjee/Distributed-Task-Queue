import "dotenv/config";
import { createClient } from "redis";

const portRedis = process.env.PORT_REDIS;

const redisClient = createClient({
    // multiple createClients in diferent modules mean multiple clients
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
