import mongoose from "mongoose";

const AdInsightsSchema = new mongoose.Schema({
  dealerId: {type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },

  platform: {type: String, enum: ["meta", "google", "tiktok", "linkedin"], required: true},

  date: {type: String, required: true },

  spend: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  leads: { type: Number, default: 0 }, 

  // Optional detailed breakdown (useful for dashboard drill-down)
  campaignName: { type: String },
  adSetName: { type: String }, // Google = AdGroup, TikTok = AdGroup
  adName: { type: String },    // Creative name

}, { timestamps: true });

export default mongoose.model("AdInsights", AdInsightsSchema);
