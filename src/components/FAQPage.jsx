import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineSearch
} from 'react-icons/hi';

const FAQPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { key: 'all', label: t('faq.categories.all') },
    { key: 'gettingStarted', label: t('faq.categories.gettingStarted') },
    { key: 'wallet', label: t('faq.categories.wallet') },
    { key: 'tokens', label: t('faq.categories.tokens') },
    { key: 'transactions', label: t('faq.categories.transactions') },
    { key: 'technical', label: t('faq.categories.technical') }
  ];

  const faqs = [
    {
      categoryKey: 'gettingStarted',
      questionKey: 'faq.items.whatIsDfs.question',
      answerKey: 'faq.items.whatIsDfs.answer'
    },
    {
      categoryKey: 'gettingStarted',
      questionKey: 'faq.items.howToStart.question',
      answerKey: 'faq.items.howToStart.answer'
    },
    {
      categoryKey: 'gettingStarted',
      questionKey: 'faq.items.isFree.question',
      answerKey: 'faq.items.isFree.answer'
    },
    {
      categoryKey: 'wallet',
      questionKey: 'faq.items.createWallet.question',
      answerKey: 'faq.items.createWallet.answer'
    },
    {
      categoryKey: 'wallet',
      questionKey: 'faq.items.walletAddress.question',
      answerKey: 'faq.items.walletAddress.answer'
    },
    {
      categoryKey: 'wallet',
      questionKey: 'faq.items.multipleWallets.question',
      answerKey: 'faq.items.multipleWallets.answer'
    },
    {
      categoryKey: 'wallet',
      questionKey: 'faq.items.recoverWallet.question',
      answerKey: 'faq.items.recoverWallet.answer'
    },
    {
      categoryKey: 'tokens',
      questionKey: 'faq.items.whatIsDrc20.question',
      answerKey: 'faq.items.whatIsDrc20.answer'
    },
    {
      categoryKey: 'tokens',
      questionKey: 'faq.items.createToken.question',
      answerKey: 'faq.items.createToken.answer'
    },
    {
      categoryKey: 'tokens',
      questionKey: 'faq.items.whatIsDfsCoin.question',
      answerKey: 'faq.items.whatIsDfsCoin.answer'
    },
    {
      categoryKey: 'tokens',
      questionKey: 'faq.items.getDfsTokens.question',
      answerKey: 'faq.items.getDfsTokens.answer'
    },
    {
      categoryKey: 'transactions',
      questionKey: 'faq.items.transactionTime.question',
      answerKey: 'faq.items.transactionTime.answer'
    },
    {
      categoryKey: 'transactions',
      questionKey: 'faq.items.gasFees.question',
      answerKey: 'faq.items.gasFees.answer'
    },
    {
      categoryKey: 'transactions',
      questionKey: 'faq.items.cancelTransaction.question',
      answerKey: 'faq.items.cancelTransaction.answer'
    },
    {
      categoryKey: 'transactions',
      questionKey: 'faq.items.transactionHistory.question',
      answerKey: 'faq.items.transactionHistory.answer'
    },
    {
      categoryKey: 'technical',
      questionKey: 'faq.items.blockGeneration.question',
      answerKey: 'faq.items.blockGeneration.answer'
    },
    {
      categoryKey: 'technical',
      questionKey: 'faq.items.isDecentralized.question',
      answerKey: 'faq.items.isDecentralized.answer'
    },
    {
      categoryKey: 'technical',
      questionKey: 'faq.items.buildApps.question',
      answerKey: 'faq.items.buildApps.answer'
    },
    {
      categoryKey: 'technical',
      questionKey: 'faq.items.dataHandling.question',
      answerKey: 'faq.items.dataHandling.answer'
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.categoryKey === activeCategory;
    const question = t(faq.questionKey);
    const answer = t(faq.answerKey);
    const matchesSearch = question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <div className={`absolute top-20 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineQuestionMarkCircle className="w-4 h-4" />
              {t('faq.title')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('faq.title')} <span className="text-[#21f201]">{t('faq.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('faq.subtitle')}
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:outline-none focus:border-[#21f201] transition-colors ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.key
                    ? "bg-[#21f201] text-black"
                    : isDark 
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? "border-gray-700 bg-[#181A1E]" : "border-gray-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className={`w-full p-5 text-left flex items-center justify-between gap-4 ${
                    expandedFaq === idx 
                      ? isDark ? "bg-[#1a1d23]" : "bg-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"
                    }`}>
                      {t(`faq.categories.${faq.categoryKey}`)}
                    </span>
                    <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t(faq.questionKey)}
                    </span>
                  </div>
                  {expandedFaq === idx ? (
                    <HiOutlineChevronUp className="w-5 h-5 text-[#21f201] flex-shrink-0" />
                  ) : (
                    <HiOutlineChevronDown className={`w-5 h-5 flex-shrink-0 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`} />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className={`px-5 pb-5 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <div className={`pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                      <p className="leading-relaxed text-left">{t(faq.answerKey)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HiOutlineQuestionMarkCircle className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('faq.noResults')}
              </h3>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                {t('faq.tryAdjusting')}
              </p>
            </div>
          )}

          {/* Still Need Help */}
          <div className={`mt-12 rounded-2xl p-8 text-center ${
            isDark 
              ? "bg-gradient-to-r from-[#21f201]/10 to-[#181A1E] border border-[#21f201]/20"
              : "bg-gradient-to-r from-green-50 to-white border border-green-200"
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('faq.stillHaveQuestions')}
            </h2>
            <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('faq.cantFind')}
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors"
            >
              {t('faq.contactSupport')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;


