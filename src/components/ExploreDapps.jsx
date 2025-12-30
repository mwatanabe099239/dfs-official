import React, { useState, useMemo } from "react";
import { FiSearch, FiPlus, FiMail, FiSettings, FiCreditCard, FiDollarSign, FiUsers, FiRefreshCw, FiTool } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const ExploreDapps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const { isDark } = useTheme();
  const { t } = useLanguage();

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

  // dApps data
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
    },
  ];

  // Filter dApps
  const filteredDapps = useMemo(() => {
    return dappsData.filter((dapp) => {
      const matchesSearch = dapp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dapp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dapp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Featured dApps
  const featuredDapps = dappsData.filter(d => d.tag === "Featured");

  // Get tag color
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
        {/* Left Sidebar - ToolHub Style */}
        <aside className="hidden lg:block w-56 h-screen sticky top-0 overflow-y-auto border-r bg-white border-gray-200">
          <div className="py-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-all ${
                    isActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <category.icon className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-600"}`} />
                  <span className="text-sm font-medium">{t(category.nameKey)}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 pb-12 pt-6 max-w-[2048px] mx-auto w-full">
            {/* Hero Section - ToolHub Style */}
            <section className="py-6 sm:py-8 md:py-12">
              <div className="mb-3 sm:mb-4">
                <FiSettings className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
              </div>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('exploreDapps.heroTitle')}
              </h1>
              <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {t('exploreDapps.heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Link 
                  to="/feedback"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  {t('exploreDapps.submitDapp')}
                </Link>
                <Link 
                  to="/community"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                    isDark 
                      ? "border-gray-600 text-gray-300 hover:bg-white/5" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiMail className="w-4 h-4" />
                  {t('exploreDapps.joinCommunity')}
                </Link>
              </div>
            </section>

            {/* Search Bar - ToolHub Style */}
            <div className={`relative mb-6 sm:mb-8 ${isDark ? "bg-[#1c1c1c]" : "bg-white"} rounded-lg sm:rounded-xl`}>
              <input
                type="text"
                placeholder={t('exploreDapps.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 rounded-lg sm:rounded-xl text-sm outline-none ${
                  isDark 
                    ? "bg-[#1c1c1c] text-white placeholder-gray-500 border border-gray-800 focus:border-gray-700" 
                    : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-gray-300"
                }`}
              />
              <FiSearch className={`absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`} />
            </div>

            {/* Mobile Category Pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map((category) => {
                const isActive = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <category.icon className={`w-4 h-4 ${isActive ? "text-gray-900" : "text-gray-600"}`} />
                    <span>{t(category.nameKey)}</span>
                  </button>
                );
              })}
            </div>

            {/* Featured dApps Section - ToolHub Style */}
            {selectedCategory === "All" && (
              <section className="mb-6 sm:mb-8 md:mb-10">
                <h2 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {t('exploreDapps.featuredDapps')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full max-w-full">
                  {featuredDapps.map((dapp) => (
                    <a
                      key={dapp.id}
                      href={dapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 rounded-xl transition-all hover:bg-opacity-90 overflow-hidden w-full max-w-full ${
                        isDark 
                          ? "bg-[#181818] hover:bg-[#2a2a2a]" 
                          : "bg-white hover:shadow-md"
                      }`}
                    >
                      {/* Badge - Top Right */}
                      <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium z-10 ${getTagStyle(dapp.tag)}`}>
                        {dapp.tag}
                      </span>

                      {/* Logo */}
                      <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden flex items-center justify-center ${
                        isDark ? "bg-[#2a2a2a]" : "bg-gray-100"
                      }`}>
                        <img 
                          src={isDark ? dapp.logoWhite : dapp.logoBlack} 
                          alt={dapp.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className={`w-full h-full hidden items-center justify-center text-xl font-bold bg-gradient-to-br ${dapp.gradient} text-white`}
                        >
                          {dapp.name.charAt(0)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 max-w-full pr-6 sm:pr-10 md:pr-14 text-left overflow-hidden">
                        <h3 className={`text-sm sm:text-base font-semibold truncate mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {dapp.name}
                        </h3>
                        <p className={`text-xs sm:text-sm line-clamp-2 break-words ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {dapp.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Join Community Banner - ToolHub Style */}
            {selectedCategory === "All" && (
              <section className={`mb-8 sm:mb-10 rounded-xl sm:rounded-2xl overflow-hidden ${
                isDark ? "bg-[#181818]" : "bg-white"
              }`}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5 h-48 sm:h-56 md:h-64 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop" 
                      alt="Blockchain dApps" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8">
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t('exploreDapps.communityTitle')}
                    </h3>
                    <p className={`text-xs sm:text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {t('exploreDapps.communitySubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder={t('exploreDapps.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-xs sm:text-sm outline-none ${
                          isDark 
                            ? "bg-[#2a2a2a] text-white placeholder-gray-500 border border-gray-700" 
                            : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200"
                        }`}
                      />
                      <button className="px-5 py-2.5 bg-white text-black rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                        {t('exploreDapps.subscribe')}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* All dApps Section - ToolHub Style */}
            <section>
              <h2 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                {selectedCategory === "All" ? t('exploreDapps.allDapps') : `${t(`exploreDapps.categories.${selectedCategory.toLowerCase().replace(' ', '')}`)}:`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
                {filteredDapps.map((dapp) => (
                  <a
                    key={dapp.id}
                    href={dapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 rounded-xl transition-all hover:bg-opacity-90 overflow-hidden w-full max-w-full ${
                      isDark 
                        ? "bg-[#181818] hover:bg-[#2a2a2a]" 
                        : "bg-white hover:shadow-md"
                    }`}
                  >
                    {/* Badge - Top Right */}
                    {dapp.tag && (
                      <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium z-10 ${getTagStyle(dapp.tag)}`}>
                        {dapp.tag}
                      </span>
                    )}

                    {/* Logo */}
                    <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden flex items-center justify-center ${
                      isDark ? "bg-[#2a2a2a]" : "bg-gray-100"
                    }`}>
                      <img 
                        src={isDark ? dapp.logoWhite : dapp.logoBlack} 
                        alt={dapp.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className={`w-full h-full hidden items-center justify-center text-xl font-bold bg-gradient-to-br ${dapp.gradient} text-white`}
                      >
                        {dapp.name.charAt(0)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 max-w-full pr-6 sm:pr-10 md:pr-14 text-left overflow-hidden">
                      <h3 className={`text-sm sm:text-base font-semibold truncate mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {dapp.name}
                      </h3>
                      <p className={`text-xs sm:text-sm line-clamp-2 break-words ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {dapp.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Empty State */}
              {filteredDapps.length === 0 && (
                <div className={`text-center py-16 rounded-2xl ${isDark ? "bg-[#181818]" : "bg-white"}`}>
                  <div className="flex justify-center mb-4">
                    <FiSearch className={`w-16 h-16 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t('exploreDapps.noDappsFound')}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {t('exploreDapps.tryAdjusting')}
                  </p>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ExploreDapps;
