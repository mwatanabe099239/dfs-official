import React from "react";
import FaqItem from "./item/FaqItem";

const FAQ = () => {
  const faqData = [
    {
      question: "What Is DFSWebChain (DWC)?",
      answer: `
      DFSWebChain is a layer 0 blockchain based on the web2 system, unlike web3 blockchains. 
      It is an up-to-date version of the blockchain that is made to be easy, smooth, and least expensive, even for first-time users, without the need to connect to complex wallets like Web3.`,
    },
    {
      question: "What are the main features of DFSWebChain (DWC)?",
      answer: `
The system ensures the safety of your data and transactions and provides reliable monitoring to ensure that everything runs smoothly. Unlike Web3 tools, it can be easily integrated with the Web2 tools you are familiar with, resulting in faster transaction processing and lower costs. Transactions are done quickly and stably, and there are no worries about delays.
It's very easy to connect and works seamlessly with other Web2 platforms, so it's likely to meet the needs of modern society and spread around the world. The community helps make decisions about the operation of the system, and the native token (DFS) is used to pay fees and participate in governance.

      `,
    },
    {
      question: "Does DFSWebChain (DWC) have validators?",
      answer: `      
Unlike validator-based blockchains, DFS Web Chain operates without validators. However, our system focuses on optimized asset, user, and transaction management with high reliability and efficiency. 
It prioritizes seamless operations, secure data processing, and high-performance features for a smoother user experience across a variety of applications.

      `,
    },
    {
      question: "How much does DFSWebChain (DWC) cost?",
      answer: `
We try to offer the lowest rates among the many chains. Per transaction, 0.001$~
It depends on the service content.
      `,
    },
    {
      question:
        "What can we expect from the widespread adoption of DFSWebChain (DWC)?",
      answer: `
As a gateway for those who are frustrated with the Web3 system and for first-time users, it provides the concept and logic of Web3 chains, and DFSWebChain and all web3 chains are connected, so you can create a large market volume.
      `,
    },
  ];

  return (
    <div className="bg-landing-color text-white px-4 py-16 pb-0 sm:px-8 md:px-16 lg:px-24 lg:pt-52 font-space ">
      <div className="text-center mb-14">
        <h2 className="md:text-[3rem] md:leading-[3.5rem] text-4xl  text-[#F7F7F8]">
          FAQ
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
