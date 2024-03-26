/** @format */

const redis = require("../config/redis.config");
const generateKeyRedis = require("../utils/fn");
const rateLimit = async (req, res, next) => {
  const clientId = generateKeyRedis("");
  const currentTime = Date.now();

  const client = await redis.hGetAll(`ratelimit-${clientId}`);
  if (Object.keys(client).length === 0) {
    await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`ratelimit-${clientId}`, "count", 1);
    redis.expireAt(
      `ratelimit-${clientId}`,
      parseInt(+new Date() / 1000) + 86400
    );

    return next();
  }

  const distance = (currentTime - client.createdAt) / 1000;
  if (distance > process.env.RATE_LIMIT_TIME) {
    await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`ratelimit-${clientId}`, "count", 1);
    redis.expireAt(
      `ratelimit-${clientId}`,
      parseInt(+new Date() / 1000) + 86400
    );

    return next();
  }
  if (client.count > process.env.RATE_LIMIT_COUNT) {
    return res.status(429).json({
      success: false,
      mes: "Dont's spam",
    });
  } else {
    await redis.hSet(`ratelimit-${clientId}`, "count", +client.count + 1);
    redis.expireAt(
      `ratelimit-${clientId}`,
      parseInt(+new Date() / 1000) + 86400
    );

    return next();
  }
};

module.exports = rateLimit;
