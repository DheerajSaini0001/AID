import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";

export const fetchLinkedInInsights = async (dealerId) => {
  try {
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "linkedin" });
    if (!tokenData) return console.log("⚠️ No LinkedIn Token Found");

    const accessToken = tokenData.accessToken;
    const adAccountId = tokenData.adAccountId;

    const reportRes = await fetch(
      `https://api.linkedin.com/rest/adAnalyticsV2?q=analytics&pivot=CAMPAIGN&dateRange.start.day=1&dateRange.start.month=1&dateRange.start.year=2024&dateRange.end.day=1&dateRange.end.month=1&dateRange.end.year=2024&accounts=urn:li:sponsoredAccount:${adAccountId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const reportData = await reportRes.json();

    for (const item of reportData.elements || []) {
      const date = item.dateRange?.start?.year + "-" + item.dateRange?.start?.month + "-" + item.dateRange?.start?.day;

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

    console.log("✅ LinkedIn Ads Synced:", dealerId);

  } catch (err) {
    console.log("❌ LinkedIn Sync Error:", err.message);
  }
};
