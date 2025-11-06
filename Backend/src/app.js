import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dealerRoutes from "./routes/dealerRoutes.js";
import metaRoutes from "./routes/metaRoutes.js"; 
import googleRoutes from "./routes/googleRoutes.js";
import linkedInRoutes from "./routes/linkedinRoutes.js";
import tiktokRoutes from "./routes/tiktokRoutes.js";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes.js";
import "./cron/scheduler.js";
import insightsRoutes from "./routes/insightsRoutes.js";
import accountsRoutes from "./routes/leadRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import pixelRoutes from "./routes/pixelRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

// Dealer Login / Register
app.use("/dealer", dealerRoutes);
app.use("/accounts", accountRoutes);
app.use("/insights", insightsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/lead", leadRoutes);
app.use("/pixel", pixelRoutes);




// Meta (Facebook + Instagram OAuth + Sync)
app.use("/meta", metaRoutes); 
app.use("/google", googleRoutes);
app.use("/linkedin", linkedInRoutes);
app.use("/tiktok", tiktokRoutes);


export default app;