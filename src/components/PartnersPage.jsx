import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineCode,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineSparkles
} from 'react-icons/hi';

const PartnersPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const partnerCategories = [
    {
      titleKey: 'partners.categories.technology.title',
      descriptionKey: 'partners.categories.technology.description',
      partners: [
        { name: 'CloudTech Solutions', typeKey: 'partners.types.infrastructure', logo: '☁️' },
        { name: 'SecureNet', typeKey: 'partners.types.security', logo: '🔐' },
        { name: 'DataFlow Systems', typeKey: 'partners.types.dataAnalytics', logo: '📊' },
        { name: 'API Connect', typeKey: 'partners.types.integration', logo: '🔗' },
      ]
    },
    {
      titleKey: 'partners.categories.strategic.title',
      descriptionKey: 'partners.categories.strategic.description',
      partners: [
        { name: 'Global Ventures', typeKey: 'partners.types.investment', logo: '💼' },
        { name: 'Innovation Labs', typeKey: 'partners.types.rd', logo: '🔬' },
        { name: 'Digital Alliance', typeKey: 'partners.types.consulting', logo: '🤝' },
        { name: 'Market Leaders', typeKey: 'partners.types.marketing', logo: '📈' },
      ]
    },
    {
      titleKey: 'partners.categories.integration.title',
      descriptionKey: 'partners.categories.integration.description',
      partners: [
        { name: 'PayFlow', typeKey: 'partners.types.payments', logo: '💳' },
        { name: 'AuthGuard', typeKey: 'partners.types.authentication', logo: '🛡️' },
        { name: 'StreamSync', typeKey: 'partners.types.realtimeData', logo: '⚡' },
        { name: 'CloudStore', typeKey: 'partners.types.storage', logo: '💾' },
      ]
    },
  ];

  const benefits = [
    {
      icon: HiOutlineGlobe,
      title: t('partners.benefits.globalReach.title'),
      description: t('partners.benefits.globalReach.description')
    },
    {
      icon: HiOutlineCode,
      title: t('partners.benefits.apiAccess.title'),
      description: t('partners.benefits.apiAccess.description')
    },
    {
      icon: HiOutlineCurrencyDollar,
      title: t('partners.benefits.revenueShare.title'),
      description: t('partners.benefits.revenueShare.description')
    },
    {
      icon: HiOutlineUserGroup,
      title: t('partners.benefits.coMarketing.title'),
      description: t('partners.benefits.coMarketing.description')
    },
    {
      icon: HiOutlineShieldCheck,
      title: t('partners.benefits.prioritySupport.title'),
      description: t('partners.benefits.prioritySupport.description')
    },
    {
      icon: HiOutlineLightBulb,
      title: t('partners.benefits.earlyAccess.title'),
      description: t('partners.benefits.earlyAccess.description')
    },
  ];

  const partnerTiers = [
    {
      nameKey: 'partners.tierNames.bronze',
      featureKeys: ['partners.tierFeatures.apiAccess', 'partners.tierFeatures.basicSupport', 'partners.tierFeatures.partnerBadge', 'partners.tierFeatures.documentation'],
      highlighted: false
    },
    {
      nameKey: 'partners.tierNames.silver',
      featureKeys: ['partners.tierFeatures.allBronze', 'partners.tierFeatures.coMarketing', 'partners.tierFeatures.prioritySupport', 'partners.tierFeatures.quarterlyReviews'],
      highlighted: false
    },
    {
      nameKey: 'partners.tierNames.gold',
      featureKeys: ['partners.tierFeatures.allSilver', 'partners.tierFeatures.revenueShare', 'partners.tierFeatures.earlyAccess', 'partners.tierFeatures.customIntegration'],
      highlighted: true
    },
    {
      nameKey: 'partners.tierNames.platinum',
      featureKeys: ['partners.tierFeatures.allGold', 'partners.tierFeatures.dedicatedManager', 'partners.tierFeatures.strategicPlanning', 'partners.tierFeatures.executiveAccess'],
      highlighted: false
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
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
          <div className={`absolute bottom-10 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineCube className="w-4 h-4" />
              {t('partners.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('partners.title')}
              <span className="block text-[#21f201] mt-2">{t('partners.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('partners.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="px-8 py-4 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
              >
                {t('partners.becomePartner')}
              </a>
              <a 
                href="#benefits"
                className={`px-8 py-4 font-bold rounded-lg border transition-colors ${
                  isDark 
                    ? "border-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t('partners.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Current Partners */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('partners.ourPartners.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('partners.ourPartners.subtitle')}
            </p>
          </div>

          {partnerCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-12">
              <div className="mb-6">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t(category.titleKey)}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t(category.descriptionKey)}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.partners.map((partner, idx) => (
                  <div 
                    key={idx}
                    className={`p-6 rounded-xl border text-center transition-all hover:border-[#21f201]/50 ${
                      isDark 
                        ? "bg-[#181A1E] border-gray-700 hover:bg-[#1a1d23]" 
                        : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    <div className="text-4xl mb-3">{partner.logo}</div>
                    <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {partner.name}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"
                    }`}>
                      {t(partner.typeKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 scroll-mt-8 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('partners.benefitsSection.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('partners.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border ${
                    isDark ? "bg-[#0B0E11] border-gray-700" : "bg-gray-50 border-gray-200"
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

      {/* Partner Tiers */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('partners.tiersSection.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('partners.tiersSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border transition-all ${
                  tier.highlighted
                    ? "border-[#21f201] bg-[#21f201]/5 scale-105"
                    : isDark 
                      ? "bg-[#181A1E] border-gray-700" 
                      : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <div className="text-[#21f201] text-xs font-bold uppercase mb-2">{t('partners.tiers.mostPopular')}</div>
                )}
                <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t(tier.nameKey)}
                </h3>
                <ul className="space-y-3">
                  {tier.featureKeys.map((featureKey, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <HiOutlineSparkles className="w-4 h-4 text-[#21f201] flex-shrink-0" />
                      <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {t(featureKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', labelKey: 'partners.stats.activePartners' },
              { value: '50+', labelKey: 'partners.stats.countriesReached' },
              { value: '10K+', labelKey: 'partners.stats.usersServed' },
              { value: '99.9%', labelKey: 'partners.stats.uptimeSla' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#21f201] mb-2">
                  {stat.value}
                </div>
                <div className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t(stat.labelKey)}
                </div>
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
            <HiOutlineChartBar className="w-16 h-16 mx-auto mb-6 text-[#21f201]" />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('partners.cta.title')}
            </h2>
            <p className={`mb-8 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('partners.cta.subtitle')}
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
            >
              {t('partners.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;

