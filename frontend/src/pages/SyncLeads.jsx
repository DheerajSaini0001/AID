import React, { useEffect, useState } from "react";
import Select from "react-select";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Facebook, Linkedin, Globe, Music } from "lucide-react";

const SyncLeads = () => {
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [autoSync, setAutoSync] = useState(false);

  // ✅ Fetch Connected Accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch("http://localhost:501/lead/accounts/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // Convert accounts to select options
      const formatted = data.map(acc => ({
        value: acc.id,
        label: `${acc.platform.toUpperCase()} — ${acc.name || acc.id}`,
        platform: acc.platform,
      }));

      setAccounts(formatted);
    };
    fetchAccounts();
  }, [token]);

  // ✅ Manual Sync
  const handleSyncNow = async () => {
    if (selectedAccounts.length === 0) return alert("Select at least one account!");

    await fetch(`http://localhost:501/lead/leads/sync`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ accounts: selectedAccounts.map(a => a.value) }),
    });

    alert("✅ Leads synced successfully!");
  };

  // ✅ Auto Sync Toggle
  const handleAutoSyncToggle = async () => {
    const newValue = !autoSync;
    setAutoSync(newValue);

    await fetch(`http://localhost:501/lead/leads/auto-sync?enable=${newValue}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  // Styling for react-select depending on dark/light mode
  const selectStyles = {
    control: (base) => ({
      ...base,
      background: darkMode ? "#1f2937" : "#fff",
      borderColor: darkMode ? "#374151" : "#d1d5db",
      color: darkMode ? "white" : "black",
    }),
    menu: (base) => ({
      ...base,
      background: darkMode ? "#111827" : "#fff",
      color: darkMode ? "white" : "black",
    }),
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10 space-x-8 text-sm font-medium">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center">✓</div>
            <p className="mt-2">Connect Accounts</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`} />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500">2</div>
            <p className="mt-2">Sync Leads</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`} />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center">3</div>
            <p className="mt-2">Add Pixels</p>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h1 className="text-2xl font-semibold">Sync Your Leads</h1>
          <p className="text-gray-500 text-sm">
            Select one or multiple accounts to sync leads from.
          </p>
        </div>

        {/* Multi Select */}
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
          <h2 className="text-lg font-medium">Select Ad Accounts</h2>
          <Select
            isMulti
            styles={selectStyles}
            options={accounts}
            value={selectedAccounts}
            onChange={setSelectedAccounts}
            placeholder="Search and select multiple accounts..."
          />
        </div>

        {/* Auto Sync */}
        <div className={`max-w-3xl mx-auto mt-6 flex items-center justify-between p-4 rounded-xl border 
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div>
            <h3 className="font-medium">Auto Sync Leads</h3>
            <p className="text-sm text-gray-500">Automatically sync leads every 10 minutes.</p>
          </div>

          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="hidden" checked={autoSync} onChange={handleAutoSyncToggle} />
            <span className={`w-12 h-6 flex items-center rounded-full p-1 transition ${autoSync ? "bg-pink-600" : "bg-gray-400"}`}>
              <span className={`w-4 h-4 bg-white rounded-full shadow transform transition ${autoSync ? "translate-x-6" : ""}`}></span>
            </span>
          </label>
        </div>

        {/* Sync Now Button */}
        <div className="max-w-3xl mx-auto text-center mt-10">
          <button
            onClick={handleSyncNow}
            disabled={selectedAccounts.length === 0}
            className={`px-8 py-3 rounded-lg text-white font-medium transition ${
              selectedAccounts.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-500"
            }`}
          >
            Sync Now
          </button>
        </div>

        {/* Next Step */}
        <div className="max-w-3xl mx-auto text-center mt-6">
          <button
            onClick={() => window.location.href = "/dashboard/add-pixels"}
            className="text-pink-600 hover:text-pink-500 underline"
          >
            Next Step → Add Pixels
          </button>
        </div>

      </main>
    </div>
  );
};

export default SyncLeads;
