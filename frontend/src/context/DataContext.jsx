import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const Navigate=useNavigate();
  const BASE_URL = "http://localhost:501/dealer";

  // ✅ LOGIN FUNCTION
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        await fetchUserProfile(data.token);
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

      const response = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      // Adjust based on backend response fields
      setUser(data.dealerName?.toUpperCase() || data.name || "USER");

      localStorage.setItem("dealerId", data._id);
      localStorage.setItem("user", JSON.stringify(data.dealerName));
    } catch (err) {
      console.error("Profile fetch error:", err);
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
    Navigate("/",{replace:true})
  };

  // ✅ LOAD PROFILE ON START
  useEffect(() => {
    if (token && !user) {
      fetchUserProfile(token);
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
