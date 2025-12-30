import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineCode,
  HiOutlineGlobe,
  HiOutlineSparkles,
  HiOutlineBell,
  HiOutlineCurrencyDollar,
  HiOutlineQrcode,
  HiOutlineDeviceMobile,
  HiOutlineShoppingCart,
  HiOutlineRefresh,
  HiOutlineOfficeBuilding,
  HiOutlineUser
} from 'react-icons/hi';

const PayvinerPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const features = [
    {
      icon: HiOutlineLightningBolt,
      title: t('payviner.features.instantPayments.title'),
      description: t('payviner.features.instantPayments.description')
    },
    {
      icon: HiOutlineShieldCheck,
      title: t('payviner.features.secureTransactions.title'),
      description: t('payviner.features.secureTransactions.description')
    },
    {
      icon: HiOutlineCode,
      title: t('payviner.features.easyIntegration.title'),
      description: t('payviner.features.easyIntegration.description')
    },
    {
      icon: HiOutlineGlobe,
      title: t('payviner.features.globalReach.title'),
      description: t('payviner.features.globalReach.description')
    },
    {
      icon: HiOutlineCurrencyDollar,
      title: t('payviner.features.lowFees.title'),
      description: t('payviner.features.lowFees.description')
    },
    {
      icon: HiOutlineRefresh,
      title: t('payviner.features.refundSupport.title'),
      description: t('payviner.features.refundSupport.description')
    },
  ];

  const useCases = [
    {
      icon: HiOutlineShoppingCart,
      title: t('payviner.useCases.ecommerce.title'),
      description: t('payviner.useCases.ecommerce.description')
    },
    {
      icon: HiOutlineDeviceMobile,
      title: t('payviner.useCases.mobileApps.title'),
      description: t('payviner.useCases.mobileApps.description')
    },
    {
      icon: HiOutlineQrcode,
      title: t('payviner.useCases.posSystems.title'),
      description: t('payviner.useCases.posSystems.description')
    },
    {
      icon: HiOutlineGlobe,
      title: t('payviner.useCases.saas.title'),
      description: t('payviner.useCases.saas.description')
    },
  ];

  const integrationSteps = [
    { step: '01', title: t('payviner.steps.signUp.title'), description: t('payviner.steps.signUp.description') },
    { step: '02', title: t('payviner.steps.getApiKeys.title'), description: t('payviner.steps.getApiKeys.description') },
    { step: '03', title: t('payviner.steps.integrate.title'), description: t('payviner.steps.integrate.description') },
    { step: '04', title: t('payviner.steps.acceptPayments.title'), description: t('payviner.steps.acceptPayments.description') },
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
          <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
          <div className={`absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-cyan-500" : "bg-cyan-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6 animate-pulse">
              <HiOutlineSparkles className="w-4 h-4" />
              {t('common.comingSoon')}
            </div>
            
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#21f201] to-emerald-500 flex items-center justify-center shadow-lg shadow-[#21f201]/20">
                <HiOutlineCreditCard className="w-8 h-8 text-black" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-[#21f201]">Payviner</span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {t('payviner.hero.tagline')}
            </p>
            
            <p className={`text-lg max-w-2xl mx-auto mb-10 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('payviner.hero.subtitle')}
            </p>

            {/* Email Subscription */}
            <div 
              className={`max-w-lg mx-auto p-6 rounded-2xl border-t border-l border-r ${
                isDark ? "bg-[#181A1E] border-gray-300" : "bg-white border-gray-300 shadow-lg"
              }`}
              style={{
                borderBottomWidth: '4px',
                borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
                boxShadow: isDark
                  ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <HiOutlineBell className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <div className="text-left">
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t('payviner.waitlist.title')}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {t('payviner.waitlist.subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('payviner.waitlist.emailPlaceholder')}
                  className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                    isDark 
                      ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 whitespace-nowrap ${
                  isDark 
                    ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}>
                  {t('payviner.waitlist.button')}
                </button>
              </div>
            </div>

            {/* Stats Preview */}
            <div className={`mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">&lt;1s</div>
                <div className="text-sm">{t('payviner.stats.transactionTime')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">0.1%</div>
                <div className="text-sm">{t('payviner.stats.transactionFee')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">∞</div>
                <div className="text-sm">{t('payviner.stats.globalReach')}</div>
              </div>
            </div>
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
              {t('payviner.howItWorks.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('payviner.howItWorks.subtitle')}
            </p>
          </div>

          {/* Payment Flow Diagram */}
          <div 
            className={`rounded-2xl border-t border-l border-r p-8 mb-12 ${
              isDark ? "bg-[#0B0E11] border-gray-300" : "bg-gray-50 border-gray-300"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Customer */}
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}>
                  <HiOutlineUser className={`w-10 h-10 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{t('payviner.flow.customer')}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t('payviner.flow.wantsToPay')}</p>
              </div>

              {/* Arrow */}
              <div className={`hidden md:block text-4xl ${isDark ? "text-gray-600" : "text-gray-300"}`}>→</div>
              <div className={`md:hidden text-4xl ${isDark ? "text-gray-600" : "text-gray-300"}`}>↓</div>

              {/* Payviner */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <HiOutlineCreditCard className={`w-10 h-10 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Payviner</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t('payviner.flow.processesPayment')}</p>
              </div>

              {/* Arrow */}
              <div className={`hidden md:block text-4xl ${isDark ? "text-gray-600" : "text-gray-300"}`}>→</div>
              <div className={`md:hidden text-4xl ${isDark ? "text-gray-600" : "text-gray-300"}`}>↓</div>

              {/* Merchant */}
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}>
                  <HiOutlineOfficeBuilding className={`w-10 h-10 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{t('payviner.flow.merchant')}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t('payviner.flow.receivesDfs')}</p>
              </div>
            </div>
          </div>

          {/* Integration Steps */}
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {integrationSteps.map((item, idx) => (
              <React.Fragment key={idx}>
                <div 
                  className={`p-6 rounded-xl border text-center flex-1 ${
                    isDark ? "bg-[#0B0E11] border-gray-700" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-4xl font-bold text-[#21f201]/20 mb-2">{item.step}</div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className={`hidden md:flex items-center justify-center text-2xl flex-shrink-0 ${
                    isDark ? "text-gray-600" : "text-gray-300"
                  }`}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('payviner.whyChoose.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('payviner.whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border-l-2 border-t border-r border-b transition-all hover:border-[#21f201]/50 ${
                    isDark 
                      ? "bg-[#181A1E] border-l-gray-400 border-t-gray-300 border-r-gray-300 border-b-gray-300" 
                      : "bg-white border-l-gray-400 border-t-gray-300 border-r-gray-300 border-b-gray-300 shadow-sm"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Icon className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
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

      {/* Use Cases */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('payviner.useCasesSection.title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('payviner.useCasesSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border-l-2 border-t border-r border-b text-center ${
                    isDark ? "bg-[#0B0E11] border-l-gray-400 border-t-gray-300 border-r-gray-300 border-b-gray-300" : "bg-gray-50 border-l-gray-400 border-t-gray-300 border-r-gray-300 border-b-gray-300"
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Icon className={`w-7 h-7 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  </div>
                  <h3 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {useCase.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code Preview */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('payviner.integration.title')}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('payviner.integration.subtitle')}
            </p>
          </div>

          {/* Code Block */}
          <div 
            className={`rounded-xl overflow-hidden border-t border-l border-r ${
              isDark ? "border-gray-300" : "border-gray-300"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className={`px-4 py-3 flex items-center gap-2 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                checkout.js
              </span>
            </div>
            <div className={`p-6 font-mono text-sm overflow-x-auto ${
              isDark ? "bg-[#0B0E11]" : "bg-gray-50"
            }`}>
              <pre className={isDark ? "text-gray-300" : "text-gray-700"}>
{`// Initialize Payviner
import { Payviner } from '@payviner/sdk';

const payviner = new Payviner({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Create a payment
const payment = await payviner.createPayment({
  amount: 100,           // Amount in DFS
  currency: 'DFS',
  description: 'Premium Subscription',
  onSuccess: (tx) => {
    console.log('Payment successful!', tx.hash);
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  }
});

// Redirect to payment page
payviner.checkout(payment.id);`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div 
            className={`rounded-2xl p-8 md:p-12 text-center border-t border-l border-r ${
              isDark 
                ? "bg-gradient-to-r from-[#21f201]/10 to-transparent border-gray-300"
                : "bg-gradient-to-r from-gray-50 to-white border-gray-300"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#21f201] to-[#21f201] flex items-center justify-center shadow-lg shadow-[#21f201]/20">
              <HiOutlineCreditCard className="w-10 h-10 text-black" />
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('payviner.cta.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('payviner.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                isDark 
                  ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                {t('payviner.waitlist.button')}
              </button>
              <a 
                href="/contact"
                className={`font-space bg-transparent border py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${
                  isDark 
                    ? "text-slate-300 border-white hover:bg-white hover:text-black" 
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {t('payviner.cta.contactSales')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayvinerPage;


