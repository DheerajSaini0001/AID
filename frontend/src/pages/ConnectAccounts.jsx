import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Facebook, Linkedin, Globe, Music } from "lucide-react";

const ConnectAccounts = () => {
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");
  const dealerId = localStorage.getItem("dealerId");

  // ✅ Facebook / Meta OAuth
  const handleConnectMeta = async () => {
    const res = await fetch(`http://localhost:501/meta/connect?dealerId=${dealerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  // ✅ LinkedIn OAuth
  const handleConnectLinkedIn = async () => {
    const res = await fetch(`http://localhost:501/linkedin/connect?dealerId=${dealerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  // ✅ Google Ads OAuth
  const handleConnectGoogle = async () => {
    const res = await fetch(`http://localhost:501/google/connect?dealerId=${dealerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  // ✅ TikTok OAuth
  const handleConnectTikTok = async () => {
    const res = await fetch(`http://localhost:501/tiktok/connect?dealerId=${dealerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div
      className={`min-h-screen flex transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10 space-x-8 text-sm font-medium">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-pink-500 flex items-center justify-center text-pink-500">
              1
            </div>
            <p className="mt-2">Connect Accounts</p>
          </div>
          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <p className="mt-2 text-gray-500">Sync Leads</p>
          </div>

          <div className={`w-16 h-[2px] ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
            <p className="mt-2 text-gray-500">Add Pixels</p>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">
            Connect your ad accounts to start syncing campaigns and leads
          </h1>
          <p className="text-gray-500 text-sm">
            Choose the ad platform where you run your campaigns. You can connect multiple
            accounts for deeper tracking and automation.
          </p>

          <div className="mt-4 text-sm text-gray-400">
            Need help getting started?
            <button
              className={`ml-2 px-4 py-1 rounded-full text-white text-xs font-medium ${
                darkMode
                  ? "bg-pink-700 hover:bg-pink-600"
                  : "bg-pink-600 hover:bg-pink-500"
              }`}
            >
              ✨ Open Helper
            </button>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="max-w-3xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ✅ Meta */}
          <button onClick={handleConnectMeta}>
            <div
              className={`p-6 rounded-xl border flex items-center gap-4 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="p-3 bg-blue-600 text-white rounded-md">
                <Facebook size={26} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Meta (Facebook & Instagram)</h3>
                <p className="text-sm text-gray-500">
                  Connect your Facebook & Instagram ad accounts to manage campaigns and sync leads
                  directly into your dashboard.
                </p>
              </div>
            </div>
          </button>

          {/* ✅ Google Ads */}
          <button onClick={handleConnectGoogle}>
            <div
              className={`p-6 rounded-xl border flex items-center gap-4 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="p-3 bg-yellow-400 text-white rounded-md">
                <Globe size={26} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Google Ads</h3>
                <p className="text-sm text-gray-500">
                  Connect your Google Ads account to track conversions, manage ad spend, and
                  receive up to <strong>$500 ad credit</strong> for new accounts.
                </p>
              </div>
            </div>
          </button>

          {/* ✅ LinkedIn Ads */}
          <button onClick={handleConnectLinkedIn}>
            <div
              className={`p-6 rounded-xl border flex items-center gap-4 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="p-3 bg-blue-500 text-white rounded-md">
                <Linkedin size={26} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">LinkedIn Ads</h3>
                <p className="text-sm text-gray-500">
                  Target professionals and sync leads from your LinkedIn ad campaigns directly
                  into your CRM in real-time.
                </p>
              </div>
            </div>
          </button>

          {/* ✅ TikTok Ads */}
          <button onClick={handleConnectTikTok}>
            <div
              className={`p-6 rounded-xl border flex items-center gap-4 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="p-3 bg-pink-500 text-white rounded-md">
                <Music size={26} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">TikTok Ads</h3>
                <p className="text-sm text-gray-500">
                  Reach younger audiences and sync your TikTok ad leads instantly with your
                  connected CRM tools.
                </p>
              </div>
            </div>
          </button>

        </div>
      </main>
    </div>
  );
};

export default ConnectAccounts;
