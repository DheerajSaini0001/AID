import express from "express";
import { auth } from "../middleware/auth.js";
import { fetchMetaLeads } from "../services/metaLeadService.js";

const router = express.Router();

// ✅ Manual Sync Handler
router.get("/sync", auth, async (req, res) => {
  const adAccountId = req.query.account;
  await fetchMetaLeads(req.dealerId, adAccountId);
  res.json({ message: "Leads synced successfully" });
});

// ✅ Auto Sync Toggle
router.get("/auto-sync", auth, async (req, res) => {
  const enable = req.query.enable === "true";
  // For now, just return success (cron will use database flag later)
  res.json({ autoSync: enable });
});

export default router;
