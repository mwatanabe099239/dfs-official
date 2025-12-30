import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineLightBulb,
  HiOutlineGlobe,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineChip,
  HiOutlineEye
} from 'react-icons/hi';

const AboutPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const values = [
    {
      icon: HiOutlineUserGroup,
      titleKey: 'about.values.accessibility.title',
      descKey: 'about.values.accessibility.description'
    },
    {
      icon: HiOutlineShieldCheck,
      titleKey: 'about.values.security.title',
      descKey: 'about.values.security.description'
    },
    {
      icon: HiOutlineLightBulb,
      titleKey: 'about.values.innovation.title',
      descKey: 'about.values.innovation.description'
    },
    {
      icon: HiOutlineHeart,
      titleKey: 'about.values.community.title',
      descKey: 'about.values.community.description'
    },
  ];

  const milestones = [
    { year: '2024', titleKey: 'about.milestones.founded.title', descKey: 'about.milestones.founded.description' },
    { year: '2024', titleKey: 'about.milestones.coreDev.title', descKey: 'about.milestones.coreDev.description' },
    { year: '2025', titleKey: 'about.milestones.launch.title', descKey: 'about.milestones.launch.description' },
    { year: '2025', titleKey: 'about.milestones.dapps.title', descKey: 'about.milestones.dapps.description' },
    { year: '2026', titleKey: 'about.milestones.expansion.title', descKey: 'about.milestones.expansion.description' },
  ];

  const team = [
    { roleKey: 'about.team.roles.ceo', emoji: '👨‍💼' },
    { roleKey: 'about.team.roles.cto', emoji: '👨‍💻' },
    { roleKey: 'about.team.roles.leadDev', emoji: '🧑‍💻' },
    { roleKey: 'about.team.roles.communityLead', emoji: '🧑‍🤝‍🧑' },
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
          <div className={`absolute bottom-20 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-gray-400" : "bg-gray-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineSparkles className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('about.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('about.title')}
              <span className="block text-[#21f201] mt-2">{t('about.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('about.ourStory.title')}
              </h2>
              <div className={`space-y-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <p>{t('about.ourStory.p1')}</p>
                <p>{t('about.ourStory.p2')}</p>
                <p>{t('about.ourStory.p3')}</p>
              </div>
            </div>
            <div 
              className={`rounded-2xl p-8 border-t border-l border-r ${
                isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"
              }`}
              style={{ 
                borderBottomWidth: '4px', 
                borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
                boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '10K+', labelKey: 'about.stats.activeUsers' },
                  { value: '20+', labelKey: 'about.stats.dappsBuilt' },
                  { value: '100K+', labelKey: 'about.stats.transactions' },
                  { value: '50+', labelKey: 'about.stats.countries' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>{stat.value}</div>
                    <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t(stat.labelKey)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`order-2 lg:order-1 rounded-2xl p-8 border-t border-l border-r ${
                isDark ? "bg-[#0B0E11] border-gray-800" : "bg-gray-50 border-gray-200"
              }`}
              style={{ 
                borderBottomWidth: '4px', 
                borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
                boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <HiOutlineEye className={`w-8 h-8 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t('about.ourVision.title')}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {t('about.ourVision.subtitle')}
                  </p>
                </div>
              </div>
              <p className={`italic text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                "{t('about.ourVision.quote')}"
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('about.ourVision.futureTitle')}
              </h2>
              <div className={`space-y-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <p>{t('about.ourVision.p1')}</p>
                <p>{t('about.ourVision.p2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('about.values.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border-l-2 pl-8 text-center ${
                    isDark 
                      ? "bg-[#181A1E] border-[#A0AEC0]" 
                      : "bg-white border-gray-400"
                  }`}
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}>
                    <Icon className={`w-7 h-7 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t(value.titleKey)}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {t(value.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('about.journey.title')}
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="flex gap-6 max-w-2xl">
              {/* Left column for circles and line */}
              <div className="flex flex-col items-center">
                {milestones.map((milestone, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                    }`}>
                      {milestone.year.slice(2)}
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[80px] ${isDark ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Right column for text content */}
              <div className="flex-1 space-y-6">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className={`text-left ${idx < milestones.length - 1 ? "pb-6" : ""}`}>
                    <span className={`text-sm block text-left ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {milestone.year}
                    </span>
                    <h3 className={`text-lg font-bold text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(milestone.titleKey)}
                    </h3>
                    <p className={`text-sm text-left ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {t(milestone.descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Preview */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('about.team.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border-l-2 pl-8 text-center ${
                  isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
                }`}
              >
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  {member.emoji}
                </div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t(member.roleKey)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
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
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('about.cta.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://metaface.dfsscan.com/get-started"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {t('about.cta.button1')}
              </a>
              <a 
                href="/careers"
                className={`font-space bg-transparent border py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "text-slate-300 border-white hover:bg-white hover:text-black" 
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {t('about.cta.button2')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


