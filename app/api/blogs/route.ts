import { NextResponse } from 'next/server'
import { initFirebase, getDb } from '../../../src/lib/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

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
  content?: string
  tags?: string[]
  published: boolean
  createdAt?: any
  updatedAt?: any
  publishedAt?: any
  slug?: string
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
        featured: data.featured || false,
        content: data.content || '',
        tags: data.tags || [],
        published: data.published || false,
        slug: data.slug || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString(),
        publishedAt: data.publishedAt?.toDate?.()?.toISOString(),
      }
    })

    // Filter by category if provided (in memory to avoid composite index)
    if (category && category !== 'All') {
      blogs = blogs.filter(blog => blog.category === category)
    }
    
    // Filter by featured if provided (in memory to avoid composite index)
    if (featured === 'true') {
      blogs = blogs.filter(blog => blog.featured === true)
    }
    
    // Sort by createdAt if not already sorted (fallback if orderBy failed)
    if (blogs.length > 0 && !blogs[0].createdAt) {
      blogs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA // Descending order (newest first)
      })
    } else if (blogs.length > 0) {
      // Ensure sorted by createdAt descending
      blogs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA // Descending order (newest first)
      })
    }

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

