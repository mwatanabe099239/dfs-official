'use client'

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineMail,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from 'react-icons/fa';

const ContactUsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'General Inquiry', labelKey: 'contact.categories.general' },
    { value: 'Technical Support', labelKey: 'contact.categories.technical' },
    { value: 'Partnership', labelKey: 'contact.categories.partnership' },
    { value: 'Bug Report', labelKey: 'contact.categories.bugReport' },
    { value: 'Feature Request', labelKey: 'contact.categories.feature' },
    { value: 'Token Approval', labelKey: 'contact.categories.tokenApproval' },
    { value: 'Other', labelKey: 'contact.categories.other' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'General Inquiry',
        message: ''
      });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: HiOutlineMail,
      titleKey: 'contact.methods.email.title',
      descKey: 'contact.methods.email.description',
      value: 'support@dfsscan.com',
      link: 'mailto:support@dfsscan.com'
    },
  ];

  const socialLinks = [
    { icon: FaTwitter, name: 'Twitter', link: '#', color: 'hover:text-gray-600' },
    { icon: FaTelegram, name: 'Telegram', link: '#', color: 'hover:text-gray-600' },
    { icon: FaDiscord, name: 'Discord', link: '#', color: 'hover:text-gray-600' },
    { icon: FaGithub, name: 'GitHub', link: '#', color: 'hover:text-gray-600' },
  ];

  const faqs = [
    { questionKey: 'contact.faq.wallet.question', answerKey: 'contact.faq.wallet.answer' },
    { questionKey: 'contact.faq.tokens.question', answerKey: 'contact.faq.tokens.answer' },
    { questionKey: 'contact.faq.publish.question', answerKey: 'contact.faq.publish.answer' },
    { questionKey: 'contact.faq.approval.question', answerKey: 'contact.faq.approval.answer' },
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
          <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
            }`}>
              <HiOutlineMail className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('contact.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('contact.title')} <span className={isDark ? "text-gray-400" : "text-gray-500"}>{t('contact.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Contact Methods */}
          <div className="flex justify-center mb-12">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.link}
                  className={`p-6 rounded-xl border-l-2 pl-8 text-center transition-all hover:-translate-y-1 w-full max-w-sm ${
                    isDark 
                      ? "bg-[#181A1E] border-[#A0AEC0] hover:bg-[#1a1d23]" 
                      : "bg-white border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}>
                    <Icon className={`w-7 h-7 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t(method.titleKey)}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {t(method.descKey)}
                  </p>
                  <p className={`font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`rounded-xl border-t border-l border-r overflow-hidden h-fit ${
              isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"
            }`}
            style={{
              borderBottomWidth: '4px',
              borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
              boxShadow: isDark
                ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            }}>
              <div className="p-6 md:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t('contact.form.title')}
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <HiOutlineCheckCircle className={`w-8 h-8 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t('contact.success.title')}
                    </h3>
                    <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {t('contact.success.message')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className={`font-semibold hover:underline ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {t('contact.success.sendAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors ${
                            isDark 
                              ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                          placeholder={t('contact.form.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors ${
                            isDark 
                              ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                          placeholder={t('contact.form.emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {t('contact.form.category')} *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors ${
                            isDark 
                              ? "bg-[#0B0E11] border-gray-700 text-white"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{t(cat.labelKey)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {t('contact.form.subject')} *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors ${
                            isDark 
                              ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                          placeholder={t('contact.form.subjectPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors resize-none ${
                          isDark 
                            ? "bg-[#0B0E11] border-gray-700 text-white placeholder-gray-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                        }`}
                        placeholder={t('contact.form.messagePlaceholder')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-space w-full py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 ${
                        isDark 
                          ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" 
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <HiOutlinePaperAirplane className="w-5 h-5" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ & Social */}
            <div className="space-y-8">
              {/* FAQ Section */}
              <div className={`rounded-xl border-t border-l border-r overflow-hidden ${
                isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"
              }`}
              style={{
                borderBottomWidth: '4px',
                borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
                boxShadow: isDark
                  ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
              }}>
                <div className="p-6 md:p-8">
                  <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    <HiOutlineQuestionMarkCircle className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    {t('contact.faq.title')}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${
                        isDark ? "bg-[#0B0E11]" : "bg-gray-50"
                      }`}>
                        <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {t(faq.questionKey)}
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {t(faq.answerKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={`rounded-xl border-t border-l border-r overflow-hidden ${
                isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"
              }`}
              style={{
                borderBottomWidth: '4px',
                borderBottomColor: isDark ? '#6b7280' : '#9ca3af',
                boxShadow: isDark
                  ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
              }}>
                <div className="p-6 md:p-8">
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t('contact.social.title')}
                  </h2>
                  <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {t('contact.social.subtitle')}
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={idx}
                          href={social.link}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                            isDark 
                              ? "bg-[#0B0E11] text-gray-400 hover:bg-gray-800" 
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          } ${social.color}`}
                          title={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className={`p-6 rounded-xl border-l-2 pl-8 ${
                isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"
              }`}>
                <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t('contact.responseTime.title')}
                </h4>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {t('contact.responseTime.message')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

