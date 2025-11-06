import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Facebook,
  Instagram,
  Linkedin,
  Music,
  Globe,
} from "lucide-react"; // ✅ Only using Lucide icons
import MetaConnect from "../components/MetaConnect";
import GoogleConnect from "../components/GoogleConnect";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const { logout, user,dashboardData } = useData();

  const handleLogout = () => {
    logout();
  };

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
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { icon: <Users size={22} />, title: "Total Leads", value: "1,245" },
              
              { icon: <DollarSign size={22} />, title: "Spend", value: "$84,230" },
              { icon: <Target size={22} />, title: "CPL", value:"$"+(84230 / 1245).toFixed(2)  },
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
            {/* Line Chart Placeholder */}
            <div
              className={`h-80 rounded-2xl border flex items-center justify-center ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <p className="text-gray-400">
                📈 Line Chart (Performance Over Time)
              </p>
            </div>

            {/* Bar Chart Placeholder */}
            <div
              className={`h-80 rounded-2xl border flex items-center justify-center ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <p className="text-gray-400">📊 Bar Chart (Leads by Source)</p>
            </div>
          </section>

          {/* Leads Table Section */}
          <section
            className={`rounded-2xl border overflow-hidden ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="p-4 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold">Recent Leads</h2>
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
                  <th className="py-3 px-4 text-left">Lead Name</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Source</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "John Carter",
                    status: "Closed",
                    source: "Google Ads",
                    date: "2025-11-02",
                  },
                  {
                    name: "Ava Patel",
                    status: "Pending",
                    source: "Facebook",
                    date: "2025-11-03",
                  },
                  {
                    name: "Rohan Mehta",
                    status: "New",
                    source: "Website",
                    date: "2025-11-04",
                  },
                ].map((lead, i) => (
                  <tr
                    key={i}
                    className={`${
                      darkMode ? "hover:bg-gray-700/40" : "hover:bg-gray-50"
                    } border-b border-gray-700/30`}
                  >
                    <td className="py-3 px-4">{lead.name}</td>
                    <td className="py-3 px-4">{lead.status}</td>
                    <td className="py-3 px-4">{lead.source}</td>
                    <td className="py-3 px-4">{lead.date}</td>
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
