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
  HiOutlineBookOpen,
  HiOutlineDownload
} from 'react-icons/hi';

const WhitepaperPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // PDF Generation Function
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
      doc.setTextColor(33, 242, 1); // Green accent
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

    tocItems.forEach((item, idx) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(item, margin, yPos);
      yPos += 10;
    });

    // 1. Introduction
    doc.addPage();
    yPos = margin;
    addTitle('1. Introduction');
    addSectionDivider();

    addParagraph('DFS SimuChain represents a paradigm shift in blockchain accessibility — a sophisticated Web2 simulation that faithfully replicates the core mechanics of Web3 blockchain technology without the complexity of traditional decentralized infrastructure.');
    
    addParagraph('By leveraging familiar Web2 technologies while maintaining blockchain-like semantics, DFS SimuChain provides developers and users with a seamless on-ramp to understanding and utilizing blockchain concepts. Users authenticate using standard email credentials yet receive fully-functional wallet addresses capable of holding, sending, and receiving digital assets.');

    yPos += 5;
    addSubtitle('Mission Statement');
    addParagraph('"To democratize blockchain technology by providing an accessible, scalable, and user-friendly simulation environment that bridges the gap between Web2 familiarity and Web3 innovation."');

    yPos += 5;
    addSubtitle('Key Differentiators');
    addBulletPoint('Email-Based Authentication: No seed phrases or private key management required');
    addBulletPoint('Predictable Block Times: Consistent 5-minute block generation intervals');
    addBulletPoint('High Throughput: Thousands of transactions per block capacity');
    addBulletPoint('Familiar UX: Web2 user experience with Web3 functionality');

    // 2. Core Concepts
    doc.addPage();
    yPos = margin;
    addTitle('2. Core Concepts');
    addSectionDivider();

    addParagraph('DFS SimuChain implements the fundamental building blocks of blockchain technology, adapted for Web2 infrastructure while maintaining semantic equivalence with traditional blockchain systems.');

    yPos += 5;
    addSubtitle('Blocks');
    addParagraph('Blocks are the fundamental units of data storage in DFS SimuChain. Each block serves as an immutable container for transactions, maintaining the chain\'s integrity and providing a chronological record of all network activity.');
    addBulletPoint('Block Interval: 5 minutes');
    addBulletPoint('Max Transactions: Thousands per block');
    addBulletPoint('Finality: Instant (simulated)');

    yPos += 5;
    addSubtitle('Transactions');
    addParagraph('Transactions represent the transfer of value or data between addresses. Each transaction is assigned a unique hash for identification and tracking purposes.');
    addParagraph('Transaction Hash Format: dfs_0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b...');

    yPos += 5;
    addSubtitle('Gas');
    addParagraph('Gas measures the computational resources required to execute operations on DFS SimuChain. Users pay gas fees in DRC20_DFS tokens to process their transactions, ensuring fair resource allocation and network sustainability.');

    // 3. Technical Architecture
    doc.addPage();
    yPos = margin;
    addTitle('3. Technical Architecture');
    addSectionDivider();

    addParagraph('DFS SimuChain employs a hybrid architecture that combines the robustness of traditional database systems with blockchain-inspired data structures and consensus mechanisms.');

    yPos += 5;
    addSubtitle('System Components');
    addBulletPoint('Block Producer: Automated service that generates new blocks every 5 minutes, aggregating pending transactions into immutable containers.');
    addBulletPoint('Transaction Pool: Memory pool that holds pending transactions awaiting inclusion in the next block.');
    addBulletPoint('State Manager: Maintains the current state of all accounts, balances, and token holdings across the network.');
    addBulletPoint('API Gateway: RESTful and WebSocket interfaces for external applications to interact with the chain.');

    yPos += 5;
    addSubtitle('Why Web2 Infrastructure?');
    addParagraph('By building on Web2 infrastructure, DFS SimuChain achieves significantly lower operational costs, faster development cycles, and easier integration with existing systems — all while preserving the core value propositions of blockchain: transparency, immutability, and tokenized asset management.');

    // 4. Wallet System
    doc.addPage();
    yPos = margin;
    addTitle('4. Wallet System');
    addSectionDivider();

    addParagraph('The DFS SimuChain wallet system revolutionizes user onboarding by replacing complex seed phrases and private key management with familiar email-based authentication while maintaining full blockchain functionality.');

    yPos += 5;
    addSubtitle('Authentication Flow');
    addBulletPoint('Step 1: User signs up/logs in via email');
    addBulletPoint('Step 2: System generates unique wallet address');
    addBulletPoint('Step 3: Address linked to user account securely');
    addBulletPoint('Step 4: Full wallet access via authentication');

    yPos += 5;
    addSubtitle('Address Format');
    addParagraph('All wallet addresses begin with the dfs_0x prefix, making them instantly recognizable as DFS SimuChain addresses.');
    addParagraph('Example: dfs_0x1a2b3c4d5e6f7890abcdef...');

    // 5. DRC20 Token Standard
    doc.addPage();
    yPos = margin;
    addTitle('5. DRC20 Token Standard');
    addSectionDivider();

    addParagraph('DRC20 is the native token standard for DFS SimuChain, enabling users and developers to create, deploy, and manage custom tokens with ease. The standard provides a consistent interface for token operations while maintaining compatibility with the broader ecosystem.');

    yPos += 5;
    addSubtitle('Token Properties');
    addBulletPoint('Symbol: e.g., DFS, USDT, BTC');
    addBulletPoint('Name: e.g., DFS Token');
    addBulletPoint('Total Supply: User-defined amount');
    addBulletPoint('Decimals: Precision (default: 18)');
    addBulletPoint('Logo: Custom token image');
    addBulletPoint('Description: Token metadata');

    yPos += 5;
    addSubtitle('Token Address Format');
    addParagraph('DRC20 Token Address: drc20_0x7a8b9c0d1e2f3a4b5c6d7e8f...');

    yPos += 5;
    addSubtitle('Token Approval System');
    addParagraph('While any user can publish a DRC20 token through the DFS Whitecreator platform, only approved tokens can be used in actual transactions. This governance mechanism ensures network integrity and protects users from malicious or spam tokens.');

    // 6. Native Token
    doc.addPage();
    yPos = margin;
    addTitle('6. Native Token (DRC20_DFS)');
    addSectionDivider();

    addParagraph('DRC20_DFS is the native utility token of DFS SimuChain, serving as the primary medium for gas fee payments and network operations.');

    yPos += 5;
    addSubtitle('Token Specifications');
    addBulletPoint('Purpose: Gas Fees');
    addBulletPoint('Type: Native Token');
    addBulletPoint('Standard: DRC20');

    yPos += 5;
    addSubtitle('Token Utility');
    addBulletPoint('Pay transaction fees (gas) for all operations on the network');
    addBulletPoint('Stake to participate in network governance (coming soon)');
    addBulletPoint('Access premium features and services within the ecosystem');
    addBulletPoint('Reward distribution for ecosystem participants');

    // 7. Gas Mechanism
    doc.addPage();
    yPos = margin;
    addTitle('7. Gas Mechanism');
    addSectionDivider();

    addParagraph('The gas mechanism in DFS SimuChain serves multiple purposes: preventing spam transactions, allocating network resources fairly, and sustaining the ecosystem through fee distribution.');

    yPos += 5;
    addSubtitle('How Gas Works');
    addBulletPoint('Transaction Initiation: User initiates a transaction (transfer, token creation, etc.)');
    addBulletPoint('Gas Calculation: System calculates required gas based on operation complexity');
    addBulletPoint('Fee Deduction: DRC20_DFS deducted from user\'s wallet as gas fee');
    addBulletPoint('Transaction Execution: Transaction processed and included in next block');

    // 8. Use Cases
    doc.addPage();
    yPos = margin;
    addTitle('8. Use Cases & Ecosystem');
    addSectionDivider();

    addParagraph('DFS SimuChain powers a diverse ecosystem of decentralized applications, each leveraging the chain\'s unique Web2-Web3 hybrid architecture.');

    yPos += 5;
    addSubtitle('Ecosystem Applications');
    addBulletPoint('Digital Wallets: Secure asset management with email-based access (e.g., Metaface)');
    addBulletPoint('Block Explorers: Transaction tracking and chain analytics (e.g., DFSScan)');
    addBulletPoint('Token Platforms: Create and manage DRC20 tokens easily (e.g., DFS Whitecreator)');
    addBulletPoint('Social Media: Content platforms with tokenized engagement (e.g., Uhalisi)');
    addBulletPoint('Reward Systems: Point earning and token distribution platforms (e.g., POIPI)');
    addBulletPoint('DEX Platforms: Decentralized token exchange services (e.g., WEXSWAP)');
    addBulletPoint('Donation Platforms: Creator economy and tipping systems (e.g., Gyakusen)');
    addBulletPoint('Token Sales: Launch and participate in token offerings (e.g., Moegi)');

    // 9. Roadmap
    doc.addPage();
    yPos = margin;
    addTitle('9. Roadmap');
    addSectionDivider();

    addParagraph('DFS SimuChain continues to evolve with a clear vision for the future. Our roadmap outlines key milestones and upcoming features.');

    yPos += 5;
    addSubtitle('Phase 1: Foundation (Completed)');
    addBulletPoint('Core blockchain simulation');
    addBulletPoint('Wallet system');
    addBulletPoint('DRC20 token standard');
    addBulletPoint('Block explorer');

    yPos += 5;
    addSubtitle('Phase 2: Ecosystem Growth (Active)');
    addBulletPoint('DEX integration');
    addBulletPoint('Token sale platform');
    addBulletPoint('Social media integration');
    addBulletPoint('Staking mechanism');

    yPos += 5;
    addSubtitle('Phase 3: Advanced Features (Upcoming)');
    addBulletPoint('Governance system');
    addBulletPoint('Cross-chain bridges');
    addBulletPoint('Smart contract simulation');
    addBulletPoint('Mobile apps');

    yPos += 5;
    addSubtitle('Phase 4: Enterprise & Scale (Upcoming)');
    addBulletPoint('Enterprise solutions');
    addBulletPoint('API marketplace');
    addBulletPoint('Developer SDK');
    addBulletPoint('Global expansion');

    // 10. Glossary
    doc.addPage();
    yPos = margin;
    addTitle('10. Glossary');
    addSectionDivider();

    const glossary = [
      { term: 'Block', def: 'A container that holds multiple transactions. In DFS SimuChain, one block is generated every 5 minutes and can contain thousands of transactions.' },
      { term: 'Transaction', def: 'A record of value or data transfer between addresses. Transaction hashes start with dfs_0x... for easy identification.' },
      { term: 'Gas', def: 'The unit measuring computational effort. Users pay gas fees in DRC20_DFS tokens to process transactions.' },
      { term: 'Wallet Address', def: 'A unique identifier for user accounts, formatted as dfs_0x... Each address is derived from user authentication.' },
      { term: 'DRC20', def: 'The token standard for DFS SimuChain, similar to ERC20. Token addresses start with drc20_0x...' },
      { term: 'DRC20_DFS', def: 'The native token of DFS SimuChain used for gas fees and network operations.' },
    ];

    glossary.forEach(item => {
      addNewPageIfNeeded(25);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(33, 242, 1);
      doc.text(item.term, margin, yPos);
      yPos += 6;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(item.def, contentWidth);
      lines.forEach(line => {
        doc.text(line, margin, yPos);
        yPos += 5;
      });
      yPos += 5;
    });

    // Footer on last page
    yPos = pageHeight - 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2026 DIFINES. All rights reserved.', pageWidth / 2, yPos, { align: 'center' });
    doc.text('https://dfsscan.com', pageWidth / 2, yPos + 5, { align: 'center' });

    // Save the PDF
    doc.save('DFS_SimuChain_Whitepaper.pdf');
    setIsGeneratingPdf(false);
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: HiOutlineBookOpen },
    { id: 'core-concepts', title: 'Core Concepts', icon: HiOutlineCube },
    { id: 'architecture', title: 'Architecture', icon: HiOutlineChip },
    { id: 'wallet-system', title: 'Wallet System', icon: HiOutlineKey },
    { id: 'drc20-standard', title: 'DRC20 Token Standard', icon: HiOutlineCurrencyDollar },
    { id: 'native-token', title: 'Native Token (DFS)', icon: HiOutlineLightningBolt },
    { id: 'gas-mechanism', title: 'Gas Mechanism', icon: HiOutlineShieldCheck },
    { id: 'use-cases', title: 'Use Cases', icon: HiOutlineGlobe },
    { id: 'roadmap', title: 'Roadmap', icon: HiOutlineCode },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-200"
          }`}></div>
        </div>

        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium mb-6">
              <HiOutlineDocument className="w-4 h-4" />
              {t('whitepaper.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              DFS SimuChain
              <span className="block text-[#21f201] mt-2">{t('whitepaper.title')}</span>
            </h1>
            
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('whitepaper.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={generatePDF}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPdf ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('whitepaper.generating')}
                  </>
                ) : (
                  <>
                    <HiOutlineDownload className="w-5 h-5" />
                    {t('whitepaper.downloadPdf')}
                  </>
                )}
              </button>
              <button 
                onClick={() => scrollToSection('introduction')}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg border transition-colors ${
                  isDark 
                    ? "border-gray-700 text-white hover:bg-gray-800" 
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t('whitepaper.readOnline')}
              </button>
            </div>

            <div className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">5 min</div>
                <div className="text-sm">{t('whitepaper.stats.blockTime')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">1000+</div>
                <div className="text-sm">{t('whitepaper.stats.tpsCapacity')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">DRC20</div>
                <div className="text-sm">{t('whitepaper.stats.tokenStandard')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#21f201]">Web2</div>
                <div className="text-sm">{t('whitepaper.stats.infrastructure')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-72 shrink-0">
              <div className={`rounded-xl p-4 sticky top-8 border transition-colors duration-300 ${
                isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
              }`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 px-3 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  {t('whitepaper.tableOfContents')}
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-[#21f201]/10 text-[#21f201]"
                            : isDark 
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
                isDark ? "border-gray-700 bg-[#181A1E]" : "border-gray-200 bg-white shadow-sm"
              }`}>
                <div className="p-6 md:p-10 prose prose-lg max-w-none text-left">
                  {/* Introduction */}
                  <section id="introduction" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineBookOpen className="w-8 h-8 text-[#21f201]" />
                      1. Introduction
                    </h2>
                    
                    <div className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="text-lg leading-relaxed">
                        <strong className="text-[#21f201]">DFS SimuChain</strong> represents a paradigm shift in blockchain 
                        accessibility — a sophisticated Web2 simulation that faithfully replicates the core mechanics of 
                        Web3 blockchain technology without the complexity of traditional decentralized infrastructure.
                      </p>
                      
                      <p className="leading-relaxed">
                        By leveraging familiar Web2 technologies while maintaining blockchain-like semantics, DFS SimuChain 
                        provides developers and users with a seamless on-ramp to understanding and utilizing blockchain 
                        concepts. Users authenticate using standard email credentials yet receive fully-functional wallet 
                        addresses capable of holding, sending, and receiving digital assets.
                      </p>

                      <div className={`p-6 rounded-xl border-l-4 border-[#21f201] ${
                        isDark ? "bg-[#21f201]/5" : "bg-green-50"
                      }`}>
                        <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          Mission Statement
                        </h4>
                        <p className="italic">
                          "To democratize blockchain technology by providing an accessible, scalable, and user-friendly 
                          simulation environment that bridges the gap between Web2 familiarity and Web3 innovation."
                        </p>
                      </div>

                      <h3 className={`text-xl font-bold mt-8 mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Key Differentiators
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { title: 'Email-Based Authentication', desc: 'No seed phrases or private key management required' },
                          { title: 'Predictable Block Times', desc: 'Consistent 5-minute block generation intervals' },
                          { title: 'High Throughput', desc: 'Thousands of transactions per block capacity' },
                          { title: 'Familiar UX', desc: 'Web2 user experience with Web3 functionality' },
                        ].map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border ${
                            isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                          }`}>
                            <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                              {item.title}
                            </h4>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Core Concepts */}
                  <section id="core-concepts" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineCube className="w-8 h-8 text-[#21f201]" />
                      2. Core Concepts
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        DFS SimuChain implements the fundamental building blocks of blockchain technology, 
                        adapted for Web2 infrastructure while maintaining semantic equivalence with traditional 
                        blockchain systems.
                      </p>

                      {/* Blocks */}
                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          <span className="w-8 h-8 rounded-lg bg-[#21f201]/20 flex items-center justify-center text-[#21f201]">
                            📦
                          </span>
                          Blocks
                        </h3>
                        <p className="mb-4">
                          Blocks are the fundamental units of data storage in DFS SimuChain. Each block serves as 
                          an immutable container for transactions, maintaining the chain's integrity and providing 
                          a chronological record of all network activity.
                        </p>
                        <div className={`p-4 rounded-lg font-mono text-sm ${
                          isDark ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
                        }`}>
                          <div className="flex justify-between py-1 border-b border-gray-600">
                            <span className="text-gray-500">Block Interval:</span>
                            <span className="text-[#21f201]">5 minutes</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-gray-600">
                            <span className="text-gray-500">Max Transactions:</span>
                            <span className="text-[#21f201]">Thousands per block</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-500">Finality:</span>
                            <span className="text-[#21f201]">Instant (simulated)</span>
                          </div>
                        </div>
                      </div>

                      {/* Transactions */}
                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          <span className="w-8 h-8 rounded-lg bg-[#21f201]/20 flex items-center justify-center text-[#21f201]">
                            📝
                          </span>
                          Transactions
                        </h3>
                        <p className="mb-4">
                          Transactions represent the transfer of value or data between addresses. Each transaction 
                          is assigned a unique hash for identification and tracking purposes.
                        </p>
                        <div className={`p-4 rounded-lg ${
                          isDark ? "bg-gray-900" : "bg-gray-100"
                        }`}>
                          <p className="text-sm text-gray-500 mb-2">Transaction Hash Format:</p>
                          <code className="text-[#21f201] font-mono break-all">
                            dfs_0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b...
                          </code>
                        </div>
                      </div>

                      {/* Gas */}
                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                          <span className="w-8 h-8 rounded-lg bg-[#21f201]/20 flex items-center justify-center text-[#21f201]">
                            ⛽
                          </span>
                          Gas
                        </h3>
                        <p>
                          Gas measures the computational resources required to execute operations on DFS SimuChain. 
                          Users pay gas fees in <code className="text-[#21f201]">DRC20_DFS</code> tokens to process 
                          their transactions, ensuring fair resource allocation and network sustainability.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Architecture */}
                  <section id="architecture" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineChip className="w-8 h-8 text-[#21f201]" />
                      3. Technical Architecture
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        DFS SimuChain employs a hybrid architecture that combines the robustness of traditional 
                        database systems with blockchain-inspired data structures and consensus mechanisms.
                      </p>

                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                          System Components
                        </h3>
                        <div className="space-y-4">
                          {[
                            { 
                              name: 'Block Producer', 
                              desc: 'Automated service that generates new blocks every 5 minutes, aggregating pending transactions into immutable containers.' 
                            },
                            { 
                              name: 'Transaction Pool', 
                              desc: 'Memory pool that holds pending transactions awaiting inclusion in the next block.' 
                            },
                            { 
                              name: 'State Manager', 
                              desc: 'Maintains the current state of all accounts, balances, and token holdings across the network.' 
                            },
                            { 
                              name: 'API Gateway', 
                              desc: 'RESTful and WebSocket interfaces for external applications to interact with the chain.' 
                            },
                          ].map((component, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-3 h-3 rounded-full bg-[#21f201] mt-2 flex-shrink-0"></div>
                              <div>
                                <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {component.name}
                                </h4>
                                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                  {component.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-6 rounded-xl ${
                        isDark ? "bg-gradient-to-r from-[#21f201]/10 to-transparent" : "bg-gradient-to-r from-green-50 to-transparent"
                      } border border-[#21f201]/20`}>
                        <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          💡 Why Web2 Infrastructure?
                        </h4>
                        <p className="text-sm">
                          By building on Web2 infrastructure, DFS SimuChain achieves significantly lower operational 
                          costs, faster development cycles, and easier integration with existing systems — all while 
                          preserving the core value propositions of blockchain: transparency, immutability, and 
                          tokenized asset management.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Wallet System */}
                  <section id="wallet-system" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineKey className="w-8 h-8 text-[#21f201]" />
                      4. Wallet System
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        The DFS SimuChain wallet system revolutionizes user onboarding by replacing complex seed phrases 
                        and private key management with familiar email-based authentication while maintaining full 
                        blockchain functionality.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className={`p-6 rounded-xl border ${
                          isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Authentication Flow
                          </h3>
                          <ol className="space-y-3 text-sm">
                            <li className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#21f201] text-black flex items-center justify-center font-bold text-xs">1</span>
                              <span>User signs up/logs in via email</span>
                            </li>
                            <li className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#21f201] text-black flex items-center justify-center font-bold text-xs">2</span>
                              <span>System generates unique wallet address</span>
                            </li>
                            <li className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#21f201] text-black flex items-center justify-center font-bold text-xs">3</span>
                              <span>Address linked to user account securely</span>
                            </li>
                            <li className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#21f201] text-black flex items-center justify-center font-bold text-xs">4</span>
                              <span>Full wallet access via authentication</span>
                            </li>
                          </ol>
                        </div>

                        <div className={`p-6 rounded-xl border ${
                          isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                        }`}>
                          <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Address Format
                          </h3>
                          <div className={`p-4 rounded-lg font-mono text-sm mb-4 ${
                            isDark ? "bg-gray-900" : "bg-gray-100"
                          }`}>
                            <span className="text-gray-500">Wallet Address:</span><br/>
                            <span className="text-[#21f201] break-all">dfs_0x</span>
                            <span className={isDark ? "text-gray-300" : "text-gray-700"}>1a2b3c4d5e6f...</span>
                          </div>
                          <p className="text-sm">
                            All wallet addresses begin with the <code className="text-[#21f201]">dfs_0x</code> prefix, 
                            making them instantly recognizable as DFS SimuChain addresses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* DRC20 Standard */}
                  <section id="drc20-standard" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineCurrencyDollar className="w-8 h-8 text-[#21f201]" />
                      5. DRC20 Token Standard
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        DRC20 is the native token standard for DFS SimuChain, enabling users and developers to create, 
                        deploy, and manage custom tokens with ease. The standard provides a consistent interface for 
                        token operations while maintaining compatibility with the broader ecosystem.
                      </p>

                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                          Token Properties
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { prop: 'Symbol', example: 'e.g., DFS, USDT, BTC' },
                            { prop: 'Name', example: 'e.g., DFS Token' },
                            { prop: 'Total Supply', example: 'User-defined amount' },
                            { prop: 'Decimals', example: 'Precision (default: 18)' },
                            { prop: 'Logo', example: 'Custom token image' },
                            { prop: 'Description', example: 'Token metadata' },
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${
                              isDark ? "bg-gray-900" : "bg-gray-100"
                            }`}>
                              <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {item.prop}:
                              </span>
                              <span className={`text-sm ml-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                {item.example}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                          Token Address Format
                        </h3>
                        <div className={`p-4 rounded-lg font-mono text-sm ${
                          isDark ? "bg-gray-900" : "bg-gray-100"
                        }`}>
                          <span className="text-gray-500">DRC20 Token Address:</span><br/>
                          <span className="text-[#21f201] break-all">drc20_0x</span>
                          <span className={isDark ? "text-gray-300" : "text-gray-700"}>7a8b9c0d1e2f3a4b5c6d7e8f...</span>
                        </div>
                      </div>

                      <div className={`p-6 rounded-xl border-l-4 border-[#21f201] ${
                        isDark ? "bg-[#21f201]/5" : "bg-green-50"
                      }`}>
                        <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          ⚠️ Token Approval System
                        </h4>
                        <p>
                          While any user can publish a DRC20 token through the <strong>DFS Whitecreator</strong> platform, 
                          only approved tokens can be used in actual transactions. This governance mechanism ensures 
                          network integrity and protects users from malicious or spam tokens.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Native Token */}
                  <section id="native-token" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineLightningBolt className="w-8 h-8 text-[#21f201]" />
                      6. Native Token (DRC20_DFS)
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        <strong className="text-[#21f201]">DRC20_DFS</strong> is the native utility token of 
                        DFS SimuChain, serving as the primary medium for gas fee payments and network operations.
                      </p>

                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-gradient-to-br from-[#21f201]/10 to-transparent" : "border-gray-200 bg-gradient-to-br from-green-50 to-white"
                      }`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-[#21f201] flex items-center justify-center text-3xl shadow-lg">
                            💎
                          </div>
                          <div>
                            <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                              DRC20_DFS
                            </h3>
                            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                              Native Chain Token
                            </p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 mt-6">
                          {[
                            { label: 'Purpose', value: 'Gas Fees' },
                            { label: 'Type', value: 'Native Token' },
                            { label: 'Standard', value: 'DRC20' },
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-lg text-center ${
                              isDark ? "bg-[#0B0E11]" : "bg-white border border-gray-200"
                            }`}>
                              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                {item.label}
                              </div>
                              <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold mt-8 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Token Utility
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Pay transaction fees (gas) for all operations on the network',
                          'Stake to participate in network governance (coming soon)',
                          'Access premium features and services within the ecosystem',
                          'Reward distribution for ecosystem participants',
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#21f201] mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Gas Mechanism */}
                  <section id="gas-mechanism" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineShieldCheck className="w-8 h-8 text-[#21f201]" />
                      7. Gas Mechanism
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        The gas mechanism in DFS SimuChain serves multiple purposes: preventing spam transactions, 
                        allocating network resources fairly, and sustaining the ecosystem through fee distribution.
                      </p>

                      <div className={`p-6 rounded-xl border ${
                        isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                      }`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                          How Gas Works
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#21f201]/20 flex items-center justify-center text-2xl">
                              📤
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                Transaction Initiation
                              </h4>
                              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                User initiates a transaction (transfer, token creation, etc.)
                              </p>
                            </div>
                          </div>
                          <div className="w-px h-6 bg-[#21f201] ml-6"></div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#21f201]/20 flex items-center justify-center text-2xl">
                              ⚡
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                Gas Calculation
                              </h4>
                              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                System calculates required gas based on operation complexity
                              </p>
                            </div>
                          </div>
                          <div className="w-px h-6 bg-[#21f201] ml-6"></div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#21f201]/20 flex items-center justify-center text-2xl">
                              💰
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                Fee Deduction
                              </h4>
                              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                DRC20_DFS deducted from user's wallet as gas fee
                              </p>
                            </div>
                          </div>
                          <div className="w-px h-6 bg-[#21f201] ml-6"></div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#21f201]/20 flex items-center justify-center text-2xl">
                              ✅
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                Transaction Execution
                              </h4>
                              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                Transaction processed and included in next block
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Use Cases */}
                  <section id="use-cases" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineGlobe className="w-8 h-8 text-[#21f201]" />
                      8. Use Cases & Ecosystem
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        DFS SimuChain powers a diverse ecosystem of decentralized applications, each leveraging 
                        the chain's unique Web2-Web3 hybrid architecture.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { 
                            icon: '👛', 
                            name: 'Digital Wallets', 
                            desc: 'Secure asset management with email-based access (e.g., Metaface)',
                            example: 'Metaface Wallet'
                          },
                          { 
                            icon: '🔍', 
                            name: 'Block Explorers', 
                            desc: 'Transaction tracking and chain analytics (e.g., DFSScan)',
                            example: 'DFSScan'
                          },
                          { 
                            icon: '🪙', 
                            name: 'Token Platforms', 
                            desc: 'Create and manage DRC20 tokens easily',
                            example: 'DFS Whitecreator'
                          },
                          { 
                            icon: '📱', 
                            name: 'Social Media', 
                            desc: 'Content platforms with tokenized engagement',
                            example: 'Uhalisi'
                          },
                          { 
                            icon: '🎁', 
                            name: 'Reward Systems', 
                            desc: 'Point earning and token distribution platforms',
                            example: 'POIPI'
                          },
                          { 
                            icon: '💱', 
                            name: 'DEX Platforms', 
                            desc: 'Decentralized token exchange services',
                            example: 'WEXSWAP'
                          },
                          { 
                            icon: '💝', 
                            name: 'Donation Platforms', 
                            desc: 'Creator economy and tipping systems',
                            example: 'Gyakusen'
                          },
                          { 
                            icon: '🚀', 
                            name: 'Token Sales', 
                            desc: 'Launch and participate in token offerings',
                            example: 'Moegi'
                          },
                        ].map((item, idx) => (
                          <div key={idx} className={`p-5 rounded-xl border transition-all hover:border-[#21f201]/50 ${
                            isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                          }`}>
                            <div className="flex items-start gap-4">
                              <div className="text-3xl">{item.icon}</div>
                              <div>
                                <h4 className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {item.name}
                                </h4>
                                <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                  {item.desc}
                                </p>
                                <span className="text-xs text-[#21f201] font-medium">
                                  Example: {item.example}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Roadmap */}
                  <section id="roadmap" className="mb-16 scroll-mt-8">
                    <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      <HiOutlineCode className="w-8 h-8 text-[#21f201]" />
                      9. Roadmap
                    </h2>

                    <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <p className="leading-relaxed">
                        DFS SimuChain continues to evolve with a clear vision for the future. Our roadmap 
                        outlines key milestones and upcoming features.
                      </p>

                      <div className="space-y-4">
                        {[
                          { 
                            phase: 'Phase 1', 
                            title: 'Foundation', 
                            status: 'completed',
                            items: ['Core blockchain simulation', 'Wallet system', 'DRC20 token standard', 'Block explorer'] 
                          },
                          { 
                            phase: 'Phase 2', 
                            title: 'Ecosystem Growth', 
                            status: 'active',
                            items: ['DEX integration', 'Token sale platform', 'Social media integration', 'Staking mechanism'] 
                          },
                          { 
                            phase: 'Phase 3', 
                            title: 'Advanced Features', 
                            status: 'upcoming',
                            items: ['Governance system', 'Cross-chain bridges', 'Smart contract simulation', 'Mobile apps'] 
                          },
                          { 
                            phase: 'Phase 4', 
                            title: 'Enterprise & Scale', 
                            status: 'upcoming',
                            items: ['Enterprise solutions', 'API marketplace', 'Developer SDK', 'Global expansion'] 
                          },
                        ].map((phase, idx) => (
                          <div key={idx} className={`p-6 rounded-xl border ${
                            phase.status === 'active' 
                              ? 'border-[#21f201] bg-[#21f201]/5' 
                              : isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                phase.status === 'completed' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : phase.status === 'active'
                                    ? 'bg-[#21f201]/20 text-[#21f201]'
                                    : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {phase.phase}
                              </span>
                              <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {phase.title}
                              </h4>
                              {phase.status === 'active' && (
                                <span className="ml-auto text-[#21f201] text-sm font-medium animate-pulse">
                                  In Progress
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {phase.items.map((item, i) => (
                                <span key={i} className={`text-xs px-3 py-1 rounded-full ${
                                  isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                                }`}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Glossary */}
                  <section className="mb-8">
                    <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                      📚 Glossary
                    </h2>
                    <div className="space-y-3">
                      {glossaryTerms.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
                          } ${expandedFaq === idx ? (isDark ? "bg-[#0B0E11]" : "bg-gray-50") : ""}`}
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                              {item.term}
                            </h4>
                            {expandedFaq === idx ? (
                              <HiOutlineChevronUp className="w-5 h-5 text-[#21f201]" />
                            ) : (
                              <HiOutlineChevronDown className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                            )}
                          </div>
                          {expandedFaq === idx && (
                            <p className={`mt-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {item.definition}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 py-16 ${
        isDark ? "bg-[#181A1E]" : "bg-white border-t border-gray-200"
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            {t('whitepaper.cta.title')}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {t('whitepaper.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://metaface.dfsscan.com/get-started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#21f201] text-black font-bold rounded-lg hover:bg-[#1ad901] transition-colors"
            >
              <HiOutlineUsers className="w-5 h-5" />
              {t('whitepaper.cta.createWallet')}
            </a>
            <a 
              href="https://dfsscan.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-lg border transition-colors ${
                isDark 
                  ? "border-gray-700 text-white hover:bg-gray-800" 
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              {t('whitepaper.cta.exploreChain')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperPage;

