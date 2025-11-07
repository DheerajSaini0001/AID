import PerformanceData from "../models/AdInsights.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const dealerId = req.dealerId; // From auth middleware
    const { startDate, endDate } = req.query;

    const matchQuery = { dealerId };

    // Optional date range from frontend
    if (startDate && endDate) {
      matchQuery.date = { $gte: startDate, $lte: endDate };
    }

    // Fetch all performance records
    const records = await PerformanceData.find(matchQuery).sort({ date: 1 });

    if (!records.length) {
      return res.json({
        totalLeads: 0,
        totalSpend: 0,
        cpl: 0,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        roi: 0,
        platformBreakdown: [],
        trendData: [],
        leadsList: [] // ✅ also return empty list
      });
    }

    // -------------------------
    // 🔹 1. Aggregate Totals
    // -------------------------
    const totalLeads = records.reduce((sum, r) => sum + (r.leads || 0), 0);
    const totalSpend = records.reduce((sum, r) => sum + (r.spend || 0), 0);
    const clicks = records.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const impressions = records.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const revenue = records.reduce((sum, r) => sum + (r.revenue || 0), 0);

    const cpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const roi = totalSpend > 0 ? (revenue / totalSpend) * 100 : 0;

    // -------------------------
    // 🔹 2. Platform Breakdown
    // -------------------------
    const platforms = ["Facebook/Instagram", "Google", "LinkedIn", "TikTok"];

    const platformBreakdown = platforms.map((platform) => {
      const platformData = records.filter((r) => r.platform === platform);

      const pLeads = platformData.reduce((sum, r) => sum + (r.leads || 0), 0);
      const pSpend = platformData.reduce((sum, r) => sum + (r.spend || 0), 0);
      const pImpressions = platformData.reduce((sum, r) => sum + (r.impressions || 0), 0);
      const pClicks = platformData.reduce((sum, r) => sum + (r.clicks || 0), 0);
      const pCpl = pLeads > 0 ? pSpend / pLeads : 0;
      const pCtr = pImpressions > 0 ? pClicks / pImpressions : 0;

      return {
        platform,
        leads: pLeads,
        spend: pSpend,
        cpl: pCpl,
        ctr: pCtr
      };
    });

    // -------------------------
    // 🔹 3. Trend Data (for Line Chart)
    // -------------------------
    const trendMap = {};
    records.forEach((r) => {
      const dateKey = new Date(r.date).toISOString().split("T")[0];
      if (!trendMap[dateKey]) {
        trendMap[dateKey] = { leads: 0, spend: 0 };
      }
      trendMap[dateKey].leads += r.leads || 0;
      trendMap[dateKey].spend += r.spend || 0;
    });

    const trendData = Object.entries(trendMap)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, { leads, spend }]) => ({ date, leads, spend }));

    // -------------------------
    // 🔹 4. Leads Table (for Leads Detail View)
    // -------------------------
    const leadsList = records.map((r) => ({
      date: r.date,
      adName: r.adName || "—",
      platform: r.platform,
      campaign: r.campaignName || r.adSetName || "—",
      leadName: r.leadName || "—",
      source: r.source || "Form", // default "Form"
      status: r.status || "New",  // default "New"
    }));

    // -------------------------
    // 🔹 5. Final Response
    // -------------------------
    res.json({
      totalLeads,
      totalSpend,
      cpl,
      clicks,
      impressions,
      ctr,
      roi,
      platformBreakdown,
      trendData,
      leadsList, // ✅ Now included
    });

  } catch (error) {
    console.error("Dashboard API Error:", error.message);
    res.status(500).json({ message: "Server Error: Dashboard Summary" });
  }
};
