'use client'

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineBriefcase,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineGlobe,
  HiOutlineUserGroup,
  HiOutlineAcademicCap
} from 'react-icons/hi';

const CareersPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const benefits = [
    {
      icon: HiOutlineGlobe,
      title: t('careers.benefits.remoteFirst.title'),
      description: t('careers.benefits.remoteFirst.description')
    },
    {
      icon: HiOutlineClock,
      title: t('careers.benefits.flexibleHours.title'),
      description: t('careers.benefits.flexibleHours.description')
    },
    {
      icon: HiOutlineAcademicCap,
      title: t('careers.benefits.learningBudget.title'),
      description: t('careers.benefits.learningBudget.description')
    },
    {
      icon: HiOutlineHeart,
      title: t('careers.benefits.healthWellness.title'),
      description: t('careers.benefits.healthWellness.description')
    },
    {
      icon: HiOutlineLightBulb,
      title: t('careers.benefits.innovationTime.title'),
      description: t('careers.benefits.innovationTime.description')
    },
    {
      icon: HiOutlineUserGroup,
      title: t('careers.benefits.teamEvents.title'),
      description: t('careers.benefits.teamEvents.description')
    },
  ];

  const openPositions = [
    {
      title: t('careers.positions.moderator.title'),
      department: t('careers.positions.moderator.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.moderator.description')
    },
  ];

  const values = [
    t('careers.values.belief1'),
    t('careers.values.belief2'),
    t('careers.values.belief3'),
    t('careers.values.belief4'),
    t('careers.values.belief5'),
  ];

  const hiringSteps = [
    { step: '01', titleKey: 'careers.hiring.apply.title', descKey: 'careers.hiring.apply.description' },
    { step: '02', titleKey: 'careers.hiring.screen.title', descKey: 'careers.hiring.screen.description' },
    { step: '03', titleKey: 'careers.hiring.interview.title', descKey: 'careers.hiring.interview.description' },
    { step: '04', titleKey: 'careers.hiring.offer.title', descKey: 'careers.hiring.offer.description' },
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
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
          <div className={`absolute bottom-10 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-gray-400" : "bg-gray-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineBriefcase className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('careers.hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('careers.hero.title')}
              <span className="block text-[#21f201] mt-2">{t('careers.hero.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('careers.hero.subtitle')}
            </p>

            <div className="flex justify-center">
              <a 
                href="#positions"
                className={`font-space inline-flex items-center gap-2 py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {t('careers.hero.viewPositions')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Process */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-transparent"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.hiring.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('careers.hiring.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {hiringSteps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  isDark ? "text-gray-400/60" : "text-gray-400/50"
                }`}>{item.step}</div>
                <h3 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t(item.titleKey)}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Open Positions */}
      <div id="positions" className="px-6 md:px-8 lg:px-12 xl:px-16 py-16 scroll-mt-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.openPositions.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {openPositions.length} {t('careers.openPositions.available')}
            </p>
          </div>

          <div className="space-y-4">
            {openPositions.map((position, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border-l-2 pl-8 transition-all ${
                  isDark 
                    ? "bg-[#181A1E] border-[#A0AEC0] hover:bg-[#1a1d23]" 
                    : " border-gray-400 bg-gray-50"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-left">
                    <h3 className={`text-xl font-bold mb-2 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                      {position.title}
                    </h3>
                    <p className={`text-sm mb-3 text-left ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {position.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 justify-start">
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                      }`}>
                        <HiOutlineBriefcase className="w-3 h-3" />
                        {position.department}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                      }`}>
                        <HiOutlineLocationMarker className="w-3 h-3" />
                        {position.location}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                      }`}>
                        <HiOutlineClock className="w-3 h-3" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <a 
                      href="/contact"
                      className={`font-space inline-flex items-center justify-center gap-2 py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 whitespace-nowrap ${
                        isDark 
                          ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {t('careers.applyNow')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* CTA */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`rounded-2xl p-8 md:p-12 text-center border-t border-l border-r ${
              isDark 
                ? "bg-gradient-to-r from-[#181A1E] to-[#1a1d23] border-gray-800"
                : "bg-gradient-to-r from-gray-50 to-white border-gray-200"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <HiOutlineSparkles className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.cta.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('careers.cta.subtitle')}
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className={`font-space inline-flex items-center gap-2 py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {t('careers.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;


