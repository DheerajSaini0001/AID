import AdAccountToken from "../models/AdAccountToken.js";
import dotenv from "dotenv";
dotenv.config();

export const startGoogleAuth = (req, res) => {
  const dealerId = req.dealerId;

  const url = `https://accounts.google.com/o/oauth2/v2/auth
  ?client_id=${process.env.GOOGLE_CLIENT_ID}
  &redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}
  &response_type=code
  &access_type=offline
  &prompt=consent
  &scope=https://www.googleapis.com/auth/adwords
  &state=${dealerId}`.replace(/\s+/g, "");

  res.json({ url });
};

export const googleCallback = async (req, res) => {
  try {
    const dealerId = req.query.state;
    const code = req.query.code;

    const tokenURL = `https://oauth2.googleapis.com/token`;

    const response = await fetch(tokenURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI
      })
    });

    const data = await response.json();

    if (data.error) {
      console.log("Google OAuth Error:", data.error);
      return res.status(400).json({ message: "Google OAuth Failed", error: data.error });
    }

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    // ✅ Save Tokens
    await AdAccountToken.findOneAndUpdate(
      { dealerId, platform: "google" },
      { accessToken, refreshToken },
      { upsert: true }
    );

    return res.redirect("http://localhost:5173/dashboard/connect-account");

  } catch (error) {
    console.log("Google OAuth Callback Error:", error.message);
    res.status(500).json({ message: "Google OAuth Server Error" });
  }
};
