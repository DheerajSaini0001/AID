import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";

export const fetchGoogleInsights = async (dealerId) => {
  try {
    const tokenData = await AdAccountToken.findOne({ dealerId, platform: "google" });
    if (!tokenData) return console.log("⚠️ No Google Token Found");

    const accessToken = tokenData.accessToken;

    // STEP 1: Fetch Google Ad Accounts
    const accRes = await fetch("https://googleads.googleapis.com/v14/customers:listAccessibleCustomers", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const accData = await accRes.json();

    if (!accData.resourceNames || accData.resourceNames.length === 0) return;

    const customerId = accData.resourceNames[0].replace("customers/", "");

    // STEP 2: Fetch Spend Data (Yesterday)
    const query = `
      SELECT metrics.cost_micros, metrics.clicks, metrics.impressions, segments.date
      FROM customer
      WHERE segments.date DURING YESTERDAY
    `;

    const report = await fetch(
      `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      }
    );

    const reportData = await report.json();

    for (const row of reportData.results || []) {
      const date = row.segments.date;
      const spend = (row.metrics.cost_micros || 0) / 1_000_000;
      const clicks = row.metrics.clicks || 0;
      const impressions = row.metrics.impressions || 0;

      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "google", date },
        { spend, clicks, impressions },
        { upsert: true }
      );
    }

    console.log("✅ Google Ads Synced:", dealerId);

  } catch (err) {
    console.log("❌ Google Ads Sync Error:", err.message);
  }
};
