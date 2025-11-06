import mongoose from "mongoose";

const AdAccountTokenSchema = new mongoose.Schema({
  dealerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Dealer", 
    required: true 
  },

  // Now supports both Facebook + Instagram under Meta
  platform: { 
    type: String, 
    enum: ["meta"], 
    required: true 
  },

  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  expiresIn: { type: Number },

  // Extra fields for marketing data fetch
  adAccountId: { type: String },        // Facebook Ad Account ID
  pageId: { type: String },             // Facebook Page ID
  instagramBusinessId: { type: String } // Linked Instagram Business Account ID

}, { timestamps: true });

export default mongoose.model("AdAccountToken", AdAccountTokenSchema);
