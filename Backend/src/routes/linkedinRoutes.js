import express from "express";
import { auth } from "../middleware/auth.js";
import { startLinkedInAuth, linkedInCallback } from "../controllers/linkedInController.js";
import { fetchLinkedInInsights } from "../services/linkedInService.js";

const router = express.Router();

router.get("/connect", auth, startLinkedInAuth);
router.get("/callback", linkedInCallback);

router.get("/sync", auth, async (req, res) => {
  await fetchLinkedInInsights(req.dealerId);
  res.json({ message: "✅ LinkedIn Ads Synced Successfully" });
});

export default router;
