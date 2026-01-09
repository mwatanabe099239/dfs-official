import { NextResponse } from 'next/server'
import { initFirebase, getDb } from '../../../../src/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

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
  published: boolean
  createdAt?: any
  updatedAt?: any
  publishedAt?: any
  slug?: string
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
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

    // Handle both Promise and direct params (for Next.js 15 compatibility)
    const resolvedParams = params instanceof Promise ? await params : params
    const { id } = resolvedParams

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      )
    }

    // Fetch blog from Firestore
    let blogDoc
    try {
      const blogRef = doc(db, 'blogs', id)
      blogDoc = await getDoc(blogRef)
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

    if (!blogDoc.exists()) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    const data = blogDoc.data()

    // Only return published blogs (or allow drafts for preview in admin)
    // For public API, we'll only return published blogs
    if (!data.published) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Transform Firestore document to blog post
    const blog: BlogPost = {
      id: blogDoc.id,
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

    return NextResponse.json({ blog })
  } catch (error: any) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog', 
        message: error.message || 'An unexpected error occurred' 
      },
      { status: 500 }
    )
  }
}

