import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <nav className={`py-4 transition-colors duration-300 ${
      isDark ? "bg-[#181A1E] text-white" : "bg-white text-gray-900 border-b border-gray-200"
    }`}>
      <div className="flex items-center justify-between md:px-20 px-5">
        {/* Logo */}
        <Link
          to="/"
          className="bg-transparent cursor-pointer"
        >
          <img 
            src="/logo.png" 
            alt="logo" 
            className={`md:w-40 w-32 ${!isDark ? "brightness-0" : ""}`}
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle - Mobile */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? "hover:bg-gray-700 text-yellow-400" 
                : "hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <HiOutlineMoon className="w-5 h-5" />
            ) : (
              <HiOutlineSun className="w-5 h-5" />
            )}
          </button>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 ${
              isDark 
                ? "text-gray-400 hover:bg-gray-700 focus:ring-gray-600" 
                : "text-gray-500 hover:bg-gray-100 focus:ring-gray-200"
            }`}
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Right side buttons - Desktop */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex items-center space-x-4 md:flex-row">
            {/* Theme Toggle - Desktop */}
            <li>
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <HiOutlineMoon className="w-5 h-5" />
                ) : (
                  <HiOutlineSun className="w-5 h-5" />
                )}
              </button>
            </li>
            <li>
              <a
                href="#contact"
                className={`block text-sm font-medium py-2 px-4 rounded-lg border transition-colors ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-black" 
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {t("common.contactUs")}
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className={`block text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {t("common.getStarted")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
