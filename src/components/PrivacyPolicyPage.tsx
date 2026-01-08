'use client'

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { HiOutlineShieldCheck } from 'react-icons/hi';

const PrivacyPolicyPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const lastUpdated = 'December 26, 2025';

  const sections = [
    {
      title: '1. Introduction',
      content: `Welcome to DFS Chain ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website, applications, and services (collectively, the "Services").

By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.`
    },
    {
      title: '2. Information We Collect',
      content: `We collect several types of information from and about users of our Services:

**Personal Information:**
• Email address (used for account authentication)
• Wallet address (automatically generated upon registration)
• Profile information you choose to provide

**Transaction Information:**
• Transaction history and records
• Token balances and transfers
• Gas fee payments

**Technical Information:**
• IP address
• Browser type and version
• Device information
• Operating system
• Access times and dates
• Pages viewed and interactions

**Usage Information:**
• Features you use
• Actions you take on the platform
• Time spent on various sections`
    },
    {
      title: '3. How We Use Your Information',
      content: `We use the information we collect for various purposes, including:

• **Account Management:** To create and manage your account, authenticate your identity, and provide access to our Services.

• **Service Delivery:** To process transactions, maintain your wallet, and facilitate token operations on the DFS Chain network.

• **Communication:** To send you important updates, security alerts, and service-related notifications.

• **Improvement:** To analyze usage patterns and improve our Services, features, and user experience.

• **Security:** To detect, prevent, and address technical issues, fraud, and unauthorized access.

• **Compliance:** To comply with legal obligations and enforce our terms of service.`
    },
    {
      title: '4. Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

• **Service Providers:** With trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements.

• **Legal Requirements:** When required by law, court order, or governmental authority.

• **Protection of Rights:** To protect our rights, privacy, safety, or property, and that of our users or the public.

• **Business Transfers:** In connection with a merger, acquisition, or sale of assets, with appropriate notice to users.

• **Public Blockchain Data:** Transaction data on DFS Chain is inherently transparent. Wallet addresses and transaction details are publicly visible on our block explorer.`
    },
    {
      title: '5. Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit and at rest
• Secure authentication mechanisms
• Regular security audits and assessments
• Access controls and monitoring
• Employee training on data protection

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.`
    },
    {
      title: '6. Data Retention',
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Factors we consider include:

• The duration of our relationship with you
• Legal obligations requiring data retention
• The need to resolve disputes or enforce agreements
• Business and operational needs

Transaction records on DFS Chain are maintained permanently as part of the blockchain's immutable record.`
    },
    {
      title: '7. Your Rights and Choices',
      content: `Depending on your location, you may have certain rights regarding your personal information:

• **Access:** Request a copy of the personal information we hold about you.

• **Correction:** Request correction of inaccurate or incomplete information.

• **Deletion:** Request deletion of your personal information, subject to certain exceptions.

• **Portability:** Request a copy of your data in a portable format.

• **Opt-Out:** Opt out of certain data processing activities, including marketing communications.

To exercise these rights, please contact us using the information provided below.`
    },
    {
      title: '8. Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to collect information about your browsing activities. These technologies help us:

• Remember your preferences and settings
• Analyze site traffic and usage patterns
• Personalize your experience
• Improve our Services

You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Services.`
    },
    {
      title: '9. Third-Party Links',
      content: `Our Services may contain links to third-party websites, applications, or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of any third-party sites you visit.`
    },
    {
      title: '10. Children\'s Privacy',
      content: `Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`
    },
    {
      title: '11. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Services, you consent to the transfer of your information to these countries.`
    },
    {
      title: '12. Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

We encourage you to review this Privacy Policy periodically for any changes.`
    },
    {
      title: '13. Contact Us',
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** privacy@dfsscan.com
**Website:** https://dfsscan.com

We will respond to your inquiry within a reasonable timeframe.`
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
          <div className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-[#21f201]" : "bg-green-300"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineShieldCheck className="w-4 h-4" />
              {t('privacyPolicy.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('privacyPolicy.title')} <span className="text-[#21f201]">{t('privacyPolicy.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('privacyPolicy.lastUpdated')}: {lastUpdated}
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

export default PrivacyPolicyPage;


