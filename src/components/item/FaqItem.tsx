'use client'

import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const toggleAnswer = () => setIsOpen(!isOpen);

  return (
    <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <div
        className={`flex justify-between items-center py-4 cursor-pointer ${
          isDark ? "text-white" : "text-gray-900"
        }`}
        onClick={toggleAnswer}
      >
        <span className={`md:text-[3rem] md:leading-[3.5rem] text-[2rem] w-16 ${
          isDark ? "text-[#8C8F9B]" : "text-gray-400"
        }`}>
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <span className="md:text-3xl text-xl text-left px-5">{question}</span>
        <span className="text-4xl">{isOpen ? "-" : "+"}</span>
      </div>

      {/* Answer Section */}
      <div
        className={`overflow-hidden text-start md:px-28 transition-all duration-500 ${
          isOpen ? "max-h-[1000px] p-4" : "max-h-0 p-0"
        }`}
      >
        <pre className={`text-xl leading-[1.75rem] whitespace-pre-line ${
          isDark ? "text-[#C4C5CB]" : "text-gray-600"
        }`}>
          {answer}
        </pre>
      </div>
    </div>
  );
};

export default FaqItem;
