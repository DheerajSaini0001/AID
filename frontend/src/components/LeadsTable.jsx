import React from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * LeadsTable.jsx
 * -------------------------------------------------
 * Displays individual leads with detailed info:
 * Date | Ad Name | Platform | Campaign | Lead Name | Source | Status
 *
 * Props:
 *  - data: Array of leads
 *    [
 *      {
 *        date: "2025-10-29T00:00:00.000Z",
 *        adName: "Corolla Offer",
 *        platform: "Facebook",
 *        campaign: "FB_Campaign_1",
 *        leadName: "John D.",
 *        source: "Form",
 *        status: "New"
 *      }
 *    ]
 */

const LeadsTable = ({ data = [] }) => {
  const { darkMode } = useTheme();

  if (!data?.length) {
    return (
      <div
        className={`flex h-64 items-center justify-center text-gray-400 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-2xl border`}
      >
        🧾 No lead records available
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700/50" : "border-gray-200"
        }`}
      >
        <h2 className="text-lg font-semibold">Leads Table</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Detailed view of all leads with campaign, source & status
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead
            className={`${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Ad Name</th>
              <th className="py-3 px-4 text-left">Platform</th>
              <th className="py-3 px-4 text-left">Campaign</th>
              <th className="py-3 px-4 text-left">Lead Name</th>
              <th className="py-3 px-4 text-left">Source</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lead, i) => (
              <tr
                key={i}
                className={`border-b ${
                  darkMode
                    ? "border-gray-700/40 hover:bg-gray-700/30"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <td className="py-3 px-4">
                  {new Date(lead.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>
                <td className="py-3 px-4 font-medium">{lead.adName || "—"}</td>
                <td className="py-3 px-4">{lead.platform || "—"}</td>
                <td className="py-3 px-4">{lead.campaign || "—"}</td>
                <td className="py-3 px-4">{lead.leadName || "—"}</td>
                <td className="py-3 px-4">{lead.source || "—"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "Converted"
                        ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300"
                        : lead.status === "New"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {lead.status || "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
