'use client'

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import FaqItem from "./item/FaqItem";

const FAQ: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const faqData = [
    {
      question: t('home.faq.q1.question'),
      answer: t('home.faq.q1.answer'),
    },
    {
      question: t('home.faq.q2.question'),
      answer: t('home.faq.q2.answer'),
    },
    {
      question: t('home.faq.q3.question'),
      answer: t('home.faq.q3.answer'),
    },
    {
      question: t('home.faq.q4.question'),
      answer: t('home.faq.q4.answer'),
    },
    {
      question: t('home.faq.q5.question'),
      answer: t('home.faq.q5.answer'),
    },
  ];

  return (
    <div className={`px-4 py-16 pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-52 font-space transition-colors duration-300 ${
      isDark ? "bg-landing-color text-white" : "bg-white text-gray-900"
    }`}>
      <div className="text-center mb-14">
        <h2 className={`md:text-[3rem] md:leading-[3.5rem] text-4xl ${
          isDark ? "text-[#F7F7F8]" : "text-gray-900"
        }`}>
          {t('home.faq.title')}
        </h2>
      </div>

      {/* FAQ List */}
      <div>
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
