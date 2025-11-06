import express from "express";
import { registerDealer, loginDealer , getDealerProfile } from "../controllers/dealerController.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", registerDealer);
router.post("/login", loginDealer);

// Protected Route
router.get("/profile", auth, getDealerProfile);

export default router;
