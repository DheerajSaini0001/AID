import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

/**
 * BarChart_PlatformComparison.jsx
 * ------------------------------------------
 * Multi-bar chart comparing Leads, Spend, and CPL by platform.
 *
 * Props:
 * - data: Array of objects [{ platform, leads, spend, cpl }]
 * - currencySymbol: string ('₹' by default)
 */

const BarChart_PlatformComparison = ({ data = [], currencySymbol = "₹" }) => {
  const { darkMode } = useTheme();

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        📊 No platform comparison data available
      </div>
    );
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-xl shadow-md border text-sm ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <p className="font-semibold">{label}</p>
          <p>Leads: <strong>{item.leads}</strong></p>
          <p>Spend: <strong>{currencySymbol}{item.spend.toLocaleString()}</strong></p>
          <p>CPL: <strong>{currencySymbol}{item.cpl.toFixed(2)}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex justify-between items-start mb-2 px-2">
        <div>
          <h3 className="text-base font-semibold">Platform Comparison</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Compare Leads, Ad Spend, and CPL across platforms
          </p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          Bars: Leads (Blue), Spend (Green), CPL (Orange)
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          barGap={6}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
            vertical={false}
          />
          <XAxis
            dataKey="platform"
            tick={{ fontSize: 12, fill: darkMode ? "#9CA3AF" : "#4B5563" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: darkMode ? "#9CA3AF" : "#4B5563" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          {/* Leads Bar */}
          <Bar
            dataKey="leads"
            name="Leads"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />

          {/* Spend Bar */}
          <Bar
            dataKey="spend"
            name={`Spend (${currencySymbol})`}
            fill="#10B981"
            radius={[4, 4, 0, 0]}
          />

          {/* CPL Bar */}
          <Bar
            dataKey="cpl"
            name={`CPL (${currencySymbol})`}
            fill="#F59E0B"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart_PlatformComparison;
