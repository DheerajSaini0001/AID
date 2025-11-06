import AdAccountToken from "../models/AdAccountToken.js";

export const getConnectedAccounts = async (req, res) => {
  const dealerId = req.dealerId;

  const accounts = await AdAccountToken.find({ dealerId });

  res.json({
    meta: accounts.some(a => a.platform === "meta"),
    google: accounts.some(a => a.platform === "google"),
    linkedin: accounts.some(a => a.platform === "linkedin"),
    tiktok: accounts.some(a => a.platform === "tiktok"),
  });
};
