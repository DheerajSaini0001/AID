import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Try localStorage, then system preference, then default false
  const getInitial = () => {
    try {
      const stored = localStorage.getItem("aid_theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;

      // If nothing stored, follow system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      }
    } catch (e) {
      // ignore
    }
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitial);

  // Apply/remove class on documentElement and persist
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("aid_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("aid_theme", "light");
    }
  }, [darkMode]);

  // Optional: listen to system theme changes and adopt if user hasn't explicitly chosen
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handler = (e) => {
      // Only change if there is no explicit localStorage choice
      const stored = localStorage.getItem("aid_theme");
      if (stored !== "dark" && stored !== "light") {
        setDarkMode(e.matches);
      }
    };

    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);

  const toggleTheme = () => setDarkMode((v) => !v);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
