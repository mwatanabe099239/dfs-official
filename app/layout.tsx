import '../src/index.css'
import '../src/css/Landing.css'
import { ThemeProvider } from '../src/context/ThemeContext'
import { LanguageProvider } from '../src/context/LanguageContext'
import { ReactNode } from 'react'
import LayoutWrapper from './LayoutWrapper'

export const metadata = {
  title: 'DFS Chain',
  description: 'Harnessing Decentralization to Make the Impossible Possible',
  themeColor: '#000000',
  manifest: '/manifest.json',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap&family=Space+Grotesk"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

