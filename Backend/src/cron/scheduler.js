import cron from "node-cron";
import { fetchMetaInsights } from "../services/metaService.js";
import { fetchGoogleInsights } from "../services/googleService.js";
import { fetchLinkedInInsights } from "../services/linkedInService.js";
import { fetchTikTokInsights } from "../services/tiktokService.js";
import Dealer from "../models/Dealer.js";

// Runs every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  console.log("⏳ Running scheduled sync...");

  const allDealers = await Dealer.find({});

  for (const dealer of allDealers) {
    await fetchMetaInsights(dealer._id);
    await fetchGoogleInsights(dealer._id);
    await fetchLinkedInInsights(dealer._id);
    await fetchTikTokInsights(dealer._id);
  }

  console.log("✅ Scheduled sync completed");
});
