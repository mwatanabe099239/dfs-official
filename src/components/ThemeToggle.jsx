import React from "react";
import { useTheme } from "../context/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-300 ${
        isDark 
          ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <HiOutlineSun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark 
              ? "opacity-0 rotate-90 scale-0" 
              : "opacity-100 rotate-0 scale-100"
          }`} 
        />
        {/* Moon Icon */}
        <HiOutlineMoon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-0"
          }`} 
        />
      </div>
    </button>
  );
};

// Alternative switch-style toggle
export const ThemeSwitch = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Toggle Circle */}
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <HiOutlineMoon className="w-4 h-4 text-gray-700" />
        ) : (
          <HiOutlineSun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

// Minimal icon-only toggle
export const ThemeIconToggle = ({ size = "md", className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 hover:bg-gray-700/50 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <HiOutlineMoon className={`${sizeClasses[size]} text-yellow-400`} />
      ) : (
        <HiOutlineSun className={`${sizeClasses[size]} text-yellow-500`} />
      )}
    </button>
  );
};

export default ThemeToggle;


