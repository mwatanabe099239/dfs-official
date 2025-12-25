import React from "react";
import { useTheme } from "../context/ThemeContext";

const Migrate = () => {
  const { isDark } = useTheme();

  return (
    <div className={`px-4 md:pb-3 pb-3 sm:px-8 md:px-16 lg:px-24 pt-44 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div
        className={`h-auto flex flex-col lg:flex-row items-center justify-between rounded-[32px] p-8 ${
          isDark 
            ? "border-2 border-[#373943]" 
            : "border border-gray-200 bg-gray-50"
        }`}
        style={{
          boxShadow: isDark
            ? "0px 24px 64px 0px rgba(0, 0, 0, 0.48), 0px 4px 0px 0px #21f201"
            : "0px 8px 32px 0px rgba(0, 0, 0, 0.08), 0px 4px 0px 0px #21f201",
        }}
      >
        {/* Right Section: Image */}
        <div
          className="mt-8 lg:mt-0 w-full lg:w-[27rem] pr-8 pl-10"
          style={{
            background: isDark
              ? "radial-gradient(circle at 1px 1px, #373943 1px, #14151a 1px) 0 0/20px 20px"
              : "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px) 0 0/20px 20px",
          }}
        >
          <img
            src="/mig.png"
            alt="Rocket Image"
            className="w-full h-auto max-w-[24rem] max-h-[24rem]"
          />
        </div>

        {/* Left Section: Text and Button */}
        <div className="lg:w-1/2 text-start pl-0 lg:pl-24 mt-8 lg:mt-0">
          <h2 className={`text-[2.5rem] sm:text-[3rem] font-space leading-[3.5rem] font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Migration from Web3 to DFS SimuChain
          </h2>
          <p className={`text-[1.125rem] sm:text-[1.25rem] font-space leading-[1.75rem] mb-8 ${
            isDark ? "text-[#C4C5CB]" : "text-gray-600"
          }`}>
            DFS SimuChain aims to provide support and assistance to projects
            seeking to migrate from Web3 blockchains.
          </p>
          <a
            href="#"
            className={`w-full sm:w-auto text-center inline-block bg-transparent border-2 border-[#21f201] py-2 px-8 rounded-lg hover:bg-[#21f201] hover:text-black transition duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            See Instructions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Migrate;
