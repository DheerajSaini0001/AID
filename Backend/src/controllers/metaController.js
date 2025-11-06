import AdAccountToken from "../models/AdAccountToken.js";
import dotenv from "dotenv";

dotenv.config();

export const startMetaAuth = (req, res) => {
  const dealerId = req.dealerId;

  const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.META_APP_ID}&redirect_uri=${encodeURIComponent(process.env.META_REDIRECT_URI)}&state=${dealerId}&scope=ads_management,ads_read,pages_show_list,pages_read_engagement,instagram_basic,instagram_manage_insights,leads_retrieval`;

  return res.json({ url });
};

export const metaCallback = async (req, res) => {
  try {
    const dealerId = req.query.state;
    const code = req.query.code;

    const tokenURL = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.META_APP_ID}&redirect_uri=${encodeURIComponent(process.env.META_REDIRECT_URI)}&client_secret=${process.env.META_APP_SECRET}&code=${code}`;

    const tokenResponse = await fetch(tokenURL);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.log("OAuth Error:", tokenData.error);
      return res.status(400).json({ message: "Meta OAuth Failed", error: tokenData.error });
    }

    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;

    // Get Ad Account
    const adAccRes = await fetch(`https://graph.facebook.com/v19.0/me/adaccounts?access_token=${accessToken}`);
    const adAccData = await adAccRes.json();
    const adAccountId = adAccData?.data?.[0]?.id || null;

    // Get Page
    const pageRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`);
    const pageData = await pageRes.json();
    const pageId = pageData?.data?.[0]?.id || null;

    // Get Instagram Business Account
    let instagramBusinessId = null;
    if (pageId) {
      const igRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}?fields=connected_instagram_account&access_token=${accessToken}`);
      const igData = await igRes.json();
      instagramBusinessId = igData?.connected_instagram_account?.id || null;
    }

    // ✅ Save Meta Data for Dealer
    await AdAccountToken.findOneAndUpdate(
      { dealerId, platform: "meta" },
      { accessToken, expiresIn, adAccountId, pageId, instagramBusinessId },
      { upsert: true }
    );

    return res.redirect("http://localhost:5173/dashboard/connect-account");

  } catch (error) {
    console.log("Meta OAuth Error:", error.message);
    res.status(500).json({ message: "Meta OAuth Error" });
  }
};
