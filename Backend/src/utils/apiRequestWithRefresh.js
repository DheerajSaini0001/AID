import AdAccountToken from "../models/AdAccountToken.js";
import { refreshMetaToken, refreshGoogleToken, refreshLinkedInToken, refreshTikTokToken } from "../services/tokenRefreshService.js";

export const apiRequestWithRefresh = async (platform, dealerId, apiCallFn) => {
  let tokenDoc = await AdAccountToken.findOne({ dealerId, platform });
  if (!tokenDoc) throw new Error(`No token stored for platform: ${platform}`);

  try {
    // 🔹 First Attempt
    return await apiCallFn(tokenDoc.accessToken);
  } catch (err) {

    const expired =
      err.response?.status === 401 ||
      err.response?.status === 400 ||
      err.message?.includes("expired");

    if (!expired) throw err; // If not expiration error → throw normally

    console.log(`⚠️ Token expired for ${platform}, refreshing...`);

    // 🔄 Refresh Based on Platform
    if (platform === "meta") tokenDoc = await refreshMetaToken(tokenDoc);
    if (platform === "google") tokenDoc = await refreshGoogleToken(tokenDoc);
    if (platform === "linkedin") tokenDoc = await refreshLinkedInToken(tokenDoc);
    if (platform === "tiktok") tokenDoc = await refreshTikTokToken(tokenDoc);

    // ✅ Retry API with new token
    return await apiCallFn(tokenDoc.accessToken);
  }
};
