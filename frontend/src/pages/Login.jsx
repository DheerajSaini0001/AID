import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // ✅ theme context
import { useData } from "../context/DataContext"; // ✅ data/login context

const Login = () => {
  const { darkMode, toggleTheme } = useTheme(); // ✅ added toggleTheme to use
  const navigate = useNavigate();
  const { login, loading, error } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      alert("✅ Logged in successfully!");
      navigate("/dashboard/connect-account",{replace:true});
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 🌙 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 px-3 py-2 rounded-full text-sm font-semibold shadow-md transition ${
          darkMode
            ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
            : "bg-white hover:bg-gray-100 text-indigo-600"
        }`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl border transition-all duration-500 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <LogIn className="w-6 h-6 text-indigo-600" />
            Dealer Login
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email Address"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Signup Option */}
        <p
          className={`text-center text-sm mt-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup",{replace:true})}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
