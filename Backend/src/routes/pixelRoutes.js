import express from "express";
import { auth } from "../middleware/auth.js";
import AdAccountToken from "../models/AdAccountToken.js";

const router = express.Router();

router.get("/pixels", auth, async (req, res) => {
  const dealerId = req.dealerId;
  const tokens = await AdAccountToken.find({ dealerId });

  res.json(tokens.map(t => ({
    platform: t.platform,
    pixelId: t.pixelId || t.googleTagId || t.linkedinTagId || "Not Set"
  })));
});

export default router;
