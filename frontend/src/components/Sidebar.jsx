import React from "react";
import { NavLink, replace, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ClipboardList,
  DollarSign,
  FileText,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../context/DataContext";

const Sidebar = ({ isOpen = true, onToggle }) => {
  const { darkMode } = useTheme();
  const {user}=useData();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "Leads", icon: <ClipboardList size={18} />, path: "/leads" },
    { name: "ROI", icon: <DollarSign size={18} />, path: "/roi" },
    { name: "Reports", icon: <FileText size={18} />, path: "/reports" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("aid_token");
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } hidden md:flex flex-col justify-between border-r transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-200"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* ─── Top Section (Dealer Info) ───────────────────────────── */}
      <div className="flex flex-col items-center py-6 px-3">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full border-2 mb-3 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Dealer Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {isOpen && (
            <>
              <h3 className="font-semibold text-base">{user}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dealer</p>
            </>
          )}
        </div>

        {/* Divider */}
        <div
          className={`w-full mt-4 border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        />
      </div>

      {/* ─── Navigation Links ───────────────────────────────────── */}
      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700"
                  : darkMode
                  ? "hover:bg-gray-800 hover:text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ─── Bottom Section (Logout) ─────────────────────────────── */}
      <div className="px-3 py-4 border-t mt-auto">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full gap-3 p-3 rounded-lg text-sm font-medium transition ${
            darkMode
              ? "hover:bg-gray-800 hover:text-red-400"
              : "hover:bg-gray-100 text-gray-700 hover:text-red-600"
          }`}
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
