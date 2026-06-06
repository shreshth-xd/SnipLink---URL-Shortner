import { redis } from "./redis.js";

const WINDOW_IN_SECONDS = 60 * 60; // 1 hour

export async function checkRateLimit(key,limit) {

  // Increment counter
  const count =
    await redis.incr(key);

  // Set expiry only on first request
  if (count === 1) {
    await redis.expire(
      key,
      WINDOW_IN_SECONDS
    );
  }

  const ttl =
    await redis.ttl(key);

  return {
    allowed: count <= limit,
    count,
    remaining:
      Math.max(
        0,
        limit - count
      ),
    resetIn: ttl,
  };

}