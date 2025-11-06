import express from "express";
import { auth } from "../middleware/auth.js";
import { startTikTokAuth, tiktokCallback } from "../controllers/tiktokController.js";
import { fetchTikTokInsights } from "../services/tiktokService.js";

const router = express.Router();

// Step 1: Connect
router.get("/connect", auth, startTikTokAuth);

// Step 2: OAuth Callback (NO auth)
router.get("/callback", tiktokCallback);

// Step 3: Sync Data
router.get("/sync", auth, async (req, res) => {
  await fetchTikTokInsights(req.dealerId);
  res.json({ message: "✅ TikTok Ads Synced Successfully" });
});

export default router;
