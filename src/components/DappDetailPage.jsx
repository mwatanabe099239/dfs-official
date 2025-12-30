import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiSearch, FiSettings, FiCreditCard, FiDollarSign, FiUsers, FiRefreshCw, FiTool, FiArrowRight, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

// DApps data - should match ExploreDapps
const dappsData = [
  {
    id: 1,
    name: "Metaface",
    description: "DFS Chain's main wallet. Secure, fast, and easy to use for managing your DFS assets.",
    category: "Wallet",
    url: "https://metaface.dfsscan.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/o2cerargskdqluetq0vs.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/o2cerargskdqluetq0vs.png",
    gradient: "from-blue-500 to-cyan-400",
    tag: "Featured",
    features: [
      "Secure Wallet - Multi-layer security with encrypted private keys",
      "Fast Transactions - Instant transfers with minimal fees",
      "Token Management - Support for all DRC20 tokens",
      "NFT Support - Store and manage your NFTs",
      "DApp Browser - Access DApps directly from wallet",
      "Backup & Recovery - Secure backup with seed phrases"
    ]
  },
  {
    id: 2,
    name: "DFSScan",
    description: "DFS Chain's main explorer for exploring Transactions, Blocks, and on-chain data.",
    category: "Explorer",
    url: "https://dfsscan.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/guwymkq7msbhbxfwmsly.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/guwymkq7msbhbxfwmsly.png",
    gradient: "from-purple-500 to-pink-400",
    tag: "Featured",
    features: [
      "Block Explorer - View all blocks and transactions",
      "Address Lookup - Search addresses and view balances",
      "Transaction History - Complete transaction records",
      "Token Analytics - Track token metrics and holders",
      "Contract Verification - Verify smart contracts",
      "API Access - Developer-friendly API endpoints"
    ]
  },
  {
    id: 3,
    name: "DFS Whitecreator",
    description: "DFS Chain's token publishing platform. Publish your DRC20 tokens with approval system.",
    category: "Token Tools",
    url: "https://drc20.dfsscan.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673521/ees9tjh8fd6z2rzklgjq.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/lfbyfr2uevv1l0qhswkd.png",
    gradient: "from-yellow-400 to-orange-500",
    tag: "New",
    features: [
      "Token Creation - Easy token deployment interface",
      "Approval System - Community-driven token approval",
      "Token Management - Update metadata and settings",
      "Distribution Tools - Airdrop and distribution features",
      "Analytics Dashboard - Track token performance",
      "Documentation - Comprehensive guides and tutorials"
    ]
  },
  {
    id: 4,
    name: "Uhalisi",
    description: "Social Media of DFS Chain. Post articles with IP tokens, all certified and engraved on-chain.",
    category: "Social",
    url: "https://uhalisi.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/qaftjnw8sscjxcood5uv.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/ksxqd6cvgntpvfbasbd4.png",
    gradient: "from-indigo-500 to-purple-500",
    tag: "Popular",
    features: [
      "On-Chain Posts - All content stored on blockchain",
      "IP Tokens - Monetize your content with IP tokens",
      "Certification System - Verified content creators",
      "Social Feed - Discover and follow creators",
      "Engagement Tools - Like, comment, and share",
      "NFT Integration - Create and trade content NFTs"
    ]
  },
  {
    id: 5,
    name: "POIPI",
    description: "Point Earning Platform. Earn points, swap for tokens, participate in airdrops and more.",
    category: "Social",
    url: "https://app.poipi.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673518/p8cncrxj370owxtc90pu.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673518/p8cncrxj370owxtc90pu.png",
    gradient: "from-green-400 to-emerald-500",
    tag: "Popular",
    features: [
      "Point System - Earn points through activities",
      "Token Swaps - Convert points to tokens",
      "Airdrops - Participate in exclusive airdrops",
      "Rewards Program - Multiple reward tiers",
      "Gamification - Fun and engaging activities",
      "Community Events - Special events and contests"
    ]
  },
  {
    id: 6,
    name: "Gyakusen",
    description: "Donation Platform. Donate DRC20 tokens to live streamers and receive gratitude tokens.",
    category: "Utility",
    url: "https://dfs-gyakusen-eight.vercel.app",
    logoWhite: "/dapps/gyakusen-white.png",
    logoBlack: "/dapps/gyakusen-black.png",
    gradient: "from-pink-500 to-rose-500",
    tag: "New",
    features: [
      "Live Streaming Integration - Support streamers in real-time",
      "Token Donations - Donate DRC20 tokens easily",
      "Gratitude Tokens - Receive tokens as appreciation",
      "Creator Dashboard - Manage donations and earnings",
      "Analytics - Track donation history and stats",
      "Community Features - Connect with creators and fans"
    ]
  },
  {
    id: 7,
    name: "Arigataki",
    description: "Token Burning Platform. Burn your DRC20 tokens to reduce supply and increase value.",
    category: "Token Tools",
    url: "https://dfs-arigataki-one.vercel.app",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/czwuvtbjgza6s3uydyrs.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673517/g0mfxdgr7rj3kberur3q.png",
    gradient: "from-orange-500 to-red-500",
    tag: null,
    features: [
      "Token Burning - Permanently remove tokens from supply",
      "Supply Reduction - Increase token value through deflation",
      "Burn Analytics - Track burned tokens and impact",
      "Multiple Tokens - Support for all DRC20 tokens",
      "Transparent Process - All burns recorded on-chain",
      "Community Driven - Community decides burn amounts"
    ]
  },
  {
    id: 8,
    name: "Moegi",
    description: "Token Sale Platform. Launch and participate in token sales on DFS Chain.",
    category: "DeFi",
    url: "https://dfs-moegi.vercel.app",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/ihrgv1ojboawarw7j1km.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766673516/ihrgv1ojboawarw7j1km.png",
    gradient: "from-teal-400 to-cyan-500",
    tag: "New",
    features: [
      "Token Sales - Launch your token sale easily",
      "Participation - Join token sales with DFS",
      "Vesting Schedules - Configure vesting for investors",
      "KYC Integration - Optional KYC for compliance",
      "Analytics Dashboard - Track sale progress",
      "Multi-Tier Sales - Support for multiple sale rounds"
    ]
  },
  {
    id: 9,
    name: "HeyOTC",
    description: "Trading Platform. P2P trading for DRC20 tokens with secure escrow system.",
    category: "Exchange",
    url: "https://heyotc.com",
    logoWhite: "/dapps/heyotc-white.png",
    logoBlack: "/dapps/heyotc-black.png",
    gradient: "from-violet-500 to-purple-600",
    tag: null,
    features: [
      "P2P Trading - Direct peer-to-peer token trading",
      "Escrow System - Secure transactions with escrow",
      "Multiple Tokens - Trade any DRC20 token",
      "Reputation System - Build trust with ratings",
      "Dispute Resolution - Fair dispute handling",
      "Low Fees - Minimal trading fees"
    ]
  },
  {
    id: 10,
    name: "WEX",
    description: "DEX Platform. Decentralized exchange for swapping DRC20 tokens instantly.",
    category: "Exchange",
    url: "https://wexswap.com",
    logoWhite: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766674347/yw14nsguzbvwonwpfgyx.png",
    logoBlack: "https://res.cloudinary.com/dvrlivsxx/image/upload/v1766674347/yw14nsguzbvwonwpfgyx.png",
    gradient: "from-blue-600 to-indigo-600",
    tag: "Popular",
    features: [
      "Instant Swaps - Fast token exchanges",
      "Liquidity Pools - Provide liquidity and earn",
      "Low Slippage - Optimized for best rates",
      "Multiple Pairs - Trade various token pairs",
      "Yield Farming - Earn rewards by staking",
      "Analytics - Real-time market data"
    ]
  },
];

const DappDetailPage = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Find the dapp by ID
  const dapp = dappsData.find(d => d.id === parseInt(id));
  
  // Find current index and get previous/next apps
  const currentIndex = dappsData.findIndex(d => d.id === parseInt(id));
  const previousApp = currentIndex > 0 ? dappsData[currentIndex - 1] : null;
  const nextApp = currentIndex < dappsData.length - 1 ? dappsData[currentIndex + 1] : null;

  // If dapp not found, show error
  if (!dapp) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
        <div className="flex min-w-0">
          <aside className="hidden lg:block w-56 h-screen sticky top-0 overflow-y-auto border-r bg-white border-gray-200">
            <div className="py-4">
              <Link to="/explore-dapps" className="px-5 py-2.5 text-gray-600 hover:text-gray-900">
                ← Back to DApps
              </Link>
            </div>
          </aside>
          <main className="flex-1 min-w-0 p-8">
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              DApp not found
            </h1>
          </main>
        </div>
      </div>
    );
  }

  // Categories with outline icons
  const categories = [
    { name: "All", nameKey: "exploreDapps.categories.all", icon: FiSettings },
    { name: "Wallet", nameKey: "exploreDapps.categories.wallet", icon: FiCreditCard },
    { name: "Explorer", nameKey: "exploreDapps.categories.explorer", icon: FiSearch },
    { name: "Token Tools", nameKey: "exploreDapps.categories.tokenTools", icon: FiDollarSign },
    { name: "Social", nameKey: "exploreDapps.categories.social", icon: FiUsers },
    { name: "DeFi", nameKey: "exploreDapps.categories.defi", icon: FiDollarSign },
    { name: "Exchange", nameKey: "exploreDapps.categories.exchange", icon: FiRefreshCw },
    { name: "Utility", nameKey: "exploreDapps.categories.utility", icon: FiTool },
  ];

  // Get tag style
  const getTagStyle = (tag) => {
    switch(tag) {
      case "Featured": return "bg-[#21f201] text-black";
      case "New": return "bg-gray-400 text-white";
      case "Popular": return "bg-gray-500 text-white";
      default: return "";
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
      <div className="flex min-w-0">
        {/* Left Sidebar - Same as ExploreDapps */}
        <aside className="hidden lg:block w-56 h-screen sticky top-0 overflow-y-auto border-r bg-white border-gray-200">
          <div className="py-4">
            <Link 
              to="/explore-dapps"
              className="px-5 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium"
            >
              ← {t('exploreDapps.backToDapps') || 'Back to DApps'}
            </Link>
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <Link
                  key={category.name}
                  to="/explore-dapps"
                  className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-all ${
                    isActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <category.icon className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-600"}`} />
                  <span className="text-sm font-medium">{t(category.nameKey)}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 pb-12 pt-6 max-w-[2048px] w-full text-left">
            {/* Featured Badge */}
            {dapp.tag && (
              <div className="mb-6 text-left">
                <span className={`inline-block text-xs px-2.5 py-1 rounded font-medium ${getTagStyle(dapp.tag)}`}>
                  {dapp.tag}
                </span>
              </div>
            )}

            {/* App Header - ToolHub Style */}
            <div className="mb-8 text-left">
              {/* Logo and Name - Side by Side, Vertically Centered */}
              <div className="flex items-center gap-6 mb-3 justify-start">
                {/* Logo */}
                <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex items-center justify-center ${
                  isDark ? "bg-[#2a2a2a]" : "bg-gray-100"
                }`}>
                  <img 
                    src={isDark ? dapp.logoWhite : dapp.logoBlack} 
                    alt={dapp.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className={`w-full h-full hidden items-center justify-center text-2xl font-bold bg-gradient-to-br ${dapp.gradient} text-white`}
                  >
                    {dapp.name.charAt(0)}
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 text-left">
                  <h1 className={`text-4xl md:text-5xl font-bold text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                    {dapp.name}
                  </h1>
                </div>
              </div>

              {/* Tagline, Button, and Metadata - All Left Aligned */}
              <div className="mb-6 text-left">
                {/* Tagline */}
                <p className={`text-base md:text-lg mb-4 text-left ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {dapp.description}
                </p>
                
                {/* Visit Website Button */}
                <div className="mb-4 text-left">
                  <a
                    href={dapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDark 
                        ? "bg-gray-700 text-white border border-gray-600 hover:bg-gray-600" 
                        : "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    {t('exploreDapps.visitWebsite') || 'Visit Website'}
                    <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Metadata - Same Line */}
                <div className="flex flex-wrap gap-4 text-left">
                  <div className="text-left">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Categories:{" "}
                    </span>
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {dapp.category}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Type:{" "}
                    </span>
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Free
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 text-left">
              <p className={`text-base leading-relaxed text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {dapp.description}
              </p>
            </div>

            {/* Key Features */}
            {dapp.features && dapp.features.length > 0 && (
              <div className="mb-8 text-left">
                <h2 className={`text-xl font-bold mb-4 text-left ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t('exploreDapps.keyFeatures') || 'Key Features:'}
                </h2>
                <ul className="space-y-3 text-left">
                  {dapp.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-left">
                      <FiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                      <span className={`text-sm text-left ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center gap-4">
                {/* Previous Button */}
                {previousApp ? (
                  <Link
                    to={`/explore-dapps/${previousApp.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                        : "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">Previous</span>
                      <span className="font-semibold">{previousApp.name}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}

                {/* Next Button */}
                {nextApp ? (
                  <Link
                    to={`/explore-dapps/${nextApp.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-auto ${
                      isDark
                        ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                        : "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">Next</span>
                      <span className="font-semibold">{nextApp.name}</span>
                    </div>
                    <FiChevronRight className="w-4 h-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Back to DApps Link */}
            <div className="mt-6 text-center">
              <Link 
                to="/explore-dapps"
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ← {t('exploreDapps.backToDapps') || 'Back to All DApps'}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DappDetailPage;

