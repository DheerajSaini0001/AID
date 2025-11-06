// src/services/tokenRefreshService.js
import fetch from "node-fetch";
import AdAccountToken from "../models/AdAccountToken.js";

/* ---------------- META ---------------- */
export const refreshMetaToken = async (tokenDoc) => {
  const url = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.META_APP_ID}&client_secret=${process.env.META_APP_SECRET}&fb_exchange_token=${tokenDoc.accessToken}`;

  const res = await fetch(url);
  const data = await res.json();

  tokenDoc.accessToken = data.access_token;
  await tokenDoc.save();
  return tokenDoc;
};

/* ---------------- GOOGLE ---------------- */
export const refreshGoogleToken = async (tokenDoc) => {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: tokenDoc.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  tokenDoc.accessToken = data.access_token;
  await tokenDoc.save();
  return tokenDoc;
};

/* ---------------- LINKEDIN ---------------- */
export const refreshLinkedInToken = async (tokenDoc) => {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: tokenDoc.refreshToken,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  });

  const data = await res.json();
  tokenDoc.accessToken = data.access_token;
  await tokenDoc.save();
  return tokenDoc;
};

/* ---------------- TIKTOK ---------------- */
export const refreshTikTokToken = async (tokenDoc) => {
  const res = await fetch(`https://business-api.tiktok.com/open_api/v1.3/oauth2/refresh_token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: process.env.TIKTOK_APP_ID,
      secret: process.env.TIKTOK_APP_SECRET,
      refresh_token: tokenDoc.refreshToken,
    })
  });

  const data = await res.json();
  tokenDoc.accessToken = data.data.access_token;
  await tokenDoc.save();
  return tokenDoc;
};
