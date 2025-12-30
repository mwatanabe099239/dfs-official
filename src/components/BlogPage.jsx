import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineArrowRight,
  HiOutlineSearch,
  HiOutlineBookOpen
} from 'react-icons/hi';

const BlogPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'All', label: t('blog.categories.all') },
    { id: 'Announcements', label: t('blog.categories.announcements') },
    { id: 'Tutorials', label: t('blog.categories.tutorials') },
    { id: 'Updates', label: t('blog.categories.updates') },
    { id: 'Community', label: t('blog.categories.community') },
    { id: 'Technical', label: t('blog.categories.technical') }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Introducing DFS Chain: The Future of Web2-Web3 Integration',
      excerpt: 'Learn how DFS Chain bridges the gap between traditional web applications and blockchain technology, making decentralized concepts accessible to everyone.',
      category: 'Announcements',
      author: 'DFS Team',
      date: 'Dec 20, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      featured: true,
    },
    {
      id: 2,
      title: 'How to Create Your First DRC20 Token',
      excerpt: 'A step-by-step guide to publishing your own token on DFS Chain using the Whitecreator platform. No coding experience required!',
      category: 'Tutorials',
      author: 'Dev Team',
      date: 'Dec 18, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
      featured: false,
    },
    {
      id: 3,
      title: 'WEXSWAP DEX Now Live on DFS Chain',
      excerpt: 'Our decentralized exchange is officially launched! Trade DRC20 tokens with instant swaps and competitive rates.',
      category: 'Updates',
      author: 'DFS Team',
      date: 'Dec 15, 2025',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80',
      featured: false,
    },
    {
      id: 4,
      title: 'Understanding Gas Fees on DFS Chain',
      excerpt: 'A comprehensive guide to how gas works on our platform, why it matters, and tips for optimizing your transaction costs.',
      category: 'Technical',
      author: 'Tech Team',
      date: 'Dec 12, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80',
      featured: false,
    },
    {
      id: 5,
      title: 'Community Spotlight: Building on DFS Chain',
      excerpt: 'Meet the developers and creators who are building innovative applications on our platform. Their stories and insights.',
      category: 'Community',
      author: 'Community Team',
      date: 'Dec 10, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      featured: false,
    },
    {
      id: 6,
      title: 'Staking Coming Soon: What You Need to Know',
      excerpt: 'Get ready for DFS staking! Learn about the upcoming feature, expected APY, and how to prepare your tokens.',
      category: 'Announcements',
      author: 'DFS Team',
      date: 'Dec 8, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

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
              <HiOutlineBookOpen className="w-4 h-4" />
              {t('blog.hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('blog.hero.title')} <span className="text-[#21f201]">{t('blog.hero.titleHighlight')}</span>
            </h1>
            
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('blog.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <div className={`mb-12 rounded-2xl overflow-hidden border transition-all hover:border-[#21f201]/50 ${
              isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-lg"
            }`}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#21f201]/10 text-[#21f201] text-xs font-semibold">
                      {t('blog.featured')}
                    </span>
                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {featuredPost.title}
                  </h2>
                  <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {featuredPost.excerpt}
                  </p>
                  <div className={`flex items-center gap-4 text-sm ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}>
                    <span className="flex items-center gap-1">
                      <HiOutlineUser className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineCalendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-[#21f201] font-semibold hover:gap-3 transition-all"
                  >
                    {t('blog.readArticle')} <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[#21f201] text-black"
                      : isDark 
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-[#21f201] transition-colors ${
                  isDark 
                    ? "bg-[#181A1E] border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(p => !p.featured).map(post => (
              <Link 
                key={post.id}
                to={`/blog/${post.id}`}
                className={`block rounded-xl overflow-hidden border transition-all hover:border-[#21f201]/50 hover:-translate-y-1 ${
                  isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineTag className="w-4 h-4 text-[#21f201]" />
                    <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}>
                    <span className="flex items-center gap-1">
                      <HiOutlineCalendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('blog.noArticles')}
              </h3>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                {t('blog.noArticlesHint')}
              </p>
            </div>
          )}

          {/* Newsletter Section */}
          <div className={`mt-16 rounded-2xl p-8 md:p-12 text-center ${
            isDark 
              ? "bg-gradient-to-r from-[#21f201]/10 to-[#181A1E] border border-[#21f201]/20"
              : "bg-gradient-to-r from-green-50 to-white border border-green-200"
          }`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              {t('blog.newsletter.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:border-[#21f201] ${
                  isDark 
                    ? "bg-[#0B0E11] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <button className="px-6 py-3 bg-[#21f201] text-black font-semibold rounded-lg hover:bg-[#1ad901] transition-colors">
                {t('common.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

