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
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <HiOutlineCheckCircle className={`w-12 h-12 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('newsletter.success.title')}
            </h1>
            <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('newsletter.success.welcome')}
            </p>
            <p className={`font-semibold mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{email}</p>
            <p className={`mb-8 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              {t('newsletter.success.checkInbox')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubscribed(false);
                  setEmail('');
                }}
                className={`font-space bg-transparent border py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "text-slate-300 border-white hover:bg-white hover:text-black" 
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {t('newsletter.success.subscribeAnother')}
              </button>
              <a
                href="/"
                className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
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
            isDark ? "bg-gray-400" : "bg-gray-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineMail className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
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
                  className={`flex-1 px-5 py-4 rounded-xl border focus:outline-none focus:border-gray-400 transition-colors ${
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
    </div>
  );
};

export default NewsletterPage;

