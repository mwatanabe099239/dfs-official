import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const ResourceCard = ({ title, description, icon }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col gap-2 md:text-start text-center p-6 rounded-3xl shadow-lg transition-all duration-300 ${
      isDark 
        ? "bg-[#181A1E] text-white hover:bg-gray-800" 
        : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
    }`}>
      <div className="flex p-7 md:pl-0 justify-center md:justify-start">
        <img 
          src={icon} 
          alt="resource" 
          className={`w-8 h-8 ${!isDark ? "opacity-80" : ""}`}
        />
      </div>
      <h3 className="md:text-2xl text-lg md:font-bold mb-2">{title}</h3>
      <p className={`hidden md:block text-[14px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};

export default ResourceCard;
