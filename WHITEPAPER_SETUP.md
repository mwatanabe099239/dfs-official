# Whitepaper Page Setup Guide

## Overview

The whitepaper page displays content from Firebase Firestore. The `/api/whitepaper` endpoint fetches data from Firestore and transforms it into the format expected by the frontend component.

## Firebase Configuration

### 1. Set Up Firebase Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

You can find these values in your Firebase Console under **Project Settings > General > Your apps**.

### 2. Configure Firestore Security Rules

Go to [Firebase Console](https://console.firebase.google.com/) > **Firestore Database** > **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menu/{document=**} {
      allow read: if true;
      allow write: if false; // Configure auth for admin dashboard
    }
    match /pages/{document=**} {
      allow read: if true;
      allow write: if false; // Configure auth for admin dashboard
    }
  }
}
```

See `firestore.rules` file or `FIREBASE_STRUCTURE.md` for more details.

## API Response Format

The API should return data in this format:

```json
{
  "menus": [
    {
      "id": "string",
      "title": "string",
      "order": number,
      "submenus": [
        {
          "id": "string",
          "title": "string",
          "order": number,
          "content": "string (HTML)",
          "menuId": "string"
        }
      ]
    }
  ],
  "updatedAt": "ISO date string",
  "updatedBy": "string"
}
```

## Features

- **Sidebar Navigation**: Collapsible menu sections with submenu items
- **Deep Linking**: URL hash navigation (e.g., `/whitepaper#submenu-id`)
- **Previous/Next Navigation**: Navigate between submenus
- **Feedback Section**: Thumbs up/down buttons for page feedback
- **Responsive Design**: Sidebar hidden on mobile, can be made collapsible
- **Auto-selection**: Automatically selects first submenu on load
- **Auto-expand**: Automatically expands menu containing selected submenu

## Styling

The page uses:
- **Tailwind CSS** for layout and components
- **@tailwindcss/typography** for prose content styling
- Custom prose styles in `src/index.css` for content formatting

## Firebase Data Structure

The API route expects data in Firestore with this structure:

### `menu` Collection
- Root menus: `{ title, path, order, parentId: null }`
- Submenus: `{ title, path, order, parentId: "parent-menu-id" }`

### `pages` Collection
- `{ title, path, content: "HTML string" | ContentBlock[], updatedAt?, updatedBy? }`

The `path` field in both collections must match for the API to link submenus with their content.

See `FIREBASE_STRUCTURE.md` for complete documentation.

## Content Formatting

The content is rendered as HTML using `dangerouslySetInnerHTML`. The API route automatically converts content blocks to HTML if needed, but storing content as HTML strings is recommended for better performance.

**Supported content formats:**
1. **HTML String** (recommended): `content: "<h1>Title</h1><p>Content...</p>"`
2. **Content Blocks Array**: Automatically converted to HTML by the API route

Supported HTML elements:
- Headings (h1, h2, h3)
- Paragraphs
- Links
- Lists (ul, ol)
- Code blocks (pre, code)
- Tables
- Blockquotes
- Images

## Customization

### Change Sidebar Width

Edit `src/components/WhitepaperPage.tsx`:

```tsx
<aside className="hidden lg:block w-80 ...">
  // Change w-80 to your desired width (e.g., w-64, w-96)
```

### Modify Colors

The component uses Tailwind utility classes. Update colors in the component:
- Background: `bg-white`
- Borders: `border-gray-200`
- Active state: `bg-blue-50`, `text-blue-700`
- Hover: `hover:bg-gray-50`

### Add Search Functionality

You can add a search input in the sidebar header to filter menus and submenus.

## Troubleshooting

### Content Not Loading

1. Check browser console for API errors
2. Verify Firebase environment variables are set correctly
3. Check Firestore security rules allow read access
4. Verify data structure in Firestore matches expected format
5. Check network tab for failed requests to `/api/whitepaper`
6. Ensure `path` fields match between `menu` and `pages` collections

### Styling Issues

1. Verify `@tailwindcss/typography` is installed
2. Check that Tailwind config includes the typography plugin
3. Ensure `src/index.css` is imported in your app

### Navigation Not Working

1. Check that submenu IDs are unique
2. Verify URL hash format matches submenu IDs
3. Check browser console for JavaScript errors

