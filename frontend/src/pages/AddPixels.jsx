import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const AddPixels = () => {
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    const fetchPixels = async () => {
      const res = await fetch("http://localhost:501/pixel/pixels", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPixels(data);
    };
    fetchPixels();
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("✅ Copied!");
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Sidebar />

      <main className="flex-1 p-10">

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 space-x-8 text-sm font-medium">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center">✓</div>
            <p className="mt-2">Connect Accounts</p>
          </div>

          <div className="w-20 h-[2px] bg-gray-500" />

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center">✓</div>
            <p className="mt-2">Sync Leads</p>
          </div>

          <div className="w-20 h-[2px] bg-gray-500" />

          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500">3</div>
            <p className="mt-2 font-bold text-pink-500">Add Pixels</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center">Add Your Tracking Pixels</h1>
        <p className="text-center text-gray-500 mt-2 mb-10">
          Use these Pixel IDs to track conversions across your ads.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {pixels.map((p, index) => (
            <div key={index} className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <h3 className="text-lg font-semibold uppercase">{p.platform}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="font-mono text-sm">{p.pixelId}</span>
                <button
                  onClick={() => copyToClipboard(p.pixelId)}
                  className="px-3 py-1 text-xs bg-pink-600 hover:bg-pink-500 rounded text-white"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Finish Button */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="px-8 py-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium"
          >
            Finish Setup ✅
          </button>
        </div>

      </main>
    </div>
  );
};

export default AddPixels;
