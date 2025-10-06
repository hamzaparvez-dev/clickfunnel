# Testing the ClickFunnels Clone

## Quick Test Guide

### 1. Test Template Gallery & Preview

1. Navigate to http://localhost:3000/templates
2. You should see 15 different templates
3. Click **"Preview"** button on any template
   - A new window should open showing the template design
   - Should display Hero section, Features, Pricing, etc.
4. Click **"Use Template"** button
   - Should create a funnel with multiple pages
   - Should redirect to funnel builder

### 2. Test Funnel Builder

1. After using a template, you'll be on `/funnels/[id]`
2. You should see all pages listed (Landing, Sales, Checkout, etc.)
3. Test the action buttons:
   - **Pencil icon (Edit)**: Opens the page editor
   - **Eye icon (Preview)**: Opens preview of that specific page
   - **Trash icon (Delete)**: Deletes the page

### 3. Test Page Editor

1. Click the pencil icon on any page
2. You should see the Puck editor with:
   - Left panel: Components to drag and drop
   - Center: Canvas with existing content
   - Right panel: Properties to customize
3. Your template content should be **pre-loaded** in the editor
4. Test features:
   - **Drag new components** from left panel to canvas
   - **Click components** to edit properties in right panel
   - **Preview button** (eye icon): Opens preview window
   - **Save button**: Saves your changes

### 4. Debug Console Logs

Open browser DevTools (F12) and check Console tab for:
- `"Loading page content:"` - Shows raw page data
- `"Parsed content:"` - Shows parsed JSON
- `"Page data loaded successfully with X components"` - Confirms successful load
- `"Updating page:"` - Shows when page is being saved
- `"Page persisted to localStorage:"` - Confirms data is saved

### Expected Results

✅ **Templates should have pre-built content**
- Hero sections with gradients
- Feature grids with icons
- Pricing tables
- Forms
- Buttons and text

✅ **Preview should work** at all stages:
- Template gallery preview
- Funnel builder page preview  
- Editor preview

✅ **Data should persist** between page loads

## Troubleshooting

### If templates show empty pages:

1. Check console for errors
2. Clear localStorage: `localStorage.clear()` in console
3. Refresh and try again
4. Check that updatePage is being called in console logs

### If preview doesn't work:

1. Check if popup blocker is enabled (disable it)
2. Check console for JavaScript errors
3. Verify that component data exists in console logs

### If changes don't save:

1. Check console for "Page persisted to localStorage" message
2. Check localStorage in DevTools (Application > Local Storage)
3. Look for errors in console during save

## Data Structure

Pages are stored in localStorage with this structure:
```json
{
  "content": [
    {
      "type": "HeroSection",
      "props": {
        "id": "hero-1",
        "title": "Welcome",
        "subtitle": "Description",
        "buttonText": "Get Started",
        "buttonLink": "#",
        "backgroundColor": "bg-gradient-to-br from-indigo-600 to-purple-600"
      }
    }
  ],
  "root": {}
}
```

## Available Components

1. **HeroSection** - Full-width hero with gradient background
2. **FeatureGrid** - Grid of features with icons
3. **PricingSection** - Pricing tables with plans
4. **FormSection** - Lead capture forms
5. **HeadingBlock** - Customizable headings
6. **TextBlock** - Paragraph text
7. **ButtonBlock** - Call-to-action buttons
8. **ImageBlock** - Responsive images
9. **DividerBlock** - Section dividers
10. **SpacerBlock** - Spacing control

