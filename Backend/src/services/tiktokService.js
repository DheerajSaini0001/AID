import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";

export const fetchTikTokInsights = async (dealerId) => {
  try {
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "tiktok" });
    if (!tokenData) return console.log("⚠️ No TikTok Token Found");

    const accessToken = tokenData.accessToken;
    const advertiserId = tokenData.adAccountId;

    const reportRes = await fetch("https://business-api.tiktok.com/open_api/v1.3/reports/integrated/get/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
      },
      body: JSON.stringify({
        advertiser_id: advertiserId,
        report_type: "BASIC",
        data_level: "AUCTION_AD",
        dimensions: ["stat_time_day"],
        metrics: ["spend", "impressions", "clicks", "conversions"],
        start_date: "2024-01-01",
        end_date: "2024-12-31"
      })
    });

    const reportData = await reportRes.json();

    for (const row of reportData.data.list || []) {
      const date = row.stat_time_day;
      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "tiktok", date },
        {
          spend: row.spend || 0,
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          leads: row.conversions?.leads || 0,
        },
        { upsert: true }
      );
    }

    console.log("✅ TikTok Ads Synced:", dealerId);

  } catch (err) {
    console.log("❌ TikTok Sync Error:", err.message);
  }
};
