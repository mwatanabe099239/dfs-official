'use client'

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const DeveloperPrograms: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`px-4 py-8 sm:py-12 md:py-16 sm:px-8 md:px-16 lg:px-24 md:pt-44 pt-12 sm:pt-20 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div
        className={`h-auto flex flex-col lg:flex-row items-center justify-between rounded-[32px] p-8 md:pr-0 border-t border-l border-r ${
          isDark 
            ? "border-[#373943] bg-[#181A1E]" 
            : "border-gray-300 bg-white"
        }`}
        style={{
          borderBottomWidth: '4px',
          borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
          boxShadow: isDark
            ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
            : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Left Section: Text and Button */}
        <div className="lg:w-1/2 text-start md:pl-14 flex flex-col items-start">
          <h2 className={`text-[32px] sm:text-[3rem] font-space leading-[3.5rem] font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Unlock Next-Level Development
          </h2>
          <p className={`text-[16px] sm:text-[1.25rem] font-space leading-[1.75rem] mb-8 ${
            isDark ? "text-[#C4C5CB]" : "text-gray-600"
          }`}>
            Request the apps you need to elevate your project. Enjoy grants,
            incentives, and additional support to bring your ideas to life. Turn
            vision into reality—faster than ever!
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <a
              href="#"
              className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${
                isDark 
                  ? "text-slate-300 border-white hover:bg-white hover:text-black" 
                  : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
              }`}
            >
              Make a Request
            </a>
          </div>
        </div>

        {/* Right Section: Image */}
        <div
          className="mt-8 lg:mt-0 w-full lg:w-[28rem]"
          style={{
            background: isDark
              ? "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px"
              : "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px) 0 0/20px 20px",
          }}
        >
          <img
            src="/rocket.png"
            alt="Rocket Image"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperPrograms;
