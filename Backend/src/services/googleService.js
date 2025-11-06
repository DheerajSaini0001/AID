import AdAccountToken from "../models/AdAccountToken.js";
import AdInsights from "../models/AdInsights.js";
import { apiRequestWithRefresh } from "../utils/apiRequestWithRefresh.js";

export const fetchGoogleInsights = async (dealerId) => {
  try {
    // 1️⃣ Get Account List (auto refresh handled inside)
    const accData = await apiRequestWithRefresh("google", dealerId, async (accessToken) => {
      const res = await fetch(
        "https://googleads.googleapis.com/v14/customers:listAccessibleCustomers",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return await res.json();
    });

    if (!accData?.resourceNames?.length) return;

    const customerId = accData.resourceNames[0].replace("customers/", "");

    // 2️⃣ Prepare Query
    const query = `
      SELECT metrics.cost_micros, metrics.clicks, metrics.impressions, segments.date
      FROM customer
      WHERE segments.date DURING YESTERDAY
    `;

    // 3️⃣ Fetch Reports (also auto refresh)
    const reportData = await apiRequestWithRefresh("google", dealerId, async (accessToken) => {
      const res = await fetch(
        `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );
      return await res.json();
    });

    // 4️⃣ Save to DB
    for (const row of reportData.results || []) {
      await AdInsights.findOneAndUpdate(
        { dealerId, platform: "google", date: row.segments.date },
        {
          spend: (row.metrics.cost_micros || 0) / 1_000_000,
          clicks: row.metrics.clicks || 0,
          impressions: row.metrics.impressions || 0,
        },
        { upsert: true }
      );
    }

    console.log(`✅ Google Insights Synced for Dealer: ${dealerId}`);

  } catch (err) {
    console.log("❌ Google Sync Error:", err.message);
  }
};
