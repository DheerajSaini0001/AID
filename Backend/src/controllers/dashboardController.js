import PerformanceData from "../models/AdInsights.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const dealerId = req.dealerId; 
    const filter = req.query.filter; 

    const now = new Date();
    let startDate, endDate;
    endDate = new Date();

    switch (filter) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;

      case "yesterday":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;

      case "last3days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 3);
        break;

      case "last7days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;

      case "last2weeks":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 14);
        break;

      case "last3weeks":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 21);
        break;

      case "lastmonth":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;

      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    }

    // 🔹 Fetch all records (then filter manually for string dates)
    const allRecords = await PerformanceData.find({ dealerId }).sort({ date: 1 });

    // ✅ Handle both string and Date types
    const records = allRecords.filter((r) => {
      const recordDate = new Date(r.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

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
        leadsList: [],
      });
    }

    // -----------------------------
    // 🔹 Aggregate Totals
    // -----------------------------
    const totalLeads = records.reduce((sum, r) => sum + (r.leads || 0), 0);
    const totalSpend = records.reduce((sum, r) => sum + (r.spend || 0), 0);
    const clicks = records.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const impressions = records.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const revenue = records.reduce((sum, r) => sum + (r.revenue || 0), 0);

    const cpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const roi = totalSpend > 0 ? (revenue / totalSpend) * 100 : 0;

    // -----------------------------
    // 🔹 Platform Breakdown
    // -----------------------------
    const platforms = ["Facebook/Instagram", "Google", "LinkedIn", "TikTok"];
    const platformBreakdown = platforms.map((platform) => {
      const platformData = records.filter((r) => r.platform === platform);
      const leads = platformData.reduce((s, r) => s + (r.leads || 0), 0);
      const spend = platformData.reduce((s, r) => s + (r.spend || 0), 0);
      const impressions = platformData.reduce((s, r) => s + (r.impressions || 0), 0);
      const clicks = platformData.reduce((s, r) => s + (r.clicks || 0), 0);

      return {
        platform,
        leads,
        spend,
        cpl: leads > 0 ? spend / leads : 0,
        ctr: impressions > 0 ? clicks / impressions : 0,
      };
    });

    // -----------------------------
    // 🔹 Trend Data (Line Chart)
    // -----------------------------
    const trendMap = {};
    records.forEach((r) => {
      const dateKey = new Date(r.date).toISOString().split("T")[0];
      if (!trendMap[dateKey]) trendMap[dateKey] = { leads: 0, spend: 0 };
      trendMap[dateKey].leads += r.leads || 0;
      trendMap[dateKey].spend += r.spend || 0;
    });

    const trendData = Object.entries(trendMap)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, { leads, spend }]) => ({ date, leads, spend }));

    // -----------------------------
    // 🔹 Leads Table
    // -----------------------------
    const leadsList = records.map((r) => ({
      date: r.date,
      adName: r.adName || "—",
      platform: r.platform,
      campaign: r.campaignName || r.adSetName || "—",
      leadName: r.leadName || "—",
      source: r.source || "Form",
      status: r.status || "New",
    }));

    // -----------------------------
    // 🔹 Final Response
    // -----------------------------
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
      leadsList,
    });

  } catch (error) {
    console.error("❌ Dashboard API Error:", error.message);
    res.status(500).json({ message: "Server Error: Dashboard Summary" });
  }
};
