import React, { useState, useMemo } from "react";
import { FiSearch, FiChevronDown, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const DappsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChain, setSelectedChain] = useState("All Chains");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [timeFilter, setTimeFilter] = useState("7D");
  const [sortBy, setSortBy] = useState("users");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showNewListings, setShowNewListings] = useState(false);
  const [showTradingDapps, setShowTradingDapps] = useState(false);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Function to generate realistic mini chart data
  const generateMiniChartData = (baseValue) => {
    const data = [];
    for (let i = 0; i < 7; i++) {
      const variation = (Math.random() - 0.5) * 0.1; // 10% variation
      const value = Math.max(0, baseValue * (1 + variation + (Math.sin(i * 0.8) * 0.05)));
      data.push(Math.round(value));
    }
    return data;
  };

  // Sample dApps data - you can replace this with your actual dApps list
  const dappsData = [
    {
      id: 1,
      name: "World of Dypians",
      icon: "🎮",
      category: "Games",
      chains: ["BSC", "opBNB"],
      users: 1250000,
      usersChange: -3.74,
      transactions: 7800000,
      transactionsChange: 5.81,
      last7DaysUsers: generateMiniChartData(1250000),
      isNew: false,
      isTrading: false,
    },
    {
      id: 2,
      name: "The Landlord",
      icon: "🏠",
      category: "Games",
      chains: ["opBNB"],
      users: 1200000,
      usersChange: 0.69,
      transactions: 1200000,
      transactionsChange: 0.68,
      last7DaysUsers: generateMiniChartData(1200000),
      isNew: false,
      isTrading: false,
    },
    {
      id: 3,
      name: "SERAPH In The Darkness",
      icon: "⚔️",
      category: "Games",
      chains: ["BSC", "opBNB"],
      users: 1100000,
      usersChange: 0.00,
      transactions: 1370000,
      transactionsChange: 0.16,
      last7DaysUsers: generateMiniChartData(1100000),
      isNew: false,
      isTrading: false,
    },
    {
      id: 4,
      name: "Quack AI",
      icon: "🤖",
      category: "AI",
      chains: ["BSC", "opBNB"],
      users: 582750,
      usersChange: 25.16,
      transactions: 582780,
      transactionsChange: 25.16,
      last7DaysUsers: generateMiniChartData(582750),
      isNew: true,
      isTrading: false,
    },
    {
      id: 5,
      name: "PancakeSwap",
      icon: "🥞",
      category: "DeFi",
      chains: ["BSC", "opBNB"],
      users: 522760,
      usersChange: 7.04,
      transactions: 8800000,
      transactionsChange: -1.41,
      last7DaysUsers: generateMiniChartData(522760),
      isNew: false,
      isTrading: true,
    },
    {
      id: 6,
      name: "MetaFace",
      icon: "👤",
      category: "Social",
      chains: ["DFS Chain"],
      users: 450000,
      usersChange: 15.23,
      transactions: 1200000,
      transactionsChange: 12.45,
      last7DaysUsers: generateMiniChartData(450000),
      isNew: true,
      isTrading: false,
    },
    {
      id: 7,
      name: "DFS Wallet",
      icon: "💳",
      category: "Wallets",
      chains: ["DFS Chain"],
      users: 380000,
      usersChange: 8.92,
      transactions: 950000,
      transactionsChange: 6.78,
      last7DaysUsers: generateMiniChartData(380000),
      isNew: false,
      isTrading: false,
    },
    {
      id: 8,
      name: "DFS Staking",
      icon: "💰",
      category: "DeFi",
      chains: ["DFS Chain"],
      users: 320000,
      usersChange: 22.15,
      transactions: 650000,
      transactionsChange: 18.33,
      last7DaysUsers: generateMiniChartData(320000),
      isNew: false,
      isTrading: true,
    },
  ];

  const chains = ["All Chains", "BSC", "opBNB", "DFS Chain"];
  const categories = ["All Categories", "Games", "DeFi", "AI", "Social", "Wallets"];

  // Generate dynamic chart data based on time filter
  const generateChartData = () => {
    const baseValue = 26.3;
    const days = timeFilter === "24H" ? 1 : timeFilter === "7D" ? 7 : 30;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      // Generate realistic fluctuations
      const variation = (Math.random() - 0.5) * 4;
      const value = Math.max(0, baseValue + variation + (Math.sin(i * 0.5) * 2));
      
      data.push({
        date: days === 1 ? "Today" : 
              days === 7 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) :
              date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.round(value * 10) / 10
      });
    }
    
    return data;
  };

  const chartData = generateChartData();

  // Filter and sort dApps
  const filteredAndSortedDapps = useMemo(() => {
    let filtered = dappsData.filter((dapp) => {
      const matchesSearch = dapp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChain = selectedChain === "All Chains" || dapp.chains.includes(selectedChain);
      const matchesCategory = selectedCategory === "All Categories" || dapp.category === selectedCategory;
      const matchesNewListings = !showNewListings || dapp.isNew;
      const matchesTrading = !showTradingDapps || dapp.isTrading;

      return matchesSearch && matchesChain && matchesCategory && matchesNewListings && matchesTrading;
    });

    // Sort dApps
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "users":
          aValue = a.users;
          bValue = b.users;
          break;
        case "transactions":
          aValue = a.transactions;
          bValue = b.transactions;
          break;
        default:
          aValue = a.users;
          bValue = b.users;
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [searchTerm, selectedChain, selectedCategory, showNewListings, showTradingDapps, sortBy, sortOrder]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toString();
  };

  const MiniChart = ({ data }) => {
    // Convert data to chart format
    const chartData = data.map((value, index) => ({
      day: index + 1,
      value: value
    }));

    const isPositive = data[data.length - 1] > data[0];
    const lineColor = isPositive ? "#21f201" : "#ef4444";

    return (
      <div className="h-8 w-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Header Section */}
      <div className={`px-6 py-12 md:px-8 lg:px-12 xl:px-16 transition-colors duration-300 ${
        isDark ? "bg-[#0B0E11]" : "bg-gray-50"
      }`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 text-start">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('dapps.hero.title')}{" "}
                <span className="text-[#21f201]">DFS Chain</span> {t('dapps.hero.ecosystem')}
              </h1>
              <p className={`text-xl mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {t('dapps.hero.subtitle')}
              </p>
              <button className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark 
                  ? "bg-white text-black hover:bg-gray-100" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                {t('dapps.submitDapp')}
              </button>
            </div>
            
            {/* DFS Chain Metrics Chart */}
            <div className={`rounded-xl p-6 w-full lg:w-[420px] transition-colors duration-300 ${
              isDark ? "bg-[#181A1E]" : "bg-white border border-gray-200 shadow-sm"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">DFS Chain</h3>
                <FiChevronDown className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-4">
                {chartData[chartData.length - 1]?.value || 26.3}M {chartData[chartData.length - 1]?.date || "Oct 07"}
              </div>
              
              <div className="flex space-x-4 mb-6">
                <button className="bg-[#21f201] text-black px-3 py-1 rounded text-sm font-medium">
                  Daily TXN
                </button>
                <button className="text-gray-400 px-3 py-1 text-sm hover:text-white transition-colors">
                  Daily Active Accounts
                </button>
              </div>
              
              {/* Line Chart */}
              <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value) => [`${value}M`, 'Daily TXN']}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#21f201"
                      strokeWidth={2.5}
                      dot={{ fill: '#21f201', strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 4, stroke: '#21f201', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`px-6 md:px-8 lg:px-12 xl:px-16 pb-6 transition-colors duration-300 ${
        isDark ? "bg-[#0B0E11]" : "bg-gray-50"
      }`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`rounded-xl p-6 transition-colors duration-300 ${
            isDark ? "bg-[#181A1E]" : "bg-white border border-gray-200 shadow-sm"
          }`}>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in Ranking"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full border rounded-lg pl-10 pr-4 py-2 placeholder-gray-400 focus:outline-none focus:border-[#21f201] ${
                    isDark 
                      ? "bg-[#0B0E11] border-gray-600 text-white" 
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Chain Filter */}
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:border-[#21f201] ${
                  isDark 
                    ? "bg-[#0B0E11] border-gray-600 text-white" 
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                {chains.map((chain) => (
                  <option key={chain} value={chain}>
                    {chain}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:border-[#21f201] ${
                  isDark 
                    ? "bg-[#0B0E11] border-gray-600 text-white" 
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Checkboxes */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showNewListings}
                    onChange={(e) => setShowNewListings(e.target.checked)}
                    className={`rounded text-[#21f201] focus:ring-[#21f201] ${
                      isDark ? "border-gray-600 bg-[#0B0E11]" : "border-gray-300 bg-white"
                    }`}
                  />
                  New Listings
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showTradingDapps}
                    onChange={(e) => setShowTradingDapps(e.target.checked)}
                    className={`rounded text-[#21f201] focus:ring-[#21f201] ${
                      isDark ? "border-gray-600 bg-[#0B0E11]" : "border-gray-300 bg-white"
                    }`}
                  />
                  Trading dApps
                </label>
              </div>

              {/* Time Filters */}
              <div className="flex gap-2">
                {["24H", "7D", "30D"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeFilter(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === period
                        ? "bg-[#21f201] text-black"
                        : isDark 
                          ? "bg-[#0B0E11] text-gray-400 hover:text-white" 
                          : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dApps Table */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className={`rounded-xl overflow-hidden transition-colors duration-300 ${
            isDark ? "bg-[#181A1E]" : "bg-white border border-gray-200 shadow-sm"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b transition-colors duration-300 ${
                  isDark ? "bg-[#0B0E11] border-gray-700" : "bg-gray-50 border-gray-200"
                }`}>
                  <tr>
                    <th className={`text-left py-5 px-6 text-sm font-medium w-16 align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>#</th>
                    <th className={`text-left py-5 px-6 text-sm font-medium min-w-[200px] align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>dApp</th>
                    <th className={`text-left py-5 px-6 text-sm font-medium w-32 align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>Category</th>
                    <th 
                      className={`text-left py-5 px-6 text-sm font-medium cursor-pointer w-24 align-middle ${
                        isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => handleSort("users")}
                    >
                      <div className="flex items-center gap-1">
                        Users
                        {sortBy === "users" && (
                          sortOrder === "desc" ? <FiTrendingDown /> : <FiTrendingUp />
                        )}
                      </div>
                    </th>
                    <th className={`text-left py-5 px-6 text-sm font-medium w-20 align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>7D %</th>
                    <th 
                      className={`text-left py-5 px-6 text-sm font-medium cursor-pointer w-24 align-middle ${
                        isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => handleSort("transactions")}
                    >
                      <div className="flex items-center gap-1">
                        TXN
                        {sortBy === "transactions" && (
                          sortOrder === "desc" ? <FiTrendingDown /> : <FiTrendingUp />
                        )}
                      </div>
                    </th>
                    <th className={`text-left py-5 px-6 text-sm font-medium w-20 align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>7D %</th>
                    <th className={`text-left py-5 px-6 text-sm font-medium w-32 align-middle ${isDark ? "text-gray-300" : "text-gray-600"}`}>Last 7D Users</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedDapps.map((dapp, index) => (
                    <tr key={dapp.id} className={`border-b transition-colors ${
                      isDark ? "border-gray-700 hover:bg-[#1a1d23]" : "border-gray-100 hover:bg-gray-50"
                    }`}>
                      <td className={`py-5 px-6 font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{index + 1}</td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                            isDark ? "bg-gray-600" : "bg-gray-200"
                          }`}>
                            {dapp.icon}
                          </div>
                          <div>
                            <div className={`font-medium text-sm text-start ${isDark ? "text-white" : "text-gray-900"}`}>{dapp.name}</div>
                            <div className={`text-xs text-start ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              {dapp.chains.join(", ")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
                        }`}>
                          {dapp.category}
                        </span>
                      </td>
                      <td className={`py-5 px-6 font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                        {formatNumber(dapp.users)}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`flex items-center gap-1 text-sm ${
                          dapp.usersChange >= 0 ? "text-[#21f201]" : "text-red-400"
                        }`}>
                          {dapp.usersChange >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                          {dapp.usersChange >= 0 ? "+" : ""}{dapp.usersChange.toFixed(2)}%
                        </span>
                      </td>
                      <td className={`py-5 px-6 font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                        {formatNumber(dapp.transactions)}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`flex items-center gap-1 text-sm ${
                          dapp.transactionsChange >= 0 ? "text-[#21f201]" : "text-red-400"
                        }`}>
                          {dapp.transactionsChange >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                          {dapp.transactionsChange >= 0 ? "+" : ""}{dapp.transactionsChange.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <MiniChart data={dapp.last7DaysUsers} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DappsPage;
