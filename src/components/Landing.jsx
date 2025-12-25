import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../css/Landing.css";

const Landing = () => {
  const { isDark } = useTheme();

  return (
    <div className={`first-section px-4 sm:pl-8 md:pl-16 lg:pl-20 ${!isDark ? "first-section-light" : ""}`}>
      <div className="relative flex flex-col justify-center text-center space-y-8 pt-32 sm:pt-48 md:pb-72 pb-28 items-start" style={{ zIndex: 10 }}>
        {/* Mainnet Status */}
        <div className={`flex items-center space-x-3 rounded-[40px] p-2 justify-center sm:justify-start ${
          isDark ? "bg-[#373943] text-white" : "bg-gray-100 text-gray-900 border border-gray-200"
        }`}>
          <div className="w-2 h-2 bg-[#53EAA1] rounded-[50%]"></div>
          <div className={`text-[14px] leading-[24px] font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            LAYER 0{" "}
            <span className={`text-[14px] leading-[24px] ${isDark ? "text-[#C4C5CB]" : "text-gray-500"}`}>
              {" "}
              IS LIVE
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="sm:text-[3rem] text-2xl font-bold text-[#21f201] font-zen">
          DFS Web Chain
        </h1>

        {/* Sub Heading */}
        <p className={`text-2xl sm:text-5xl font-space text-start max-w-3xl ${isDark ? "text-white" : "text-gray-900"}`}>
          Harnessing Cecentralization to Make the Impossible Possible
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:justify-center w-full md:w-[22rem]">
          <button className={`font-space py-2 px-6 rounded-lg transition duration-300 w-full ${
            isDark 
              ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}>
            Issue Coin
          </button>
          <button className={`font-space w-full bg-transparent border-2 py-2 px-6 rounded-lg transition duration-300 ${
            isDark 
              ? "text-slate-300 border-white hover:bg-white hover:text-black" 
              : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
          }`}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
