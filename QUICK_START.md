# Quick Start Guide

## ✅ All Issues Fixed!

1. ✅ STORAGE_KEY constant added
2. ✅ Authentication removed for testing  
3. ✅ Preview debugging enabled
4. ✅ Template loading logs added

## ⚠️ IMPORTANT: Correct URL

Your dev server is running on **PORT 3001** (not 3000)

### ✅ Correct URL:
```
http://localhost:3001
```

### ❌ Wrong URL (will give errors):
```
http://localhost:3000
```

## 🚀 Quick Test Steps

### 1. Open the App
Go to: **http://localhost:3001**

Should redirect to: **http://localhost:3001/dashboard**

### 2. Navigate to Templates
Click **"Templates"** in sidebar OR go to: **http://localhost:3001/templates**

### 3. Test Preview
1. Click **"Preview"** button on any template
2. New window should open with the template design
3. Check browser console (F12) for debug logs

### 4. Create Funnel from Template
1. Click **"Use Template"** button
2. Should create funnel and redirect to funnel builder
3. Check console for creation logs

### 5. Edit Page
1. In funnel builder, click **pencil icon** on any page
2. Puck editor should open with pre-loaded content
3. Components should be visible in left panel
4. Canvas should show the template content

## 🐛 If You See Errors

### ChunkLoadError
**Cause:** Accessing wrong port (3000 instead of 3001)

**Fix:** Use http://localhost:3001

### Blank Preview
**Cause:** Component data missing or popup blocked

**Fix:** 
1. Allow popups in browser
2. Check console logs
3. See DEBUG_GUIDE.md

### Empty Editor
**Cause:** Content not saved or not loading

**Fix:**
1. Check console for "Page data loaded successfully"
2. Check localStorage in DevTools
3. Try using template again

## 📝 Console Logs to Look For

### When Previewing:
```
=== PREVIEW TEMPLATE ===
Template: Product Launch Pro
Rendering X components
Final HTML length: XXXX
=== END PREVIEW ===
```

### When Using Template:
```
=== USE TEMPLATE ===
Created funnel: funnel-xxx
Creating page 1/4: Landing Page
Content saved to page: page-xxx
All pages created
=== END USE TEMPLATE ===
```

### When Opening Editor:
```
Loading page content: {...}
Parsed content: {...}
Page data loaded successfully with X components
```

## 🔧 Clear Data If Needed

If things get messed up:

1. Open browser console (F12)
2. Run:
```javascript
localStorage.clear()
location.reload()
```

## 📍 Key URLs

- **Dashboard:** http://localhost:3001/dashboard
- **Templates:** http://localhost:3001/templates  
- **Funnels:** http://localhost:3001/funnels
- **Analytics:** http://localhost:3001/analytics
- **Settings:** http://localhost:3001/settings

## ✨ Features to Test

### ✅ Working Features:
- [x] Template gallery with 15 templates
- [x] Template preview
- [x] Create funnel from template
- [x] Drag & drop page builder (Puck)
- [x] Save and load pages
- [x] Funnel management
- [x] Page preview

### 🎯 Test Checklist:
1. [ ] Browse templates
2. [ ] Preview a template
3. [ ] Use a template
4. [ ] Edit a page
5. [ ] Add new components
6. [ ] Save changes
7. [ ] Preview page
8. [ ] Refresh browser
9. [ ] Verify changes persisted

## 🆘 Need Help?

Check these docs:
- `DEBUG_GUIDE.md` - Detailed debugging instructions
- `TESTING.md` - Comprehensive testing guide  
- `FEATURES_COMPLETE.md` - Full feature list

Or check the console logs - they tell you everything!

