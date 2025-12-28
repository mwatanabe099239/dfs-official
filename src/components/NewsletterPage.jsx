import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineMail,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineNewspaper,
  HiOutlineGift,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineShieldCheck
} from 'react-icons/hi';

const NewsletterPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    updates: true,
    tutorials: false,
    events: false,
    community: false
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const features = [
    {
      icon: HiOutlineNewspaper,
      title: t('newsletter.features.productUpdates.title'),
      description: t('newsletter.features.productUpdates.description')
    },
    {
      icon: HiOutlineLightBulb,
      title: t('newsletter.features.tipsTutorials.title'),
      description: t('newsletter.features.tipsTutorials.description')
    },
    {
      icon: HiOutlineCalendar,
      title: t('newsletter.features.eventAnnouncements.title'),
      description: t('newsletter.features.eventAnnouncements.description')
    },
    {
      icon: HiOutlineGift,
      title: t('newsletter.features.exclusiveOffers.title'),
      description: t('newsletter.features.exclusiveOffers.description')
    },
  ];

  const pastNewsletters = [
    {
      date: 'Dec 20, 2025',
      titleKey: 'newsletter.past.payviner.title',
      excerptKey: 'newsletter.past.payviner.excerpt'
    },
    {
      date: 'Dec 15, 2025',
      titleKey: 'newsletter.past.yearReview.title',
      excerptKey: 'newsletter.past.yearReview.excerpt'
    },
    {
      date: 'Dec 10, 2025',
      titleKey: 'newsletter.past.dappsUpdate.title',
      excerptKey: 'newsletter.past.dappsUpdate.excerpt'
    },
    {
      date: 'Dec 5, 2025',
      titleKey: 'newsletter.past.staking.title',
      excerptKey: 'newsletter.past.staking.excerpt'
    },
  ];

  if (subscribed) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#21f201]/10 flex items-center justify-center">
              <HiOutlineCheckCircle className="w-12 h-12 text-[#21f201]" />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.success.title')}
            </h1>
            <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.success.welcome')}
            </p>
            <p className="text-[#21f201] font-semibold mb-6">{email}</p>
            <p className={`mb-8 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              {t('newsletter.success.checkInbox')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubscribed(false);
                  setEmail('');
                }}
                className={`px-6 py-3 font-semibold rounded-lg border transition-colors ${
                  isDark 
                    ? "border-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t('newsletter.success.subscribeAnother')}
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors"
              >
                {t('common.goHome')}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineMail className="w-4 h-4" />
              {t('newsletter.hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('newsletter.hero.title')}
              <span className="block text-[#21f201] mt-2">{t('newsletter.hero.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('newsletter.hero.subtitle')}
            </p>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.emailPlaceholder')}
                  required
                  className={`flex-1 px-5 py-4 rounded-xl border focus:outline-none focus:border-[#21f201] transition-colors ${
                    isDark 
                      ? "bg-[#181A1E] border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#21f201] text-black font-bold rounded-xl hover:bg-[#1ad901] transition-colors whitespace-nowrap"
                >
                  {t('common.subscribe')}
                </button>
              </div>
              <p className={`mt-3 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                <HiOutlineShieldCheck className="inline w-4 h-4 mr-1" />
                {t('newsletter.privacyNote')}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.whatYouGet.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.whatYouGet.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border text-center ${
                    isDark 
                      ? "bg-[#181A1E] border-gray-700" 
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-[#21f201]/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#21f201]" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.preferences.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.preferences.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {[
              { key: 'updates', labelKey: 'newsletter.preferences.updates.label', descKey: 'newsletter.preferences.updates.description' },
              { key: 'tutorials', labelKey: 'newsletter.preferences.tutorials.label', descKey: 'newsletter.preferences.tutorials.description' },
              { key: 'events', labelKey: 'newsletter.preferences.events.label', descKey: 'newsletter.preferences.events.description' },
              { key: 'community', labelKey: 'newsletter.preferences.community.label', descKey: 'newsletter.preferences.community.description' },
            ].map((pref) => (
              <div 
                key={pref.key}
                onClick={() => togglePreference(pref.key)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  preferences[pref.key]
                    ? "border-[#21f201] bg-[#21f201]/5"
                    : isDark 
                      ? "border-gray-700 bg-[#0B0E11] hover:border-gray-600"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(pref.labelKey)}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {t(pref.descKey)}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    preferences[pref.key]
                      ? "border-[#21f201] bg-[#21f201]"
                      : isDark ? "border-gray-600" : "border-gray-300"
                  }`}>
                    {preferences[pref.key] && (
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Newsletters */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.recent.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.recent.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {pastNewsletters.map((newsletter, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border transition-all hover:border-[#21f201]/50 ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-700 hover:bg-[#1a1d23]" 
                    : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-[#21f201]/10 flex items-center justify-center flex-shrink-0`}>
                    <HiOutlineNewspaper className="w-6 h-6 text-[#21f201]" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {newsletter.date}
                    </span>
                    <h3 className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(newsletter.titleKey)}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {t(newsletter.excerptKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '5,000+', labelKey: 'newsletter.stats.subscribers' },
              { value: '52', labelKey: 'newsletter.stats.sent' },
              { value: '45%', labelKey: 'newsletter.stats.openRate' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-[#21f201] mb-1">
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-2xl p-8 md:p-12 text-center ${
            isDark 
              ? "bg-gradient-to-r from-[#21f201]/10 to-transparent border border-[#21f201]/20"
              : "bg-gradient-to-r from-green-50 to-white border border-green-200"
          }`}>
            <HiOutlineBell className="w-16 h-16 mx-auto mb-6 text-[#21f201]" />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.cta.title')}
            </h2>
            <p className={`mb-8 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.cta.subtitle')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                required
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] ${
                  isDark 
                    ? "bg-[#0B0E11] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
              >
                {t('common.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;

