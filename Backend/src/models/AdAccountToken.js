import mongoose from "mongoose";

const AdAccountTokenSchema = new mongoose.Schema({
  dealerId: {type: mongoose.Schema.Types.ObjectId, ref: "Dealer", required: true },

  platform: {type: String, enum: ["meta", "google", "tiktok", "linkedin"], required: true },

  // Tokens
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  expiresIn: { type: Number },

  // Common Advertising Identifiers
  adAccountId: { type: String }, // Facebook Ad Account OR Google Customer ID OR TikTok Advertiser ID OR LinkedIn Account ID

  // META SPECIFIC (optional)
  pageId: { type: String },              // Facebook Page ID
  instagramBusinessId: { type: String }, // Instagram Business Account ID

}, { timestamps: true });

export default mongoose.model("AdAccountToken", AdAccountTokenSchema);
