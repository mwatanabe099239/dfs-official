'use client'

import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"

interface NotionBlock {
  id: string
  type: string
  [key: string]: any
}

interface NotionRichText {
  type: string
  text?: { content: string; link?: any }
  annotations: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    code?: boolean
    color?: string
  }
  plain_text: string
  href?: string
}

const renderRichText = (richText: NotionRichText[], isDark: boolean): React.ReactNode => {
  if (!richText || richText.length === 0) return null

  return richText.map((text, index) => {
    let content: React.ReactNode = text.plain_text

    if (text.annotations.bold) {
      content = <strong key={index}>{content}</strong>
    }
    if (text.annotations.italic) {
      content = <em key={index}>{content}</em>
    }
    if (text.annotations.code) {
      content = <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm">{content}</code>
    }
    if (text.annotations.strikethrough) {
      content = <del key={index}>{content}</del>
    }
    if (text.href) {
      content = (
        <a 
          key={index} 
          href={text.href} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: '#0b70e0',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(11, 112, 224, 0.3)',
            textDecorationThickness: '1px',
            textUnderlineOffset: '2px',
            cursor: 'pointer'
          }}
        >
          {content}
        </a>
      )
    }

    return <span key={index}>{content}</span>
  })
}

const renderBlock = (block: NotionBlock, isDark: boolean, isSidebar: boolean = false): React.ReactNode => {
  const { type, id } = block

  switch (type) {
    case 'paragraph':
      const paragraphText = block.paragraph?.rich_text || []
      if (paragraphText.length === 0) return <div key={id} style={{ height: '1px', marginBottom: '1px' }}></div>
      return (
        <p key={id} style={{ 
          marginBottom: '1px', 
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '16px', 
          lineHeight: '1.5',
          fontWeight: 400
        }}>
          {renderRichText(paragraphText, isDark)}
        </p>
      )

    case 'heading_1':
      return (
        <h1 key={id} style={{ 
          marginTop: '2em', 
          marginBottom: '4px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '32px', 
          lineHeight: '1.2', 
          fontWeight: 700,
          fontFamily: 'inherit'
        }}>
          {renderRichText(block.heading_1?.rich_text || [], isDark)}
        </h1>
      )

    case 'heading_2':
      return (
        <h2 key={id} style={{ 
          marginTop: isSidebar ? '0' : '1.4em', 
          marginBottom: isSidebar ? '4px' : '1px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: isSidebar ? '14px' : '24px', 
          lineHeight: isSidebar ? '1.3' : '1.3', 
          fontWeight: isSidebar ? 500 : 600,
          fontFamily: 'inherit',
          textTransform: isSidebar ? 'uppercase' : 'none',
          letterSpacing: isSidebar ? '0.03em' : 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {renderRichText(block.heading_2?.rich_text || [], isDark)}
        </h2>
      )

    case 'heading_3':
      return (
        <h3 key={id} style={{ 
          marginTop: isSidebar ? '0' : '1em', 
          marginBottom: isSidebar ? '4px' : '1px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: isSidebar ? '14px' : '18px', 
          lineHeight: isSidebar ? '1.3' : '1.3', 
          fontWeight: isSidebar ? 500 : 600,
          fontFamily: 'inherit',
          textTransform: isSidebar ? 'uppercase' : 'none',
          letterSpacing: isSidebar ? '0.03em' : 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {renderRichText(block.heading_3?.rich_text || [], isDark)}
        </h3>
      )

    case 'bulleted_list_item':
      const listItemText = block.bulleted_list_item?.rich_text || []
      const hasLink = listItemText.some((text: NotionRichText) => text.href)
      return (
        <li key={id} style={{ 
          marginBottom: isSidebar ? '0' : '1px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '16px', 
          lineHeight: isSidebar ? '1.5' : '1.5', 
          paddingLeft: isSidebar ? '0' : '1.5em', 
          position: 'relative',
          listStyle: 'none',
          paddingTop: isSidebar ? '1px' : '0',
          paddingBottom: isSidebar ? '1px' : '0'
        }}>
          {!isSidebar && <span style={{ position: 'absolute', left: '0.25em', color: isDark ? '#9b9a97' : '#37352f' }}>•</span>}
          <span style={{
            textDecoration: isSidebar && hasLink ? 'underline' : 'none',
            textDecorationColor: isSidebar && hasLink ? (isDark ? 'rgba(233, 233, 233, 0.4)' : 'rgba(55, 53, 47, 0.4)') : 'transparent',
            textUnderlineOffset: isSidebar ? '2px' : '0'
          }}>
            {renderRichText(listItemText, isDark)}
          </span>
        </li>
      )

    case 'numbered_list_item':
      return (
        <li key={id} style={{ 
          marginBottom: '1px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '16px', 
          lineHeight: '1.5', 
          paddingLeft: '1.5em', 
          listStyleType: 'decimal', 
          listStylePosition: 'outside'
        }}>
          {renderRichText(block.numbered_list_item?.rich_text || [], isDark)}
        </li>
      )

    case 'code':
      const codeText = block.code?.rich_text?.[0]?.plain_text || ''
      const language = block.code?.language || 'plain text'
      return (
        <pre key={id} style={{ 
          padding: '12px 14px',
          borderRadius: '3px',
          overflowX: 'auto',
          marginBottom: '1px',
          backgroundColor: isDark ? '#2e2e2e' : '#F7F6F3',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '14px', 
          lineHeight: '1.5', 
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
        }}>
          <code>{codeText}</code>
        </pre>
      )

    case 'quote':
      return (
        <blockquote key={id} style={{ 
          borderLeft: `3px solid ${isDark ? 'rgba(233, 233, 233, 0.3)' : 'rgba(55, 53, 47, 0.2)'}`,
          paddingLeft: '14px',
          marginTop: '1px',
          marginBottom: '1px',
          color: isDark ? 'rgba(233, 233, 233, 0.8)' : 'rgba(55, 53, 47, 0.8)',
          fontSize: '16px', 
          lineHeight: '1.5', 
          fontStyle: 'normal'
        }}>
          {renderRichText(block.quote?.rich_text || [], isDark)}
        </blockquote>
      )

    case 'callout':
      const calloutColor = block.callout?.color || 'gray'
      const calloutBgColors: Record<string, string> = {
        gray: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F7F6F3',
        blue: isDark ? 'rgba(46, 170, 220, 0.15)' : 'rgba(46, 170, 220, 0.15)',
        yellow: isDark ? 'rgba(251, 243, 219, 0.3)' : '#FBF3DB',
        green: isDark ? 'rgba(68, 131, 97, 0.15)' : 'rgba(68, 131, 97, 0.15)',
      }
      return (
        <div key={id} style={{ 
          padding: '12px 14px',
          borderRadius: '3px',
          marginBottom: '2px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          backgroundColor: calloutBgColors[calloutColor] || calloutBgColors.gray,
          border: 'none'
        }}>
          {block.callout?.icon && (
            <span style={{ fontSize: '1.5em', lineHeight: '1', flexShrink: 0 }}>{block.callout.icon.emoji || '💡'}</span>
          )}
          <div style={{ 
            flex: 1,
            color: isDark ? '#e9e9e9' : '#37352f',
            fontSize: '16px', 
            lineHeight: '1.5'
          }}>
            {renderRichText(block.callout?.rich_text || [], isDark)}
          </div>
        </div>
      )

    case 'divider':
      return <hr key={id} className={`my-8 ${isDark ? "border-gray-700" : "border-gray-300"}`} />

    case 'image':
      const imageUrl = block.image?.file?.url || block.image?.external?.url
      const imageCaption = block.image?.caption?.[0]?.plain_text || ''
      return (
        <div key={id} className="my-6">
          <img 
            src={imageUrl} 
            alt={imageCaption} 
            className="w-full rounded-lg"
          />
          {imageCaption && (
            <p className={`text-sm mt-2 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {imageCaption}
            </p>
          )}
        </div>
      )

    case 'toggle':
      const toggleChildren = (block as any).children || []
      return (
        <details key={id} className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <summary className="cursor-pointer font-semibold">
            {renderRichText(block.toggle?.rich_text || [], isDark)}
          </summary>
          <div className="mt-2 ml-4">
            {toggleChildren.map((child: NotionBlock) => renderBlock(child, isDark, isSidebar))}
          </div>
        </details>
      )

    case 'divider':
      return (
        <hr key={id} style={{ 
          marginTop: isSidebar ? '6px' : '2em',
          marginBottom: isSidebar ? '6px' : '2em',
          border: 'none',
          borderTop: `1px solid ${isDark ? 'rgba(233, 233, 233, 0.09)' : 'rgba(55, 53, 47, 0.09)'}`
        }} />
      )

    case 'column_list':
      // Column lists create multi-column layouts
      const columns = (block as any).children || []
      const columnCount = columns.length
      return (
        <div key={id} className="flex flex-col md:flex-row" style={{ 
          gap: '46px',
          marginTop: '2px',
          marginBottom: '1px',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          {columns.map((col: NotionBlock, colIndex: number) => {
            // Determine if this is a sidebar column (typically first or last)
            const isSidebarCol = columnCount === 2 ? colIndex === 0 : (colIndex === 0 || colIndex === columnCount - 1)
            const colChildren = (col as any).children || []
            const hasHeading = colChildren.some((child: NotionBlock) => 
              child.type === 'heading_2' || child.type === 'heading_3'
            )
            
            return (
              <div 
                key={col.id || colIndex} 
                className="w-full md:w-auto" 
                style={{
                  flex: isSidebarCol && hasHeading ? '0 0 272px' : '1 1 auto',
                  minWidth: 0,
                  maxWidth: isSidebarCol && hasHeading ? '272px' : 'none',
                  position: isSidebarCol && hasHeading ? 'sticky' : 'relative',
                  top: isSidebarCol && hasHeading ? '96px' : 'auto',
                  alignSelf: isSidebarCol && hasHeading ? 'flex-start' : 'auto',
                  maxHeight: isSidebarCol && hasHeading ? 'calc(100vh - 96px)' : 'none',
                  overflowY: isSidebarCol && hasHeading ? 'auto' : 'visible',
                  paddingRight: isSidebarCol && hasHeading ? '0' : '0'
                }}
              >
                {renderBlock(col, isDark, isSidebarCol && hasHeading)}
              </div>
            )
          })}
        </div>
      )

    case 'column':
      const columnChildren = (block as any).children || []
      return (
        <div key={id} style={{ 
          width: '100%',
          minWidth: 0
        }}>
          {columnChildren.map((child: NotionBlock) => renderBlock(child, isDark, isSidebar))}
        </div>
      )

    case 'to_do':
      const checked = block.to_do?.checked || false
      return (
        <div key={id} style={{ 
          display: 'flex',
          alignItems: 'flex-start',
          gap: '6px',
          marginBottom: '1px',
          color: isDark ? '#e9e9e9' : '#37352f',
          fontSize: '16px', 
          lineHeight: '1.5'
        }}>
          <input 
            type="checkbox" 
            checked={checked} 
            readOnly 
            style={{ 
              width: '16px', 
              height: '16px', 
              cursor: 'default',
              marginTop: '2px',
              accentColor: isDark ? '#9b9a97' : '#37352f',
              flexShrink: 0
            }}
          />
          <span style={{ 
            opacity: checked ? 0.5 : 1,
            textDecoration: checked ? 'line-through' : 'none'
          }}>
            {renderRichText(block.to_do?.rich_text || [], isDark)}
          </span>
        </div>
      )

    case 'table':
      const tableRows = block.table?.table_width || 0
      return (
        <div key={id} className="overflow-x-auto my-4">
          <table className={`min-w-full border-collapse ${isDark ? "border-gray-700" : "border-gray-300"}`}>
            <tbody>
              {/* Table rows will be rendered separately */}
            </tbody>
          </table>
        </div>
      )

    case 'table_row':
      const cells = block.table_row?.cells || []
      return (
        <tr key={id} className={isDark ? "border-gray-700" : "border-gray-300"}>
          {cells.map((cell: NotionRichText[], cellIndex: number) => (
            <td key={cellIndex} className={`p-2 border ${isDark ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"}`}>
              {renderRichText(cell, isDark)}
            </td>
          ))}
        </tr>
      )

    case 'bookmark':
      const bookmarkUrl = block.bookmark?.url || block.bookmark?.caption?.[0]?.plain_text || ''
      const bookmarkCaption = block.bookmark?.caption?.[0]?.plain_text || bookmarkUrl
      return (
        <a key={id} href={bookmarkUrl} target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-lg border mb-4 hover:bg-gray-50 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"}`}>
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{bookmarkUrl}</div>
          <div className={`mt-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{bookmarkCaption}</div>
        </a>
      )

    case 'link_preview':
      const linkUrl = block.link_preview?.url || ''
      return (
        <a key={id} href={linkUrl} target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-lg border mb-4 hover:bg-gray-50 ${isDark ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-50 text-gray-700"}`}>
          {linkUrl}
        </a>
      )

    case 'embed':
      const embedUrl = block.embed?.url || ''
      return (
        <div key={id} className="my-4">
          <iframe src={embedUrl} className="w-full" style={{ minHeight: '400px' }} />
        </div>
      )

    case 'video':
      const videoUrl = block.video?.file?.url || block.video?.external?.url || ''
      return (
        <div key={id} className="my-4">
          <video src={videoUrl} controls className="w-full rounded-lg" />
        </div>
      )

    case 'file':
      const fileUrl = block.file?.file?.url || block.file?.external?.url || ''
      const fileName = block.file?.caption?.[0]?.plain_text || 'Download file'
      return (
        <a key={id} href={fileUrl} download className={`inline-flex items-center gap-2 p-3 rounded-lg border mb-4 ${isDark ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-50 text-gray-700"}`}>
          📎 {fileName}
        </a>
      )

    case 'pdf':
      const pdfUrl = block.pdf?.file?.url || block.pdf?.external?.url || ''
      return (
        <div key={id} className="my-4">
          <iframe src={pdfUrl} className="w-full" style={{ minHeight: '600px' }} />
        </div>
      )

    default:
      // For unsupported block types, try to render any rich_text if available
      const richText = (block as any)[type]?.rich_text
      if (richText) {
        return (
          <div key={id} className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {renderRichText(richText, isDark)}
          </div>
        )
      }
      // Log unsupported block types for debugging
      console.warn('Unsupported block type:', type, block)
      return null
  }
}

export default function WhitepaperPage(): React.JSX.Element {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const [blocks, setBlocks] = useState<NotionBlock[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    const fetchWhitepaper = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // First, test the API configuration
        try {
          const testResponse = await fetch('/api/whitepaper/test')
          const testData = await testResponse.json()
          console.log('Notion API Test:', testData)
          
          if (!testData.environment.hasApiKey || !testData.environment.hasPageId) {
            throw new Error('Missing environment variables. Please check your .env.local file and restart the dev server.')
          }
          
          if (!testData.testResult?.success) {
            const errorMsg = testData.testResult?.error || 'Failed to connect to Notion API'
            throw new Error(`${errorMsg}. Make sure: 1) The page is shared with your Notion integration, 2) Your API key is correct, 3) The page ID is correct.`)
          }
          
          setDebugInfo(`Test passed: ${testData.testResult.blockCount} blocks found`)
        } catch (testErr: any) {
          console.error('Test failed:', testErr)
          throw testErr
        }
        
        // Now fetch the full content
        const response = await fetch('/api/whitepaper')
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
          console.error('API Error:', errorData)
          throw new Error(errorData.error || `Failed to fetch whitepaper: ${response.status}`)
        }

        const data = await response.json()
        console.log('Received data:', { 
          blockCount: data.blocks?.length || 0,
          blockTypes: data.blocks?.map((b: any) => b.type) || []
        })
        
        // Log first few blocks for debugging
        if (data.blocks && data.blocks.length > 0) {
          console.log('First 5 blocks:', data.blocks.slice(0, 5))
        }
        
        setDebugInfo(`Fetched ${data.blocks?.length || 0} blocks`)
        
        if (!data.blocks || data.blocks.length === 0) {
          throw new Error('No content found in the Notion page. Make sure the page has content and is shared with your Notion integration.')
        }
        
        setBlocks(data.blocks)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching whitepaper:', err)
        setError(err.message || 'Failed to load whitepaper content')
      } finally {
        setLoading(false)
      }
    }

    fetchWhitepaper()
  }, [])

  // Group list items together and handle nested blocks
  const renderBlocks = (blocks: NotionBlock[]): React.ReactNode => {
    const elements: React.ReactNode[] = []
    let currentList: NotionBlock[] = []
    let currentListType: 'bulleted' | 'numbered' | null = null

    blocks.forEach((block, index) => {
      // Handle column_list specially - it contains columns
      if (block.type === 'column_list') {
        // Render any pending list first
        if (currentList.length > 0) {
          const ListTag = currentListType === 'bulleted' ? 'ul' : 'ol'
          elements.push(
            <ListTag key={`list-${index}`} className="mb-4">
              {currentList.map(b => renderBlock(b, isDark))}
            </ListTag>
          )
          currentList = []
          currentListType = null
        }
        // Render the column_list (which will render its columns and their children)
        const rendered = renderBlock(block, isDark)
        if (rendered) {
          elements.push(rendered)
        }
        return
      }

      if (block.type === 'bulleted_list_item') {
        if (currentListType !== 'bulleted') {
          if (currentList.length > 0) {
            elements.push(
              <ul key={`list-${index}`} className="mb-4">
                {currentList.map(b => renderBlock(b, isDark))}
              </ul>
            )
          }
          currentList = []
          currentListType = 'bulleted'
        }
        currentList.push(block)
      } else if (block.type === 'numbered_list_item') {
        if (currentListType !== 'numbered') {
          if (currentList.length > 0) {
            elements.push(
              <ol key={`list-${index}`} className="mb-4">
                {currentList.map(b => renderBlock(b, isDark))}
              </ol>
            )
          }
          currentList = []
          currentListType = 'numbered'
        }
        currentList.push(block)
      } else {
        // Render any pending list
        if (currentList.length > 0) {
          const ListTag = currentListType === 'bulleted' ? 'ul' : 'ol'
          elements.push(
            <ListTag key={`list-${index}`} className="mb-4">
              {currentList.map(b => renderBlock(b, isDark))}
            </ListTag>
          )
          currentList = []
          currentListType = null
        }
        // Render the current block
        const rendered = renderBlock(block, isDark)
        if (rendered) {
          elements.push(rendered)
        }
      }
    })

    // Render any remaining list items
    if (currentList.length > 0) {
      const ListTag = currentListType === 'bulleted' ? 'ul' : 'ol'
      elements.push(
        <ListTag key="list-final" className="mb-4">
          {currentList.map(b => renderBlock(b, isDark))}
        </ListTag>
      )
    }

    return elements
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#191919] text-[#e9e9e9]" : "bg-white text-[#37352f]"}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', lineHeight: '1.5' }}>
      <div className="w-full" style={{ maxWidth: '100%', padding: '0' }}>
        {loading && (
          <div className="text-center py-16">
            <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-white" : "border-gray-900"}`}></div>
            <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Loading whitepaper...
            </p>
          </div>
        )}

        {error && (
          <div className={`p-6 rounded-lg border ${isDark ? "bg-red-900/20 border-red-800 text-red-300" : "bg-red-50 border-red-200 text-red-800"}`}>
            <h2 className="text-xl font-semibold mb-2">Error Loading Whitepaper</h2>
            <p className="font-medium">{error}</p>
            <p className="mt-4 text-sm">
              Please make sure:
            </p>
            <ul className="mt-2 ml-6 list-disc text-sm">
              <li>NOTION_API_KEY and NOTION_PAGE_ID are configured in your .env.local file</li>
              <li>The Notion page is shared with your Notion integration</li>
              <li>You've restarted your dev server after adding environment variables</li>
            </ul>
            {debugInfo && (
              <p className="mt-4 text-xs opacity-75">Debug: {debugInfo}</p>
            )}
          </div>
        )}

        {!loading && !error && blocks.length > 0 && (
          <article className="notion-page" style={{ 
            maxWidth: '100%', 
            margin: '0 auto',
            padding: 'clamp(24px, 6vw, 96px) clamp(24px, 6vw, 96px) 0 clamp(24px, 6vw, 96px)',
            fontSize: '16px', 
            lineHeight: '1.5',
            color: isDark ? '#e9e9e9' : '#37352f'
          }}>
            {renderBlocks(blocks)}
            {debugInfo && (
              <div className={`mt-8 p-4 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
                Debug: {debugInfo} | Block types: {[...new Set(blocks.map(b => b.type))].join(', ')}
              </div>
            )}
          </article>
        )}

        {!loading && !error && blocks.length === 0 && (
          <div className="text-center py-16">
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              No content available.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
