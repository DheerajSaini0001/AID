import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { UserPlus, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // ✅ State for all fields
  const [dealershipName, setDealershipName] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Signup with Fetch API
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:501/dealer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dealershipName,
          dealerName,
          email,
          phone,
          password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response. Please try again.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Signup failed. Please try again.");
      }

      alert("Signup successful! Please login.");
      navigate("/login",{replace:true});
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl border transition-all ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6 text-indigo-600" />
            Dealer Signup
          </h1>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Register your dealership to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Dealership Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Dealership Name
            </label>
            <input
              type="text"
              value={dealershipName}
              onChange={(e) => setDealershipName(e.target.value)}
              placeholder="Enter dealership name"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
          </div>

          {/* Dealer Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Dealer Name
            </label>
            <input
              type="text"
              value={dealerName}
              onChange={(e) => setDealerName(e.target.value)}
              placeholder="Enter dealer name"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 focus:ring-indigo-400"
              }`}
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Already have account */}
        <p
          className={`text-center text-sm mt-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login",{replace:true})}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
