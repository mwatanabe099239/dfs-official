import { NextResponse } from 'next/server'
import { initFirebase } from '../../../src/lib/firebase'
import { getDb } from '../../../src/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface WhitepaperMenu {
  id: string
  title: string
  slug?: string
  order: number
  submenus: WhitepaperSubmenu[]
}

interface WhitepaperSubmenu {
  id: string
  title: string
  slug?: string
  order: number
  content: string // HTML content
  menuId: string
}

export async function GET() {
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

    // Fetch the whitepaper collection
    let whitepaperSnapshot
    try {
      const whitepaperRef = collection(db, 'whitepaper')
      whitepaperSnapshot = await getDocs(whitepaperRef)
    } catch (whitepaperError: any) {
      if (whitepaperError?.code === 'permission-denied') {
        return NextResponse.json(
          { 
            error: 'Firestore permission denied', 
            message: 'Please configure Firestore security rules to allow read access to the "whitepaper" collection. See firestore.rules file for example rules.' 
          },
          { status: 403 }
        )
      }
      throw whitepaperError
    }

    // Find the 'content' document in the whitepaper collection
    let contentDoc = null
    whitepaperSnapshot.forEach((docSnapshot) => {
      if (docSnapshot.id === 'content') {
        contentDoc = docSnapshot
      }
    })

    // If content document not found, try to get the first document
    if (!contentDoc && !whitepaperSnapshot.empty) {
      contentDoc = whitepaperSnapshot.docs[0]
    }

    if (!contentDoc || !contentDoc.exists()) {
      return NextResponse.json(
        { 
          error: 'Content not found', 
          message: 'The "content" document was not found in the "whitepaper" collection.' 
        },
        { status: 404 }
      )
    }

    const contentData = contentDoc.data()
    const menusArray = contentData.menus || []

    if (!Array.isArray(menusArray)) {
      return NextResponse.json(
        { 
          error: 'Invalid data structure', 
          message: 'The "menus" field in the content document must be an array.' 
        },
        { status: 400 }
      )
    }

    // Transform the menus array to the expected format
    const menus: WhitepaperMenu[] = menusArray
      .map((menu: any) => {
        // Ensure submenus is an array
        const submenus = Array.isArray(menu.submenus) ? menu.submenus : []
        
        return {
          id: menu.id || '',
          title: menu.title || '',
          slug: menu.slug || '',
          order: typeof menu.order === 'number' ? menu.order : 0,
          submenus: submenus
            .map((submenu: any) => ({
              id: submenu.id || '',
              title: submenu.title || '',
              slug: submenu.slug || '',
              order: typeof submenu.order === 'number' ? submenu.order : 0,
              content: submenu.content || `<h1>${submenu.title || 'Untitled'}</h1><p>Content not available.</p>`,
              menuId: submenu.menuId || menu.id || '',
            }))
            .sort((a: WhitepaperSubmenu, b: WhitepaperSubmenu) => a.order - b.order),
        } as WhitepaperMenu
      })
      .sort((a, b) => a.order - b.order)

    // Get updatedAt and updatedBy from the content document
    let updatedAt: Date
    if (contentData.updatedAt) {
      try {
        // Handle Firestore Timestamp
        if (typeof contentData.updatedAt.toDate === 'function') {
          updatedAt = contentData.updatedAt.toDate()
        }
        // Handle timestamp with seconds property
        else if (contentData.updatedAt.seconds && typeof contentData.updatedAt.seconds === 'number') {
          updatedAt = new Date(contentData.updatedAt.seconds * 1000)
        }
        // Handle ISO string
        else if (typeof contentData.updatedAt === 'string') {
          updatedAt = new Date(contentData.updatedAt)
        }
        // Handle number (milliseconds)
        else if (typeof contentData.updatedAt === 'number') {
          updatedAt = new Date(contentData.updatedAt)
        }
        // Fallback
        else {
          updatedAt = new Date()
        }
      } catch (e) {
        // If date conversion fails, use current date
        updatedAt = new Date()
      }
    } else {
      updatedAt = new Date()
    }

    // Validate the date is valid
    if (isNaN(updatedAt.getTime())) {
      updatedAt = new Date()
    }
    
    const updatedBy = contentData.updatedBy || 'system'

    return NextResponse.json({
      menus,
      updatedAt: updatedAt.toISOString(),
      updatedBy,
    })
  } catch (error: any) {
    console.error('Error fetching whitepaper data from Firebase:', error)
    
    // Handle Firebase permission errors
    if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
      return NextResponse.json(
        { 
          error: 'Firestore permission denied', 
          message: 'Please configure Firestore security rules to allow read access to the "whitepaper" collection. See firestore.rules file or FIREBASE_STRUCTURE.md for setup instructions.' 
        },
        { status: 403 }
      )
    }

    // Handle Firebase initialization errors
    if (error?.message?.includes('Firebase') || error?.message?.includes('configuration')) {
      return NextResponse.json(
        { 
          error: 'Firebase configuration error', 
          message: error.message || 'Please check your Firebase environment variables.' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch whitepaper data', 
        message: error.message || 'An unexpected error occurred' 
      },
      { status: 500 }
    )
  }
}

