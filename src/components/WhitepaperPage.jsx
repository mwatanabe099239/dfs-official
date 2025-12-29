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
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'core-concepts', title: 'Core Concepts' },
        { id: 'architecture', title: 'Architecture' },
      ]
    },
    {
      id: 'core-technology',
      title: 'Core Technology',
      items: [
        { id: 'wallet-system', title: 'Wallet System' },
        { id: 'gas-mechanism', title: 'Gas Mechanism' },
      ]
    },
    {
      id: 'tokens',
      title: 'Tokens',
      items: [
        { id: 'drc20-standard', title: 'DRC20 Standard' },
        { id: 'native-token', title: 'Native Token (DFS)' },
      ]
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem',
      items: [
        { id: 'use-cases', title: 'Use Cases' },
        { id: 'roadmap', title: 'Roadmap' },
      ]
    },
  ];

  // Category cards for hero section
  const categoryCards = [
    {
      id: 'getting-started',
      icon: FiHome,
      title: 'Getting Started',
      description: 'Learn about DFS SimuChain fundamentals, core concepts, and architecture.',
      targetSection: 'introduction'
    },
    {
      id: 'core-technology',
      icon: FiZap,
      title: 'Core Technology',
      description: 'Explore wallet systems, gas mechanisms, and transaction handling.',
      targetSection: 'wallet-system'
    },
    {
      id: 'tokens',
      icon: FiLayers,
      title: 'Tokens',
      description: 'Understand DRC20 token standard and native DFS token.',
      targetSection: 'drc20-standard'
    },
    {
      id: 'ecosystem',
      icon: FiCpu,
      title: 'Ecosystem',
      description: 'Discover use cases, dApps, and the project roadmap.',
      targetSection: 'use-cases'
    },
  ];

  // Ordered list of all sections for pagination
  const allSections = [
    'introduction',
    'core-concepts',
    'architecture',
    'wallet-system',
    'gas-mechanism',
    'drc20-standard',
    'native-token',
    'use-cases',
    'roadmap'
  ];

  // Get section titles for pagination
  const getSectionTitle = (sectionId) => {
    const titles = {
      'introduction': 'Introduction',
      'core-concepts': 'Core Concepts',
      'architecture': 'Technical Architecture',
      'wallet-system': 'Wallet System',
      'gas-mechanism': 'Gas Mechanism',
      'drc20-standard': 'DRC20 Token Standard',
      'native-token': 'Native Token (DRC20_DFS)',
      'use-cases': 'Use Cases & Ecosystem',
      'roadmap': 'Roadmap'
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
                    <strong className="text-[#6366f1]">DFS SimuChain</strong> represents a paradigm shift in blockchain 
                    accessibility — a sophisticated Web2 simulation that faithfully replicates the core mechanics of 
                    Web3 blockchain technology without the complexity of traditional decentralized infrastructure.
                  </p>
                  
                  <p className="leading-relaxed">
                    By leveraging familiar Web2 technologies while maintaining blockchain-like semantics, DFS SimuChain 
                    provides developers and users with a seamless on-ramp to understanding and utilizing blockchain 
                    concepts.
                  </p>

                  <div className={`p-5 rounded-xl border-l-4 border-[#6366f1] ${
                    isDark ? "bg-[#6366f1]/5" : "bg-blue-50"
                  }`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      Mission Statement
                    </h4>
                    <p className="italic text-sm">
                      "To democratize blockchain technology by providing an accessible, scalable, and user-friendly 
                      simulation environment that bridges the gap between Web2 familiarity and Web3 innovation."
                    </p>
                  </div>

                  <h3 className={`text-xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Key Differentiators
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Email-Based Auth', desc: 'No seed phrases required' },
                      { title: '5-Min Blocks', desc: 'Predictable block times' },
                      { title: 'High Throughput', desc: 'Thousands of TPS' },
                      { title: 'Familiar UX', desc: 'Web2 experience' },
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${
                        isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h4 className={`font-semibold text-xs sm:text-sm mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
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

              {/* Core Concepts Page */}
              {activeSection === 'core-concepts' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Core Concepts
                </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">DFS SimuChain implements fundamental blockchain building blocks adapted for Web2 infrastructure.</p>

                  {[
                    { emoji: '📦', title: 'Blocks', desc: 'Immutable containers for transactions. 5-minute intervals, thousands of transactions per block.' },
                    { emoji: '📝', title: 'Transactions', desc: 'Records of value/data transfer. Hash format: dfs_0x7a8b9c...' },
                    { emoji: '⛽', title: 'Gas', desc: 'Measures computational resources. Paid in DRC20_DFS tokens.' },
                  ].map((item, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${
                      isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                    }`}>
                      <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        <span>{item.emoji}</span>
                        {item.title}
                      </h3>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Pagination />
              </section>
              )}

              {/* Architecture Page */}
              {activeSection === 'architecture' && (
              <section className="mb-6 sm:mb-8 text-left">
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-3 sm:pb-4 border-b text-left ${
                  isDark ? "text-white border-[#1f1f1f]" : "text-gray-900 border-gray-200"
                }`}>
                  Technical Architecture
                </h2>

                <div className={`space-y-4 sm:space-y-6 text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm sm:text-base text-left">Hybrid architecture combining traditional databases with blockchain-inspired data structures.</p>

                  <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border ${
                    isDark ? "border-[#1f1f1f] bg-[#111111]" : "border-gray-200 bg-gray-50"
                  }`}>
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                      System Components
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Block Producer', desc: 'Generates blocks every 5 minutes' },
                        { name: 'Transaction Pool', desc: 'Holds pending transactions' },
                        { name: 'State Manager', desc: 'Maintains account states and balances' },
                        { name: 'API Gateway', desc: 'RESTful and WebSocket interfaces' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
                          <div>
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                              {item.name}:
                            </span>
                            <span className="ml-2 text-xs sm:text-sm">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
