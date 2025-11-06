import AdAccountToken from "../models/AdAccountToken.js";
import { fetchMetaInsights } from "../services/metaService.js";
import { fetchGoogleInsights } from "../services/googleService.js";
import { fetchLinkedInInsights } from "../services/linkedInService.js";
import { fetchTikTokInsights } from "../services/tiktokService.js";

// ✅ 1) Return connected ad accounts list
export const listConnectedAccounts = async (req, res) => {
  const dealerId = req.dealerId;

  const tokens = await AdAccountToken.find({ dealerId });

  const response = tokens.map(acc => ({
    id: acc.adAccountId || acc.pageId || acc.instagramBusinessId || "Unknown",
    name: acc.platform.toUpperCase(),
    platform: acc.platform
  }));

  res.json(response);
};

// ✅ 2) Sync leads manually (multiple accounts)
export const syncLeadsNow = async (req, res) => {
  const { accounts } = req.body;

  for (const accountId of accounts) {
    const acc = await AdAccountToken.findOne({ adAccountId: accountId });

    if (!acc) continue;

    if (acc.platform === "meta") await fetchMetaInsights(acc);
    if (acc.platform === "google") await fetchGoogleInsights(acc);
    if (acc.platform === "linkedin") await fetchLinkedInInsights(acc);
    if (acc.platform === "tiktok") await fetchTikTokInsights(acc);
  }

  res.json({ message: "✅ Leads Synced Successfully" });
};

// ✅ 3) Auto Sync Toggle (save to DB or Redis later)
export const toggleAutoSync = async (req, res) => {
  const enable = req.query.enable === "true";

  // For now just return success (job scheduler will be added later)
  res.json({
    autoSync: enable,
    message: enable ? "✅ Auto Sync Enabled" : "⛔ Auto Sync Disabled",
  });
};
