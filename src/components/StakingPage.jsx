import React, { useState, useEffect } from "react";
import { 
  HiOutlineShieldCheck, 
  HiOutlineCurrencyDollar, 
  HiOutlineClock,
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineX
} from "react-icons/hi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const StakingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleComingSoon = () => {
    setShowComingSoon(true);
  };

  // Auto-hide the toast after 3 seconds
  useEffect(() => {
    if (showComingSoon) {
      const timer = setTimeout(() => {
        setShowComingSoon(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showComingSoon]);

  const stakingTiers = [
    {
      nameKey: "staking.tierNames.starter",
      minStake: "100",
      apy: "8%",
      lockPeriodKey: "staking.lockPeriods.30days",
      color: "from-gray-600 to-gray-500",
      popular: false,
    },
    {
      nameKey: "staking.tierNames.growth",
      minStake: "1,000",
      apy: "12%",
      lockPeriodKey: "staking.lockPeriods.90days",
      color: "from-blue-600 to-cyan-500",
      popular: false,
    },
    {
      nameKey: "staking.tierNames.premium",
      minStake: "10,000",
      apy: "18%",
      lockPeriodKey: "staking.lockPeriods.180days",
      color: "from-[#21f201] to-emerald-400",
      popular: true,
    },
    {
      nameKey: "staking.tierNames.elite",
      minStake: "50,000",
      apy: "25%",
      lockPeriodKey: "staking.lockPeriods.365days",
      color: "from-purple-600 to-pink-500",
      popular: false,
    },
  ];

  const steps = [
    {
      number: "01",
      titleKey: "staking.steps.connectWallet.title",
      descriptionKey: "staking.steps.connectWallet.description",
      icon: HiOutlineLockClosed,
    },
    {
      number: "02",
      titleKey: "staking.steps.chooseAmount.title",
      descriptionKey: "staking.steps.chooseAmount.description",
      icon: HiOutlineCurrencyDollar,
    },
    {
      number: "03",
      titleKey: "staking.steps.selectLockPeriod.title",
      descriptionKey: "staking.steps.selectLockPeriod.description",
      icon: HiOutlineClock,
    },
    {
      number: "04",
      titleKey: "staking.steps.startEarning.title",
      descriptionKey: "staking.steps.startEarning.description",
      icon: HiOutlineLightningBolt,
    },
  ];

  const features = [
    {
      icon: HiOutlineShieldCheck,
      titleKey: "staking.features.secureStaking.title",
      descriptionKey: "staking.features.secureStaking.description",
    },
    {
      icon: HiOutlineChartBar,
      titleKey: "staking.features.competitiveApy.title",
      descriptionKey: "staking.features.competitiveApy.description",
    },
    {
      icon: HiOutlineClock,
      titleKey: "staking.features.flexibleTerms.title",
      descriptionKey: "staking.features.flexibleTerms.description",
    },
    {
      icon: HiOutlineCurrencyDollar,
      titleKey: "staking.features.autoCompound.title",
      descriptionKey: "staking.features.autoCompound.description",
    },
  ];

  const faqs = [
    {
      questionKey: "staking.faq.questions.whatIsStaking.question",
      answerKey: "staking.faq.questions.whatIsStaking.answer",
    },
    {
      questionKey: "staking.faq.questions.rewardsCalculated.question",
      answerKey: "staking.faq.questions.rewardsCalculated.answer",
    },
    {
      questionKey: "staking.faq.questions.unstakeEarly.question",
      answerKey: "staking.faq.questions.unstakeEarly.answer",
    },
    {
      questionKey: "staking.faq.questions.whatWallet.question",
      answerKey: "staking.faq.questions.whatWallet.answer",
    },
    {
      questionKey: "staking.faq.questions.receiveRewards.question",
      answerKey: "staking.faq.questions.receiveRewards.answer",
    },
  ];

  const stats = [
    { value: "$12.5M+", labelKey: "staking.stats.tvl" },
    { value: "15,000+", labelKey: "staking.stats.activeStakers" },
    { value: "25%", labelKey: "staking.stats.maxApy" },
    { value: "99.9%", labelKey: "staking.stats.uptime" },
  ];

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Coming Soon Toast */}
      {showComingSoon && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className={`border rounded-xl px-6 py-4 shadow-2xl flex items-center gap-4 ${
            isDark 
              ? "bg-[#181A1E] border-[#21f201]/50 shadow-[#21f201]/10" 
              : "bg-white border-[#21f201]/50 shadow-lg"
          }`}>
            <div className="w-10 h-10 bg-[#21f201]/10 rounded-full flex items-center justify-center">
              <HiOutlineClock className="w-5 h-5 text-[#21f201]" />
            </div>
            <div>
              <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{t('common.comingSoon')}!</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t('staking.toast.underDevelopment')}</p>
            </div>
            <button 
              onClick={() => setShowComingSoon(false)}
              className={`ml-4 transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 pt-16 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[128px] ${
            isDark ? "bg-[#21f201]/10" : "bg-[#21f201]/5"
          }`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[128px] ${
            isDark ? "bg-purple-500/10" : "bg-purple-500/5"
          }`}></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#21f201]/10 border border-[#21f201]/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#21f201] rounded-full animate-pulse"></span>
              <span className="text-[#21f201] text-sm font-medium">{t('staking.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('staking.hero.title')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#21f201] to-emerald-400">
                {t('staking.hero.titleHighlight')}
              </span>
            </h1>
            
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={handleComingSoon}
                className="w-full sm:w-auto bg-[#21f201] text-black font-bold py-4 px-8 rounded-xl hover:bg-[#1ad901] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {t('staking.cta.startStaking')}
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleComingSoon}
                className={`w-full sm:w-auto border font-semibold py-4 px-8 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? "border-gray-600 text-white hover:bg-gray-800" 
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t('common.learnMore')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`backdrop-blur-sm border rounded-2xl p-6 ${
                  isDark 
                    ? "bg-[#181A1E]/50 border-gray-800" 
                    : "bg-white/80 border-gray-200 shadow-sm"
                }`}>
                  <div className="text-3xl md:text-4xl font-bold text-[#21f201] mb-2">{stat.value}</div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-24 ${isDark ? "bg-[#0d1014]" : "bg-gray-50"}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('staking.howToStake.title')} <span className="text-[#21f201]">{t('staking.howToStake.titleHighlight')}</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.howToStake.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#21f201]/50 to-transparent"></div>
                  )}
                  
                  <div className={`border rounded-2xl p-6 hover:border-[#21f201]/50 transition-all duration-300 h-full ${
                    isDark 
                      ? "bg-[#181A1E] border-gray-800" 
                      : "bg-white border-gray-200 shadow-sm"
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#21f201]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#21f201]" />
                      </div>
                      <span className={`text-4xl font-bold ${isDark ? "text-gray-700" : "text-gray-300"}`}>{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t(step.titleKey)}</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t(step.descriptionKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Staking Tiers Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('staking.tiers.title')} <span className="text-[#21f201]">{t('staking.tiers.titleHighlight')}</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.tiers.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                  isDark ? "bg-[#181A1E]" : "bg-white shadow-sm"
                } ${
                  tier.popular 
                    ? "border-[#21f201] shadow-lg shadow-[#21f201]/10 scale-105" 
                    : isDark ? "border-gray-800 hover:border-gray-700" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#21f201] text-black text-xs font-bold px-4 py-1 rounded-full">
                      {t('staking.tiers.mostPopular')}
                    </span>
                  </div>
                )}

                {/* Tier Header */}
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${tier.color} mb-6`}></div>
                
                <h3 className="text-2xl font-bold mb-2">{t(tier.nameKey)}</h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#21f201]">{tier.apy}</span>
                  <span className={`ml-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>APY</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className={`flex items-center justify-between py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                    <span className={isDark ? "text-gray-400" : "text-gray-500"}>{t('staking.tiers.minStake')}</span>
                    <span className="font-semibold">{tier.minStake} DFS</span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                    <span className={isDark ? "text-gray-400" : "text-gray-500"}>{t('staking.tiers.lockPeriod')}</span>
                    <span className="font-semibold">{t(tier.lockPeriodKey)}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className={isDark ? "text-gray-400" : "text-gray-500"}>{t('staking.tiers.autoCompound')}</span>
                    <HiOutlineCheckCircle className="w-5 h-5 text-[#21f201]" />
                  </div>
                </div>

                <button 
                  onClick={handleComingSoon}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular 
                      ? "bg-[#21f201] text-black hover:bg-[#1ad901]" 
                      : isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {t('staking.tiers.selectTier')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-24 ${isDark ? "bg-[#0d1014]" : "bg-gray-50"}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('staking.whyStake.title')}{" "}
                <span className="text-[#21f201]">DFS</span>?
              </h2>
              <p className={`text-xl mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {t('staking.whyStake.subtitle')}
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-[#21f201]/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#21f201]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{t(feature.titleKey)}</h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t(feature.descriptionKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#21f201]/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className={`relative border rounded-3xl p-8 ${
                isDark 
                  ? "bg-[#181A1E] border-gray-800" 
                  : "bg-white border-gray-200 shadow-lg"
              }`}>
                {/* Staking Calculator Preview */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={isDark ? "text-gray-400" : "text-gray-500"}>{t('staking.calculator.title')}</span>
                    <span className="text-xs bg-[#21f201]/10 text-[#21f201] px-3 py-1 rounded-full">{t('staking.calculator.preview')}</span>
                  </div>
                  
                  <div className={`rounded-xl p-4 mb-4 ${isDark ? "bg-[#0B0E11]" : "bg-gray-50 border border-gray-200"}`}>
                    <label className={`text-sm block mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t('staking.calculator.amountToStake')}</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value="10,000" 
                        readOnly
                        className="bg-transparent text-3xl font-bold w-full outline-none"
                      />
                      <span className={`text-xl ${isDark ? "text-gray-400" : "text-gray-500"}`}>DFS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className={`rounded-xl p-4 ${isDark ? "bg-[#0B0E11]" : "bg-gray-50 border border-gray-200"}`}>
                      <span className={`text-sm block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t('staking.tiers.lockPeriod')}</span>
                      <span className="text-xl font-bold">180 {t('staking.days')}</span>
                    </div>
                    <div className={`rounded-xl p-4 ${isDark ? "bg-[#0B0E11]" : "bg-gray-50 border border-gray-200"}`}>
                      <span className={`text-sm block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>APY</span>
                      <span className="text-xl font-bold text-[#21f201]">18%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#21f201]/10 to-transparent border border-[#21f201]/30 rounded-xl p-4">
                    <span className={`text-sm block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t('staking.calculator.estimatedEarnings')}</span>
                    <span className="text-2xl font-bold text-[#21f201]">+ 900 DFS</span>
                  </div>
                </div>

                <button 
                  onClick={handleComingSoon}
                  className="w-full bg-[#21f201] text-black font-bold py-4 rounded-xl hover:bg-[#1ad901] transition-all duration-300"
                >
                  {t('staking.calculator.connectWallet')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-24">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('staking.faq.title')} <span className="text-[#21f201]">{t('staking.faq.titleHighlight')}</span>
            </h2>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.faq.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-xl overflow-hidden ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-800" 
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                    isDark ? "hover:bg-[#1a1d23]" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-semibold pr-4">{t(faq.questionKey)}</span>
                  {openFaq === index ? (
                    <FiChevronUp className="w-5 h-5 text-[#21f201] shrink-0" />
                  ) : (
                    <FiChevronDown className={`w-5 h-5 shrink-0 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? "max-h-96" : "max-h-0"
                }`}>
                  <p className={`px-6 pb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{t(faq.answerKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className={`relative overflow-hidden border rounded-3xl p-12 md:p-16 ${
            isDark 
              ? "bg-gradient-to-r from-[#181A1E] to-[#1a1d23] border-gray-800" 
              : "bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-sm"
          }`}>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#21f201]/10 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[96px]"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('staking.cta.title')} <span className="text-[#21f201]">{t('staking.cta.titleHighlight')}</span>?
              </h2>
              <p className={`text-xl mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {t('staking.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleComingSoon}
                  className="w-full sm:w-auto bg-[#21f201] text-black font-bold py-4 px-10 rounded-xl hover:bg-[#1ad901] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {t('staking.cta.launchApp')}
                  <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleComingSoon}
                  className={`w-full sm:w-auto border font-semibold py-4 px-10 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? "border-gray-600 text-white hover:bg-gray-800" 
                      : "border-gray-300 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {t('staking.cta.readDocs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StakingPage;

