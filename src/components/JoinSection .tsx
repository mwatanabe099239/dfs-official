'use client'

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const JoinSection: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div className={`text-center border-t border-l border-r border-gray-300 rounded-[32px] p-8 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}
      style={{
        borderBottomWidth: '4px',
        borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
        boxShadow: isDark
          ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
          : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
      }}>
        <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-3xl font-bold font-space mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          <span className="text-[#21f201]">{t('home.join.titleHighlight')}</span> {t('home.join.title')}
        </h2>
        <p className={`text-[1.25rem] leading-[1.75rem] font-medium mb-8 font-space ${
          isDark ? "text-[#C4C5CB]" : "text-gray-600"
        }`}>
          {t('home.join.description')}
        </p>
        <a
          href="#"
          className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block bg-transparent border ${
            isDark 
              ? "text-slate-300 border-white hover:bg-white hover:text-black" 
              : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
          }`}
        >
          {t('landing.hero.issueCoin')}
        </a>
      </div>
    </div>
  );
};

export default JoinSection;
