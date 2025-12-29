import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="py-4 transition-colors duration-300 bg-white text-gray-900 border-b border-gray-200">
      <div className="flex items-center justify-between md:px-20 px-5">
        {/* Logo */}
        <Link
          to="/"
          className="bg-transparent cursor-pointer"
        >
          <img 
            src="/logo.png" 
            alt="logo" 
            className="md:w-40 w-32 brightness-0"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-500 hover:bg-gray-100 focus:ring-gray-200"
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
            <li>
              <a
                href="#contact"
                className="block text-sm font-medium py-2 px-4 rounded-lg border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
              >
                {t("common.contactUs")}
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className="block text-sm font-medium py-2 px-4 rounded-lg transition-colors bg-gray-900 text-white hover:bg-gray-800"
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
