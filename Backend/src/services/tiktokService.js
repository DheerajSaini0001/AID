// src/services/tiktokService.js
import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";
import { apiRequestWithRefresh } from "../utils/apiRequestWithRefresh.js";

export const fetchTikTokInsights = async (dealerId) => {
  try {
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "tiktok" });
    if (!tokenData) return console.log("⚠️ No TikTok Token Found");

    const advertiserId = tokenData.adAccountId;
    if (!advertiserId) return console.log("⚠️ TikTok Advertiser Account Missing!");

    const requestPayload = {
      advertiser_id: advertiserId,
      report_type: "BASIC",
      data_level: "AUCTION_AD",
      dimensions: ["stat_time_day"],
      metrics: ["spend", "impressions", "clicks", "conversions"],
      start_date: "2024-01-01",
      end_date: "2024-12-31"
    };

    // ✅ Wrap Request in Token Refresh Handler
    const reportData = await apiRequestWithRefresh("tiktok", dealerId, async (accessToken) => {
      const reportRes = await fetch(
        "https://business-api.tiktok.com/open_api/v1.3/reports/integrated/get/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": accessToken,
          },
          body: JSON.stringify(requestPayload),
        }
      );

      return await reportRes.json();
    });

    if (!reportData?.data?.list) return;

    // ✅ Save Insights to DB
    for (const row of reportData.data.list) {
      const date = row.stat_time_day;

      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "tiktok", date },
        {
          spend: Number(row.spend || 0),
          impressions: Number(row.impressions || 0),
          clicks: Number(row.clicks || 0),
          leads: Number(row.conversions?.leads || 0),
        },
        { upsert: true }
      );
    }

    console.log(`✅ TikTok Insights Synced for Dealer: ${dealerId}`);

  } catch (err) {
    console.log("❌ TikTok Sync Error:", err.message);
  }
};
