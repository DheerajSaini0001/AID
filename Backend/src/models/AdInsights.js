import mongoose from "mongoose";

const AdInsightsSchema = new mongoose.Schema({
  dealerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Dealer", 
    required: true 
  },

  // Now handles Facebook + Instagram under Meta
  platform: { 
    type: String, 
    enum: ["meta"], 
    required: true 
  },

  date: { 
    type: String, // YYYY-MM-DD
    required: true 
  },

  // Performance Metrics
  spend: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  leads: { type: Number, default: 0 },

  // Optional breakdown fields (useful later)
  campaignName: { type: String },
  adSetName: { type: String },
  adName: { type: String },

}, { timestamps: true });

export default mongoose.model("AdInsights", AdInsightsSchema);
