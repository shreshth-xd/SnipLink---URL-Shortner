import { cleanupQueue }
from "../queues/CleanupQueue.js";

await cleanupQueue.add(
  "cleanup-soft-deleted-urls",
  {},
  {
    jobId: "soft-delete-urls-cleanup",
    repeat: {
        pattern: "0 22 * * *",
    }
    // repeat: {
    //     every: 10000, // every 10 seconds for testing
    // },
  }
);

console.log(
  "Cleanup job registered."
);

process.exit(0);