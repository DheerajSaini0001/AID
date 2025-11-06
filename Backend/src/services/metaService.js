import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";

export const fetchMetaInsights = async (dealerId) => {
  try {
    // Find stored token (now platform = meta)
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "meta" });
    if (!tokenData) return;

    const accessToken = tokenData.accessToken;

    // 1. Get Facebook Ad Accounts
    const accountRes = await fetch(
      `https://graph.facebook.com/v19.0/me/adaccounts?access_token=${accessToken}`
    );
    const accountData = await accountRes.json();

    if (!accountData.data) return;

    for (const acc of accountData.data) {
      const adAccountId = acc.id;

      // 2. Get Insights (Spend, Clicks, Impression, Leads)
      const insightsRes = await fetch(
        `https://graph.facebook.com/v19.0/${adAccountId}/insights?fields=spend,impressions,clicks,actions,date_start&level=account&time_range[since]=yesterday&time_range[until]=yesterday&access_token=${accessToken}`
      );

      const insightsData = await insightsRes.json();
      if (!insightsData.data) continue;

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
    }

    console.log(`✅ Meta (FB + IG) Insights Synced for Dealer: ${dealerId}`);

  } catch (err) {
    console.log("❌ Meta Insights Fetch Error:", err.message);
  }
};
