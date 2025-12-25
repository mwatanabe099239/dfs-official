import React, { useState } from "react";

// FAQItem Component
const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => setIsOpen(!isOpen);

  return (
    <div className="border-t border-gray-700">
      <div
        className="flex justify-between items-center py-4 cursor-pointer text-white"
        onClick={toggleAnswer}
      >
        <span className="md:text-[3rem] md:leading-[3.5rem] text-[2rem] w-16 text-[#8C8F9B]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <span className="md:text-3xl text-xl text-left px-5">{question}</span>
        <span className="text-4xl">{isOpen ? "-" : "+"}</span>
      </div>

      {/* Answer Section */}
      <div
        className={`overflow-hidden  text-start md:px-28 transition-all duration-500 ${
          isOpen ? "max-h-[1000px] p-4" : "max-h-0 p-0"
        }`}
      >
        <pre className="text-xl leading-[1.75rem] text-[#C4C5CB] whitespace-pre-line">
          {answer}
        </pre>
      </div>
    </div>
  );
};

export default FaqItem;
