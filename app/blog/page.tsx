'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '../../src/context/ThemeContext'
import { useLanguage } from '../../src/context/LanguageContext'
import { 
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineArrowRight,
  HiOutlineSearch,
  HiOutlineBookOpen
} from 'react-icons/hi'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  authorAvatar?: string
  date: string
  readTime: string
  image: string
  featured: boolean
  tags?: string[]
}

export default function BlogPageRoute(): React.JSX.Element {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: 'All', label: t('blog.categories.all') },
    { id: 'Announcements', label: t('blog.categories.announcements') },
    { id: 'Tutorials', label: t('blog.categories.tutorials') },
    { id: 'Updates', label: t('blog.categories.updates') },
    { id: 'Community', label: t('blog.categories.community') },
    { id: 'Technical', label: t('blog.categories.technical') }
  ]

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/blogs')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const data = await response.json()
        setBlogPosts(data.blogs || [])
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className={`relative overflow-hidden ${isDark ? "bg-gradient-to-b from-[#0B0E11] via-[#0d1117] to-[#0B0E11]" : "bg-gradient-to-b from-white via-gray-50 to-white"}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${isDark ? "bg-[#21f201]" : "bg-green-300"}`}></div>
        </div>
        <div className="relative px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
              <HiOutlineBookOpen className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              {t('blog.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('blog.hero.title')} <span className="text-[#21f201]">{t('blog.hero.titleHighlight')}</span>
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('blog.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          {loading && (
            <div className="text-center py-16">
              <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-white" : "border-gray-900"}`}></div>
              <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading blog posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <HiOutlineBookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {error}
              </h3>
              <button
                onClick={() => window.location.reload()}
                className={`mt-4 px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && featuredPost && (
            <div className={`mb-12 rounded-2xl overflow-hidden border-t border-l border-r transition-all ${isDark ? "bg-[#181A1E] border-gray-800" : "bg-white border-gray-200"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                      {t('blog.featured')}
                    </span>
                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {featuredPost.title}
                  </h2>
                  <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {featuredPost.excerpt}
                  </p>
                  <div className={`flex items-center gap-4 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
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
                  <Link href={`/blog/${featuredPost.id}`} className={`mt-6 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"}`}>
                    {t('blog.readArticle')} <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id ? isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-900" : isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>
                  {category.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <HiOutlineSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <input type="text" placeholder={t('blog.searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-gray-400 transition-colors ${isDark ? "bg-[#181A1E] border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(p => !p.featured).map(post => (
              <Link key={post.id} href={`/blog/${post.id}`} className={`block rounded-xl overflow-hidden border-l-2 transition-all hover:-translate-y-1 ${isDark ? "bg-[#181A1E] border-[#A0AEC0]" : "bg-white border-gray-400"}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineTag className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
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
          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-16">
              <HiOutlineBookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('blog.noArticles')}
              </h3>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                {t('blog.noArticlesHint')}
              </p>
            </div>
          )}
            </>
          )}

          {!loading && (
          <div className={`mt-16 rounded-2xl p-8 md:p-12 text-center border-t border-l border-r ${isDark ? "bg-gradient-to-r from-[#181A1E] to-[#1a1d23] border-gray-800" : "bg-gradient-to-r from-gray-50 to-white border-gray-200"}`} style={{ borderBottomWidth: '4px', borderBottomColor: isDark ? '#6b7280' : '#9ca3af', boxShadow: isDark ? "0px 4px 16px 0px rgba(0, 0, 0, 0.2)" : "0px 2px 8px 0px rgba(0, 0, 0, 0.05)" }}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('blog.newsletter.title')}
            </h2>
            <p className={`mb-6 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder={t('blog.newsletter.placeholder')} className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:border-gray-400 ${isDark ? "bg-[#0B0E11] border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`} />
              <button className={`font-space py-1.5 px-4 text-sm sm:text-base rounded-md transition duration-300 ${isDark ? "bg-[#F7F7F8] text-[#181A1E] hover:bg-[#e1d9d9]" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
                {t('common.subscribe')}
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
