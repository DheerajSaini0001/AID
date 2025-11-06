import express from "express";
import { auth } from "../middleware/auth.js";
import AdInsights from "../models/AdInsights.js";

const router = express.Router();

router.get("/latest", auth, async (req, res) => {
  const data = await AdInsights.find({ dealerId: req.dealerId })
    .sort({ date: -1 })
    .limit(30);
  res.json(data);
});

export default router;
