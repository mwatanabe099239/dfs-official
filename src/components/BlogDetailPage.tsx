'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineArrowLeft,
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineTag
} from 'react-icons/hi';
import { FaTwitter, FaTelegram, FaLinkedin } from 'react-icons/fa';

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
  content: string
  tags: string[]
}

const BlogDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the specific blog post
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          let errorMessage = 'Failed to fetch blog';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
          }
          
          if (response.status === 404) {
            setError('notFound');
          } else {
            console.error('Blog fetch error:', errorMessage);
            setError('error');
          }
          return;
        }
        
        const data = await response.json();
        if (!data.blog) {
          setError('notFound');
          return;
        }
        setPost(data.blog);
        
        // Fetch related posts (same category)
        const allBlogsResponse = await fetch('/api/blogs');
        if (allBlogsResponse.ok) {
          const allBlogsData = await allBlogsResponse.json();
          const related = (allBlogsData.blogs || [])
            .filter((p: BlogPost) => p.category === data.blog.category && p.id !== data.blog.id)
            .slice(0, 2);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-white" : "border-gray-900"}`}></div>
          <div className={`text-lg mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error === 'notFound' || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {t('blog.postNotFound')}
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#21f201] font-semibold hover:underline"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  if (error === 'error') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Failed to load blog post. Please try again later.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#21f201] font-semibold hover:underline"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  // Blog post and related posts are now fetched from API in useEffect above

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0B0E11] text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          {t('blog.backToBlog')}
        </Link>

        {/* Category Badge */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-[#21f201] text-black text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <HiOutlineUser className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineCalendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineClock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Share & Bookmark */}
          <div className={`flex items-center justify-between mb-8 pb-6 border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {t('blog.share')}:
              </span>
              <a 
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-gray-800 text-gray-400 hover:text-blue-400" : "hover:bg-gray-100 text-gray-500 hover:text-blue-500"
                }`}
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href={`https://t.me/share/url?url=${shareUrl}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-gray-800 text-gray-400 hover:text-blue-500" : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
                }`}
              >
                <FaTelegram className="w-5 h-5" />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-gray-800 text-gray-400 hover:text-blue-600" : "hover:bg-gray-100 text-gray-500 hover:text-blue-700"
                }`}
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}>
              <HiOutlineBookmark className="w-4 h-4" />
              {t('blog.save')}
            </button>
          </div>

          {/* Article Content */}
          <article className={`prose prose-lg max-w-none text-left ${
            isDark ? "prose-invert" : ""
          }`}>
            <div className={`space-y-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {post.content.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={idx} className={`text-2xl md:text-3xl font-bold mt-10 mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={idx} className={`text-xl md:text-2xl font-bold mt-8 mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h4 key={idx} className={`text-lg font-bold mt-6 mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {line.replace(/\*\*/g, '')}
                    </h4>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-6 list-disc">
                      {line.replace('- ', '').split('**').map((part, i) => 
                        i % 2 === 1 
                          ? <strong key={i} className={isDark ? "text-white" : "text-gray-900"}>{part}</strong>
                          : part
                      )}
                    </li>
                  );
                }
                if (line.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className={`pl-4 border-l-4 border-[#21f201] italic ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {line.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (line.match(/^\d\. /)) {
                  return (
                    <li key={idx} className="ml-6 list-decimal">
                      {line.replace(/^\d\. /, '').split('**').map((part, i) => 
                        i % 2 === 1 
                          ? <strong key={i} className={isDark ? "text-white" : "text-gray-900"}>{part}</strong>
                          : part
                      )}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <div key={idx} className="h-2"></div>;
                }
                if (line.startsWith('|')) {
                  return null; // Skip table rendering for simplicity
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {line.split('**').map((part, i) => 
                      i % 2 === 1 
                        ? <strong key={i} className={isDark ? "text-white" : "text-gray-900"}>{part}</strong>
                        : part
                    )}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Tags */}
          <div className={`mt-10 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <HiOutlineTag className="w-5 h-5 text-[#21f201]" />
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Box */}
          <div className={`mt-10 p-6 rounded-xl border ${
            isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#21f201]/10 flex items-center justify-center text-3xl">
                {post.authorAvatar}
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t('blog.writtenBy')}
                </p>
                <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {post.author}
                </h4>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t('blog.officialTeam')}
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                {t('blog.relatedArticles')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className={`rounded-xl overflow-hidden border transition-all hover:border-[#21f201]/50 ${
                      isDark ? "bg-[#181A1E] border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {relatedPost.category}
                      </span>
                      <h4 className={`font-bold mt-1 line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {relatedPost.title}
                      </h4>
                      <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {relatedPost.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;


