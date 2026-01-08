'use client'

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { HiOutlineCog } from 'react-icons/hi';

const CookiesPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const lastUpdated = 'December 26, 2025';

  const sections = [
    {
      title: t('cookies.sections.whatAreCookies.title'),
      content: t('cookies.sections.whatAreCookies.content')
    },
    {
      title: t('cookies.sections.howWeUse.title'),
      content: t('cookies.sections.howWeUse.content')
    },
    {
      title: t('cookies.sections.typesOfCookies.title'),
      content: t('cookies.sections.typesOfCookies.content')
    },
    {
      title: t('cookies.sections.specificCookies.title'),
      content: t('cookies.sections.specificCookies.content')
    },
    {
      title: t('cookies.sections.managingCookies.title'),
      content: t('cookies.sections.managingCookies.content')
    },
    {
      title: t('cookies.sections.cookieRetention.title'),
      content: t('cookies.sections.cookieRetention.content')
    },
    {
      title: t('cookies.sections.updates.title'),
      content: t('cookies.sections.updates.content')
    },
    {
      title: t('cookies.sections.contactUs.title'),
      content: t('cookies.sections.contactUs.content')
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${
        isDark 
          ? "bg-gradient-to-b from-[#0B0E11] via-[#0d1117] to-[#0B0E11]" 
          : "bg-gradient-to-b from-white via-gray-50 to-white"
      }`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineCog className="w-4 h-4" />
              {t('footer.sections.legal')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('cookies.title')} <span className="text-[#21f201]">{t('cookies.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('cookies.lastUpdated')}: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-xl border overflow-hidden ${
            isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="p-6 md:p-10">
              {/* Cookie Banner Info */}
              <div className={`mb-8 p-4 rounded-lg border-l-4 border-[#21f201] ${
                isDark ? "bg-gray-800/50" : "bg-gray-50"
              }`}>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <strong>{t('cookies.noteLabel')}:</strong> {t('cookies.note')}
                </p>
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className={`mb-8 pb-8 ${
                  idx !== sections.length - 1 
                    ? isDark ? "border-b border-gray-700" : "border-b border-gray-200"
                    : ""
                }`}>
                  <h2 className={`text-xl md:text-2xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {section.title}
                  </h2>
                  <div className={`prose max-w-none text-left ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {section.content.split('\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="mb-3 whitespace-pre-wrap leading-relaxed">
                        {paragraph.split('**').map((part, partIdx) => 
                          partIdx % 2 === 1 
                            ? <strong key={partIdx} className={isDark ? "text-white" : "text-gray-900"}>{part}</strong>
                            : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;


