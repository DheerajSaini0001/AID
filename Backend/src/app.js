import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dealerRoutes from "./routes/dealerRoutes.js";
import metaRoutes from "./routes/metaRoutes.js"; 
import googleRoutes from "./routes/googleRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

// Dealer Login / Register
app.use("/dealer", dealerRoutes);

// Meta (Facebook + Instagram OAuth + Sync)
app.use("/meta", metaRoutes); 
app.use("/google", googleRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running perfectly ✅");
});

export default app;