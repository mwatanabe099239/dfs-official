import { NextResponse } from 'next/server'
import { initFirebase, getDb } from '../../../src/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface BlogToken {
  address: string
  symbol: string
}

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
  video?: string
  featured: boolean
  content?: string
  tags?: string[]
  tokens?: BlogToken[]
  published: boolean
  createdAt?: any
  updatedAt?: any
  publishedAt?: any
  slug?: string
}

function toIso(value: unknown): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString()
    } catch {
      return undefined
    }
  }
  return undefined
}

function readTokens(value: unknown): BlogToken[] {
  if (!Array.isArray(value)) return []
  const tokens: BlogToken[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const record = item as { address?: unknown; tokenAddress?: unknown; symbol?: unknown }
    const address = String(record.address ?? record.tokenAddress ?? '').trim()
    const symbol = String(record.symbol ?? '').trim()
    if (!address && !symbol) continue
    tokens.push({ address, symbol })
  }
  return tokens
}

const DISPLAY_MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

/** "Oct 28, 2026" display dates, used when a timestamp is missing. */
function timeFromDisplayDate(value: string): number {
  const parts = value.trim().split(' ')
  if (parts.length !== 3) return 0
  const month = DISPLAY_MONTHS[parts[0]]
  const day = parseInt(parts[1].replace(',', ''), 10)
  const year = parseInt(parts[2], 10)
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) return 0
  return new Date(year, month, day).getTime()
}

function updatedTime(blog: BlogPost): number {
  const iso = blog.updatedAt || blog.publishedAt || blog.createdAt
  if (iso) {
    const value = new Date(iso).getTime()
    if (!Number.isNaN(value)) return value
  }
  return blog.date ? timeFromDisplayDate(blog.date) : 0
}

function matchesToken(blog: BlogPost, token: string): boolean {
  const needle = token.trim().toLowerCase()
  if (!needle) return true
  return (blog.tokens || []).some((item) => {
    return item.address.toLowerCase() === needle || item.symbol.toLowerCase() === needle
  })
}

export async function GET(request: Request) {
  try {
    // Initialize Firebase
    const initResult = initFirebase()
    if (!initResult) {
      return NextResponse.json(
        { 
          error: 'Firebase not initialized', 
          message: 'Please configure Firebase environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc.)' 
        },
        { status: 500 }
      )
    }
    
    const db = getDb()
    if (!db) {
      return NextResponse.json(
        { 
          error: 'Firebase not initialized', 
          message: 'Failed to get Firestore instance. Please check your Firebase configuration.' 
        },
        { status: 500 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const token = searchParams.get('token')

    // Fetch blogs from Firestore
    // Note: We fetch all published blogs, then filter and sort in memory to avoid composite index requirement
    let blogsSnapshot
    try {
      const blogsRef = collection(db, 'blogs')
      
      // Only fetch published blogs (no orderBy to avoid index requirement)
      // We'll sort in memory instead
      const q = query(blogsRef, where('published', '==', true))
      blogsSnapshot = await getDocs(q)
    } catch (firestoreError: any) {
      if (firestoreError?.code === 'permission-denied') {
        return NextResponse.json(
          { 
            error: 'Firestore permission denied', 
            message: 'Please configure Firestore security rules to allow read access to the "blogs" collection.' 
          },
          { status: 403 }
        )
      }
      throw firestoreError
    }

    if (blogsSnapshot.empty) {
      return NextResponse.json({ blogs: [] })
    }

    // Transform Firestore documents to blog posts
    let blogs: BlogPost[] = blogsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title || '',
        excerpt: data.excerpt || '',
        category: data.category || 'Announcements',
        author: data.author || '',
        authorAvatar: data.authorAvatar || '',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        image: data.image || '',
        video: data.video || '',
        featured: data.featured || false,
        content: data.content || '',
        tags: data.tags || [],
        tokens: readTokens(data.tokens),
        published: data.published || false,
        slug: data.slug || '',
        createdAt: toIso(data.createdAt),
        updatedAt: toIso(data.updatedAt),
        publishedAt: toIso(data.publishedAt),
      }
    })

    // Filter by category if provided (in memory to avoid composite index)
    if (category && category !== 'All') {
      blogs = blogs.filter(blog => blog.category === category)
    }

    if (token) {
      blogs = blogs.filter(blog => matchesToken(blog, token))
    }
    
    // Filter by featured if provided (in memory to avoid composite index)
    if (featured === 'true') {
      blogs = blogs.filter(blog => blog.featured === true)
    }
    
    // Latest update first. Fall back to publish time, then creation time.
    blogs.sort((a, b) => updatedTime(b) - updatedTime(a))

    return NextResponse.json({ blogs })
  } catch (error: any) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blogs', 
        message: error.message || 'An unexpected error occurred' 
      },
      { status: 500 }
    )
  }
}

