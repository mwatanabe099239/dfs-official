'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HiChevronRight, HiChevronDown, HiChevronLeft, HiX } from 'react-icons/hi'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'

interface WhitepaperMenu {
  id: string
  title: string
  order: number
  submenus: WhitepaperSubmenu[]
}

interface WhitepaperSubmenu {
  id: string
  title: string
  order: number
  content: string // HTML content
  menuId: string
}

interface WhitepaperData {
  menus: WhitepaperMenu[]
  updatedAt: string
  updatedBy: string
}

const WhitepaperPage: React.FC = () => {
  const searchParams = useSearchParams()
  const [menus, setMenus] = useState<WhitepaperMenu[]>([])
  const [selectedSubmenuId, setSelectedSubmenuId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  // Fetch whitepaper data
  useEffect(() => {
    const fetchWhitepaper = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/whitepaper')
        
        if (!response.ok) {
          // Try to get error message from response
          let errorMessage = `Failed to fetch: ${response.status}`
          try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorData.error || errorMessage
          } catch {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage
          }
          throw new Error(errorMessage)
        }

        const data: WhitepaperData = await response.json()
        const sortedMenus = (data.menus || []).sort((a, b) => a.order - b.order)
        
        // Sort submenus within each menu
        sortedMenus.forEach(menu => {
          menu.submenus.sort((a, b) => a.order - b.order)
        })

        setMenus(sortedMenus)

        // Check for submenu ID in URL hash or query params
        const hashSubmenuId = typeof window !== 'undefined' ? window.location.hash.slice(1) : null
        const querySubmenuId = searchParams?.get('submenu')
        const targetSubmenuId = hashSubmenuId || querySubmenuId

        if (targetSubmenuId) {
          // Verify the submenu exists
          const submenuExists = sortedMenus.some(menu =>
            menu.submenus.some(sub => sub.id === targetSubmenuId)
          )
          if (submenuExists) {
            setSelectedSubmenuId(targetSubmenuId)
          }
        } else if (sortedMenus.length > 0 && sortedMenus[0].submenus?.length > 0) {
          // Auto-select first submenu
          const firstSubmenu = sortedMenus[0].submenus[0]
          setSelectedSubmenuId(firstSubmenu.id)
        }
      } catch (err: any) {
        console.error('Error fetching whitepaper:', err)
        setError(err.message || 'Failed to load whitepaper content')
      } finally {
        setLoading(false)
      }
    }

    fetchWhitepaper()
  }, [searchParams])

  // Get current submenu
  const currentSubmenu = useMemo(() => {
    if (!selectedSubmenuId) return null
    for (const menu of menus) {
      const submenu = menu.submenus.find(sub => sub.id === selectedSubmenuId)
      if (submenu) return submenu
    }
    return null
  }, [menus, selectedSubmenuId])

  // Get previous and next submenus
  const { previousSubmenu, nextSubmenu } = useMemo(() => {
    if (!selectedSubmenuId || menus.length === 0) {
      return { previousSubmenu: null, nextSubmenu: null }
    }

    // Flatten all submenus in order
    const allSubmenus: Array<{ submenu: WhitepaperSubmenu; menuId: string }> = []
    menus.forEach(menu => {
      menu.submenus.forEach(submenu => {
        allSubmenus.push({ submenu, menuId: menu.id })
      })
    })

    const currentIndex = allSubmenus.findIndex(item => item.submenu.id === selectedSubmenuId)
    
    return {
      previousSubmenu: currentIndex > 0 ? allSubmenus[currentIndex - 1].submenu : null,
      nextSubmenu: currentIndex < allSubmenus.length - 1 ? allSubmenus[currentIndex + 1].submenu : null,
    }
  }, [menus, selectedSubmenuId])


  // Handle submenu selection
  const handleSubmenuSelect = (submenuId: string) => {
    setSelectedSubmenuId(submenuId)
    // Update URL hash for deep linking
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}#${submenuId}`)
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle hash changes from browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.slice(1)
        if (hash && hash !== selectedSubmenuId) {
          // Verify the submenu exists
          const submenuExists = menus.some(menu =>
            menu.submenus.some(sub => sub.id === hash)
          )
          if (submenuExists) {
            setSelectedSubmenuId(hash)
          }
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [menus, selectedSubmenuId])

  // Check if menu contains selected submenu
  const isMenuActive = (menu: WhitepaperMenu): boolean => {
    return menu.submenus.some(sub => sub.id === selectedSubmenuId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading documentation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    const isPermissionError = error.includes('permission') || error.includes('403')
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className={`max-w-2xl mx-auto p-6 rounded-lg border ${
          isPermissionError 
            ? 'border-orange-200 bg-orange-50 text-orange-900' 
            : 'border-red-200 bg-red-50 text-red-800'
        }`}>
          <h2 className="text-xl font-semibold mb-2">
            {isPermissionError ? 'Firebase Permission Error' : 'Error Loading Content'}
          </h2>
          <p className="mb-4">{error}</p>
          
          {isPermissionError && (
            <div className="mt-4 p-4 rounded bg-white border border-orange-200">
              <p className="text-sm font-semibold mb-2">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#21f201] underline">Firebase Console</a></li>
                <li>Select your project</li>
                <li>Navigate to <strong>Firestore Database</strong> &gt; <strong>Rules</strong></li>
                <li>Copy the rules from <code className="px-1 py-0.5 rounded bg-gray-100 text-xs">firestore.rules</code> file</li>
                <li>Paste and click <strong>Publish</strong></li>
              </ol>
              <p className="mt-3 text-xs text-gray-600">
                See <code className="px-1 py-0.5 rounded bg-gray-100 text-xs">FIREBASE_STRUCTURE.md</code> for detailed instructions.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (menus.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600">No documentation content available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-80 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300`} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Sticky Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 z-10 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
              <p className="text-xs text-gray-500 mt-0.5">Navigate through sections</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close sidebar"
            >
              <HiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 100px)' }}>
          <div className="py-2">
            {menus.map(menu => {
              const isActive = isMenuActive(menu)
              const submenuCount = menu.submenus.length

              return (
                <div key={menu.id} className="mb-0.5">
                  {/* Menu Header */}
                  <div
                    className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#21f201]/10'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isActive ? 'bg-[#21f201]' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm font-medium truncate ${
                        isActive ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {menu.title}
                      </span>
                    </div>
                  </div>

                  {/* Submenus - Always visible */}
                  {submenuCount > 0 && (
                    <div className="ml-5 mt-0.5 pl-3 relative border-l-2 border-gray-200">
                      <div className="space-y-0.5 py-1">
                        {menu.submenus.map((submenu) => {
                          const isSelected = submenu.id === selectedSubmenuId
                          return (
                            <button
                              key={submenu.id}
                              onClick={() => handleSubmenuSelect(submenu.id)}
                              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-150 relative ${
                                isSelected
                                  ? 'bg-[#21f201]/10 text-gray-900 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute -left-[11px] top-0 bottom-0 w-[2px] bg-[#21f201] z-10"></div>
                              )}
                              <span className="text-sm">{submenu.title}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-white">
        <div className="max-w-4xl mx-auto px-10 py-10">
          {/* Mobile sidebar toggle */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-md hover:bg-gray-50"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {currentSubmenu ? (
            <>
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                {currentSubmenu.title}
              </h1>

              {/* Content */}
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: currentSubmenu.content }}
                style={{
                  color: '#334155',
                }}
              />

              {/* Feedback Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900 mb-4">Is this page helpful?</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-[#21f201] hover:bg-[#21f201]/10 transition-colors group">
                    <FaThumbsUp className="w-4 h-4 text-gray-600 group-hover:text-[#21f201]" />
                    <span className="text-sm text-gray-700 group-hover:text-[#21f201]">Yes</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-[#21f201] hover:bg-[#21f201]/10 transition-colors group">
                    <FaThumbsDown className="w-4 h-4 text-gray-600 group-hover:text-[#21f201]" />
                    <span className="text-sm text-gray-700 group-hover:text-[#21f201]">No</span>
                  </button>
                </div>
              </div>

              {/* Previous/Next Navigation */}
              {(previousSubmenu || nextSubmenu) && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {/* Previous */}
                  {previousSubmenu ? (
                    <button
                      onClick={() => handleSubmenuSelect(previousSubmenu.id)}
                      className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:border-[#21f201] hover:bg-[#21f201]/10 transition-all min-h-[80px] group w-full"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#21f201]/20 transition-colors flex-shrink-0">
                        <HiChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#21f201] group-hover:translate-x-[-2px] transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs text-gray-500 mb-1">Previous</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {previousSubmenu.title}
                        </p>
                      </div>
                    </button>
                  ) : (
                    <div className="w-full"></div>
                  )}

                  {/* Next */}
                  {nextSubmenu ? (
                    <button
                      onClick={() => handleSubmenuSelect(nextSubmenu.id)}
                      className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:border-[#21f201] hover:bg-[#21f201]/10 transition-all min-h-[80px] group w-full"
                    >
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-xs text-gray-500 mb-1">Next</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {nextSubmenu.title}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#21f201]/20 transition-colors flex-shrink-0">
                        <HiChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#21f201] group-hover:translate-x-[2px] transition-transform" />
                      </div>
                    </button>
                  ) : (
                    <div className="w-full"></div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">Select a section from the sidebar to view content.</p>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}

export default WhitepaperPage
