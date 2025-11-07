import React, { useState, useRef, useEffect } from "react";
import { Menu, Sun, Moon, Bell, LogOut,CircleUserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [notifCount] = useState(3);
  const { user,logout } = useData();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    logout(); // or aid_token, depending on your app
    navigate("/",{replace:true});
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-sm border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`p-2 rounded-lg lg:hidden ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Menu size={22} />
        </button>

        <Link replace to="/">
          <h2 className="text-xl font-semibold tracking-tight">
            AutoLead <span className="text-indigo-600">Intelligence</span>
          </h2>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
     

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

  {user&& <div className="relative" ref={menuRef}>
          <div
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CircleUserRound size={25} />
            <div className="hidden md:block">
             <p className="text-[12px]">Hi , {user}</p>
      
            </div>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
             
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-700"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
              
            </div>
          )}
        </div>}      {/* User Avatar + Dropdown */}
       
      </div>
    </nav>
  );
};

export default Navbar;
