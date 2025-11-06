import React from "react";
import { ArrowRight, BarChart3, Sparkles, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`flex flex-col h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900"
      }`}
    >
    

      {/* Main Content (fits content naturally) */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6  ">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <Sparkles className="text-yellow-500 w-7 h-7 mr-2" />
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Smart Dealer Intelligence Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6">
          Automate. Analyze. Accelerate.
        </h1>

        <p
          className={`max-w-2xl text-base md:text-lg mb-8 md:mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Empower your dealership with AI-powered lead tracking, ROI analytics,
          and smart performance dashboards — all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>

       
        </div>
      </main>

   
    </div>
  );
};

export default Home;
