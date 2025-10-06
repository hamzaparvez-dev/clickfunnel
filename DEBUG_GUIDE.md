# Debug Guide - Template & Preview Issues

## How to Debug

### 1. Open Browser Console
- Press **F12** or **Cmd+Option+I** (Mac)
- Go to **Console** tab
- Keep it open while testing

### 2. Test Preview Feature

#### Steps:
1. Go to http://localhost:3000/templates
2. Click **"Preview"** button on any template
3. Check console for these logs:

```
=== PREVIEW TEMPLATE ===
Template: Product Launch Pro
First page definition: {...}
Looking for puck key: landing-product-launch
Puck data from key: {...}
Rendering X components
Component 0: {...}
Component 1: {...}
Final HTML length: XXXX
=== END PREVIEW ===
```

#### What to Look For:
- ✅ **"Puck data from key"** should show an object with content
- ✅ **"Rendering X components"** where X > 0
- ✅ **"Final HTML length"** should be > 1000
- ❌ **"Using generic template fallback"** means no specific template found (will use generic)
- ❌ **"No content to render!"** means data is missing

### 3. Test Template Creation

#### Steps:
1. Go to http://localhost:3000/templates
2. Click **"Use Template"** button
3. Check console for these logs:

```
=== USE TEMPLATE ===
Template: Product Launch Pro ID: tpl-product-launch
Created funnel: funnel-xxx
Creating page 1/4: Landing Page (landing)
Puck key: landing-product-launch
Got puck data: X components
Saving content, length: XXXX
Content saved to page: page-xxx
...
All pages created. Redirecting to funnel: funnel-xxx
=== END USE TEMPLATE ===
```

#### What to Look For:
- ✅ **"Got puck data: X components"** where X > 0
- ✅ **"Content saved to page"** for each page
- ✅ **"All pages created"** at the end
- ❌ **"Using generic template"** means falling back to generic
- ❌ **"Failed to save content"** means update failed

### 4. Test Page Editor Loading

#### Steps:
1. After using a template, you're on `/funnels/[id]`
2. Click **pencil icon** on any page
3. Check console for:

```
Loading page content: {...}
Parsed content: {...}
Page data loaded successfully with X components
```

#### What to Look For:
- ✅ **"Page data loaded successfully"** with components count > 0
- ✅ **Puck editor shows components** in left panel and on canvas
- ❌ **"No page content available yet"** means content not saved
- ❌ **"Error parsing page content"** means JSON is corrupted

### 5. Check localStorage

#### Steps:
1. Open DevTools → **Application** tab
2. Go to **Local Storage** → http://localhost:3000
3. Click on **clickfunnels-clone-data**
4. Check the value

#### What to Look For:
```json
{
  "funnels": [...],
  "pages": [
    {
      "id": "page-xxx",
      "name": "Landing Page",
      "content": "{\"content\":[{\"type\":\"HeroSection\",\"props\":{...}}],\"root\":{}}"
    }
  ]
}
```

- ✅ **pages array** should have entries
- ✅ **content field** should be a JSON string with "content" array
- ❌ Empty pages array means nothing was saved
- ❌ `content: null` or `content: ""` means data wasn't persisted

## Common Issues & Fixes

### Issue 1: Preview Shows Blank Page

**Symptom:** Preview window opens but is completely white

**Debug:**
- Check console for "No content to render!"
- Check console for "Invalid component" errors
- Check if `puckData.content.length` is 0

**Fix:**
- Template data is missing or malformed
- Check `lib/data/puck-templates.ts` for correct structure
- Should fall back to generic templates automatically

### Issue 2: Editor Shows No Content

**Symptom:** Puck editor opens but canvas is empty

**Debug:**
- Check console for "No page content available yet"
- Check localStorage for the page's content field
- Check console for "Updating page" when template was created

**Fix:**
- Content wasn't saved when template was used
- Try using template again
- Clear localStorage: `localStorage.clear()` in console
- Refresh and retry

### Issue 3: Content Not Persisting

**Symptom:** Edits in Puck editor don't save or disappear on refresh

**Debug:**
- Check console for "Page persisted to localStorage"
- Check localStorage to see if data is there
- Look for errors when clicking Save

**Fix:**
- Make sure Save button is clicked
- Check for JavaScript errors in console
- Verify localStorage is not full (max 5-10MB)

## Manual Testing Checklist

### Preview Test
- [ ] Click Preview on 3 different templates
- [ ] Each preview shows content (not blank)
- [ ] Preview has proper styling (Tailwind loaded)
- [ ] Preview opens in new window

### Template Creation Test  
- [ ] Click Use Template
- [ ] Redirects to funnel builder
- [ ] All pages listed (2-5 pages depending on template)
- [ ] Each page shows name and type

### Editor Test
- [ ] Click pencil icon on a page
- [ ] Puck editor loads with components
- [ ] Left panel shows component library
- [ ] Canvas shows pre-loaded content
- [ ] Can drag new components
- [ ] Can edit component properties
- [ ] Save button works

### Persistence Test
- [ ] Create funnel from template
- [ ] Edit a page
- [ ] Save changes
- [ ] Close browser tab
- [ ] Re-open http://localhost:3000
- [ ] Navigate to same funnel
- [ ] Changes are still there

## Quick Fixes

### Clear All Data
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### Check What's Stored
```javascript
// In browser console
const data = JSON.parse(localStorage.getItem('clickfunnels-clone-data'))
console.log('Funnels:', data.funnels.length)
console.log('Pages:', data.pages.length)
console.log('First page content:', data.pages[0]?.content)
```

### Manually Add Test Content
```javascript
// In browser console
const data = JSON.parse(localStorage.getItem('clickfunnels-clone-data'))
if (data.pages[0]) {
  data.pages[0].content = JSON.stringify({
    content: [
      {
        type: 'HeroSection',
        props: {
          id: 'test-1',
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          buttonText: 'Click Me',
          buttonLink: '#',
          backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600'
        }
      }
    ],
    root: {}
  })
  localStorage.setItem('clickfunnels-clone-data', JSON.stringify(data))
  console.log('Test content added to first page')
  location.reload()
}
```

## Contact Support

If issues persist after following this guide:
1. Copy all console logs
2. Export localStorage data
3. Take screenshots of the issue
4. Provide steps to reproduce

