import React from "react";

const GoogleConnect = () => {
  const handleConnectGoogle = async () => {
    const token = localStorage.getItem("token");
    const dealerId = localStorage.getItem("dealerId");

    if (!token || !dealerId) {
      return alert("❌ Please login first.");
    }

    try {
      const res = await fetch(`http://localhost:501/google/connect?dealerId=${dealerId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Open Google Login Window
      } else {
        alert("❌ Something went wrong.");
      }
    } catch (err) {
      console.log("Google Connect Error:", err);
      alert("❌ Failed to start Google OAuth");
    }
  };

  return (
    <button
      onClick={handleConnectGoogle}
      className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
    >
      🔴 Connect Google Ads
    </button>
  );
};

export default GoogleConnect;
