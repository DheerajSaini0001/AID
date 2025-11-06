import express from "express";
import { auth } from "../middleware/auth.js";
import { listConnectedAccounts, syncLeadsNow, toggleAutoSync } from "../controllers/leadController.js";

const router = express.Router();

router.get("/accounts/list", auth, listConnectedAccounts);
router.post("/leads/sync", auth, syncLeadsNow);
router.get("/leads/auto-sync", auth, toggleAutoSync);

export default router;
