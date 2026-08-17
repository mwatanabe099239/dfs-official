'use client'

import React, { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from '../src/components/Footer'

function Navbar() {
  return (
    <nav className="py-4 transition-colors duration-300 bg-white text-gray-900 border-b border-gray-200">
      <div className="flex items-center justify-between md:px-20 px-5">
        <Link href="/" className="bg-transparent cursor-pointer">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="md:w-40 w-32"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://www.difines.org/academy/guide/metaface"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium py-2 px-2 sm:px-4 rounded-lg border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black whitespace-nowrap"
          >
            Wallet Creation Guide
          </a>
          <a
            href="https://metaface.dfsscan.com/get-started"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            aria-label="Metaface — Get Started"
          >
            <img
              src="/metaface-logo.png"
              alt="Metaface"
              className="h-9 w-9 sm:h-10 sm:w-10 object-cover rounded-lg"
            />
          </a>
        </div>
      </div>
    </nav>
  )
}

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isScopedApp =
    pathname === '/ai' || pathname?.startsWith('/ai/') ||
    pathname === '/academy' || pathname?.startsWith('/academy/') ||
    false

  if (isScopedApp) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
