/** @format */

const redis = require("../config/redis.config");
const rateLimit = async (req, res, next) => {
  const clientId = req.headers?.client_id;
  const currentTime = Date.now();

  const client = await redis.hGetAll(`ratelimit-${clientId}`);
  console.log("client", client);
  console.log("count", client.count);
  if (Object.keys(client).length === 0) {
    console.log("lot");
    await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`ratelimit-${clientId}`, "count", 1);
    return next();
  }

  const distance = (currentTime - client.createdAt) / 1000;
  console.log("distance", distance);
  if (distance > process.env.RATE_LIMIT_TIME) {
    await redis.hSet(`ratelimit-${clientId}`, "createdAt", currentTime);
    await redis.hSet(`ratelimit-${clientId}`, "count", 1);
    return next();
  }
  if (client.count > process.env.RATE_LIMIT_COUNT) {
    return res.status(429).json({
      success: false,
      mes: "Dont's spam",
    });
  } else {
    await redis.hSet(`ratelimit-${clientId}`, "count", +client.count + 1);
    return next();
  }
};

module.exports = rateLimit;
