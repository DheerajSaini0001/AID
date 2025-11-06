import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`w-full border-t  transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-400"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">
            AutoLead Intelligence
          </h2>
          <p className="text-sm">
            Empowering dealerships with AI-driven analytics & insights.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href="#"
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition`}
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="#"
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition`}
          >
            Terms of Service
          </a>
        </div>

        {/* Right Section - Socials */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:contact@autolead.ai"
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
          >
            <Mail
              size={18}
              className={darkMode ? "text-gray-300" : "text-gray-700"}
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
          >
            <Github
              size={18}
              className={darkMode ? "text-gray-300" : "text-gray-700"}
            />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
          >
            <Linkedin
              size={18}
              className={darkMode ? "text-gray-300" : "text-gray-700"}
            />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`text-center py-4 text-sm border-t ${
          darkMode
            ? "border-gray-800 text-gray-500"
            : "border-gray-200 text-gray-500"
        }`}
      >
        © {new Date().getFullYear()} AutoLead Intelligence — Made with{" "}
        <Heart
          size={14}
          className="inline text-red-500 mx-1 animate-pulse"
          strokeWidth={2}
          fill="currentColor"
        />{" "}
        by Dheeraj
      </div>
    </footer>
  );
};

export default Footer;
