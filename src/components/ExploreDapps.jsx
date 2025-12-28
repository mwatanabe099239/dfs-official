import React, { useState, useMemo } from "react";
import { FiSearch, FiExternalLink } from "react-icons/fi";
import { 
  HiOutlineCollection, 
  HiOutlineCurrencyDollar, 
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineShoppingCart,
  HiOutlineSwitchHorizontal,
  HiOutlineGift,
  HiOutlineCash
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const ExploreDapps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Categories for sidebar
  const categories = [
    { name: "All", nameKey: "exploreDapps.categories.all", icon: HiOutlineCollection, count: 10 },
    { name: "Wallet", nameKey: "exploreDapps.categories.wallet", icon: HiOutlineCurrencyDollar, count: 1 },
    { name: "Explorer", nameKey: "exploreDapps.categories.explorer", icon: HiOutlineGlobe, count: 1 },
    { name: "Token Tools", nameKey: "exploreDapps.categories.tokenTools", icon: HiOutlineSparkles, count: 2 },
    { name: "Social", nameKey: "exploreDapps.categories.social", icon: HiOutlineUserGroup, count: 2 },
    { name: "DeFi", nameKey: "exploreDapps.categories.defi", icon: HiOutlineSwitchHorizontal, count: 2 },
    { name: "Exchange", nameKey: "exploreDapps.categories.exchange", icon: HiOutlineShoppingCart, count: 2 },
    { name: "Utility", nameKey: "exploreDapps.categories.utility", icon: HiOutlineGift, count: 1 },
  ];

  // dApps data with your actual projects
  // Logo images should be placed in /public/dapps/ folder
  // White logos for dark theme, Black logos for light theme
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
      tagColor: "bg-[#21f201] text-black",
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
      tag: "Official",
      tagColor: "bg-blue-500 text-white",
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
      tagColor: "bg-emerald-500 text-white",
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
      tag: null,
      tagColor: null,
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
      tagColor: "bg-amber-500 text-black",
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
      tag: null,
      tagColor: null,
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
      tagColor: null,
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
      tagColor: "bg-emerald-500 text-white",
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
      tagColor: null,
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
      tag: "Featured",
      tagColor: "bg-[#21f201] text-black",
    },
  ];

  // Filter dApps based on search and category
  const filteredDapps = useMemo(() => {
    return dappsData.filter((dapp) => {
      const matchesSearch = dapp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dapp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dapp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Categories - Horizontal Scrollable */}
            <div className="lg:hidden w-full">
              <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
              }`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  {t('exploreDapps.categories.title')}
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.name;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex-shrink-0 flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ${
                          isSelected
                            ? "bg-[#21f201]/10 text-[#21f201] border-2 border-[#21f201]/30 px-4 py-3"
                            : isDark 
                              ? "text-gray-400 bg-gray-800/50 hover:bg-gray-800 hover:text-white border border-gray-700 w-12 h-12" 
                              : "text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 w-12 h-12"
                        }`}
                        title={category.name}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {isSelected && (
                          <span className="text-sm font-medium whitespace-nowrap">{t(category.nameKey)}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64 shrink-0">
              <div className={`rounded-xl p-4 sticky top-8 border transition-colors duration-300 ${
                isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
              }`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 px-3 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  {t('exploreDapps.categories.title')}
                </h3>
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                          selectedCategory === category.name
                            ? "bg-[#21f201]/10 text-[#21f201]"
                            : isDark 
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{t(category.nameKey)}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category.name
                            ? "bg-[#21f201]/20 text-[#21f201]"
                            : isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                {/* Submit dApp Button */}
                <div className={`mt-6 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <button className="w-full bg-[#21f201] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#1ad901] transition-colors flex items-center justify-center gap-2">
                    <HiOutlineSparkles className="w-5 h-5" />
                    {t('exploreDapps.submitDapp')}
                  </button>
                </div>
              </div>
            </div>

            {/* dApps Section with Border */}
            <div className={`flex-1 border rounded-xl overflow-hidden transition-colors duration-300 ${
              isDark ? "border-gray-700 bg-[#181A1E]" : "border-gray-200 bg-white shadow-sm"
            }`}>
              {/* Header inside bordered section */}
              <div className={`p-6 border-b transition-colors duration-300 ${
                isDark ? "border-gray-700 bg-[#0B0E11]" : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-start">
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">
                      {t('exploreDapps.title')} <span className="text-[#21f201]">{t('exploreDapps.titleHighlight')}</span>
                    </h1>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {t('exploreDapps.subtitle')}
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:w-72">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('exploreDapps.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full border rounded-lg pl-10 pr-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-[#21f201] transition-colors text-sm ${
                        isDark 
                          ? "bg-[#181A1E] border-gray-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>
                
                {/* Results Count & Selected Category */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {t('exploreDapps.showing')} <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{filteredDapps.length}</span> {t('exploreDapps.dappsLabel')}
                    </p>
                    {/* Selected Category Badge - Mobile */}
                    {selectedCategory !== "All" && (
                      <div className="lg:hidden flex items-center gap-2">
                        <span className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{t('exploreDapps.in')}</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#21f201]/10 text-[#21f201] text-sm font-medium">
                          {(() => {
                            const cat = categories.find(c => c.name === selectedCategory);
                            const Icon = cat?.icon;
                            return Icon ? <Icon className="w-4 h-4" /> : null;
                          })()}
                          {t(categories.find(c => c.name === selectedCategory)?.nameKey)}
                          <button 
                            onClick={() => setSelectedCategory("All")}
                            className="ml-1 hover:bg-[#21f201]/20 rounded-full p-0.5"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scrollable Grid Container */}
              <div className="h-[600px] overflow-y-auto p-6 custom-scrollbar">
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredDapps.map((dapp) => (
                    <a
                      key={dapp.id}
                      href={dapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group border rounded-xl p-5 hover:border-[#21f201]/50 transition-all duration-300 ${
                        isDark 
                          ? "bg-[#0B0E11] border-gray-700 hover:bg-[#1a1d23]" 
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-3">
                        {/* Logo */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden ${
                          isDark ? "bg-gray-800" : "bg-gray-100"
                        }`}>
                          <img 
                            src={isDark ? dapp.logoWhite : dapp.logoBlack} 
                            alt={`${dapp.name} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className={`w-full h-full hidden items-center justify-center text-xl bg-gradient-to-br ${dapp.gradient}`}
                          >
                            {dapp.name.charAt(0)}
                          </div>
                        </div>
                        
                        {/* Tag */}
                        {dapp.tag && (
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dapp.tagColor}`}>
                            {dapp.tag}
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className={`text-base font-bold group-hover:text-[#21f201] transition-colors ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                            {dapp.name}
                          </h3>
                          <FiExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#21f201] transition-colors" />
                        </div>
                        <p className={`text-xs leading-relaxed line-clamp-2 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {dapp.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className={`flex items-center justify-between pt-3 border-t ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          isDark ? "text-gray-500 bg-gray-800" : "text-gray-600 bg-gray-200"
                        }`}>
                          {dapp.category}
                        </span>
                        <span className="text-xs text-[#21f201] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {t('exploreDapps.visit')} →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Empty State */}
                {filteredDapps.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{t('exploreDapps.noDappsFound')}</h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>{t('exploreDapps.tryAdjusting')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className={`bg-gradient-to-r from-[#21f201]/10 to-transparent border rounded-xl p-8 ${
            isDark ? "border-[#21f201]/20" : "border-[#21f201]/30"
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{t('exploreDapps.buildOn')}</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {t('exploreDapps.buildOnDescription')}
                </p>
              </div>
              <button className={`shrink-0 font-semibold py-3 px-6 rounded-lg transition-colors ${
                isDark 
                  ? "bg-white text-black hover:bg-gray-100" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                {t('common.getStarted')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #181A1E;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4B5563;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ExploreDapps;

