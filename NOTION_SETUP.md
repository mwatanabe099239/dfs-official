# Notion API Setup Guide

## Step 1: Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Fill in the details:
   - **Name**: DFS Chain Whitepaper (or any name)
   - **Type**: Internal
   - **Associated workspace**: Select your workspace
4. Click **"Submit"**
5. Copy the **"Internal Integration Token"** - this is your `NOTION_API_KEY`

## Step 2: Share Your Notion Page with the Integration

**Important:** If you're **invited to a page** (not the owner), you need to ask the **page owner** to share the page with your integration. You cannot connect integrations to pages you don't own unless you have admin/owner permissions.

### If You Own the Page:

There are **two ways** to connect your integration to the page:

#### Method 1: From the Integration Settings (Recommended)

1. Go back to https://www.notion.so/my-integrations
2. Click on your integration (the one you just created)
3. Scroll down to the **"Connected pages"** section
4. Click **"+ Add connections"**
5. Search for and select your whitepaper page
6. Click **"Add"**

#### Method 2: From the Page Share Dialog

1. Open your Notion page (the whitepaper page)
2. Click the **"Share"** button (top right)
3. In the search field that says **"Email or group, separated by commas"**, type the **exact name** of your integration
4. Your integration should appear in the dropdown - select it
5. Click **"Invite"**
6. Make sure the integration has **"Can view"** or **"Can edit"** access

### If You're Invited to the Page (Not the Owner):

**You need the page owner to share the page with your integration:**

1. Ask the page owner to:
   - Go to the whitepaper page
   - Click **"Share"** button
   - In the search field, type your integration name
   - Select your integration and click **"Invite"**
   - Give it **"Can view"** access (minimum required)

2. OR ask them to:
   - Go to https://www.notion.so/my-integrations
   - Find your integration (they need to be in the same workspace)
   - Click on it
   - Go to **"Connected pages"** section
   - Click **"+ Add connections"**
   - Add the whitepaper page

**Note:** The integration must be in the same workspace as the page for this to work.

## Step 3: Get Your Page ID

1. Open your Notion page in a browser
2. Look at the URL - it will look like:
   ```
   https://www.notion.so/Your-Page-Title-2e1b1eccadb280fd9542c92082c42004
   ```
3. The **Page ID** is the last part after the final dash: `2e1b1eccadb280fd9542c92082c42004`
   - It's 32 characters long
   - It may or may not have dashes in the URL, but copy it as-is

## Step 4: Configure Environment Variables

Create or update `.env.local` in your project root:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PAGE_ID=2e1b1eccadb280fd9542c92082c42004
```

**Important**: 
- Restart your dev server after adding/changing environment variables
- The `.env.local` file should be in the root directory (same level as `package.json`)

## Step 5: Verify the Setup

1. Make sure your Notion page has some content (at least one paragraph or heading)
2. Restart your Next.js dev server: `npm run dev`
3. Visit `/whitepaper` page
4. Check the browser console (F12) for any errors
5. Check the Network tab to see if `/api/whitepaper` is being called

## Troubleshooting

### Blank Page
- Check browser console for errors
- Verify the API route is being called (Network tab)
- Make sure the page is shared with the integration
- Ensure the page has content

### "Unauthorized" Error
- Check your `NOTION_API_KEY` is correct
- Make sure you copied the full token (starts with `secret_`)

### "Page not found" Error
- Verify your `NOTION_PAGE_ID` is correct
- Make sure the page is shared with the integration
- Try copying the page ID directly from the Notion URL

### "No content" Error
- Make sure your Notion page has at least one block of content
- Try adding a heading or paragraph to the page

