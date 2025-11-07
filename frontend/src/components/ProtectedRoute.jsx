// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const ProtectedRoute = ({ children }) => {
  // Dono values ko context se lein
  const { user, isAuthLoading } = useData();

  // 1. Sabse pehle check karein ki kya app abhi bhi
  // initial auth check kar raha hai?
  if (isAuthLoading) {
    // Haan, abhi check kar raha hai, toh loading dikhayein
    return <div className="flex flex-col justify-center min-h-[100vh] items-center">Loading user...</div>; // Ya koi fancy spinner
  }

  // 2. Agar loading complete ho gayi hai,
  // ab check karein ki kya user hai?
  if (!user) {
    // Loading complete hai aur dealerShip nahi hai,
    // iska matlab user logged in nahi hai. Login par bhejein.
    return <Navigate to="/" replace />;
  }

  // 3. Loading complete hai aur dealerShip bhi hai.
  // Page dikhayein.
  return children;
};

export default ProtectedRoute;