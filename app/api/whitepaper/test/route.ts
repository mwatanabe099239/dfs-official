import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET() {
  const checks = {
    hasApiKey: !!process.env.NOTION_API_KEY,
    hasPageId: !!process.env.NOTION_PAGE_ID,
    apiKeyLength: process.env.NOTION_API_KEY?.length || 0,
    pageIdLength: process.env.NOTION_PAGE_ID?.length || 0,
    apiKeyPrefix: process.env.NOTION_API_KEY?.substring(0, 7) || 'none',
  }

  // Try to initialize the client
  let clientStatus = 'not_initialized'
  let testResult = null

  if (process.env.NOTION_API_KEY) {
    try {
      const notion = new Client({
        auth: process.env.NOTION_API_KEY,
      })
      clientStatus = 'initialized'

      // Try to fetch a page (if page ID is provided)
      if (process.env.NOTION_PAGE_ID) {
        try {
          let pageId = process.env.NOTION_PAGE_ID.replace(/-/g, '')
          if (pageId.length === 32) {
            pageId = `${pageId.slice(0, 8)}-${pageId.slice(8, 12)}-${pageId.slice(12, 16)}-${pageId.slice(16, 20)}-${pageId.slice(20, 32)}`
          }

          const response = await notion.blocks.children.list({
            block_id: pageId,
            page_size: 1,
          })

          testResult = {
            success: true,
            blockCount: response.results.length,
            hasMore: !!response.next_cursor,
          }
        } catch (error: any) {
          testResult = {
            success: false,
            error: error.message,
            errorCode: error.code,
          }
        }
      }
    } catch (error: any) {
      clientStatus = `error: ${error.message}`
    }
  }

  return NextResponse.json({
    environment: {
      ...checks,
      clientStatus,
    },
    testResult,
    instructions: {
      step1: 'Create integration at https://www.notion.so/my-integrations',
      step2: 'Copy the Internal Integration Token as NOTION_API_KEY',
      step3: 'Share your Notion page with the integration',
      step4: 'Copy the page ID from the Notion URL (last 32 characters)',
      step5: 'Add both to .env.local and restart the dev server',
    },
  })
}



