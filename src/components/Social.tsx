'use client'

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import {
  FaTelegramPlane,
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaChrome,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const Social: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <header className={`sm:px-24 px-4 py-3 flex flex-col sm:gap-0 gap-8 sm:flex-row sm:items-center sm:justify-between border-y border-solid transition-colors duration-300 ${
      isDark 
        ? "bg-[#181A1E] border-[#1E2026]" 
        : "bg-gray-50 border-gray-200"
    }`}>
      {/* Logo */}
      <a
        data-theme={isDark ? "dark" : "light"}
        href="#"
        target="_self"
        className="bg-transparent cursor-pointer"
      >
        <img 
          src="/logo.png" 
          alt="logo" 
          className="md:w-40 w-32 brightness-0"
        />
      </a>

      {/* Social Icons */}
      <div className={`flex flex-wrap sm:flex-nowrap justify-start sm:justify-end gap-4 text-lg ${
        isDark ? "text-gray-400" : "text-gray-500"
      }`}>
        <div className="relative">
          <img src="/twitter.svg" alt="Twitter" className={`w-4 h-4 ${!isDark ? "opacity-60" : ""}`}></img>
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaTelegramPlane />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[12px] top-[-6px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaDiscord />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaGithub />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
          <FaGlobe />
        </div>{" "}
        <div className="relative">
          <FaChrome />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaYoutube />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaLinkedin />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaInstagram />
          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
        <div className="relative">
          <FaFacebook />

          <svg
            width="12"
            height="12"
            viewBox="0 0 100 100"
            className="absolute left-[10px] top-[-5px] opacity-65"
          >
            <g stroke="red" strokeWidth="10" strokeLinecap="round">
              <line x1="50" y1="10" x2="50" y2="90" />
              <line x1="15" y1="30" x2="85" y2="70" />
              <line x1="85" y1="30" x2="15" y2="70" />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Social;
