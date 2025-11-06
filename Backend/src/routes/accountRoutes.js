import express from "express";
import { auth } from "../middleware/auth.js";
import { getConnectedAccounts } from "../controllers/accountStatusController.js";

const router = express.Router();
router.get("/connected", auth, getConnectedAccounts);
export default router;
