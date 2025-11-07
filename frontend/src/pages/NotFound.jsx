import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";


const NotFound = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const {user}=useData()
  
  

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-screen overflow-hidden transition-colors duration-500 ${
        darkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-950"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      }`}
    >
      {/* 🔵 Floating Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-56 h-56 bg-blue-500/30 blur-3xl rounded-full"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"
        animate={{ x: [0, -40, 40, 0], y: [0, 25, -25, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* ✨ Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`z-10 text-center p-10 shadow-2xl rounded-3xl border max-w-md mx-4 transition-all duration-300 ${
          darkMode 
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* ⚠️ Animated Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle className="text-yellow-500 w-20 h-20 drop-shadow-lg" />
        </motion.div>

        {/* 🌟 Animated 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-md mb-3"
        >
          404
        </motion.h1>

        <h2
          className={`text-2xl font-semibold mb-3 ${
            darkMode  ? "text-white" : "text-gray-800"
          }`}
        >
          Page Not Found
        </h2>
        <p
          className={`mb-8 ${
            darkMode  ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* 🟦 Animated Native Button */}
      {!user?  <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/",{replace:true})}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Go Back Login
        </motion.button>:  <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard",{replace:true})}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Go Back to Dashboard
        </motion.button>}
      
      </motion.div>


    </div>
  );
};

export default NotFound;
