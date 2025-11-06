import express from "express";
import { auth } from "../middleware/auth.js";
import { startMetaAuth, metaCallback } from "../controllers/metaController.js";
import { fetchMetaInsights } from "../services/metaService.js";

const router = express.Router();

// 1) Dealer clicks "Connect Meta (FB + IG)"
router.get("/connect", auth, startMetaAuth);

// 2) Meta redirects back after OAuth
router.get("/callback", metaCallback);

// 3) Test Sync Route (Manual Data Pull)
router.get("/sync/test", auth, async (req, res) => {
  await fetchMetaInsights(req.dealerId);
  res.json({ message: "✅ Meta (FB + IG) Data Synced Successfully" });
});

export default router;
