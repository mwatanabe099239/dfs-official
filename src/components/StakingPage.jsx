import React from "react";
import { 
  HiOutlineShieldCheck, 
  HiOutlineCurrencyDollar, 
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
  HiOutlineArrowRight
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const StakingPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const steps = [
    {
      icon: HiOutlineCurrencyDollar,
      titleKey: "staking.steps.publishToken.title",
      descriptionKey: "staking.steps.publishToken.description",
    },
    {
      icon: HiOutlineShieldCheck,
      titleKey: "staking.steps.adminApproval.title",
      descriptionKey: "staking.steps.adminApproval.description",
    },
    {
      icon: HiOutlineLightBulb,
      titleKey: "staking.steps.setStaking.title",
      descriptionKey: "staking.steps.setStaking.description",
    },
    {
      icon: HiOutlineCheckCircle,
      titleKey: "staking.steps.participate.title",
      descriptionKey: "staking.steps.participate.description",
    },
  ];

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Hero Section */}
      <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 pt-16 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[128px] ${
            isDark ? "bg-[#21f201]/5" : "bg-[#21f201]/3"
          }`}></div>
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[128px] ${
            isDark ? "bg-gray-400/10" : "bg-gray-300/5"
          }`}></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#21f201]"></span>
              <span className="text-sm font-medium">{t('staking.badge') || 'Staking'}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('staking.hero.title') || 'Token Staking'}{" "}
              <span className="text-[#21f201]">
                {t('staking.hero.titleHighlight') || 'on DFS Chain'}
              </span>
            </h1>
            
            <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.hero.subtitle') || 'Create and participate in staking events for approved tokens. Set interest rates and let users stake their tokens to earn rewards.'}
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-24 ${isDark ? "bg-[#0d1014]" : "bg-white"}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('staking.howItWorks.title') || 'How Token Staking Works'}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('staking.howItWorks.subtitle') || 'A simple process for token creators and stakers'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className={`hidden lg:block absolute top-12 left-[60%] w-full h-0.5 ${
                      isDark ? "bg-[#21f201]/30" : "bg-[#21f201]/20"
                    }`}></div>
                  )}
                  
                  <div className={`border-l-2 rounded-xl p-6 pl-8 transition-all duration-300 h-full ${
                    isDark 
                      ? "bg-[#181A1E] border-[#A0AEC0]" 
                      : "bg-gray-50 border-gray-400"
                  }`}>
                    <div className="w-12 h-12 bg-[#21f201]/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#21f201]" />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(step.titleKey) || step.titleKey}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {t(step.descriptionKey) || step.descriptionKey}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Explanation Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-24 ${isDark ? "bg-[#0d1014]" : "bg-gray-50"}`}>
        <div className="max-w-[1000px] mx-auto text-left">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('staking.details.title') || 'Understanding Token Staking'}
            </h2>
          </div>

          <div className="space-y-8 text-left">
            {/* Step 1: Publish Token */}
            <div className={`border-l-2 pl-8 rounded-xl py-6 text-left ${
              isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
            }`}>
              <h3 className={`text-2xl font-bold mb-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('staking.details.step1.title') || '1. Publish Your Token in WhiteCreator'}
              </h3>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step1.description') || 'To enable staking for your token, you first need to publish it using the WhiteCreator platform. WhiteCreator is DFS Chain\'s token publishing platform where you can create and deploy your DRC20 tokens with an approval system.'}
              </p>
              <p className={`text-base leading-relaxed text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step1.description2') || 'Once your token is published, it will go through the community-driven approval process. This ensures quality and security for all tokens on the platform.'}
              </p>
            </div>

            {/* Step 2: Admin Approval */}
            <div className={`border-l-2 pl-8 rounded-xl py-6 text-left ${
              isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
            }`}>
              <h3 className={`text-2xl font-bold mb-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('staking.details.step2.title') || '2. Admin Approval Required'}
              </h3>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step2.description') || 'Only tokens that have been approved by the admin can be used for staking. This approval process ensures that only legitimate, verified tokens can create staking events, protecting users from potential scams or low-quality projects.'}
              </p>
              <p className={`text-base leading-relaxed text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step2.description2') || 'The admin reviews tokens based on various criteria including project legitimacy, token utility, and compliance with DFS Chain standards. Once approved, your token becomes eligible for staking functionality.'}
              </p>
            </div>

            {/* Step 3: Set Interest Rate & Open Staking */}
            <div className={`border-l-2 pl-8 rounded-xl py-6 text-left ${
              isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
            }`}>
              <h3 className={`text-2xl font-bold mb-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('staking.details.step3.title') || '3. Set Interest Rate and Open Staking Event'}
              </h3>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step3.description') || 'For approved tokens, token creators can set an interest rate and open a staking event directly within the WhiteCreator platform. This allows you to incentivize users to hold and stake your token by offering attractive rewards.'}
              </p>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step3.description2') || 'When setting up a staking event, you can configure:'}
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <li className="text-left">{t('staking.details.step3.list1') || 'Interest rate (APY) - The annual percentage yield for stakers'}</li>
                <li className="text-left">{t('staking.details.step3.list2') || 'Staking duration - How long tokens need to be locked'}</li>
                <li className="text-left">{t('staking.details.step3.list3') || 'Minimum staking amount - The minimum tokens required to participate'}</li>
                <li className="text-left">{t('staking.details.step3.list4') || 'Maximum staking capacity - Total tokens that can be staked'}</li>
              </ul>
              <p className={`text-base leading-relaxed text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step3.description3') || 'Once configured, your staking event becomes active and visible to all users on the platform.'}
              </p>
            </div>

            {/* Step 4: Users Participate */}
            <div className={`border-l-2 pl-8 rounded-xl py-6 text-left ${
              isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
            }`}>
              <h3 className={`text-2xl font-bold mb-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('staking.details.step4.title') || '4. Users Participate in Staking'}
              </h3>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step4.description') || 'Once a staking event is active, users can participate by staking their tokens in the dedicated staking project (which will be launched separately in the future). Users can browse available staking events, review the interest rates and terms, and stake their tokens to start earning rewards.'}
              </p>
              <p className={`text-base leading-relaxed mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step4.description2') || 'The staking project will provide a user-friendly interface where stakers can:'}
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <li className="text-left">{t('staking.details.step4.list1') || 'View all available staking events for approved tokens'}</li>
                <li className="text-left">{t('staking.details.step4.list2') || 'See interest rates, duration, and other terms'}</li>
                <li className="text-left">{t('staking.details.step4.list3') || 'Stake their tokens and track rewards'}</li>
                <li className="text-left">{t('staking.details.step4.list4') || 'Unstake tokens when the lock period ends'}</li>
              </ul>
              <p className={`text-base leading-relaxed text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {t('staking.details.step4.description3') || 'This creates a win-win situation: token creators can incentivize holding and reduce circulating supply, while stakers earn passive income on their tokens.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div 
            className={`relative overflow-hidden border-t border-l border-r rounded-3xl p-12 md:p-16 ${
              isDark 
                ? "bg-gradient-to-r from-[#181A1E] to-[#1a1d23] border-gray-800" 
                : "bg-gradient-to-r from-gray-50 to-white border-gray-200"
            }`}
            style={{ 
              borderBottomWidth: '4px', 
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('staking.cta.title') || 'Ready to Get Started?'}
              </h2>
              <p className={`text-xl mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {t('staking.cta.subtitle') || 'Publish your token in WhiteCreator and set up staking events, or participate in existing staking opportunities.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://drc20.dfsscan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-flex items-center justify-center gap-2 ${
                    isDark 
                      ? "bg-[#21f201] text-black hover:bg-[#1dd801]" 
                      : "bg-[#21f201] text-black hover:bg-[#1dd801]"
                  }`}
                >
                  {t('staking.cta.visitWhiteCreator') || 'Visit WhiteCreator'}
                  <HiOutlineArrowRight className="w-4 h-4" />
                </a>
                <button 
                  disabled
                  className={`font-space bg-transparent border py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 inline-block opacity-50 cursor-not-allowed ${
                    isDark 
                      ? "text-slate-300 border-gray-600" 
                      : "text-gray-400 border-gray-300"
                  }`}
                >
                  {t('staking.cta.stakingComingSoon') || 'Staking Project (Coming Soon)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingPage;
