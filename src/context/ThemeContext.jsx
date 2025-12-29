import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// Theme configurations
export const themes = {
  dark: {
    name: "dark",
    colors: {
      // Backgrounds
      bgPrimary: "#0B0E11",
      bgSecondary: "#181A1E",
      bgTertiary: "#1a1d23",
      bgHover: "#1a1d23",
      
      // Text
      textPrimary: "#FFFFFF",
      textSecondary: "#9CA3AF",
      textMuted: "#6B7280",
      
      // Borders
      borderPrimary: "#374151",
      borderSecondary: "#4B5563",
      
      // Accent
      accent: "#21f201",
      accentHover: "#1ad901",
      accentMuted: "rgba(33, 242, 1, 0.1)",
      
      // Status colors
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      
      // Cards
      cardBg: "#181A1E",
      cardBorder: "#374151",
    },
    classes: {
      bgPrimary: "bg-[#0B0E11]",
      bgSecondary: "bg-[#181A1E]",
      bgTertiary: "bg-[#1a1d23]",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      borderPrimary: "border-gray-700",
      borderSecondary: "border-gray-600",
    }
  },
  light: {
    name: "light",
    colors: {
      // Backgrounds
      bgPrimary: "#FFFFFF",
      bgSecondary: "#F9FAFB",
      bgTertiary: "#F3F4F6",
      bgHover: "#E5E7EB",
      
      // Text
      textPrimary: "#111827",
      textSecondary: "#4B5563",
      textMuted: "#9CA3AF",
      
      // Borders
      borderPrimary: "#E5E7EB",
      borderSecondary: "#D1D5DB",
      
      // Accent
      accent: "#16A34A",
      accentHover: "#15803D",
      accentMuted: "rgba(22, 163, 74, 0.1)",
      
      // Status colors
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      
      // Cards
      cardBg: "#FFFFFF",
      cardBorder: "#E5E7EB",
    },
    classes: {
      bgPrimary: "bg-white",
      bgSecondary: "bg-gray-50",
      bgTertiary: "bg-gray-100",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-600",
      textMuted: "text-gray-400",
      borderPrimary: "border-gray-200",
      borderSecondary: "border-gray-300",
    }
  }
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Always use light theme
  const theme = "light";
  const [mounted, setMounted] = useState(false);

  // Get current theme configuration
  const currentTheme = themes[theme];

  // Toggle function (no-op, kept for compatibility)
  const toggleTheme = () => {
    // No-op: theme is always light
  };

  // Set specific theme (no-op, kept for compatibility)
  const setSpecificTheme = (themeName) => {
    // No-op: theme is always light
  };

  // Always return false for isDark
  const isDark = false;

  // Update document class for global styles
  useEffect(() => {
    setMounted(true);
    localStorage.setItem("dfs-theme", "light");
    
    // Update document class for global styles
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add("light");
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#FFFFFF");
    }
  }, []);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark,
    colors: currentTheme.colors,
    classes: currentTheme.classes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;


