import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  MousePointerClick,
  Eye,
  Percent,
} from "lucide-react";
import LineChart_LeadsSpend from "../components/LineChart_LeadsSpend"; // ✅ Import your chart component
import BarChart_PlatformComparison from "../components/BarChart_PlatformComparison"; // ✅ Import your chart component
import LeadsTable from "../components/LeadsTable";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const { logout, user, dashboardData } = useData();

  return (
    <div
      className={`min-h-screen flex flex-col transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ─── BODY: SIDEBAR + MAIN CONTENT ─────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          {/* KPI Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { icon: <Users size={22} />, title: "Total Leads", value: dashboardData?.totalLeads?.toFixed(0) || 0 },
              { icon: <DollarSign size={22} />, title: "Total Ad Spend", value: `₹${dashboardData?.totalSpend?.toFixed(0) || 0}` },
              { icon: <DollarSign size={22} />, title: "Cost Per Lead (CPL)", value: `₹${dashboardData?.cpl?.toFixed(2) || 0}` },
              { icon: <MousePointerClick size={22} />, title: "Total Clicks", value: dashboardData?.clicks?.toFixed(0) || 0 },
              { icon: <Eye size={22} />, title: "Total Impressions", value: dashboardData?.impressions?.toFixed(0) || 0 },
              { icon: <Percent size={22} />, title: "Click-Through Rate (CTR)", value: `${(dashboardData?.ctr * 100 || 0).toFixed(1)}%` },
              { icon: <Target size={22} />, title: "Return on Investment (ROI)", value: `${dashboardData?.roi?.toFixed(1) || 0}%` },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl shadow-sm border transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-indigo-50"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.title}
                    </p>
                    <h3 className="text-2xl font-bold">{item.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ✅ Line Chart (Now showing real trendData) */}
            <div
              className={`h-80 rounded-2xl border p-2 ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              {dashboardData?.trendData?.length ? (
                <LineChart_LeadsSpend
                  data={dashboardData.trendData}
                  currencySymbol="₹"
                  dateFormat={(date) =>
                    new Date(date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })
                  }
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  📈 No data available for the selected period
                </div>
              )}
            </div>

            <div
  className={`h-80 rounded-2xl border p-2 ${
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  }`}
>
  {dashboardData?.platformBreakdown?.length ? (
    <BarChart_PlatformComparison
      data={dashboardData.platformBreakdown}
      currencySymbol="₹"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-gray-400">
      📊 No platform comparison data available
    </div>
  )}
</div>
          </section>

          <section className="mt-8">
  <LeadsTable data={dashboardData?.leadsList || []} />
</section>
          {/* Leads Table Section */}
          <section
            className={`rounded-2xl border overflow-hidden ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="p-4 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold">Platform Breakdown</h2>
            </div>
            <table className="w-full text-sm">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="py-3 px-4 text-left">Platform</th>
                  <th className="py-3 px-4 text-left">Leads</th>
                  <th className="py-3 px-4 text-left">Spend</th>
                  <th className="py-3 px-4 text-left">CPL</th>
                  <th className="py-3 px-4 text-left">CTR</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.platformBreakdown?.map((lead, i) => (
                  <tr
                    key={i}
                    className={`${
                      darkMode ? "hover:bg-gray-700/40" : "hover:bg-gray-50"
                    } border-b border-gray-700/30`}
                  >
                    <td className="py-3 px-4">{lead?.platform}</td>
                    <td className="py-3 px-4">{lead?.leads?.toFixed(0)}</td>
                    <td className="py-3 px-4">₹{lead?.spend?.toFixed(0)}</td>
                    <td className="py-3 px-4">₹{lead?.cpl?.toFixed(1)}</td>
                    <td className="py-3 px-4">{(lead?.ctr * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
