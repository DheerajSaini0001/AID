import React, { useState } from "react";
import { Menu, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
const Navbar = ({ onToggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [notifCount] = useState(3); // example notification badge
  const {user}=useData();
  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-sm border-b transition-all duration-300 ${
        darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onToggleSidebar}
          className={`p-2 rounded-lg lg:hidden ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Menu size={22} />
        </button>

       <Link replace to="/"> <h2 className="text-xl font-semibold tracking-tight">
          AutoLead <span className="text-indigo-600">Intelligence</span>
        </h2></Link>
        
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <div className="relative">
          <Bell
            size={22}
            className={`cursor-pointer ${
              darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          />
          {notifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifCount}
            </span>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-indigo-600" />
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Dealer Avatar"
            className="w-9 h-9 rounded-full border border-gray-300"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium">Hi, {user} 👋</p>
            <p className="text-xs text-gray-500">Dealer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
