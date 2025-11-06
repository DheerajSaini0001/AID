import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Facebook, Linkedin, Globe, Music } from "lucide-react";

const ConnectAccounts = () => {
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");
  const dealerId = localStorage.getItem("dealerId");

  const [connected, setConnected] = useState({
    meta: false,
    google: false,
    linkedin: false,
    tiktok: false,
  });

  // ✅ Fetch connected status when page loads
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:501/accounts/connected?dealerId=${dealerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setConnected(data);
      } catch (e) {
        console.log("Error fetching connection status");
      }
    };
    fetchStatus();
  }, [token, dealerId]);

  // ✅ Generic OAuth opener
  const openAuth = async (url) => {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.log("OAuth Error:", err);
    }
  };

  return (
    <div className={`min-h-screen flex transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>

      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-10 space-x-8 text-sm font-medium">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500">1</div>
            <p className="mt-2">Connect Accounts</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>2</div>
            <p className="mt-2 text-gray-500">Sync Leads</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>3</div>
            <p className="mt-2 text-gray-500">Add Pixels</p>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">Connect your ad accounts to start syncing campaigns and leads</h1>
          <p className="text-gray-500 text-sm">
            Choose the ad platforms where you run your campaigns.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Meta */}
          <button
            onClick={() => !connected.meta && openAuth(`http://localhost:501/meta/connect?dealerId=${dealerId}`)}
            disabled={connected.meta}
            className={`${connected.meta && "opacity-60 cursor-not-allowed"}`}
          >
            <div className={`p-6 rounded-xl border flex items-center gap-4 transition ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80" : "bg-white border-gray-200 hover:shadow-md"}`}>
              <div className="p-3 bg-blue-600 text-white rounded-md"><Facebook size={26} /></div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Meta (Facebook & Instagram)
                  {connected.meta && <span className="text-green-500 text-sm">✅ Connected</span>}
                </h3>
                <p className="text-sm text-gray-500">Sync leads from Facebook & Instagram.</p>
              </div>
            </div>
          </button>

          {/* Google */}
          <button
            onClick={() => !connected.google && openAuth(`http://localhost:501/google/connect?dealerId=${dealerId}`)}
            disabled={connected.google}
            className={`${connected.google && "opacity-60 cursor-not-allowed"}`}
          >
            <div className={`p-6 rounded-xl border flex items-center gap-4 transition ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80" : "bg-white border-gray-200 hover:shadow-md"}`}>
              <div className="p-3 bg-yellow-400 text-white rounded-md"><Globe size={26} /></div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Google Ads
                  {connected.google && <span className="text-green-500 text-sm">✅ Connected</span>}
                </h3>
                <p className="text-sm text-gray-500">Track conversions and spend.</p>
              </div>
            </div>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => !connected.linkedin && openAuth(`http://localhost:501/linkedin/connect?dealerId=${dealerId}`)}
            disabled={connected.linkedin}
            className={`${connected.linkedin && "opacity-60 cursor-not-allowed"}`}
          >
            <div className={`p-6 rounded-xl border flex items-center gap-4 transition ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80" : "bg-white border-gray-200 hover:shadow-md"}`}>
              <div className="p-3 bg-blue-500 text-white rounded-md"><Linkedin size={26} /></div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  LinkedIn Ads
                  {connected.linkedin && <span className="text-green-500 text-sm">✅ Connected</span>}
                </h3>
                <p className="text-sm text-gray-500">Sync B2B campaign leads instantly.</p>
              </div>
            </div>
          </button>

          {/* TikTok */}
          <button
            onClick={() => !connected.tiktok && openAuth(`http://localhost:501/tiktok/connect?dealerId=${dealerId}`)}
            disabled={connected.tiktok}
            className={`${connected.tiktok && "opacity-60 cursor-not-allowed"}`}
          >
            <div className={`p-6 rounded-xl border flex items-center gap-4 transition ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80" : "bg-white border-gray-200 hover:shadow-md"}`}>
              <div className="p-3 bg-pink-500 text-white rounded-md"><Music size={26} /></div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  TikTok Ads
                  {connected.tiktok && <span className="text-green-500 text-sm">✅ Connected</span>}
                </h3>
                <p className="text-sm text-gray-500">Reach Gen-Z & sync leads live.</p>
              </div>
            </div>
          </button>

        </div>

        {/* ✅ Next Step Button */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <button
            onClick={() => window.location.href = "/dashboard/sync-leads"}
            disabled={!Object.values(connected).includes(true)}
            className={`px-8 py-3 rounded-lg text-white font-medium transition ${
              !Object.values(connected).includes(true)
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
