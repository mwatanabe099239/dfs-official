import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { HiOutlineDocumentText } from 'react-icons/hi';

const TermsOfUsePage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const lastUpdated = 'December 26, 2025';

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing, browsing, or using DFS Chain and its related services, including our website, applications, APIs, and any other features or content (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use ("Terms").

If you do not agree to these Terms, you must not access or use our Services. We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes acceptance of any modifications.`
    },
    {
      title: '2. Description of Services',
      content: `DFS Chain is a Web2 simulation platform that replicates blockchain functionality, including:

• **Wallet Services:** Creation and management of digital wallets with unique addresses (dfs_0x...)
• **Token Platform:** Publishing and managing DRC20 tokens through our Whitecreator platform
• **Transaction Processing:** Recording and processing transactions on the simulated blockchain
• **Block Explorer:** Viewing transaction history, blocks, and network data
• **Ecosystem DApps:** Access to various decentralized applications built on DFS Chain

Our Services are provided "as is" and may be modified, suspended, or discontinued at any time without prior notice.`
    },
    {
      title: '3. Account Registration and Security',
      content: `**Account Creation:**
• You must provide a valid email address to create an account
• You must be at least 18 years old to use our Services
• Each person may only create one account
• You are responsible for maintaining the confidentiality of your account credentials

**Account Security:**
• You agree to notify us immediately of any unauthorized access to your account
• You are responsible for all activities that occur under your account
• We are not liable for any loss or damage arising from unauthorized use of your account

**Account Termination:**
• We reserve the right to suspend or terminate accounts that violate these Terms
• You may close your account at any time by contacting us`
    },
    {
      title: '4. Wallet and Token Usage',
      content: `**Wallet Address:**
• Upon registration, you will receive a unique wallet address (dfs_0x...)
• Your wallet address is linked to your account and cannot be transferred
• You are solely responsible for transactions made from your wallet

**DRC20 Tokens:**
• Users may create tokens through the Whitecreator platform
• Only approved tokens can be used in transactions
• Token approval is at our sole discretion
• We do not guarantee the value or utility of any token

**Token Guidelines:**
• Tokens must not infringe on intellectual property rights
• Tokens must not be used for illegal activities
• Tokens must not be misleading or fraudulent
• We reserve the right to revoke token approval at any time`
    },
    {
      title: '5. Prohibited Activities',
      content: `You agree not to:

• Use the Services for any illegal or unauthorized purpose
• Violate any applicable laws, regulations, or third-party rights
• Create or distribute spam, malware, or harmful content
• Attempt to gain unauthorized access to our systems or other users' accounts
• Manipulate or interfere with the proper functioning of the Services
• Engage in market manipulation or fraudulent trading activities
• Use automated systems or bots without authorization
• Impersonate any person or entity
• Collect user data without consent
• Circumvent any security measures or access restrictions
• Use the Services to launder money or finance illegal activities
• Create tokens that impersonate existing cryptocurrencies or securities`
    },
    {
      title: '6. Transaction Policies',
      content: `**Transaction Processing:**
• Transactions are processed in blocks generated every 5 minutes
• Once confirmed, transactions are final and cannot be reversed
• Gas fees are required for all transactions and are non-refundable

**Gas Fees:**
• Gas fees are paid in DRC20_DFS tokens
• Fee amounts may vary based on network conditions
• Insufficient gas will result in failed transactions

**Transaction Limits:**
• We may impose limits on transaction amounts or frequency
• Limits may vary based on account verification status
• Attempting to circumvent limits may result in account suspension`
    },
    {
      title: '7. Intellectual Property',
      content: `**Our Property:**
• DFS Chain, our logo, and related trademarks are our property
• The Services and all content, features, and functionality are owned by us
• You may not copy, modify, or distribute our intellectual property without permission

**Your Content:**
• You retain ownership of content you create or upload
• You grant us a license to use, display, and distribute your content
• You represent that you have the right to share any content you upload

**User Tokens:**
• Tokens you create through Whitecreator remain associated with your account
• You are responsible for ensuring your tokens do not infringe on others' rights`
    },
    {
      title: '8. Disclaimers',
      content: `**No Financial Advice:**
• We do not provide financial, investment, or legal advice
• Use of the Services is at your own risk
• You should conduct your own research before any transactions

**Service Availability:**
• We do not guarantee uninterrupted or error-free service
• We may modify, suspend, or discontinue Services at any time
• We are not responsible for delays or failures due to circumstances beyond our control

**Simulated Environment:**
• DFS Chain is a Web2 simulation, not a traditional blockchain
• Tokens and transactions have no inherent real-world value
• The platform is primarily for educational and ecosystem purposes`
    },
    {
      title: '9. Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• We are not liable for any indirect, incidental, special, consequential, or punitive damages
• We are not liable for loss of profits, data, or other intangible losses
• Our total liability shall not exceed the amount you paid us in the past 12 months
• We are not liable for the actions or content of third parties or other users

This limitation applies regardless of the legal theory upon which the claim is based.`
    },
    {
      title: '10. Indemnification',
      content: `You agree to indemnify, defend, and hold harmless DFS Chain, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from:

• Your use of the Services
• Your violation of these Terms
• Your violation of any third-party rights
• Your content or tokens
• Your negligence or willful misconduct`
    },
    {
      title: '11. Dispute Resolution',
      content: `**Informal Resolution:**
• Before filing any claim, you agree to contact us and attempt to resolve the dispute informally
• We will attempt to resolve disputes within 30 days

**Governing Law:**
• These Terms are governed by the laws of the jurisdiction in which we operate
• Any disputes shall be resolved in the courts of that jurisdiction

**Waiver of Class Action:**
• You agree to resolve disputes on an individual basis
• You waive any right to participate in class action lawsuits`
    },
    {
      title: '12. General Provisions',
      content: `**Entire Agreement:**
• These Terms constitute the entire agreement between you and us
• They supersede any prior agreements or understandings

**Severability:**
• If any provision is found unenforceable, the remaining provisions remain in effect

**No Waiver:**
• Our failure to enforce any right does not waive our right to enforce it later

**Assignment:**
• You may not assign your rights under these Terms without our consent
• We may assign our rights at any time

**Force Majeure:**
• We are not liable for failure to perform due to circumstances beyond our control`
    },
    {
      title: '13. Contact Information',
      content: `If you have any questions about these Terms of Use, please contact us:

**Email:** legal@dfsscan.com
**Website:** https://dfsscan.com

We encourage you to review these Terms periodically. Your continued use of the Services after any changes indicates your acceptance of the new Terms.`
    },
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
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineDocumentText className="w-4 h-4" />
              {t('termsOfUse.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('termsOfUse.title')} <span className="text-[#21f201]">{t('termsOfUse.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('termsOfUse.lastUpdated')}: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-xl border overflow-hidden ${
            isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="p-6 md:p-10">
              {/* Important Notice */}
              <div className={`mb-8 p-4 rounded-lg border-l-4 border-[#21f201] ${
                isDark ? "bg-gray-800/50" : "bg-gray-50"
              }`}>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <strong>Important:</strong> Please read these Terms of Use carefully before using DFS Chain. 
                  By using our Services, you agree to be bound by these Terms. If you do not agree, 
                  please do not use our Services.
                </p>
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className={`mb-8 pb-8 ${
                  idx !== sections.length - 1 
                    ? isDark ? "border-b border-gray-700" : "border-b border-gray-200"
                    : ""
                }`}>
                  <h2 className={`text-xl md:text-2xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {section.title}
                  </h2>
                  <div className={`prose max-w-none text-left ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {section.content.split('\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="mb-3 whitespace-pre-wrap leading-relaxed">
                        {paragraph.split('**').map((part, partIdx) => 
                          partIdx % 2 === 1 
                            ? <strong key={partIdx} className={isDark ? "text-white" : "text-gray-900"}>{part}</strong>
                            : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;


