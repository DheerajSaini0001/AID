import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Facebook, Linkedin, Globe, Music } from "lucide-react";

const ConnectAccounts = () => {
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [connected, setConnected] = useState({
    meta: false,
    google: false,
    linkedin: false,
    tiktok: false,
  });

  // ✅ Fetch connection status on load
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch("http://localhost:501/accounts/connected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setConnected(data);
    };
    fetchStatus();
  }, [token]);

  // OAuth Handlers
  const openAuth = async (url) => {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 space-x-8 text-sm font-medium">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500">1</div>
            <p className="mt-2">Connect Accounts</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`} />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 text-white">2</div>
            <p className="mt-2 text-gray-500">Sync Leads</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`} />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 text-white">3</div>
            <p className="mt-2 text-gray-500">Add Pixels</p>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h1 className="text-2xl font-semibold">Connect your ad accounts</h1>
          <p className="text-gray-500 text-sm">Choose the platforms where you run your ads.</p>
        </div>

        {/* Platforms */}
        <div className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Meta */}
          <button onClick={() => !connected.meta && openAuth("http://localhost:501/meta/connect")}>
            <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className="p-3 bg-blue-600 text-white rounded-md"><Facebook size={26} /></div>
              <div className="flex-1"><h3 className="font-semibold text-lg">Meta (Facebook & Instagram)</h3></div>
              <span className={`px-3 py-1 text-xs rounded-full ${connected.meta ? "bg-green-600" : "bg-pink-600"} text-white`}>
                {connected.meta ? "Connected" : "Connect"}
              </span>
            </div>
          </button>

          {/* Google */}
          <button onClick={() => !connected.google && openAuth("http://localhost:501/google/connect")}>
            <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className="p-3 bg-yellow-400 text-white rounded-md"><Globe size={26} /></div>
              <div className="flex-1"><h3 className="font-semibold text-lg">Google Ads</h3></div>
              <span className={`px-3 py-1 text-xs rounded-full ${connected.google ? "bg-green-600" : "bg-pink-600"} text-white`}>
                {connected.google ? "Connected" : "Connect"}
              </span>
            </div>
          </button>

          {/* LinkedIn */}
          <button onClick={() => !connected.linkedin && openAuth("http://localhost:501/linkedin/connect")}>
            <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className="p-3 bg-blue-500 text-white rounded-md"><Linkedin size={26} /></div>
              <div className="flex-1"><h3 className="font-semibold text-lg">LinkedIn Ads</h3></div>
              <span className={`px-3 py-1 text-xs rounded-full ${connected.linkedin ? "bg-green-600" : "bg-pink-600"} text-white`}>
                {connected.linkedin ? "Connected" : "Connect"}
              </span>
            </div>
          </button>

          {/* TikTok */}
          <button onClick={() => !connected.tiktok && openAuth("http://localhost:501/tiktok/connect")}>
            <div className={`p-6 rounded-xl border flex items-center gap-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className="p-3 bg-pink-500 text-white rounded-md"><Music size={26} /></div>
              <div className="flex-1"><h3 className="font-semibold text-lg">TikTok Ads</h3></div>
              <span className={`px-3 py-1 text-xs rounded-full ${connected.tiktok ? "bg-green-600" : "bg-pink-600"} text-white`}>
                {connected.tiktok ? "Connected" : "Connect"}
              </span>
            </div>
          </button>
        </div>

        {/* ✅ Next Step Button */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <button
            onClick={() => window.location.href = "/dashboard/sync-leads"}
            disabled={!connected.meta && !connected.google && !connected.linkedin && !connected.tiktok}
            className={`px-8 py-3 rounded-lg text-white font-medium transition ${
              !connected.meta && !connected.google && !connected.linkedin && !connected.tiktok
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-500"
            }`}
          >
            Next Step → Sync Leads
          </button>
        </div>

      </main>
    </div>
  );
};

export default ConnectAccounts;
