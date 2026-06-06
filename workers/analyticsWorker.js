import {Worker, Queue} from "bullmq";
import {redis} from "../lib/redis.js";
import pool from "../lib/db.js";

const analyticsWorker = new Worker(
  "analytics",
  async (job) => {
    const { 
      urlId,
      referrer,
      ip
    } = job.data;

    let country = null;
    let city = null;

    try {

      // Geo enrichment
      if (ip) {

        const response = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,city`
        );

        const geoData =
          await response.json();

        if (
          geoData.status === "success"
        ) {

          country =
            geoData.country;

          city =
            geoData.city;
        }
      }


      // Increment URL click counter
      await pool.query(
        `
        UPDATE urls
        SET clicks = clicks + 1
        WHERE id = $1
        `,
        [urlId]
      );


      // Insert click event into analytics table
      await pool.query(
        `
        INSERT INTO click_events (url_id, referrer, country, city)
        VALUES ($1, $2, $3, $4)
        `,
        [urlId, referrer, country, city]
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