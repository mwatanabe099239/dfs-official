import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { jsPDF } from 'jspdf';
import { 
  HiOutlineDocument, 
  HiOutlineCube, 
  HiOutlineLightningBolt,
  HiOutlineKey,
  HiOutlineCurrencyDollar,
  HiOutlineChip,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineCode,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineBookOpen,
  HiOutlineDownload,
  HiOutlineSearch,
  HiOutlineExternalLink,
  HiOutlineX
} from 'react-icons/hi';
import { FiHome, FiZap, FiLayers, FiCpu, FiDatabase } from 'react-icons/fi';

const WhitepaperPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation structure matching SquareDocs style
  const navigationStructure = [
    {
      id: 'introduction',
      title: 'Introduction',
      items: [
        { id: 'introduction', title: 'Introduction / Introduction' },
        { id: 'what-is-difines', title: 'What is DIFINES' },
        { id: 'difines-logo', title: 'DIFINES Logo' },
        { id: 'slogan', title: 'Slogan' },
      ]
    },
    {
      id: 'ideas-philosophy',
      title: 'The Ideas and Philosophy of DIFINES',
      items: [
        { id: 'why-decentralize', title: 'Why Decentralize' },
        { id: 'why-web2-simuchain', title: 'Why Web2 SimuChain' },
        { id: 'trust-transparency-freedom', title: '"Trust, transparency, and freedom"' },
        { id: 'simuchain-definition', title: 'A definition of the idea called SimuChain' },
      ]
    },
    {
      id: 'dfs-simuchain-overview',
      title: 'DFS SimuChain 概要',
      items: [
        { id: 'what-is-simuchain', title: 'What is SimuChain' },
        { id: 'reproduce-blockchain-behavior', title: 'How to reproduce the same behavior as blockchain on Web2' },
        { id: 'why-not-real-chain', title: 'Why doesn\'t it have to be a real chain' },
        { id: 'differences-from-centralization', title: 'Differences from centralization (←Important)' },
      ]
    },
    {
      id: 'technical-architecture',
      title: 'Technical Architecture',
      items: [
        { id: 'transaction-structure', title: 'Transaction Structure' },
        { id: 'block-concept', title: 'Block Concept' },
        { id: 'validation-logic', title: 'Validation Logic' },
        { id: 'fraud-prevention', title: 'Fraud Prevention Model' },
        { id: 'scalability', title: 'Scalability' },
        { id: 'api-sdk', title: 'API/SDK Initiative' },
      ]
    },
    {
      id: 'token-design',
      title: 'Token Design (DFS)',
      items: [
        { id: 'dfs-roles', title: 'DFS Roles' },
        { id: 'gas-rate-model', title: 'Gas Rate Model' },
        { id: 'issuance-distribution', title: 'Issuance, Distribution, and Utilization' },
        { id: 'inflation-deflation', title: 'Inflation / Deflation Design' },
        { id: 'digital-gold', title: 'Why DFS is "Digital Gold"' },
      ]
    },
    {
      id: 'ecosystem-structure',
      title: 'Overall Ecosystem Structure',
      items: [
        { id: 'dfs-hub', title: 'DFS Hub of Opportunities' },
        { id: 'dapps-connected', title: 'Structure where all DApps are connected here' },
        { id: 'chain-success-model', title: 'A "chain success" model rather than a single success' },
      ]
    },
    {
      id: 'dapps',
      title: 'DApps',
      items: [
        { id: 'dapps-positioning', title: 'DApps Positioning' },
        { id: 'dapps-list', title: 'DApps List (Future Additional)' },
      ]
    },
    {
      id: 'participation',
      title: 'How to Participate',
      items: [
        { id: 'join-as-user', title: 'Join as User' },
        { id: 'participate-as-developer', title: 'Participate as a Developer' },
        { id: 'participate-as-company', title: 'Participate as a Company' },
        { id: 'partner-system', title: 'Partner System' },
        { id: 'referral-program', title: 'Referral Program' },
      ]
    },
    {
      id: 'community-governance',
      title: 'Community & Governance',
      items: [
        { id: 'community-roles', title: 'Community Roles' },
        { id: 'feedback-flow', title: 'Feedback Flow' },
        { id: 'decision-making', title: 'Decision-Making Mindset' },
        { id: 'manage-together', title: 'Implementation of "Manage Together"' },
      ]
    },
    {
      id: 'faq',
      title: 'FAQ',
      items: [
        { id: 'common-misconceptions', title: 'Common Misconception' },
        { id: 'frequently-asked', title: 'Frequently Asked Questions' },
        { id: 'official-response', title: 'Official Response to Criticism' },
      ]
    },
    {
      id: 'legal',
      title: 'Legal Matter',
      items: [
        { id: 'privacy-policy', title: 'Privacy Policy' },
        { id: 'terms-of-use', title: 'Terms of Use' },
        { id: 'cookie', title: 'Cookie' },
        { id: 'risk-disclosure', title: 'Risk Disclosure' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us & Official Link',
      items: [
        { id: 'official-website', title: 'Official Website' },
        { id: 'sns', title: 'SNS' },
        { id: 'github', title: 'GitHub' },
        { id: 'mail', title: 'Mail' },
      ]
    },
  ];

  // Category cards for hero section
  const categoryCards = [
    {
      id: 'introduction',
      icon: FiHome,
      title: 'Introduction',
      description: 'Learn about DIFINES, logo, slogan, and introduction to DFS SimuChain.',
      targetSection: 'introduction'
    },
    {
      id: 'ideas-philosophy',
      icon: FiZap,
      title: 'Ideas & Philosophy',
      description: 'Understand the philosophy behind decentralization and Web2 SimuChain.',
      targetSection: 'why-decentralize'
    },
    {
      id: 'technical',
      icon: FiDatabase,
      title: 'Technical Architecture',
      description: 'Explore transaction structure, blocks, validation, and scalability.',
      targetSection: 'transaction-structure'
    },
    {
      id: 'token-design',
      icon: FiLayers,
      title: 'Token Design',
      description: 'Learn about DFS roles, gas model, and token economics.',
      targetSection: 'dfs-roles'
    },
  ];

  // Ordered list of all sections for pagination
  const allSections = [
    'introduction',
    'what-is-difines',
    'difines-logo',
    'slogan',
    'why-decentralize',
    'why-web2-simuchain',
    'trust-transparency-freedom',
    'simuchain-definition',
    'what-is-simuchain',
    'reproduce-blockchain-behavior',
    'why-not-real-chain',
    'differences-from-centralization',
    'transaction-structure',
    'block-concept',
    'validation-logic',
    'fraud-prevention',
    'scalability',
    'api-sdk',
    'dfs-roles',
    'gas-rate-model',
    'issuance-distribution',
    'inflation-deflation',
    'digital-gold',
    'dfs-hub',
    'dapps-connected',
    'chain-success-model',
    'dapps-positioning',
    'dapps-list',
    'join-as-user',
    'participate-as-developer',
    'participate-as-company',
    'partner-system',
    'referral-program',
    'community-roles',
    'feedback-flow',
    'decision-making',
    'manage-together',
    'common-misconceptions',
    'frequently-asked',
    'official-response',
    'privacy-policy',
    'terms-of-use',
    'cookie',
    'risk-disclosure',
    'official-website',
    'sns',
    'github',
    'mail'
  ];

  // Get section titles for pagination
  const getSectionTitle = (sectionId) => {
    const titles = {
      'introduction': 'Introduction',
      'what-is-difines': 'What is DIFINES',
      'difines-logo': 'DIFINES Logo',
      'slogan': 'Slogan',
      'why-decentralize': 'Why Decentralize',
      'why-web2-simuchain': 'Why Web2 SimuChain',
      'trust-transparency-freedom': 'Trust, transparency, and freedom',
      'simuchain-definition': 'Definition of SimuChain',
      'what-is-simuchain': 'What is SimuChain',
      'reproduce-blockchain-behavior': 'How to reproduce blockchain behavior on Web2',
      'why-not-real-chain': 'Why doesn\'t it have to be a real chain',
      'differences-from-centralization': 'Differences from centralization',
      'transaction-structure': 'Transaction Structure',
      'block-concept': 'Block Concept',
      'validation-logic': 'Validation Logic',
      'fraud-prevention': 'Fraud Prevention Model',
      'scalability': 'Scalability',
      'api-sdk': 'API/SDK Initiative',
      'dfs-roles': 'DFS Roles',
      'gas-rate-model': 'Gas Rate Model',
      'issuance-distribution': 'Issuance, Distribution, and Utilization',
      'inflation-deflation': 'Inflation / Deflation Design',
      'digital-gold': 'Why DFS is "Digital Gold"',
      'dfs-hub': 'DFS Hub of Opportunities',
      'dapps-connected': 'Structure where all DApps are connected',
      'chain-success-model': 'Chain Success Model',
      'dapps-positioning': 'DApps Positioning',
      'dapps-list': 'DApps List',
      'join-as-user': 'Join as User',
      'participate-as-developer': 'Participate as Developer',
      'participate-as-company': 'Participate as Company',
      'partner-system': 'Partner System',
      'referral-program': 'Referral Program',
      'community-roles': 'Community Roles',
      'feedback-flow': 'Feedback Flow',
      'decision-making': 'Decision-Making Mindset',
      'manage-together': 'Manage Together',
      'common-misconceptions': 'Common Misconceptions',
      'frequently-asked': 'Frequently Asked Questions',
      'official-response': 'Official Response to Criticism',
      'privacy-policy': 'Privacy Policy',
      'terms-of-use': 'Terms of Use',
      'cookie': 'Cookie Policy',
      'risk-disclosure': 'Risk Disclosure',
      'official-website': 'Official Website',
      'sns': 'SNS',
      'github': 'GitHub',
      'mail': 'Mail'
    };
    return titles[sectionId] || sectionId;
  };

  // Get previous and next sections
  const getPreviousSection = () => {
    const currentIndex = allSections.indexOf(activeSection);
    return currentIndex > 0 ? allSections[currentIndex - 1] : null;
  };

  const getNextSection = () => {
    const currentIndex = allSections.indexOf(activeSection);
    return currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;
  };

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination component
  const Pagination = () => {
    const prevSection = getPreviousSection();
    const nextSection = getNextSection();

    if (!prevSection && !nextSection) return null;

    return (
      <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${isDark ? "border-[#1f1f1f]" : "border-gray-200"} flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4`}>
        {prevSection ? (
          <button
            onClick={() => navigateToSection(prevSection)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg transition-colors w-full sm:w-auto ${
              isDark 
                ? "text-gray-400 hover:text-white hover:bg-[#1f1f1f]" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <HiOutlineChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Previous</div>
              <div className="text-sm font-medium truncate">{getSectionTitle(prevSection)}</div>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block"></div>
        )}
        
        {nextSection ? (
          <button
            onClick={() => navigateToSection(nextSection)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg transition-colors w-full sm:w-auto sm:ml-auto ${
              isDark 
                ? "text-gray-400 hover:text-white hover:bg-[#1f1f1f]" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <div className="text-right min-w-0 flex-1 sm:flex-none">
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Next</div>
              <div className="text-sm font-medium truncate">{getSectionTitle(nextSection)}</div>
            </div>
            <HiOutlineChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          </button>
        ) : (
          <div className="hidden sm:block"></div>
        )}
      </div>
    );
  };

  // PDF Generation Function (keeping existing functionality)
  const generatePDF = () => {
    setIsGeneratingPdf(true);
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    const addNewPageIfNeeded = (requiredSpace = 20) => {
      if (yPos + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    const addTitle = (text, fontSize = 24) => {
      addNewPageIfNeeded(20);
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(33, 242, 1);
      doc.text(text, margin, yPos);
      yPos += fontSize * 0.5 + 5;
    };

    const addSubtitle = (text, fontSize = 16) => {
      addNewPageIfNeeded(15);
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text(text, margin, yPos);
      yPos += fontSize * 0.4 + 4;
    };

    const addParagraph = (text, fontSize = 11) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach(line => {
        addNewPageIfNeeded(8);
        doc.text(line, margin, yPos);
        yPos += 6;
      });
      yPos += 4;
    };

    const addBulletPoint = (text, fontSize = 11) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const bulletMargin = margin + 5;
      const bulletContentWidth = contentWidth - 10;
      const lines = doc.splitTextToSize(text, bulletContentWidth);
      
      addNewPageIfNeeded(8);
      doc.setTextColor(33, 242, 1);
      doc.text('•', margin, yPos);
      doc.setTextColor(60, 60, 60);
      
      lines.forEach((line, idx) => {
        if (idx > 0) addNewPageIfNeeded(6);
        doc.text(line, bulletMargin, yPos);
        yPos += 6;
      });
    };

    const addSectionDivider = () => {
      yPos += 5;
      addNewPageIfNeeded(15);
      doc.setDrawColor(33, 242, 1);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;
    };

    // Cover Page
    doc.setFillColor(11, 14, 17);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setFontSize(42);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('DFS SimuChain', pageWidth / 2, 80, { align: 'center' });
    
    doc.setFontSize(32);
    doc.setTextColor(33, 242, 1);
    doc.text('Whitepaper', pageWidth / 2, 100, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(150, 150, 150);
    doc.text('Web2 Simulation of Web3 Blockchain Technology', pageWidth / 2, 120, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Version 1.0 | ' + new Date().toLocaleDateString(), pageWidth / 2, pageHeight - 30, { align: 'center' });

    // Table of Contents
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    yPos = margin;

    addTitle('Table of Contents', 20);
    yPos += 10;

    const tocItems = [
      '1. Introduction',
      '2. Core Concepts',
      '3. Technical Architecture',
      '4. Wallet System',
      '5. DRC20 Token Standard',
      '6. Native Token (DRC20_DFS)',
      '7. Gas Mechanism',
      '8. Use Cases & Ecosystem',
      '9. Roadmap',
      '10. Glossary'
    ];

    tocItems.forEach((item) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(item, margin, yPos);
      yPos += 10;
    });

    // Content sections (abbreviated for brevity - keeping same content generation logic)
    doc.addPage();
    yPos = margin;
    addTitle('1. Introduction');
    addSectionDivider();
    addParagraph('DFS SimuChain represents a paradigm shift in blockchain accessibility — a sophisticated Web2 simulation that faithfully replicates the core mechanics of Web3 blockchain technology without the complexity of traditional decentralized infrastructure.');
    addParagraph('By leveraging familiar Web2 technologies while maintaining blockchain-like semantics, DFS SimuChain provides developers and users with a seamless on-ramp to understanding and utilizing blockchain concepts.');

    // Save the PDF
    doc.save('DFS_SimuChain_Whitepaper.pdf');
    setIsGeneratingPdf(false);
  };

  const glossaryTerms = [
    { term: 'Block', definition: 'A container that holds multiple transactions. In DFS SimuChain, one block is generated every 5 minutes and can contain thousands of transactions.' },
    { term: 'Transaction', definition: 'A record of value or data transfer between addresses. Transaction hashes start with dfs_0x... for easy identification.' },
    { term: 'Gas', definition: 'The unit measuring computational effort. Users pay gas fees in DRC20_DFS tokens to process transactions.' },
    { term: 'Wallet Address', definition: 'A unique identifier for user accounts, formatted as dfs_0x... Each address is derived from user authentication.' },
    { term: 'DRC20', definition: 'The token standard for DFS SimuChain, similar to ERC20. Token addresses start with drc20_0x...' },
    { term: 'DRC20_DFS', definition: 'The native token of DFS SimuChain used for gas fees and network operations.' },
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}>
      {/* Glowing background effect - subtle */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#6366f1]/8 rounded-full blur-[180px]"></div>
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[150px]"></div>
        </div>
      )}
      
      <div className="relative md:px-20 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Mobile Header with Hamburger */}
          <div className="lg:hidden sticky top-0 z-30 mb-4">
            <div className={`flex items-center justify-between p-4 rounded-lg border ${
              isDark ? "bg-[#141414] border-[#2a2a2a]" : "bg-white border-gray-200"
            }`}>
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setExpandedFaq(expandedFaq === 'mobile-menu' ? null : 'mobile-menu')}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "text-white hover:bg-[#1a1a1a]" : "text-gray-900 hover:bg-gray-100"
                }`}
                aria-label="Toggle menu"
              >
                {expandedFaq === 'mobile-menu' ? (
                  <HiOutlineX className="w-6 h-6" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              
              {/* Mobile Search */}
              <div className={`relative flex items-center rounded-lg border flex-1 max-w-xs ml-4 ${
                isDark ? "bg-[#0d0d0d] border-[#2a2a2a]" : "bg-gray-50 border-gray-200"
              }`}>
                <HiOutlineSearch className={`absolute left-3 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 text-sm rounded-lg outline-none ${
                    isDark ? "bg-transparent text-white placeholder-gray-500" : "bg-transparent text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Mobile Overlay Menu */}
          <>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
                expandedFaq === 'mobile-menu' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setExpandedFaq(null)}
            />
            
            {/* Side Menu */}
            <div className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
              expandedFaq === 'mobile-menu' ? 'translate-x-0' : '-translate-x-full'
            } ${isDark ? "bg-[#0d0d0d] border-r border-[#1a1a1a]" : "bg-white border-r border-gray-200"}`}>
                {/* Menu Header */}
                <div className={`flex items-center justify-between p-4 border-b ${
                  isDark ? "border-[#1a1a1a]" : "border-gray-200"
                }`}>
                  <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Menu
                  </h2>
                  <button
                    onClick={() => setExpandedFaq(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? "text-gray-400 hover:text-white hover:bg-[#1a1a1a]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="h-[calc(100vh-73px)] overflow-y-auto p-4">
                  {navigationStructure.map((category) => (
                    <div key={category.id} className="mb-6">
                      <h3 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {category.title}
                </h3>
                      <div className="ml-0.5">
                        {category.items.map((item) => (
                      <button
                            key={item.id}
                            onClick={() => {
                              navigateToSection(item.id);
                              setExpandedFaq(null);
                            }}
                            className={`w-full text-left pl-3 py-2.5 text-sm transition-colors border-l-2 -ml-[2px] rounded-r-lg ${
                              activeSection === item.id
                                ? `border-[#6366f1] ${isDark ? "text-white bg-[#6366f1]/10" : "text-gray-900 bg-blue-50"}`
                                : `${isDark ? "border-[#2a2a2a] text-gray-500 hover:text-gray-300 hover:bg-[#141414]" : "border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`
                            }`}
                          >
                            {item.title}
                      </button>
                        ))}
              </div>
            </div>
                  ))}
                </nav>
              </div>
          </>

          {/* Left Sidebar - SquareDocs Style */}
          <aside className={`hidden lg:block w-64 h-screen sticky top-0 overflow-y-auto border-r ${
            isDark ? "bg-transparent border-[#1a1a1a]" : "bg-white border-gray-200"
          }`}>
          {/* Search Bar */}
          <div className="p-4">
            <div className={`relative flex items-center rounded-lg border ${
              isDark ? "bg-[#141414] border-[#2a2a2a]" : "bg-gray-50 border-gray-200"
            }`}>
              <HiOutlineSearch className={`absolute left-3 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-12 py-2.5 text-sm rounded-lg outline-none ${
                  isDark ? "bg-transparent text-white placeholder-gray-500" : "bg-transparent text-gray-900 placeholder-gray-400"
                }`}
              />
              <span className={`absolute right-3 text-xs px-1.5 py-0.5 rounded border ${
                isDark ? "bg-[#1a1a1a] border-[#2a2a2a] text-gray-500" : "bg-gray-100 border-gray-200 text-gray-400"
              }`}>
                ⌘K
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="pl-4 pr-4 pb-8">
            {navigationStructure.map((category) => (
              <div key={category.id} className="mb-6">
                {/* Category Title - Left aligned */}
                <h3 className={`text-sm font-bold mb-2 text-left ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                  {category.title}
                </h3>
                
                {/* Items with left border line like SquareDocs */}
                <div className="ml-0.5">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToSection(item.id)}
                      className={`w-full text-left pl-3 py-1.5 text-sm transition-colors border-l-2 -ml-[2px] ${
                        activeSection === item.id
                          ? `border-[#6366f1] ${isDark ? "text-white" : "text-gray-900"}`
                          : `${isDark ? "border-[#2a2a2a] text-gray-500 hover:text-gray-300" : "border-gray-200 text-gray-500 hover:text-gray-700"}`
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative w-full min-w-0">
          <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:pl-8 text-left">
            
            {/* Content based on active section */}
            <div className={`max-w-none text-left ${isDark ? "" : ""}`}>
              
              {/* Introduction Page */}
              {activeSection === 'introduction' && (
                <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Introduction
                </h2>
                
                <div className={`space-y-3 sm:space-y-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="leading-relaxed text-sm sm:text-base text-left">
                    Welcome to the DFS SimuChain Whitepaper. This document provides a comprehensive overview of 
                    DIFINES and the DFS SimuChain ecosystem, including its philosophy, technical architecture, 
                    token design, and participation methods.
                  </p>
                  
                  <p className="leading-relaxed text-sm sm:text-base text-left">
                    DFS SimuChain represents a paradigm shift in blockchain accessibility — a sophisticated Web2 
                    simulation that faithfully replicates the core mechanics of Web3 blockchain technology 
                    without the complexity of traditional decentralized infrastructure.
                  </p>

                  <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                    isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                  }`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Purpose of This Document
                    </h4>
                    <p className="text-sm">
                      This whitepaper serves as the definitive guide to understanding DFS SimuChain, its 
                      architecture, tokenomics, ecosystem, and how to participate as a user, developer, 
                      or company.
                    </p>
                  </div>
                </div>
                <Pagination />
              </section>
              )}

              {/* What is DIFINES */}
              {activeSection === 'what-is-difines' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    What is DIFINES
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DIFINES is the organization behind DFS SimuChain, dedicated to creating an accessible 
                      blockchain simulation platform that bridges Web2 and Web3 technologies.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Our Mission
                      </h3>
                      <p className="text-sm">
                        To democratize blockchain technology by providing an accessible, scalable, and 
                        user-friendly simulation environment that enables developers and users to understand 
                        and utilize blockchain concepts without the barriers of traditional Web3 infrastructure.
                      </p>
                    </div>

                    <h3 className={`text-lg font-bold mt-6 mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Core Values
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { title: 'Accessibility', desc: 'Making blockchain technology accessible to everyone' },
                        { title: 'Innovation', desc: 'Pioneering Web2 simulation of Web3 concepts' },
                        { title: 'Transparency', desc: 'Open and transparent operations' },
                        { title: 'Community', desc: 'Building a strong, engaged community' },
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* DIFINES Logo */}
              {activeSection === 'difines-logo' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    DIFINES Logo
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      The DIFINES logo represents our commitment to bridging Web2 and Web3 technologies, 
                      symbolizing innovation, accessibility, and the future of blockchain simulation.
                    </p>
                    
                    <div className={`p-6 rounded-xl border flex items-center justify-center ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <img 
                        src="/logo.png" 
                        alt="DIFINES Logo" 
                        className="h-32 w-auto brightness-0"
                      />
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Logo Usage Guidelines
                      </h4>
                      <p className="text-sm">
                        The DIFINES logo should be used in accordance with our brand guidelines. 
                        For official logo files and usage permissions, please contact our team.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Slogan */}
              {activeSection === 'slogan' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Slogan
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-8 rounded-xl border-l-4 border-[#6366f1] text-center ${
                      isDark ? "bg-[#6366f1]/10 border-[#6366f1]" : "bg-blue-50 border-blue-500"
                    }`}>
                      <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        "Bridging Web2 and Web3"
                      </h3>
                      <p className="text-sm sm:text-base italic">
                        Making blockchain accessible through Web2 simulation
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-left">
                      Our slogan encapsulates our mission to create a seamless bridge between the familiar 
                      Web2 environment and the innovative world of Web3 blockchain technology. We believe 
                      that blockchain concepts should be accessible to everyone, regardless of technical 
                      expertise.
                    </p>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Why Decentralize */}
              {activeSection === 'why-decentralize' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Why Decentralize
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Decentralization represents a fundamental shift from traditional centralized systems 
                      to distributed networks where power and control are shared among participants rather 
                      than concentrated in a single authority.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Benefits of Decentralization
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Reduced single points of failure',
                          'Increased transparency and trust',
                          'Greater resistance to censorship',
                          'Enhanced security through distribution',
                          'Democratic governance models',
                          'Reduced dependency on intermediaries'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#6366f1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain embraces decentralization principles while providing the accessibility 
                      and user experience of Web2 technologies, creating a unique hybrid approach that 
                      combines the best of both worlds.
                    </p>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Why Web2 SimuChain */}
              {activeSection === 'why-web2-simuchain' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Why Web2 SimuChain
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Traditional Web3 blockchain technology, while revolutionary, presents significant 
                      barriers to entry including complex wallet management, high gas fees, slow 
                      transaction times, and steep learning curves.
                    </p>
                    
                    <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        The Web2 SimuChain Advantage
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Familiar UX:</strong>
                          <span className="ml-2">Email-based authentication instead of seed phrases</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Lower Costs:</strong>
                          <span className="ml-2">Predictable, affordable transaction fees</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Faster Transactions:</strong>
                          <span className="ml-2">5-minute block times with high throughput</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Accessibility:</strong>
                          <span className="ml-2">No need for complex technical knowledge</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-left">
                      By simulating blockchain behavior using Web2 infrastructure, we maintain the 
                      core benefits of decentralization while removing the barriers that prevent 
                      mainstream adoption.
                    </p>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Trust, Transparency, and Freedom */}
              {activeSection === 'trust-transparency-freedom' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    "Trust, Transparency, and Freedom"
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-6 rounded-xl border-l-4 border-[#6366f1] text-center ${
                      isDark ? "bg-[#6366f1]/10" : "bg-blue-50"
                    }`}>
                      <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        "Trust, Transparency, and Freedom"
                      </h3>
                      <p className="text-sm sm:text-base italic">
                        The three pillars of DFS SimuChain
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { 
                          title: 'Trust', 
                          desc: 'Building trust through reliable infrastructure, consistent performance, and transparent operations. Users can trust that their transactions will be processed correctly and their assets are secure.',
                          icon: '🤝'
                        },
                        { 
                          title: 'Transparency', 
                          desc: 'All transactions are publicly verifiable, block data is accessible, and governance decisions are made openly. We believe transparency builds stronger communities.',
                          icon: '👁️'
                        },
                        { 
                          title: 'Freedom', 
                          desc: 'Freedom to create, innovate, and participate without barriers. Freedom from intermediaries, censorship, and restrictive gatekeepers.',
                          icon: '🕊️'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <div className="text-3xl mb-3">{item.icon}</div>
                          <h4 className={`font-semibold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* SimuChain Definition */}
              {activeSection === 'simuchain-definition' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    A Definition of the Idea Called SimuChain
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-6 rounded-xl border ${
                      isDark ? "border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1]/10 to-transparent" : "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        What is SimuChain?
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed">
                        <strong>SimuChain</strong> is a revolutionary concept that simulates blockchain behavior 
                        using Web2 infrastructure. It replicates the core mechanics of blockchain technology — 
                        including blocks, transactions, gas fees, and token standards — while operating on 
                        traditional centralized servers.
                      </p>
                    </div>

                    <h3 className={`text-lg font-bold mt-6 mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Key Characteristics
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Blockchain-like semantics: Transactions, blocks, and addresses behave like real blockchain',
                        'Web2 infrastructure: Runs on traditional servers for reliability and scalability',
                        'Accessibility: No complex wallet management or high barriers to entry',
                        'Compatibility: Works with existing Web2 tools and technologies',
                        'Educational: Helps users understand blockchain concepts before moving to Web3'
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <div className="flex items-start gap-3">
                            <span className="text-[#6366f1] font-bold">{idx + 1}.</span>
                            <span className="text-sm">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-amber-500 ${
                      isDark ? "bg-amber-500/5" : "bg-amber-50"
                    }`}>
                      <p className="text-sm">
                        <strong>Note:</strong> SimuChain is not a replacement for true blockchain technology, 
                        but rather a bridge that makes blockchain concepts accessible and understandable 
                        through familiar Web2 technologies.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* What is SimuChain */}
              {activeSection === 'what-is-simuchain' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    What is SimuChain
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain is a Web2-based simulation platform that replicates blockchain behavior 
                      and semantics. It provides all the core features of blockchain technology — transactions, 
                      blocks, tokens, and gas — while operating on traditional Web2 infrastructure.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Core Features
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Block-based transaction processing',
                          'DRC20 token standard',
                          'Gas fee mechanism',
                          'Wallet addresses (dfs_0x format)',
                          'Transaction history and verification',
                          'Block explorer functionality'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#6366f1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* How to Reproduce Blockchain Behavior */}
              {activeSection === 'reproduce-blockchain-behavior' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    How to Reproduce the Same Behavior as Blockchain on Web2
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain achieves blockchain-like behavior through careful architectural design 
                      that mimics key blockchain concepts using Web2 technologies.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Blocks',
                          desc: 'Transactions are grouped into blocks that are generated every 5 minutes. Each block contains a hash, timestamp, and list of transactions, similar to blockchain blocks.',
                          icon: '📦'
                        },
                        {
                          title: 'Transactions',
                          desc: 'All transactions are recorded with unique hashes (dfs_0x format), timestamps, and are immutable once confirmed in a block.',
                          icon: '📝'
                        },
                        {
                          title: 'State Management',
                          desc: 'Account balances and token states are maintained in a centralized database but follow blockchain-like update rules.',
                          icon: '💾'
                        },
                        {
                          title: 'Gas Mechanism',
                          desc: 'Transactions require gas fees paid in DFS tokens, preventing spam and allocating resources fairly.',
                          icon: '⛽'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                            <span>{item.icon}</span>
                            {item.title}
                          </h3>
                          <p className="text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Why Not Real Chain */}
              {activeSection === 'why-not-real-chain' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Why Doesn't It Have to Be a Real Chain
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain intentionally uses Web2 infrastructure rather than building a true 
                      blockchain. This design decision provides significant advantages for our use case.
                    </p>
                    
                    <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Key Advantages of Simulation Approach
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Accessibility:</strong>
                          <span className="ml-2">No need for complex consensus mechanisms or validator networks</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Performance:</strong>
                          <span className="ml-2">Faster transaction processing without waiting for network consensus</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>Cost Efficiency:</strong>
                          <span className="ml-2">Lower operational costs without maintaining a distributed network</span>
                        </div>
                        <div>
                          <strong className={isDark ? "text-white" : "text-gray-900"}>User Experience:</strong>
                          <span className="ml-2">Familiar Web2 UX while learning blockchain concepts</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-left">
                      For many applications, especially educational and transitional use cases, a simulation 
                      that maintains blockchain semantics provides the benefits without the complexity. 
                      Users can learn and understand blockchain concepts before transitioning to true Web3 
                      blockchains when needed.
                    </p>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Differences from Centralization */}
              {activeSection === 'differences-from-centralization' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Differences from Centralization (←Important)
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-5 rounded-xl border-l-4 border-red-500 ${
                      isDark ? "bg-red-500/5" : "bg-red-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        ⚠️ Important Distinction
                      </h4>
                      <p className="text-sm">
                        While DFS SimuChain uses Web2 infrastructure, it is NOT a traditional centralized 
                        system. We maintain key decentralization principles through transparency, 
                        immutability, and user control.
                      </p>
                    </div>

                    <h3 className={`text-lg font-bold mt-6 mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      How We Differ from Centralization
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Transparency',
                          desc: 'All transactions and blocks are publicly verifiable, unlike traditional centralized systems where data is hidden.',
                          vs: 'Centralized: Private databases, hidden transactions'
                        },
                        {
                          title: 'Immutability',
                          desc: 'Once confirmed in a block, transactions cannot be altered or deleted, maintaining blockchain-like integrity.',
                          vs: 'Centralized: Data can be modified or deleted by administrators'
                        },
                        {
                          title: 'User Control',
                          desc: 'Users control their own wallets and assets. No single entity can freeze or confiscate funds.',
                          vs: 'Centralized: Platform can freeze accounts or reverse transactions'
                        },
                        {
                          title: 'Open Standards',
                          desc: 'Public APIs and standards allow anyone to build on the platform without permission.',
                          vs: 'Centralized: Requires platform approval and API access'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-sm mb-2">{item.desc}</p>
                          <p className={`text-xs italic ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                            vs. Centralized: {item.vs}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Transaction Structure */}
              {activeSection === 'transaction-structure' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Transaction Structure
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Transactions in DFS SimuChain follow a structured format that mimics blockchain 
                      transaction semantics while operating on Web2 infrastructure.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Transaction Components
                      </h3>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">hash:</span>
                          <span>dfs_0x7a8b9c...</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">from:</span>
                          <span>dfs_0x1a2b3c...</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">to:</span>
                          <span>dfs_0x4d5e6f...</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">value:</span>
                          <span>100 DFS</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">gas:</span>
                          <span>21000</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[#6366f1]">timestamp:</span>
                          <span>2024-01-15 10:30:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Block Concept */}
              {activeSection === 'block-concept' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Block Concept
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Blocks are containers that hold multiple transactions. In DFS SimuChain, one block 
                      is generated every 5 minutes and can contain thousands of transactions.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Block Structure
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Block Number: Sequential identifier',
                          'Block Hash: Unique identifier (dfs_0x...)',
                          'Previous Hash: Links to previous block',
                          'Timestamp: When block was created',
                          'Transactions: List of transaction hashes',
                          'Transaction Count: Number of transactions in block'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#6366f1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <p className="text-sm">
                        <strong>Block Time:</strong> Blocks are generated every 5 minutes, providing 
                        predictable confirmation times while maintaining high throughput.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Validation Logic */}
              {activeSection === 'validation-logic' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Validation Logic
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      All transactions undergo validation before being included in a block. The validation 
                      process ensures transaction integrity and prevents invalid operations.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        {
                          step: '1. Signature Verification',
                          desc: 'Verify transaction signature matches sender address'
                        },
                        {
                          step: '2. Balance Check',
                          desc: 'Ensure sender has sufficient balance (including gas fees)'
                        },
                        {
                          step: '3. Gas Validation',
                          desc: 'Verify gas amount is sufficient for transaction type'
                        },
                        {
                          step: '4. Format Validation',
                          desc: 'Check transaction format and required fields'
                        },
                        {
                          step: '5. Nonce Check',
                          desc: 'Verify transaction nonce to prevent replay attacks'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.step}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Fraud Prevention Model */}
              {activeSection === 'fraud-prevention' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Fraud Prevention Model
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain implements multiple layers of fraud prevention to ensure system 
                      security and transaction integrity.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Gas Fees',
                          desc: 'Prevents spam by requiring fees for all transactions'
                        },
                        {
                          title: 'Rate Limiting',
                          desc: 'Limits transaction frequency per address'
                        },
                        {
                          title: 'Transaction Signing',
                          desc: 'All transactions require cryptographic signatures'
                        },
                        {
                          title: 'Immutable Records',
                          desc: 'Once confirmed, transactions cannot be altered'
                        },
                        {
                          title: 'Monitoring Systems',
                          desc: 'Automated detection of suspicious patterns'
                        },
                        {
                          title: 'Address Verification',
                          desc: 'Email-based authentication prevents fake accounts'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Scalability */}
              {activeSection === 'scalability' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Scalability
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain is designed for high scalability, capable of handling thousands of 
                      transactions per second while maintaining low latency.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Scalability Features
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Horizontal scaling: Add servers as needed',
                          'Database optimization: Efficient indexing and querying',
                          'Caching layers: Reduce database load',
                          'Load balancing: Distribute traffic across servers',
                          'Batch processing: Process multiple transactions efficiently',
                          'CDN integration: Fast content delivery'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#6366f1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-green-500 ${
                      isDark ? "bg-green-500/5" : "bg-green-50"
                    }`}>
                      <p className="text-sm">
                        <strong>Performance Target:</strong> Support for 10,000+ transactions per second 
                        with sub-second confirmation times for most transactions.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* API/SDK Initiative */}
              {activeSection === 'api-sdk' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    API/SDK Initiative
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain provides comprehensive APIs and SDKs to enable developers to easily 
                      integrate and build on the platform.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'REST API',
                          desc: 'RESTful endpoints for all platform operations',
                          features: ['Transaction submission', 'Balance queries', 'Block information', 'Token operations']
                        },
                        {
                          title: 'WebSocket API',
                          desc: 'Real-time updates and notifications',
                          features: ['Transaction confirmations', 'Block updates', 'Balance changes', 'Event streams']
                        },
                        {
                          title: 'JavaScript SDK',
                          desc: 'Easy integration for web applications',
                          features: ['Wallet management', 'Transaction building', 'Token operations', 'Event handling']
                        },
                        {
                          title: 'Python SDK',
                          desc: 'Python library for backend integration',
                          features: ['Server-side operations', 'Automation scripts', 'Data analysis', 'Bot development']
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs mb-3">{item.desc}</p>
                          <ul className="space-y-1 text-xs">
                            {item.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-[#6366f1] mt-0.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* DFS Roles */}
              {activeSection === 'dfs-roles' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    DFS Roles
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS (DIFINES SimuChain) token serves multiple critical roles within the ecosystem, 
                      functioning as both a utility token and a store of value.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Gas Fees',
                          desc: 'DFS is used to pay for transaction fees, ensuring network sustainability and preventing spam.',
                          icon: '⛽'
                        },
                        {
                          title: 'Staking',
                          desc: 'Users can stake DFS to earn rewards and participate in governance.',
                          icon: '💰'
                        },
                        {
                          title: 'Token Creation',
                          desc: 'DFS is required to create new DRC20 tokens on the platform.',
                          icon: '🪙'
                        },
                        {
                          title: 'Governance',
                          desc: 'DFS holders can vote on platform proposals and decisions.',
                          icon: '🗳️'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Gas Rate Model */}
              {activeSection === 'gas-rate-model' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Gas Rate Model
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Gas fees in DFS SimuChain are calculated based on transaction complexity and network 
                      conditions, ensuring fair resource allocation while maintaining affordability.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Gas Fee Structure
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Simple Transfer:</span>
                          <span className="font-mono">21,000 gas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Token Transfer:</span>
                          <span className="font-mono">65,000 gas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Token Creation:</span>
                          <span className="font-mono">500,000 gas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Smart Contract Call:</span>
                          <span className="font-mono">Variable</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <p className="text-sm">
                        <strong>Gas Price:</strong> Gas prices are set dynamically based on network 
                        demand, ensuring transactions remain affordable while preventing spam.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Issuance, Distribution, and Utilization */}
              {activeSection === 'issuance-distribution' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Issuance, Distribution, and Utilization
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Token Issuance
                    </h3>
                    <p className="text-sm sm:text-base text-left">
                      DFS tokens are issued according to a predefined schedule, with mechanisms in place 
                      to ensure sustainable growth and prevent inflation.
                    </p>
                    
                    <h3 className={`text-lg font-bold mt-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Distribution Model
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { title: 'Community Rewards', percentage: '40%' },
                        { title: 'Development Fund', percentage: '25%' },
                        { title: 'Staking Rewards', percentage: '20%' },
                        { title: 'Partnerships', percentage: '15%' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{item.title}</span>
                            <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                              {item.percentage}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className={`text-lg font-bold mt-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Utilization
                    </h3>
                    <p className="text-sm sm:text-base text-left">
                      DFS tokens are utilized across the platform for gas fees, staking, governance, 
                      and as a medium of exchange within the ecosystem.
                    </p>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Inflation / Deflation Design */}
              {activeSection === 'inflation-deflation' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Inflation / Deflation Design
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS tokenomics are designed to balance supply and demand, with mechanisms for both 
                      inflation (through rewards) and deflation (through fee burning).
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className={`p-5 rounded-xl border ${
                        isDark ? "border-green-500/30 bg-green-500/5" : "border-green-200 bg-green-50"
                      }`}>
                        <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          Inflation Mechanisms
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Staking rewards</li>
                          <li>• Community incentives</li>
                          <li>• Developer grants</li>
                        </ul>
                      </div>
                      <div className={`p-5 rounded-xl border ${
                        isDark ? "border-red-500/30 bg-red-500/5" : "border-red-200 bg-red-50"
                      }`}>
                        <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          Deflation Mechanisms
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Transaction fee burning</li>
                          <li>• Token buybacks</li>
                          <li>• Reduced reward rates over time</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Why DFS is Digital Gold */}
              {activeSection === 'digital-gold' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Why DFS is "Digital Gold"
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS shares key characteristics with gold, making it a digital store of value 
                      within the DFS SimuChain ecosystem.
                    </p>
                    
                    <div className={`p-6 rounded-xl border-l-4 border-amber-500 ${
                      isDark ? "bg-amber-500/10" : "bg-amber-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Characteristics of Digital Gold
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: 'Limited Supply',
                            desc: 'Fixed maximum supply prevents unlimited inflation'
                          },
                          {
                            title: 'Store of Value',
                            desc: 'Maintains value over time through deflationary mechanisms'
                          },
                          {
                            title: 'Utility',
                            desc: 'Required for platform operations, ensuring constant demand'
                          },
                          {
                            title: 'Divisibility',
                            desc: 'Can be divided into small units for micro-transactions'
                          },
                          {
                            title: 'Portability',
                            desc: 'Digital nature allows instant transfer anywhere'
                          },
                          {
                            title: 'Verifiability',
                            desc: 'All transactions are publicly verifiable on the blockchain'
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <span className="text-amber-500 font-bold">{idx + 1}.</span>
                            <div>
                              <strong className={isDark ? "text-white" : "text-gray-900"}>{item.title}:</strong>
                              <span className="ml-2 text-sm">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* DFS Hub of Opportunities */}
              {activeSection === 'dfs-hub' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    DFS Hub of Opportunities
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS Hub serves as the central platform connecting all participants in the DFS SimuChain 
                      ecosystem, providing opportunities for users, developers, and companies.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { title: 'For Users', desc: 'Access dApps, manage tokens, participate in governance' },
                        { title: 'For Developers', desc: 'Build dApps, access APIs, receive grants' },
                        { title: 'For Companies', desc: 'Integrate services, partner programs, enterprise solutions' },
                        { title: 'For Partners', desc: 'Collaboration opportunities, revenue sharing' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-xl border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-base mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Structure where all DApps are connected */}
              {activeSection === 'dapps-connected' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Structure where all DApps are connected here
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      All dApps built on DFS SimuChain are interconnected through the DFS Hub, creating 
                      a unified ecosystem where applications can interact and share resources.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Interconnection Benefits
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Shared user base across all dApps',
                          'Unified wallet and authentication',
                          'Cross-dApp token compatibility',
                          'Shared infrastructure and APIs',
                          'Collaborative governance'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#6366f1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Chain Success Model */}
              {activeSection === 'chain-success-model' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    A "Chain Success" Model rather than a Single Success
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain follows a "chain success" model where the success of the entire 
                      ecosystem benefits all participants, rather than focusing on individual dApp success.
                    </p>
                    
                    <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Key Principles
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>• <strong>Shared Growth:</strong> Success of one dApp benefits the entire chain</p>
                        <p>• <strong>Network Effects:</strong> More dApps = more value for all</p>
                        <p>• <strong>Collaboration:</strong> dApps work together rather than compete</p>
                        <p>• <strong>Ecosystem Value:</strong> Focus on overall ecosystem health</p>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* DApps Positioning */}
              {activeSection === 'dapps-positioning' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    DApps Positioning
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Why don't you create an individual WP
                    </h3>
                    <p className="text-sm sm:text-base text-left">
                      Instead of each dApp creating its own whitepaper, dApps on DFS SimuChain are 
                      integrated into the ecosystem whitepaper, emphasizing unity and shared vision.
                    </p>
                    
                    <h3 className={`text-lg font-bold mt-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Why Integrate
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        'Unified ecosystem vision',
                        'Shared infrastructure and standards',
                        'Cross-dApp compatibility',
                        'Collective governance',
                        'Reduced fragmentation'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#6366f1] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* DApps List */}
              {activeSection === 'dapps-list' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    DApps List (Future Additional)
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Each dApp listed in the ecosystem follows a standardized format for documentation.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        DApp Documentation Template
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Overview:</strong> General description and purpose</li>
                        <li>• <strong>Problem Solved:</strong> What problem does this dApp address</li>
                        <li>• <strong>Relationship with DFS:</strong> How it integrates with DFS token</li>
                        <li>• <strong>Transaction Occurrence Point:</strong> When transactions occur</li>
                        <li>• <strong>Revenue Model:</strong> How the dApp generates revenue</li>
                        <li>• <strong>User/Company Benefits:</strong> Value proposition</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border-l-4 border-amber-500 ${
                      isDark ? "bg-amber-500/5" : "bg-amber-50"
                    }`}>
                      <p className="text-sm">
                        <strong>Note:</strong> This section will be expanded as new dApps are added to 
                        the ecosystem. Each dApp will follow the template above for consistency.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Join as User */}
              {activeSection === 'join-as-user' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Join as User
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Getting started as a user on DFS SimuChain is simple and requires no technical 
                      knowledge.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        { step: '1. Sign Up', desc: 'Create an account using your email address' },
                        { step: '2. Get Wallet', desc: 'A wallet address is automatically generated' },
                        { step: '3. Acquire DFS', desc: 'Obtain DFS tokens for transactions' },
                        { step: '4. Explore dApps', desc: 'Browse and use dApps in the ecosystem' },
                        { step: '5. Participate', desc: 'Join governance, stake tokens, earn rewards' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.step}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Participate as Developer */}
              {activeSection === 'participate-as-developer' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Participate as a Developer
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Developers can build dApps on DFS SimuChain using our APIs and SDKs.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Developer Resources
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Comprehensive API documentation</li>
                        <li>• JavaScript and Python SDKs</li>
                        <li>• Developer grants and funding</li>
                        <li>• Technical support and community</li>
                        <li>• dApp deployment tools</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Participate as Company */}
              {activeSection === 'participate-as-company' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Participate as a Company
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Companies can integrate DFS SimuChain into their services or become partners.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Enterprise Integration', desc: 'Integrate DFS SimuChain into your business' },
                        { title: 'Partnership Programs', desc: 'Become an official partner' },
                        { title: 'Custom Solutions', desc: 'Tailored solutions for your needs' },
                        { title: 'Support', desc: 'Dedicated enterprise support' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Partner System */}
              {activeSection === 'partner-system' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Partner System
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Our partner system enables organizations to collaborate with DFS SimuChain.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Partner Benefits
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Revenue sharing opportunities</li>
                        <li>• Co-marketing and promotion</li>
                        <li>• Technical support and resources</li>
                        <li>• Early access to new features</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Referral Program */}
              {activeSection === 'referral-program' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Referral Program
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Earn rewards by referring new users to DFS SimuChain.
                    </p>
                    
                    <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        How It Works
                      </h4>
                      <p className="text-sm">
                        Share your referral link with friends and colleagues. When they sign up and 
                        complete certain actions, both you and your referral earn DFS rewards.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Community Roles */}
              {activeSection === 'community-roles' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Community Roles
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      The DFS SimuChain community consists of various roles, each contributing to the 
                      ecosystem's growth.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { role: 'Users', desc: 'Active participants using dApps and services' },
                        { role: 'Developers', desc: 'Building dApps and contributing code' },
                        { role: 'Validators', desc: 'Maintaining network integrity' },
                        { role: 'Ambassadors', desc: 'Promoting the ecosystem' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.role}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Feedback Flow */}
              {activeSection === 'feedback-flow' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Feedback Flow
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Community feedback is collected, reviewed, and incorporated into platform development.
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        'Submit feedback through official channels',
                        'Community discussion and voting',
                        'Review by development team',
                        'Implementation planning',
                        'Release and communication'
                      ].map((step, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Decision-Making Mindset */}
              {activeSection === 'decision-making' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Decision-Making Mindset
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Decisions in DFS SimuChain are made with transparency, community input, and 
                      long-term ecosystem health in mind.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Principles
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Transparency in all decisions</li>
                        <li>• Community participation and voting</li>
                        <li>• Long-term sustainability focus</li>
                        <li>• Data-driven approach</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Manage Together */}
              {activeSection === 'manage-together' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Implementation of "Manage Together"
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      "Manage Together" is our approach to collaborative governance where the community 
                      actively participates in platform management.
                    </p>
                    
                    <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                      isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                    }`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Key Components
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Community voting on proposals</li>
                        <li>• Open discussion forums</li>
                        <li>• Transparent decision-making process</li>
                        <li>• Shared responsibility for ecosystem health</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Common Misconceptions */}
              {activeSection === 'common-misconceptions' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Common Misconceptions
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className="space-y-4">
                      {[
                        {
                          misconception: 'DFS SimuChain is a real blockchain',
                          truth: 'DFS SimuChain is a Web2 simulation that replicates blockchain behavior'
                        },
                        {
                          misconception: 'It requires validators',
                          truth: 'DFS SimuChain operates without validators, using centralized infrastructure'
                        },
                        {
                          misconception: 'It\'s fully decentralized',
                          truth: 'It uses centralized infrastructure while maintaining blockchain-like semantics'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <p className="text-sm mb-2">
                            <strong className={isDark ? "text-red-400" : "text-red-600"}>Misconception:</strong>{' '}
                            {item.misconception}
                          </p>
                          <p className="text-sm">
                            <strong className={isDark ? "text-green-400" : "text-green-600"}>Truth:</strong>{' '}
                            {item.truth}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Frequently Asked Questions */}
              {activeSection === 'frequently-asked' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Frequently Asked Questions
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className="space-y-3">
                      {[
                        {
                          q: 'What is DFS SimuChain?',
                          a: 'DFS SimuChain is a Web2 simulation platform that replicates blockchain behavior and semantics.'
                        },
                        {
                          q: 'How do I get started?',
                          a: 'Sign up with your email, get a wallet address, and start using dApps.'
                        },
                        {
                          q: 'Is it free to use?',
                          a: 'Account creation is free, but transactions require gas fees paid in DFS tokens.'
                        },
                        {
                          q: 'Can I create my own token?',
                          a: 'Yes, you can create DRC20 tokens using the DFS Whitecreator platform.'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Q: {item.q}
                          </h4>
                          <p className="text-sm">A: {item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Official Response to Criticism */}
              {activeSection === 'official-response' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Official Response to Criticism
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      We acknowledge that DFS SimuChain is not a true blockchain and address common 
                      criticisms transparently.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Our Position
                      </h3>
                      <p className="text-sm">
                        DFS SimuChain is intentionally designed as a simulation, not a replacement for 
                        true blockchain technology. We provide an accessible entry point to blockchain 
                        concepts while maintaining transparency about our architecture and limitations.
                      </p>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Privacy Policy */}
              {activeSection === 'privacy-policy' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Privacy Policy
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain is committed to protecting user privacy and data security.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Key Points
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• We collect minimal necessary data</li>
                        <li>• Transaction data is publicly verifiable</li>
                        <li>• Email addresses are used for authentication only</li>
                        <li>• We do not sell user data</li>
                        <li>• Users control their own wallets and assets</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Terms of Use */}
              {activeSection === 'terms-of-use' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Terms of Use
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      By using DFS SimuChain, users agree to our terms of service.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Important Terms
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Users are responsible for their account security</li>
                        <li>• Prohibited activities include fraud and spam</li>
                        <li>• Platform may suspend accounts violating terms</li>
                        <li>• Services provided "as is" without warranties</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Cookie Policy */}
              {activeSection === 'cookie' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Cookie Policy
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      DFS SimuChain uses cookies to enhance user experience and analyze platform usage.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Cookie Types
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Essential cookies for platform functionality</li>
                        <li>• Analytics cookies for usage statistics</li>
                        <li>• Preference cookies for user settings</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Risk Disclosure */}
              {activeSection === 'risk-disclosure' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Risk Disclosure
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-5 rounded-xl border-l-4 border-red-500 ${
                      isDark ? "bg-red-500/5" : "bg-red-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Important Risks
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Platform risk: DFS SimuChain uses centralized infrastructure</li>
                        <li>• Token value volatility: DFS token value may fluctuate</li>
                        <li>• Technical risks: Potential bugs or security vulnerabilities</li>
                        <li>• Regulatory risks: Changing regulations may affect operations</li>
                        <li>• User responsibility: Users must secure their accounts</li>
                      </ul>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Official Website */}
              {activeSection === 'official-website' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Official Website
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Visit our official website for the latest information and updates.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <a href="https://dfsscan.com" target="_blank" rel="noopener noreferrer" className={`text-[#6366f1] hover:underline ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        https://dfsscan.com
                      </a>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* SNS */}
              {activeSection === 'sns' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    SNS
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Follow us on social media for updates and community discussions.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { platform: 'Twitter', desc: '@DFS_SimuChain' },
                        { platform: 'Telegram', desc: 't.me/dfssimuchain' },
                        { platform: 'Discord', desc: 'discord.gg/dfssimuchain' },
                        { platform: 'LinkedIn', desc: 'DFS SimuChain' }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {item.platform}
                          </h4>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* GitHub */}
              {activeSection === 'github' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    GitHub
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Access our open-source code and contribute to the project.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <a href="https://github.com/dfssimuchain" target="_blank" rel="noopener noreferrer" className={`text-[#6366f1] hover:underline ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        https://github.com/dfssimuchain
                      </a>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Mail */}
              {activeSection === 'mail' && (
                <section className="mb-6 sm:mb-8 text-left">
                  <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                    isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                  }`}>
                    Mail
                  </h2>
                  
                  <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-sm sm:text-base text-left">
                      Contact us via email for support, partnerships, or inquiries.
                    </p>
                    
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <a href="mailto:contact@dfsscan.com" className={`text-[#6366f1] hover:underline ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        contact@dfsscan.com
                      </a>
                    </div>
                  </div>
                  <Pagination />
                </section>
              )}

              {/* Wallet System Page */}
              {activeSection === 'wallet-system' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Wallet System
                    </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">Email-based authentication replacing complex seed phrases while maintaining full blockchain functionality.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-sm sm:text-base font-semibold mb-2 sm:mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Auth Flow
                          </h3>
                      <ol className="space-y-2 text-sm">
                        {['Email signup/login', 'Generate wallet address', 'Link to account', 'Full wallet access'].map((step, i) => (
                          <li key={i} className="flex gap-2 items-center">
                            <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            {step}
                            </li>
                        ))}
                          </ol>
                        </div>

                    <div className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                        }`}>
                      <h3 className={`text-sm sm:text-base font-semibold mb-2 sm:mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Address Format
                          </h3>
                      <div className={`p-3 rounded-lg font-mono text-sm ${
                        isDark ? "bg-[#0a0a0a]" : "bg-gray-100"
                          }`}>
                        <span className="text-[#6366f1]">dfs_0x</span>
                        <span>1a2b3c4d5e6f...</span>
                          </div>
                      <p className="text-xs mt-3">All addresses begin with the dfs_0x prefix.</p>
                        </div>
                      </div>
                    </div>
                <Pagination />
                  </section>
              )}

              {/* Gas Mechanism Page */}
              {activeSection === 'gas-mechanism' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Gas Mechanism
                    </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">Prevents spam, allocates resources fairly, and sustains the ecosystem through fee distribution.</p>

                  <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border ${
                    isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                  }`}>
                    <div className="space-y-4">
                      {[
                        { icon: '📤', step: 'Transaction Initiation', desc: 'User initiates transfer/creation' },
                        { icon: '⚡', step: 'Gas Calculation', desc: 'System calculates required gas' },
                        { icon: '💰', step: 'Fee Deduction', desc: 'DRC20_DFS deducted as gas fee' },
                        { icon: '✅', step: 'Execution', desc: 'Transaction processed in next block' },
                          ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                            isDark ? "bg-[#6366f1]/20" : "bg-blue-100"
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h4 className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                              {item.step}
                            </h4>
                            <p className="text-xs">{item.desc}</p>
                          </div>
                            </div>
                          ))}
                        </div>
                      </div>
                </div>
                <Pagination />
              </section>
              )}

              {/* DRC20 Standard Page */}
              {activeSection === 'drc20-standard' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  DRC20 Token Standard
                </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">Native token standard enabling users to create, deploy, and manage custom tokens.</p>

                  <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border ${
                    isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                  }`}>
                    <h3 className={`text-base font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Token Properties
                        </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {['Symbol', 'Name', 'Total Supply', 'Decimals', 'Logo', 'Description'].map((prop, idx) => (
                        <div key={idx} className={`p-3 rounded-lg text-sm ${
                          isDark ? "bg-[#0a0a0a]" : "bg-gray-100"
                        }`}>
                          <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{prop}</span>
                        </div>
                      ))}
                        </div>
                      </div>

                  <div className={`p-4 rounded-xl border-l-4 border-amber-500 ${
                    isDark ? "bg-amber-500/5" : "bg-amber-50"
                  }`}>
                    <p className="text-sm">
                      <strong>Note:</strong> Only approved tokens can be used in transactions. 
                      Publish via DFS Whitecreator platform.
                        </p>
                      </div>
                    </div>
                <Pagination />
                  </section>
              )}

              {/* Native Token Page */}
              {activeSection === 'native-token' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Native Token (DRC20_DFS)
                    </h2>

                <div className={`space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-6 rounded-xl border ${
                    isDark ? "border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1]/10 to-transparent" : "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                      }`}>
                        <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#6366f1] flex items-center justify-center text-2xl">
                            💎
                          </div>
                          <div>
                        <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                              DRC20_DFS
                            </h3>
                        <p className="text-sm">Native Chain Token</p>
                          </div>
                        </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-4">
                          {[
                            { label: 'Purpose', value: 'Gas Fees' },
                        { label: 'Type', value: 'Native' },
                            { label: 'Standard', value: 'DRC20' },
                          ].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-lg text-center ${
                          isDark ? "bg-[#0a0a0a]" : "bg-white border border-gray-200"
                        }`}>
                          <div className="text-xs text-gray-500">{item.label}</div>
                          <div className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                  <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Token Utility
                      </h3>
                  <ul className="space-y-2">
                    {[
                      'Pay transaction fees (gas)',
                      'Stake for governance (coming soon)',
                      'Access premium features',
                      'Ecosystem rewards',
                        ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-[#6366f1]">✓</span>
                        {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                <Pagination />
                  </section>
              )}

              {/* Use Cases Page */}
              {activeSection === 'use-cases' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Use Cases & Ecosystem
                    </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">DFS SimuChain powers diverse decentralized applications.</p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: '👛', name: 'Wallets', example: 'Metaface' },
                      { icon: '🔍', name: 'Explorers', example: 'DFSScan' },
                      { icon: '🪙', name: 'Token Tools', example: 'Whitecreator' },
                      { icon: '📱', name: 'Social', example: 'Uhalisi' },
                      { icon: '🎁', name: 'Rewards', example: 'POIPI' },
                      { icon: '💱', name: 'DEX', example: 'WEXSWAP' },
                        ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex items-center gap-3 ${
                        isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                          }`}>
                        <span className="text-2xl">{item.icon}</span>
                              <div>
                          <h4 className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {item.name}
                                </h4>
                          <p className="text-xs text-[#6366f1]">{item.example}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                <Pagination />
                  </section>
              )}

              {/* Roadmap Page */}
              {activeSection === 'roadmap' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Roadmap
                    </h2>

                <div className={`space-y-4 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {[
                    { phase: 'Phase 1', title: 'Foundation', status: 'completed', items: ['Core blockchain', 'Wallets', 'DRC20', 'Explorer'] },
                    { phase: 'Phase 2', title: 'Growth', status: 'active', items: ['DEX', 'Token sales', 'Social', 'Staking'] },
                    { phase: 'Phase 3', title: 'Advanced', status: 'upcoming', items: ['Governance', 'Bridges', 'Smart contracts', 'Mobile'] },
                    { phase: 'Phase 4', title: 'Enterprise', status: 'upcoming', items: ['Enterprise', 'API marketplace', 'SDK', 'Global'] },
                        ].map((phase, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${
                            phase.status === 'active' 
                        ? 'border-[#6366f1] bg-[#6366f1]/5' 
                        : isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : phase.status === 'active'
                              ? 'bg-[#6366f1]/20 text-[#6366f1]'
                              : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {phase.phase}
                              </span>
                        <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {phase.title}
                        </span>
                              {phase.status === 'active' && (
                          <span className="ml-auto text-[#6366f1] text-xs font-medium animate-pulse">
                                  In Progress
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {phase.items.map((item, i) => (
                          <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${
                            isDark ? "bg-[#1a1a1a] text-gray-400" : "bg-gray-100 text-gray-600"
                                }`}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                <Pagination />
                  </section>
              )}

          </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperPage;
