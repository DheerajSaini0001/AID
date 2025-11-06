import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";
import { apiRequestWithRefresh } from "../utils/apiRequestWithRefresh.js";

export const fetchLinkedInInsights = async (dealerId) => {
  try {
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "linkedin" });
    if (!tokenData) return console.log("⚠️ No LinkedIn Token Found");

    const adAccountId = tokenData.adAccountId;
    if (!adAccountId) return console.log("⚠️ No LinkedIn Ad Account Connected");

    const url = `https://api.linkedin.com/rest/adAnalyticsV2
      ?q=analytics
      &pivot=CAMPAIGN
      &dateRange.start.day=1
      &dateRange.start.month=1
      &dateRange.start.year=2024
      &dateRange.end.day=31
      &dateRange.end.month=12
      &dateRange.end.year=2024
      &accounts=urn:li:sponsoredAccount:${adAccountId}`
      .replace(/\s+/g, "");

    // ✅ Wrap request inside auto-refresh handler
    const reportData = await apiRequestWithRefresh("linkedin", dealerId, async (accessToken) => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202402",
        },
      });
      return await res.json();
    });

    if (!reportData?.elements) return;

    // ✅ Store Insights
    for (const item of reportData.elements) {
      const year = item.dateRange?.start?.year || 2024;
      const month = item.dateRange?.start?.month || 1;
      const day = item.dateRange?.start?.day || 1;
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "linkedin", date },
        {
          spend: item.costInUsd || 0,
          clicks: item.clicks || 0,
          impressions: item.impressions || 0
        },
        { upsert: true }
      );
    }

    console.log(`✅ LinkedIn Insights Synced for Dealer: ${dealerId}`);

  } catch (err) {
    console.log("❌ LinkedIn Sync Error:", err.message);
  }
};
