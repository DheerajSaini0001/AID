import mongoose from "mongoose";

const AdInsightsSchema = new mongoose.Schema(
  {
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
      required: true,
    },

    platform: {
      type: String,
      enum: ["Facebook/Instagram", "Google", "LinkedIn", "TikTok"],
      required: true,
    },

    date: { type: String, required: true },

    spend: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    leads: { type: Number, default: 0 },

    // ✅ Detailed campaign info
    campaignName: { type: String },
    adSetName: { type: String }, // Google = AdGroup, TikTok = AdGroup
    adName: { type: String }, // Creative name

    // ✅ Lead-level optional info
    leadName: { type: String }, // Example: "John D."
    source: { type: String, default: "Form" }, // e.g., "Form" / "Call"
    status: {
      type: String,
      enum: ["New", "Converted", "Pending", "Lost"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdInsights", AdInsightsSchema);
