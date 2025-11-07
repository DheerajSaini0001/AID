import AdAccountToken from "../models/AdAccountToken.js";

export const getConnectedAccounts = async (req, res) => {
  const dealerId = req.dealerId;

  const accounts = await AdAccountToken.find({ dealerId });

  res.json({
    meta: accounts.some(a => a.platform === "Facebook/Instagram"),
    google: accounts.some(a => a.platform === "Google"),
    linkedin: accounts.some(a => a.platform === "LinkedIn"),
    tiktok: accounts.some(a => a.platform === "TikTok")
  });
};
