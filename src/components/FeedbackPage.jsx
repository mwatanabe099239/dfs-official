import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineLightBulb,
  HiOutlineExclamationCircle,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineChat,
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlinePaperAirplane
} from 'react-icons/hi';

const FeedbackPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    priority: 'medium',
    category: 'general',
    url: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'suggestion',
      icon: HiOutlineLightBulb,
      title: t('feedback.types.suggestion.title'),
      description: t('feedback.types.suggestion.description')
    },
    {
      id: 'bug',
      icon: HiOutlineExclamationCircle,
      title: t('feedback.types.bug.title'),
      description: t('feedback.types.bug.description')
    },
    {
      id: 'other',
      icon: HiOutlineChat,
      title: t('feedback.types.other.title'),
      description: t('feedback.types.other.description')
    },
  ];

  const categories = [
    { id: 'general', name: t('feedback.categories.general'), icon: HiOutlineChat },
    { id: 'wallet', name: t('feedback.categories.wallet'), icon: HiOutlineDesktopComputer },
    { id: 'explorer', name: t('feedback.categories.explorer'), icon: HiOutlineCode },
    { id: 'dapps', name: t('feedback.categories.dapps'), icon: HiOutlineSparkles },
    { id: 'website', name: t('feedback.categories.website'), icon: HiOutlineDesktopComputer },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Feedback submitted:', { feedbackType, ...formData });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#21f201]/10 flex items-center justify-center">
              <HiOutlineCheckCircle className="w-10 h-10 text-[#21f201]" />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('feedback.success.title')}
            </h1>
            <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('feedback.success.message')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    title: '',
                    description: '',
                    email: '',
                    priority: 'medium',
                    category: 'general',
                    url: ''
                  });
                }}
                className="px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors"
              >
                {t('feedback.success.submitAnother')}
              </button>
              <a
                href="/"
                className={`px-6 py-3 font-semibold rounded-lg border transition-colors ${
                  isDark 
                    ? "border-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
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
            isDark ? "bg-yellow-500" : "bg-yellow-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineLightBulb className="w-4 h-4" />
              {t('feedback.hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('feedback.hero.title')} <span className="text-[#21f201]">{t('feedback.hero.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('feedback.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Feedback Type Selection */}
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('feedback.typeQuestion')}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {feedbackTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFeedbackType(type.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      feedbackType === type.id
                        ? "border-[#21f201] bg-[#21f201]/10"
                        : isDark 
                          ? "border-gray-700 bg-[#181A1E] hover:border-gray-600"
                          : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-3 ${
                      feedbackType === type.id ? "text-[#21f201]" : isDark ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {type.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className={`rounded-xl border overflow-hidden ${
            isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="p-6 md:p-8 space-y-6">
              {/* Title */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.form.title')} *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={feedbackType === 'bug' ? t('feedback.form.bugPlaceholder') : t('feedback.form.ideaPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                    isDark 
                      ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.form.category')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.category === cat.id
                          ? "bg-[#21f201] text-black"
                          : isDark 
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.form.description')} *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder={
                    feedbackType === 'bug' 
                      ? t('feedback.form.bugDescPlaceholder')
                      : t('feedback.form.ideaDescPlaceholder')
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors resize-none ${
                    isDark 
                      ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>

              {/* URL (for bugs) */}
              {feedbackType === 'bug' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {t('feedback.form.url')}
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                      isDark 
                        ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                </div>
              )}

              {/* Priority (for bugs) */}
              {feedbackType === 'bug' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {t('feedback.form.priority')}
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                      isDark 
                        ? "bg-[#0B0E11] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="low">{t('feedback.priority.low')}</option>
                    <option value="medium">{t('feedback.priority.medium')}</option>
                    <option value="high">{t('feedback.priority.high')}</option>
                    <option value="critical">{t('feedback.priority.critical')}</option>
                  </select>
                </div>
              )}

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                    isDark 
                      ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <p className={`mt-2 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  {t('feedback.form.emailNote')}
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className={`px-6 md:px-8 py-4 border-t ${
              isDark ? "bg-[#0B0E11] border-gray-700" : "bg-gray-50 border-gray-200"
            }`}>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors"
              >
                <HiOutlinePaperAirplane className="w-5 h-5" />
                {t('feedback.submit')}
              </button>
            </div>
          </form>

          {/* FAQ */}
          <div className={`mt-12 rounded-xl border p-6 md:p-8 ${
            isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('feedback.faq.title')}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.faq.howUsed.question')}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t('feedback.faq.howUsed.answer')}
                </p>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.faq.response.question')}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t('feedback.faq.response.answer')}
                </p>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {t('feedback.faq.anonymous.question')}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t('feedback.faq.anonymous.answer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

