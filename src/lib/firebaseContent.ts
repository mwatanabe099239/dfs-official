import { getDb } from './firebase'
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy,
  where,
  Firestore
} from 'firebase/firestore'

// Content structure interfaces
export interface MenuItem {
  id: string
  title: string
  path: string
  order: number
  parentId?: string | null
  children?: MenuItem[]
}

export interface ContentBlock {
  id: string
  type: 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph' | 'code' | 'list' | 'quote' | 'divider'
  content: string
  language?: string // For code blocks
  order: number
}

export interface PageContent {
  id: string
  title: string
  path: string
  breadcrumbs: string[]
  content: ContentBlock[]
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
  createdAt?: any
  updatedAt?: any
}

// Fetch all menu items
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const db = getDb()
    if (!db) {
      console.warn('Firebase not initialized. Please configure Firebase environment variables.')
      return []
    }
    const menuRef = collection(db, 'menu')
    const q = query(menuRef, orderBy('order', 'asc'))
    const snapshot = await getDocs(q)
    
    const items: MenuItem[] = []
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      } as MenuItem)
    })

    // Build hierarchical structure
    const rootItems = items.filter(item => !item.parentId)
    const buildTree = (parentId: string | null): MenuItem[] => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
          ...item,
          children: buildTree(item.id),
        }))
        .sort((a, b) => a.order - b.order)
    }

    return rootItems
      .map(item => ({
        ...item,
        children: buildTree(item.id),
      }))
      .sort((a, b) => a.order - b.order)
  } catch (error: any) {
    console.error('Error fetching menu items:', error)
    if (error?.code === 'permission-denied') {
      console.error('Firestore permission denied. Please configure security rules in Firebase Console.')
    }
    return []
  }
}

// Fetch page content by path
export const fetchPageContent = async (path: string): Promise<PageContent | null> => {
  try {
    const db = getDb()
    if (!db) {
      console.warn('Firebase not initialized. Please configure Firebase environment variables.')
      return null
    }
    const pagesRef = collection(db, 'pages')
    const q = query(pagesRef, where('path', '==', path))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as PageContent
  } catch (error: any) {
    console.error('Error fetching page content:', error)
    if (error?.code === 'permission-denied') {
      console.error('Firestore permission denied. Please configure security rules in Firebase Console.')
    }
    return null
  }
}

// Fetch page content by ID
export const fetchPageContentById = async (id: string): Promise<PageContent | null> => {
  try {
    const db = getDb()
    if (!db) {
      console.warn('Firebase not initialized. Please configure Firebase environment variables.')
      return null
    }
    const pageRef = doc(db, 'pages', id)
    const pageSnap = await getDoc(pageRef)
    
    if (!pageSnap.exists()) {
      return null
    }

    return {
      id: pageSnap.id,
      ...pageSnap.data(),
    } as PageContent
  } catch (error: any) {
    console.error('Error fetching page content by ID:', error)
    if (error?.code === 'permission-denied') {
      console.error('Firestore permission denied. Please configure security rules in Firebase Console.')
    }
    return null
  }
}

