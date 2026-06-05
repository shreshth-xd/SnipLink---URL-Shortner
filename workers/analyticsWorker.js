import {Worker, Queue} from "bullmq";
import {redis} from "../lib/redis.js";
import pool from "../lib/db.js";

const analyticsWorker = new Worker(
  "analytics",
  async (job) => {
    const { urlId } = job.data;

    try {
      // Insert click event into analytics table
      await pool.query(
        `
        INSERT INTO click_events (url_id)
        VALUES ($1)
        `,
        [urlId]
      );

      console.log("Analytics event stored for URL:", urlId);
    } catch (error) {
      console.error("Worker error:", error);
      throw error; // important so BullMQ can retry if needed
    }
  },
  {
    connection: redis,
  }
);

console.log("Analytics worker running...");