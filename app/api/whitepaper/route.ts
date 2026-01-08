import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function GET() {
  try {
    const pageId = process.env.NOTION_PAGE_ID

    if (!pageId) {
      return NextResponse.json(
        { error: 'NOTION_PAGE_ID is not configured' },
        { status: 500 }
      )
    }

    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: 'NOTION_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // Format page ID - try both with and without dashes
    // Notion API accepts page IDs in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let formattedPageId = pageId.replace(/-/g, '')
    if (formattedPageId.length === 32) {
      formattedPageId = `${formattedPageId.slice(0, 8)}-${formattedPageId.slice(8, 12)}-${formattedPageId.slice(12, 16)}-${formattedPageId.slice(16, 20)}-${formattedPageId.slice(20, 32)}`
    }

    console.log('Fetching Notion page:', formattedPageId)

    // Fetch the page content
    let response
    try {
      response = await notion.blocks.children.list({
        block_id: formattedPageId,
        page_size: 100,
      })
    } catch (formatError: any) {
      // If formatted ID fails, try the original ID
      console.log('Trying original page ID format:', pageId)
      response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
      })
    }

    // Fetch additional pages if there are more
    let allBlocks = response.results
    let nextCursor = response.next_cursor

    const blockIdToUse = response.results.length > 0 ? formattedPageId : pageId
    
    while (nextCursor) {
      const nextResponse = await notion.blocks.children.list({
        block_id: blockIdToUse,
        page_size: 100,
        start_cursor: nextCursor,
      })
      allBlocks = [...allBlocks, ...nextResponse.results]
      nextCursor = nextResponse.next_cursor
    }

    // Recursively fetch children for blocks that have them (columns, toggles, etc.)
    const fetchChildren = async (block: any): Promise<any> => {
      if (block.has_children) {
        try {
          const childrenResponse = await notion.blocks.children.list({
            block_id: block.id,
            page_size: 100,
          })
          
          let children = childrenResponse.results
          let childrenCursor = childrenResponse.next_cursor
          
          while (childrenCursor) {
            const nextChildrenResponse = await notion.blocks.children.list({
              block_id: block.id,
              page_size: 100,
              start_cursor: childrenCursor,
            })
            children = [...children, ...nextChildrenResponse.results]
            childrenCursor = nextChildrenResponse.next_cursor
          }
          
          // Recursively fetch children of children
          const childrenWithNested = await Promise.all(
            children.map(child => fetchChildren(child))
          )
          
          return {
            ...block,
            children: childrenWithNested,
          }
        } catch (error) {
          console.error(`Error fetching children for block ${block.id}:`, error)
          return block
        }
      }
      return block
    }

    // Fetch children for all blocks that have them
    const blocksWithChildren = await Promise.all(
      allBlocks.map(block => fetchChildren(block))
    )

    console.log('Fetched blocks:', blocksWithChildren.length)
    console.log('Block types found:', [...new Set(blocksWithChildren.map((b: any) => b.type))])

    return NextResponse.json({ blocks: blocksWithChildren })
  } catch (error: any) {
    console.error('Notion API Error:', error)
    const errorMessage = error.message || 'Failed to fetch whitepaper content'
    
    // Provide more helpful error messages
    if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
      return NextResponse.json(
        { error: 'Notion API key is invalid or expired. Please check your NOTION_API_KEY.' },
        { status: 401 }
      )
    }
    
    if (errorMessage.includes('object_not_found') || errorMessage.includes('404')) {
      return NextResponse.json(
        { error: 'Notion page not found. Please check your NOTION_PAGE_ID and ensure the page is shared with your Notion integration.' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

