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

const CareersPage = () => {
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
      title: t('careers.positions.seniorBackend.title'),
      department: t('careers.positions.seniorBackend.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.seniorBackend.description')
    },
    {
      title: t('careers.positions.frontendDev.title'),
      department: t('careers.positions.frontendDev.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.frontendDev.description')
    },
    {
      title: t('careers.positions.productDesigner.title'),
      department: t('careers.positions.productDesigner.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.productDesigner.description')
    },
    {
      title: t('careers.positions.communityManager.title'),
      department: t('careers.positions.communityManager.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.communityManager.description')
    },
    {
      title: t('careers.positions.technicalWriter.title'),
      department: t('careers.positions.technicalWriter.department'),
      location: t('careers.remote'),
      type: t('careers.partTime'),
      description: t('careers.positions.technicalWriter.description')
    },
    {
      title: t('careers.positions.devOps.title'),
      department: t('careers.positions.devOps.department'),
      location: t('careers.remote'),
      type: t('careers.fullTime'),
      description: t('careers.positions.devOps.description')
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
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineBriefcase className="w-4 h-4" />
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

            <a 
              href="#positions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
            >
              {t('careers.hero.viewPositions')}
            </a>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.whyJoin.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('careers.whyJoin.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border ${
                    isDark 
                      ? "bg-[#181A1E] border-gray-700" 
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#21f201]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#21f201]" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.values.title')}
            </h2>
          </div>

          <div className="space-y-4">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  isDark ? "bg-[#0B0E11]" : "bg-gray-50"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#21f201] flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">{idx + 1}</span>
                </div>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div id="positions" className="px-6 md:px-8 lg:px-12 xl:px-16 py-16 scroll-mt-8">
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
                className={`p-6 rounded-xl border transition-all hover:border-[#21f201]/50 ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-700 hover:bg-[#1a1d23]" 
                    : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {position.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {position.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
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
                  <a 
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors whitespace-nowrap"
                  >
                    {t('careers.applyNow')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Process */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
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
                <div className="text-4xl font-bold text-[#21f201]/20 mb-2">{item.step}</div>
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

      {/* CTA */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-2xl p-8 md:p-12 text-center ${
            isDark 
              ? "bg-gradient-to-r from-[#21f201]/10 to-transparent border border-[#21f201]/20"
              : "bg-gradient-to-r from-green-50 to-white border border-green-200"
          }`}>
            <HiOutlineSparkles className="w-12 h-12 mx-auto mb-4 text-[#21f201]" />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('careers.cta.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('careers.cta.subtitle')}
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
            >
              {t('careers.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;


