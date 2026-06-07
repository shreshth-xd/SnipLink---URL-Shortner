import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const cleanupQueue =
  new Queue(
    "cleanup",
    {
      connection: redis,
    }
  );