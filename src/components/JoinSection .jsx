import React from "react";
import { useTheme } from "../context/ThemeContext";

const JoinSection = () => {
  const { isDark } = useTheme();

  return (
    <div className={`py-16 px-4 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div className={`text-center border border-[#21f201] rounded-[32px] border-solid p-8 ${
        isDark ? "bg-landing-color" : "bg-gray-50"
      }`}>
        <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-3xl font-bold font-space mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          <span className="text-[#21f201]">Join</span> DFS SimuChain Today!
        </h2>
        <p className={`text-[1.25rem] leading-[1.75rem] font-medium mb-8 font-space ${
          isDark ? "text-[#C4C5CB]" : "text-gray-600"
        }`}>
          Join your community to the DFS SimuChain, or create your own token.
        </p>
        <a
          href="#"
          className={`inline-block bg-transparent border-2 border-[#21f201] py-2 px-8 rounded-lg hover:bg-[#21f201] hover:text-black transition duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Issue Coin
        </a>
      </div>
    </div>
  );
};

export default JoinSection;
