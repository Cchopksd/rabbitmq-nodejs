const client = require("../config/database");
const { redisClient } = require("../config/redis");

exports.getUsersData = async () => {
  const cacheKey = "users:all"; // Set key name to store in Redis

  try {
    // 1. Read data in Redis
    const cachedUsers = await redisClient.get(cacheKey);

    // 2. If found data in Redis → return users
    if (cachedUsers) {
      console.log("✅ Cache hit");
      return JSON.parse(cachedUsers);
    }

    console.log("🔄 Cache miss. Querying from database...");
    // 3. IF data not found in Redis → query from database
    const query = `
      SELECT *
      FROM users
    `;

    const result = await client.query(query);
    const users = result.rows;

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    // 4. Store Redis with TTL 600 seconds
    await redisClient.set(cacheKey, JSON.stringify(users), {
      EX: 600,
    });

    console.log("Users data cached to Redis");
    return users;
  } catch (error) {
    console.error("❌ Error getting user data:", error);
    throw new Error("Internal server error");
  }
};

