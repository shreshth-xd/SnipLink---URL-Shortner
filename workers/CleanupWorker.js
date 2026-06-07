import { Worker } from "bullmq";
import pool from "../lib/db.js";
import { redis } from "../lib/redis.js";

const cleanupWorker = new Worker(
  "cleanup",

  async () => {

    const result =
      await pool.query(
        `
        DELETE FROM urls
        WHERE deleted_at IS NOT NULL
        AND deleted_at <
            NOW() - INTERVAL '30 days'
        `
      );

    console.log(
      `Deleted ${result.rowCount} URLs`
    );

  },

  {
    connection: redis,
  }
);

console.log(
  "Cleanup worker running..."
);