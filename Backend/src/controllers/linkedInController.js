import AdAccountToken from "../models/AdAccountToken.js";
import dotenv from "dotenv";
dotenv.config();

export const startLinkedInAuth = (req, res) => {
  const dealerId = req.dealerId;

  const url = `https://www.linkedin.com/oauth/v2/authorization
  ?response_type=code
  &client_id=${process.env.LINKEDIN_CLIENT_ID}
  &redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI)}
  &state=${dealerId}
  &scope=r_liteprofile%20r_ads%20rw_ads%20r_organization_social%20rw_organization_admin`.replace(/\s+/g, "");

  res.json({ url });
};

export const linkedInCallback = async (req, res) => {
  try {
    const dealerId = req.query.state;
    const code = req.query.code;

    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      })
    });

    const tokenData = await tokenResponse.json();

    const accessToken = tokenData.access_token;

    // ✅ Fetch LinkedIn Ad Account ID
    const accRes = await fetch("https://api.linkedin.com/v2/adAccounts", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const accData = await accRes.json();
    const adAccountId = accData.elements?.[0]?.id || null;

    // ✅ Save to DB
    await AdAccountToken.findOneAndUpdate(
      { dealerId, platform: "LinkedIn" },
      { accessToken, adAccountId },
      { upsert: true }
    );

    return res.redirect("http://localhost:5173/dashboard/connect-account");

  } catch (err) {
    console.log("LinkedIn OAuth Error:", err.message);
    res.status(500).json({ message: "LinkedIn OAuth Error" });
  }
};
