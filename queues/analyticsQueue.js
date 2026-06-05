import { Queue } from "bullmq";
import { redis } from "@/lib/redis";

export const analyticsQueue =
  new Queue(
    "analytics",
    {
      connection: redis,
    }
  );