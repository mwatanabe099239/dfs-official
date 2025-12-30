import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { FaTwitter, FaTelegram, FaDiscord, FaGithub, FaYoutube, FaMedium, FaReddit, FaLinkedin } from 'react-icons/fa';

const SocialLinksPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: 'Twitter',
      handle: '@DFSChain',
      descriptionKey: 'community.socials.twitter.description',
      icon: FaTwitter,
      link: '#',
      color: 'bg-blue-500',
      followers: '10K+'
    },
    {
      name: 'Telegram',
      handle: 'DFS Community',
      descriptionKey: 'community.socials.telegram.description',
      icon: FaTelegram,
      link: '#',
      color: 'bg-sky-500',
      followers: '25K+'
    },
    {
      name: 'Discord',
      handle: 'DFS Chain',
      descriptionKey: 'community.socials.discord.description',
      icon: FaDiscord,
      link: '#',
      color: 'bg-indigo-500',
      followers: '15K+'
    },
    {
      name: 'GitHub',
      handle: 'dfs-Chain',
      descriptionKey: 'community.socials.github.description',
      icon: FaGithub,
      link: '#',
      color: 'bg-gray-700',
      followers: '2K+'
    },
    {
      name: 'YouTube',
      handle: 'DFS Chain',
      descriptionKey: 'community.socials.youtube.description',
      icon: FaYoutube,
      link: '#',
      color: 'bg-red-600',
      followers: '5K+'
    },
    {
      name: 'Medium',
      handle: '@DFSChain',
      descriptionKey: 'community.socials.medium.description',
      icon: FaMedium,
      link: '#',
      color: 'bg-gray-900',
      followers: '3K+'
    },
    {
      name: 'Reddit',
      handle: 'r/DFSChain',
      descriptionKey: 'community.socials.reddit.description',
      icon: FaReddit,
      link: '#',
      color: 'bg-orange-600',
      followers: '8K+'
    },
    {
      name: 'LinkedIn',
      handle: 'DFS Chain',
      descriptionKey: 'community.socials.linkedin.description',
      icon: FaLinkedin,
      link: '#',
      color: 'bg-blue-700',
      followers: '5K+'
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
          <div className={`absolute top-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
          <div className={`absolute bottom-10 right-1/4 w-60 h-60 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-gray-400" : "bg-gray-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineGlobeAlt className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('community.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('community.title')} <span className="text-[#21f201]">{t('community.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('community.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-6 rounded-xl border-l-2 pl-8 transition-all hover:-translate-y-1 ${
                    isDark 
                      ? "bg-[#181A1E] border-[#A0AEC0] hover:bg-[#1a1d23]" 
                      : "bg-white border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}>
                    <Icon className={`w-7 h-7 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {social.name}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {social.handle}
                  </p>
                  <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {t(social.descriptionKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {social.followers} {t('community.followers')}
                    </span>
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {t('community.follow')} →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Community Stats */}
          <div 
            className={`mt-16 rounded-2xl p-8 md:p-12 border-t border-l border-r ${
              isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="text-center mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('community.stats.title')}
              </h2>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {t('community.stats.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { labelKey: 'community.stats.totalCommunity', value: '75K+' },
                { labelKey: 'community.stats.activeDevelopers', value: '500+' },
                { labelKey: 'community.stats.dappsBuilt', value: '20+' },
                { labelKey: 'community.stats.countries', value: '50+' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div 
            className={`mt-12 rounded-2xl p-8 text-center border-t border-l border-r ${
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
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('community.newsletter.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('community.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('community.newsletter.emailPlaceholder')}
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 ${
                  isDark 
                    ? "bg-[#0B0E11] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <button className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                isDark 
                  ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                {t('common.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksPage;


