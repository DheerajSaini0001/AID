import express from "express";
import { auth } from "../middleware/auth.js";
import { startGoogleAuth, googleCallback } from "../controllers/googleController.js";
import { fetchGoogleInsights } from "../services/googleService.js";

const router = express.Router();

router.get("/connect", auth, startGoogleAuth);
router.get("/callback", googleCallback);

router.get("/sync", auth, async (req, res) => {
  await fetchGoogleInsights(req.dealerId);
  res.json({ message: "✅ Google Ads Synced Successfully" });
});

export default router;
