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

const ExploreDapps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isDark } = useTheme();

  // Categories for sidebar
  const categories = [
    { name: "All", icon: HiOutlineCollection, count: 10 },
    { name: "Wallet", icon: HiOutlineCurrencyDollar, count: 1 },
    { name: "Explorer", icon: HiOutlineGlobe, count: 1 },
    { name: "Token Tools", icon: HiOutlineSparkles, count: 2 },
    { name: "Social", icon: HiOutlineUserGroup, count: 2 },
    { name: "DeFi", icon: HiOutlineSwitchHorizontal, count: 2 },
    { name: "Exchange", icon: HiOutlineShoppingCart, count: 2 },
    { name: "Utility", icon: HiOutlineGift, count: 1 },
  ];

  // dApps data with your actual projects
  const dappsData = [
    {
      id: 1,
      name: "Metaface",
      description: "DFS Chain's main wallet. Secure, fast, and easy to use for managing your DFS assets.",
      category: "Wallet",
      url: "https://metaface.dfsscan.com",
      icon: "👤",
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
      icon: "🔍",
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
      icon: "🪙",
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
      icon: "📝",
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
      icon: "🎯",
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
      icon: "💝",
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
      icon: "🔥",
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
      icon: "🚀",
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
      icon: "🤝",
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
      icon: "💱",
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
                  Categories
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                          selectedCategory === category.name
                            ? "bg-[#21f201]/10 text-[#21f201] border-2 border-[#21f201]/30"
                            : isDark 
                              ? "text-gray-400 bg-gray-800/50 hover:bg-gray-800 hover:text-white border border-gray-700" 
                              : "text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 border border-gray-200"
                        }`}
                        title={category.name}
                      >
                        <Icon className="w-5 h-5" />
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
                  Categories
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
                          <span className="text-sm font-medium">{category.name}</span>
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
                    Submit Your dApp
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
                      Explore <span className="text-[#21f201]">dApps</span>
                    </h1>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Discover decentralized applications built on DFS SimuChain
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:w-72">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search dApps..."
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
                
                {/* Results Count */}
                <div className="mt-4 flex items-center justify-between">
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Showing <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{filteredDapps.length}</span> dApps
                  </p>
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
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dapp.gradient} flex items-center justify-center text-xl shadow-lg`}>
                          {dapp.icon}
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
                          Visit →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Empty State */}
                {filteredDapps.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No dApps found</h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>Try adjusting your search or filter criteria</p>
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
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Build on DFS SimuChain</h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  All dApps are using Web2 tokens. Start building your decentralized application today.
                </p>
              </div>
              <button className={`shrink-0 font-semibold py-3 px-6 rounded-lg transition-colors ${
                isDark 
                  ? "bg-white text-black hover:bg-gray-100" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                Get Started
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

