import React from "react";

const MetaConnect = () => {
  const token = localStorage.getItem("token"); // Dealer login JWT

  // ✅ Start OAuth → Redirect to Meta Login
const handleConnectMeta = async () => {
  const token = localStorage.getItem("token");
  const dealerId = localStorage.getItem("dealerId"); // make sure you saved this at login
  
  const res = await fetch(`http://localhost:501/meta/connect?dealerId=${dealerId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  window.location.href = data.url; // ✅ opens Meta Login Page
};

  // ✅ Sync Data Manually (FB + IG)
  const handleSyncMeta = async () => {
    const res = await fetch("http://localhost:501/meta/sync/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col gap-4 items-center mt-8">
      <button
        onClick={handleConnectMeta}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        🔵 Connect Facebook + Instagram
      </button>

      <button
        onClick={handleSyncMeta}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        ♻️ Sync Meta Data
      </button>
    </div>
  );
};

export default MetaConnect;
