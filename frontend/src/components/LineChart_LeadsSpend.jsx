import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

/**
 * LineChart_LeadsSpend Component
 * --------------------------------------------------
 * Displays trend of Leads & Ad Spend over time.
 * Props:
 *  - data: Array of { date, leads, spend }
 *  - currencySymbol: '₹' | '$' | etc.
 *  - dateFormat: Function for formatting X-axis labels
 */

const LineChart_LeadsSpend = ({
  data = [],
  currencySymbol = "₹",
  dateFormat = (d) => d,
}) => {
  const { darkMode } = useTheme();

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        📉 No trend data available
      </div>
    );
  }

  // ✅ Prepare value ranges
  const spendValues = data.map((d) => Number(d.spend) || 0);
  const leadsValues = data.map((d) => Number(d.leads) || 0);

  const maxSpend = Math.max(...spendValues, 0);
  const maxLeads = Math.max(...leadsValues, 0);

  const spendDomain = [0, Math.ceil(maxSpend * 1.15)];
  const leadsDomain = [0, Math.ceil(maxLeads * 1.15)];

  // ✅ Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const leads = payload.find((p) => p.dataKey === "leads")?.value || 0;
      const spend = payload.find((p) => p.dataKey === "spend")?.value || 0;
      return (
        <div
          className={`p-3 rounded-xl shadow-md border text-sm ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <p className="font-semibold">{dateFormat(label)}</p>
          <p className="mt-1">Leads: <strong>{leads}</strong></p>
          <p>Spend: <strong>{currencySymbol}{spend.toLocaleString()}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-2 px-2">
        <div>
          <h3 className="text-base font-semibold">Leads & Spend — Trend</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Over selected date range
          </p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          <div>Left Axis: Leads</div>
          <div>Right Axis: Spend</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey="date"
            tickFormatter={dateFormat}
            tick={{ fontSize: 11, fill: darkMode ? "#9CA3AF" : "#4B5563" }}
          />
          <YAxis
            yAxisId="left"
            domain={leadsDomain}
            tick={{ fontSize: 11, fill: darkMode ? "#9CA3AF" : "#4B5563" }}
            label={{
              value: "Leads",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fill: darkMode ? "#9CA3AF" : "#4B5563", fontSize: 11 },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={spendDomain}
            tickFormatter={(v) => `${currencySymbol}${v}`}
            tick={{ fontSize: 11, fill: darkMode ? "#9CA3AF" : "#4B5563" }}
            label={{
              value: "Spend",
              angle: 90,
              position: "insideRight",
              offset: 10,
              style: { fill: darkMode ? "#9CA3AF" : "#4B5563", fontSize: 11 },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={32} />
          <ReferenceLine y={0} stroke="#ccc" />

          {/* ✅ Leads Line (Blue) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="leads"
            name="Leads"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

          {/* ✅ Spend Line (Green) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spend"
            name={`Spend (${currencySymbol})`}
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart_LeadsSpend;
