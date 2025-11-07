import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

// ✅ Helper function to check if JWT is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload)); // decode JWT payload
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime; // true if expired
  } catch (err) {
    console.error("Error decoding token:", err);
    return true;
  }
};

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dealerShip, setDealerShip] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const navigate = useNavigate();
  const Dealer_Url = "http://localhost:501/dealer";
  const API_Dealer_Url = "http://localhost:501";

  // ✅ LOGIN FUNCTION
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Dealer_Url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        await fetchUserProfile(data.token);
        await fetchDashboardSummary(data.token);
      } else {
        throw new Error("Invalid login response from server");
      }

      return true;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH PROFILE
  const fetchUserProfile = async (authToken = token) => {
    if (!authToken) return;
    try {
      setLoading(true);
      const response = await fetch(`${Dealer_Url}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

      setUser(
        data.dealerName
          ? data.dealerName.charAt(0).toUpperCase() + data.dealerName.slice(1).toLowerCase()
          : "USER"
      );
      setDealerShip(
        data.dealershipName
          ? data.dealershipName.charAt(0).toUpperCase() + data.dealershipName.slice(1).toLowerCase()
          : "USER"
      );

      localStorage.setItem("dealerId", data._id);
      localStorage.setItem("user", JSON.stringify(data.dealerName));
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH DASHBOARD SUMMARY (supports filters)
  const fetchDashboardSummary = async (authToken = token, filter = "last7days") => {
    if (!authToken) return;
    try {
      setLoading(true);
      const dealerId = localStorage.getItem("dealerId");

      const response = await fetch(
        `${API_Dealer_Url}/dashboard/summary?dealerId=${dealerId}&filter=${filter}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch dashboard summary");

      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = (reason = "manual") => {
    if (reason === "expired" && !sessionExpired) {
      setSessionExpired(true);
      alert("⚠️ Your session has expired. Please log in again.");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("dealerId");
    setToken(null);
    setUser(null);
    setDashboardData(null);
    navigate("/login", { replace: true });
  };

  // ✅ Auto-fetch profile + dashboard on load
  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
      fetchDashboardSummary(token);
    }
  }, [token]);

  // ✅ Global auto-logout on token expiry (works on every route)
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        console.error("⏰ Token expired. Auto logging out...");
        logout("expired");
      }
     }, 24 * 60 * 60 * 1000); // ✅ Check every 1 day (24h)
    return () => clearInterval(interval);
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        user,
        dealerShip,
        token,
        loading,
        error,
        login,
        logout,
        fetchUserProfile,
        fetchDashboardSummary,
        dashboardData,
        setDashboardData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
