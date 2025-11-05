import cron from "node-cron";
import { autoDeletePanels } from "./autoDelete.js";

export const scheduleJobs = () => {
  // run every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    console.log("Running hourly cleanup job...");
    await autoDeletePanels();
  });

  console.log("Scheduled jobs initialized.");
};
