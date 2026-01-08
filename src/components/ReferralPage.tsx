'use client'

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineUserAdd,
  HiOutlineGift,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineShare,
  HiOutlineBell,
  HiOutlineCheck,
  HiOutlineUsers,
  HiOutlineTrendingUp
} from 'react-icons/hi';

const ReferralPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const benefits = [
    {
      icon: HiOutlineCurrencyDollar,
      title: t('referral.benefits.earnTokens.title'),
      description: t('referral.benefits.earnTokens.description')
    },
    {
      icon: HiOutlineChartBar,
      title: t('referral.benefits.tieredRewards.title'),
      description: t('referral.benefits.tieredRewards.description')
    },
    {
      icon: HiOutlineTrendingUp,
      title: t('referral.benefits.passiveIncome.title'),
      description: t('referral.benefits.passiveIncome.description')
    },
    {
      icon: HiOutlineGift,
      title: t('referral.benefits.bonusRewards.title'),
      description: t('referral.benefits.bonusRewards.description')
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: t('referral.howItWorks.step1.title'),
      description: t('referral.howItWorks.step1.description')
    },
    {
      step: '02',
      title: t('referral.howItWorks.step2.title'),
      description: t('referral.howItWorks.step2.description')
    },
    {
      step: '03',
      title: t('referral.howItWorks.step3.title'),
      description: t('referral.howItWorks.step3.description')
    },
    {
      step: '04',
      title: t('referral.howItWorks.step4.title'),
      description: t('referral.howItWorks.step4.description')
    },
  ];

  const tiers = [
    { name: t('referral.tiers.starter'), referrals: '1-10', reward: '10 DFS', bonus: '-' },
    { name: t('referral.tiers.bronze'), referrals: '11-50', reward: '12 DFS', bonus: '50 DFS' },
    { name: t('referral.tiers.silver'), referrals: '51-100', reward: '15 DFS', bonus: '150 DFS' },
    { name: t('referral.tiers.gold'), referrals: '101-500', reward: '18 DFS', bonus: '500 DFS' },
    { name: t('referral.tiers.platinum'), referrals: '500+', reward: '20 DFS', bonus: '1,000 DFS' },
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
            {/* Coming Soon Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineBell className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('common.comingSoon')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('referral.title')}
              <span className="block text-[#21f201] mt-2">{t('referral.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('referral.subtitle')}
            </p>

            {/* Email Signup */}
            {subscribed ? (
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}>
                <HiOutlineCheck className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {t('referral.success.message')}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('referral.emailPlaceholder')}
                  required
                  className={`flex-1 px-4 py-4 rounded-xl border focus:outline-none focus:border-gray-400 transition-colors ${
                    isDark 
                      ? "bg-[#181A1E] border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="submit"
                  className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 whitespace-nowrap ${
                    isDark 
                      ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {t('referral.getEarlyAccess')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('referral.benefits.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('referral.benefits.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
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

      {/* How It Works */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('referral.howItWorks.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('referral.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="text-center relative z-10">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4 ${
                  isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                }`}>
                  {item.step}
                </div>
                <h3 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {item.description}
                </p>
              </div>
            ))}
            {/* Connector lines between steps */}
            {howItWorks.map((_, idx) => {
              if (idx >= howItWorks.length - 1) return null;
              // For 4 columns, each column is 25% wide
              // The gap between columns is 1.5rem (24px)
              // Line should span from right edge of current column to left edge of next column
              // Since circles are centered, line starts at column boundary and spans the gap
              const columnEnd = ((idx + 1) * 100) / 4;
              
              return (
                <div
                  key={`line-${idx}`}
                  className={`hidden md:block absolute top-8 h-0.5 ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  style={{
                    left: `calc(${columnEnd}% - 0.75rem)`,
                    width: '1.5rem',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('referral.tiers.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('referral.tiers.subtitle')}
            </p>
          </div>

          <div className={`rounded-xl border overflow-hidden ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className={isDark ? "bg-[#181A1E]" : "bg-gray-50"}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {t('referral.table.tier')}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {t('referral.table.referrals')}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {t('referral.table.perReferral')}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {t('referral.table.tierBonus')}
                    </th>
                  </tr>
                </thead>
                <tbody className={isDark ? "bg-[#0B0E11]" : "bg-white"}>
                  {tiers.map((tier, idx) => (
                    <tr key={idx} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                      <td className={`px-6 py-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                        <span className="font-semibold">
                          {tier.name}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {tier.referrals}
                      </td>
                      <td className={`px-6 py-4 text-left`}>
                        <span className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>{tier.reward}</span>
                      </td>
                      <td className={`px-6 py-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {tier.bonus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={`text-center text-sm mt-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            * Reward values are illustrative and subject to change at launch
          </p>
        </div>
      </div>

      {/* Preview Features */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('referral.comingFeatures.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HiOutlineShare,
                titleKey: 'referral.comingFeatures.customLinks.title',
                descriptionKey: 'referral.comingFeatures.customLinks.description'
              },
              {
                icon: HiOutlineChartBar,
                titleKey: 'referral.comingFeatures.analytics.title',
                descriptionKey: 'referral.comingFeatures.analytics.description'
              },
              {
                icon: HiOutlineUsers,
                titleKey: 'referral.comingFeatures.leaderboard.title',
                descriptionKey: 'referral.comingFeatures.leaderboard.description'
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border-l-2 pl-8 ${
                    isDark ? "bg-[#0B0E11] border-[#A0AEC0]" : "bg-gray-50 border-gray-400"
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  <h3 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t(feature.titleKey)}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {t(feature.descriptionKey)}
                  </p>
                </div>
              );
            })}
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
            <HiOutlineUserAdd className={`w-16 h-16 mx-auto mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('referral.cta.title')}
            </h2>
            <p className={`mb-8 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('referral.cta.subtitle')}
            </p>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`font-space inline-flex items-center gap-2 py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                isDark 
                  ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {t('referral.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;

