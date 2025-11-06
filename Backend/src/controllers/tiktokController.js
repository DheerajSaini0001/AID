import AdAccountToken from "../models/AdAccountToken.js";
import dotenv from "dotenv";
dotenv.config();

export const startTikTokAuth = (req, res) => {
  const dealerId = req.dealerId;

  const url = `https://business-api.tiktok.com/portal/auth?
  app_id=${process.env.TIKTOK_APP_ID}
  &redirect_uri=${encodeURIComponent(process.env.TIKTOK_REDIRECT_URI)}
  &state=${dealerId}
  &scope=user.info.basic,ad.read,advertiser.read`.replace(/\s+/g, "");

  res.json({ url });
};

export const tiktokCallback = async (req, res) => {
  try {
    const dealerId = req.query.state;
    const code = req.query.code;

    const tokenRes = await fetch("https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: process.env.TIKTOK_APP_ID,
        app_secret: process.env.TIKTOK_APP_SECRET,
        auth_code: code
      })
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.data.access_token;

    // ✅ Get Advertiser ID
    const advertiserRes = await fetch("https://business-api.tiktok.com/open_api/v1.3/advertiser/get/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Token": accessToken
      },
      body: JSON.stringify({})
    });

    const advertiserData = await advertiserRes.json();
    const advertiserId = advertiserData.data.list?.[0]?.advertiser_id || null;

    // ✅ Save
    await AdAccountToken.findOneAndUpdate(
      { dealerId, platform: "tiktok" },
      { accessToken, adAccountId: advertiserId },
      { upsert: true }
    );

    return res.redirect("http://localhost:5173/dashboard?connected=tiktok");

  } catch (err) {
    console.log("TikTok OAuth Error:", err.message);
    res.status(500).json({ message: "TikTok OAuth Error" });
  }
};
