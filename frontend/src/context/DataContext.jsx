import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dealerShip, setDealerShip] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false); // for API calls
  const [isAuthLoading, setIsAuthLoading] = useState(true); // ✅ new: for initial auth check
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

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

      // Format names
      setUser(
        data.dealerName
          ? data.dealerName.charAt(0).toUpperCase() + data.dealerName.slice(1).toLowerCase()
          : "USER"
      );
      setDealerShip(
        data.dealershipName
          ? data.dealershipName.charAt(0).toUpperCase() +
              data.dealershipName.slice(1).toLowerCase()
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

  // ✅ FETCH DASHBOARD SUMMARY
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

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("dealerId");
    setToken(null);
    setUser(null);
    setDashboardData(null);
    navigate("/",{ replace: true });
  };

  // ✅ INITIAL AUTH CHECK
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          await fetchUserProfile(token);
          await fetchDashboardSummary(token);
        } catch (error) {
          console.error("Auth init error:", error);
        }
      }
      setIsAuthLoading(false); // ✅ mark auth as checked (whether token exists or not)
    };

    initializeAuth();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        user,
        dealerShip,
        token,
        loading,
        isAuthLoading, // ✅ exposed to components
        error,
        login,
        logout,
        fetchUserProfile,
        fetchDashboardSummary,
        dashboardData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
