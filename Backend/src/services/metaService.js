import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";
import { apiRequestWithRefresh } from "../utils/apiRequestWithRefresh.js";

export const fetchMetaInsights = async (dealerId) => {
  try {
    // 1️⃣ Find token stored for Meta
    const tokenDoc = await AdAccountToken.findOne({ dealerId, platform: "meta" });
    if (!tokenDoc) return console.log("⚠️ No Meta Token Found");

    const adAccountId = tokenDoc.adAccountId; // ✅ Saved in OAuth callback
    if (!adAccountId) return console.log("⚠️ No FB Ad Account Linked Yet");

    // 2️⃣ Fetch Ad Insights (wrapped in auto-refresh handler)
    const insightsData = await apiRequestWithRefresh("meta", dealerId, async (accessToken) => {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${adAccountId}/insights?fields=spend,impressions,clicks,actions,date_start&level=account&time_range[since]=yesterday&time_range[until]=yesterday&access_token=${accessToken}`
      );
      return await res.json();
    });

    if (!insightsData?.data) return console.log("⚠️ No Meta Insights Returned");

    // 3️⃣ Store in DB
    for (const row of insightsData.data) {
      const leads = (row.actions || []).find(a => a.action_type === "lead")?.value || 0;

      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "meta", date: row.date_start },
        {
          spend: Number(row.spend || 0),
          impressions: Number(row.impressions || 0),
          clicks: Number(row.clicks || 0),
          leads: Number(leads || 0),
        },
        { upsert: true }
      );
    }

    console.log(`✅ Meta Insights Synced for Dealer: ${dealerId}`);

  } catch (err) {
    console.log("❌ Meta Insights Fetch Error:", err.message);
  }
};
