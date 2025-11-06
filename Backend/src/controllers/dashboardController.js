import PerformanceData from "../models/AdInsights.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const dealerId = req.dealerId; // Already available from auth middleware

    // Optional date range from frontend
    const { startDate, endDate } = req.query;

    const matchQuery = { dealerId };

    if (startDate && endDate) {
      matchQuery.date = { $gte: startDate, $lte: endDate };
    }

    // Fetch all performance records
    const records = await PerformanceData.find(matchQuery);

    if (!records.length) {
      return res.json({
        totalLeads: 0,
        totalSpend: 0,
        cpl: 0,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        roi: 0,
        platformBreakdown: []
      });
    }

    // Aggregate totals
    const totalLeads = records.reduce((sum, r) => sum + (r.leads || 0), 0);
    const totalSpend = records.reduce((sum, r) => sum + (r.spend || 0), 0);
    const clicks = records.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const impressions = records.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const revenue = records.reduce((sum, r) => sum + (r.revenue || 0), 0);

    // Calculated Metrics
    const cpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const roi = totalSpend > 0 ? (revenue / totalSpend) * 100 : 0;

    // Platform Breakdown
    const platforms = ["meta", "google", "linkedin", "tiktok"];
    const platformBreakdown = platforms.map((platform) => {
      const platformData = records.filter((r) => r.platform === platform);

      const pLeads = platformData.reduce((sum, r) => sum + (r.leads || 0), 0);
      const pSpend = platformData.reduce((sum, r) => sum + (r.spend || 0), 0);
      const pCpl = pLeads > 0 ? pSpend / pLeads : 0;

      return {
        platform,
        leads: pLeads,
        spend: pSpend,
        cpl: pCpl
      };
    });

    res.json({
      totalLeads,
      totalSpend,
      cpl,
      clicks,
      impressions,
      ctr,
      roi,
      platformBreakdown
    });

  } catch (error) {
    console.log("Dashboard API Error:", error.message);
    res.status(500).json({ message: "Server Error: Dashboard Summary" });
  }
};
