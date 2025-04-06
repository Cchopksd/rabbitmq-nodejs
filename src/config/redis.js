const redis = require("redis");

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("connect", () => {
  console.log("🔌 Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("⚠️ Redis error: ", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = {
  redisClient,
};

