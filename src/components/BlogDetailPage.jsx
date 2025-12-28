import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

const BlogDetailPage = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { id } = useParams();

  // Blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: 1,
      title: 'Introducing DFS SimuChain: The Future of Web2-Web3 Integration',
      excerpt: 'Learn how DFS SimuChain bridges the gap between traditional web applications and blockchain technology, making decentralized concepts accessible to everyone.',
      category: 'Announcements',
      author: 'DFS Team',
      authorAvatar: '👤',
      date: 'Dec 20, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
      content: `
## The Dawn of a New Era

DFS SimuChain represents a groundbreaking approach to blockchain technology. By creating a Web2 simulation of Web3 concepts, we've made it possible for anyone to experience the benefits of decentralized systems without the traditional barriers to entry.

### What Makes DFS SimuChain Different?

Unlike traditional blockchains that require complex wallet setups, seed phrases, and technical knowledge, DFS SimuChain offers:

- **Email-based authentication**: Simply sign up with your email to get started
- **Automatic wallet generation**: Your wallet address (dfs_0x...) is created instantly
- **Familiar user experience**: If you can use Gmail, you can use DFS SimuChain

### The Technology Behind It

Our platform simulates blockchain behavior using robust Web2 infrastructure:

1. **Block Generation**: New blocks are created every 5 minutes
2. **Transaction Processing**: Each block can contain thousands of transactions
3. **Gas Mechanism**: Fair resource allocation using DRC20_DFS tokens
4. **Immutable Records**: All transactions are permanently recorded

### Building the Ecosystem

We've already launched several applications on DFS SimuChain:

- **Metaface**: The official wallet for managing your assets
- **DFSScan**: Block explorer for tracking transactions
- **Whitecreator**: Platform for creating DRC20 tokens
- **WEXSWAP**: Decentralized exchange for token trading

### What's Next?

Our roadmap includes exciting features like staking, governance, and cross-chain bridges. Stay tuned for more updates!

### Join the Revolution

Ready to experience the future of Web2-Web3 integration? Create your wallet today at [metaface.dfsscan.com](https://metaface.dfsscan.com) and start exploring the DFS SimuChain ecosystem.
      `,
      tags: ['Blockchain', 'Web3', 'DFS SimuChain', 'Innovation'],
    },
    {
      id: 2,
      title: 'How to Create Your First DRC20 Token',
      excerpt: 'A step-by-step guide to publishing your own token on DFS SimuChain using the Whitecreator platform. No coding experience required!',
      category: 'Tutorials',
      author: 'Dev Team',
      authorAvatar: '👨‍💻',
      date: 'Dec 18, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
      content: `
## Create Your Own Token in Minutes

Have you ever wanted to create your own cryptocurrency? With DFS SimuChain's Whitecreator platform, you can launch your DRC20 token in just a few clicks!

### Prerequisites

Before you begin, make sure you have:

- A Metaface wallet with some DRC20_DFS for gas fees
- An idea for your token (name, symbol, purpose)
- A logo image (optional but recommended)

### Step 1: Access Whitecreator

Navigate to [drc20.dfsscan.com](https://drc20.dfsscan.com) and connect your Metaface wallet.

### Step 2: Fill in Token Details

Enter the following information:

- **Token Name**: The full name of your token (e.g., "My Awesome Token")
- **Symbol**: A short identifier (e.g., "MAT")
- **Total Supply**: How many tokens to create
- **Decimals**: Usually 18 for compatibility
- **Description**: What your token is for

### Step 3: Upload Your Logo

A good logo helps users identify your token. Upload a square PNG or SVG file.

### Step 4: Review and Submit

Double-check all information and click "Create Token". Pay the gas fee to complete the process.

### Step 5: Wait for Approval

Your token will be reviewed by our team. Once approved, it can be used in transactions across the network.

### Tips for Success

- Choose a unique and memorable name
- Write a clear description
- Create a professional-looking logo
- Be transparent about your token's purpose

### Conclusion

Creating a DRC20 token is simple and accessible to everyone. Start building your project on DFS SimuChain today!
      `,
      tags: ['Tutorial', 'DRC20', 'Token', 'Whitecreator'],
    },
    {
      id: 3,
      title: 'WEXSWAP DEX Now Live on DFS SimuChain',
      excerpt: 'Our decentralized exchange is officially launched! Trade DRC20 tokens with instant swaps and competitive rates.',
      category: 'Updates',
      author: 'DFS Team',
      authorAvatar: '👤',
      date: 'Dec 15, 2025',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80',
      content: `
## WEXSWAP is Live!

We're thrilled to announce that WEXSWAP, the decentralized exchange for DFS SimuChain, is now officially live!

### What is WEXSWAP?

WEXSWAP is a DEX (Decentralized Exchange) that allows you to:

- Swap DRC20 tokens instantly
- Provide liquidity and earn rewards
- Trade without intermediaries

### Key Features

**Instant Swaps**
Exchange tokens in seconds with our optimized trading engine.

**Low Fees**
Competitive gas fees make trading accessible to everyone.

**Liquidity Pools**
Add liquidity to earn a share of trading fees.

**User-Friendly Interface**
Simple, intuitive design for traders of all experience levels.

### How to Get Started

1. Visit [wexswap.com](https://wexswap.com)
2. Connect your Metaface wallet
3. Select tokens to swap
4. Confirm and execute your trade

### Supported Tokens

All approved DRC20 tokens are available for trading on WEXSWAP. More tokens are being added regularly.

### What's Coming Next

- Advanced trading features
- Mobile app
- Yield farming opportunities

Start trading on WEXSWAP today!
      `,
      tags: ['DEX', 'WEXSWAP', 'Trading', 'Launch'],
    },
    {
      id: 4,
      title: 'Understanding Gas Fees on DFS SimuChain',
      excerpt: 'A comprehensive guide to how gas works on our platform, why it matters, and tips for optimizing your transaction costs.',
      category: 'Technical',
      author: 'Tech Team',
      authorAvatar: '🔧',
      date: 'Dec 12, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&q=80',
      content: `
## What Are Gas Fees?

Gas fees are payments made to process transactions on DFS SimuChain. They serve important purposes in maintaining network health and fairness.

### Why Do Gas Fees Exist?

1. **Prevent Spam**: Fees discourage malicious actors from flooding the network
2. **Resource Allocation**: Fair distribution of computational resources
3. **Network Sustainability**: Support ongoing development and maintenance

### How Gas is Calculated

Gas fees depend on:

- **Operation Complexity**: More complex operations require more gas
- **Network Congestion**: Higher demand may increase fees
- **Transaction Size**: Larger data payloads cost more

### Paying Gas Fees

All gas fees are paid in **DRC20_DFS**, the native token of DFS SimuChain. Make sure you have enough DFS in your wallet before initiating transactions.

### Tips for Saving on Gas

**Batch Transactions**
Combine multiple operations when possible to reduce overall fees.

**Choose Optimal Times**
Transaction costs may vary based on network activity.

**Estimate Before Confirming**
Always review the estimated gas cost before confirming a transaction.

### Common Gas Costs

| Operation | Estimated Gas |
|-----------|---------------|
| Token Transfer | Low |
| Token Swap | Medium |
| Token Creation | High |

### Conclusion

Understanding gas fees helps you use DFS SimuChain more efficiently. Plan your transactions wisely to minimize costs!
      `,
      tags: ['Gas', 'Technical', 'Fees', 'Guide'],
    },
    {
      id: 5,
      title: 'Community Spotlight: Building on DFS SimuChain',
      excerpt: 'Meet the developers and creators who are building innovative applications on our platform. Their stories and insights.',
      category: 'Community',
      author: 'Community Team',
      authorAvatar: '🌟',
      date: 'Dec 10, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      content: `
## Meet Our Amazing Community

The DFS SimuChain ecosystem is powered by passionate developers and creators. Today, we spotlight some incredible projects and the people behind them.

### Featured Projects

**Uhalisi - Social Media Reimagined**

Uhalisi brings social media to DFS SimuChain with tokenized engagement. Every post is certified and recorded on-chain, giving creators true ownership of their content.

**POIPI - Rewards Platform**

POIPI revolutionizes point systems with Web3 features. Earn points, participate in airdrops, and swap for tokens—all in one platform.

**Gyakusen - Donation Platform**

Supporting creators has never been easier. Gyakusen enables DRC20 donations for live streamers and content creators.

### Developer Insights

We asked our community builders: "Why DFS SimuChain?"

> "The email-based wallet system removes all barriers for users. My app's adoption increased 10x." — Uhalisi Developer

> "Building here feels like the early days of the web—full of possibilities." — POIPI Team

### Join Our Developer Community

Want to build on DFS SimuChain? Here's how to get started:

1. Read our documentation
2. Join our Discord community
3. Start building!

### Upcoming Community Events

- Weekly developer calls
- Monthly hackathons
- Community AMAs

We can't wait to see what you'll build!
      `,
      tags: ['Community', 'Developers', 'Projects', 'Spotlight'],
    },
    {
      id: 6,
      title: 'Staking Coming Soon: What You Need to Know',
      excerpt: 'Get ready for DFS staking! Learn about the upcoming feature, expected APY, and how to prepare your tokens.',
      category: 'Announcements',
      author: 'DFS Team',
      authorAvatar: '👤',
      date: 'Dec 8, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
      content: `
## DFS Staking is Coming!

We're excited to announce that staking will soon be available on DFS SimuChain. Here's everything you need to know to prepare.

### What is Staking?

Staking allows you to lock your DRC20_DFS tokens to earn rewards over time. It's a way to grow your holdings while supporting the network.

### Expected Features

**Multiple Tiers**
Choose from Bronze, Silver, and Gold tiers with varying lock periods and rewards.

**Competitive APY**
Earn attractive returns on your staked DFS tokens.

**Flexible Options**
Options for both short-term and long-term staking.

### How to Prepare

1. **Acquire DFS Tokens**: Make sure you have DRC20_DFS in your wallet
2. **Stay Updated**: Follow our announcements for the launch date
3. **Plan Your Strategy**: Decide how much and how long you want to stake

### Tier Overview

| Tier | Lock Period | Expected APY |
|------|-------------|--------------|
| Bronze | 30 days | 5% |
| Silver | 90 days | 12% |
| Gold | 180 days | 20% |

### Security

Your staked tokens are secured by our robust smart contract system. Withdraw anytime after the lock period ends.

### Stay Tuned

Staking launch date will be announced soon. Follow us on social media for real-time updates!
      `,
      tags: ['Staking', 'DFS', 'Announcement', 'Rewards'],
    },
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
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
            to="/blog"
            className="inline-flex items-center gap-2 text-[#21f201] font-semibold hover:underline"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  const shareUrl = window.location.href;

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
          to="/blog"
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
                    to={`/blog/${relatedPost.id}`}
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


