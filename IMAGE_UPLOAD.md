# Image Upload Feature

## ✨ New Feature: Upload Images from Local Computer

The ImageBlock component now supports **two ways** to add images:

### Method 1: Upload from Computer 📁

1. **Drag ImageBlock** component to canvas
2. **Click on the image** to select it
3. In the right panel, find **"Image URL or Upload"** section
4. Click **"Choose File"** button
5. Select image from your computer
6. Image is automatically converted to base64 and embedded

**Benefits:**
- ✅ No external hosting needed
- ✅ Works offline
- ✅ Images saved with your page
- ✅ Instant preview
- ✅ Supports: JPG, PNG, GIF, WebP, SVG

### Method 2: Use External URL 🔗

1. **Drag ImageBlock** component to canvas
2. **Click on the image** to select it
3. In the right panel, paste image URL in text field
4. Image loads from external source

**Benefits:**
- ✅ Smaller file size
- ✅ Can use CDN images
- ✅ Easy to update

## 🎨 Image Properties

### Width Options:
- **Small (384px)** - For icons or small graphics
- **Medium (448px)** - For inline images
- **Large (672px)** - For featured images
- **Extra Large (896px)** - For hero images
- **Full Width** - Spans entire container

### Alt Text:
- Add descriptive text for accessibility
- Helps with SEO
- Required for screen readers

## 📸 How It Works

### Upload Process:
1. User selects file from computer
2. JavaScript FileReader API reads the file
3. File is converted to base64 data URL
4. Base64 string is stored in page content
5. Image displays immediately

### Storage:
- Images stored as base64 in localStorage
- Embedded directly in page JSON
- No separate image files needed
- Works with the existing save/load system

## 🔧 Technical Details

### Supported Formats:
```
image/jpeg
image/png
image/gif
image/webp
image/svg+xml
```

### File Size Considerations:
- **Base64 encoding** increases size by ~33%
- **localStorage limit**: 5-10MB total (browser dependent)
- **Recommended**: Keep images under 500KB each
- **Tip**: Optimize images before upload using:
  - TinyPNG (https://tinypng.com)
  - Squoosh (https://squoosh.app)
  - ImageOptim (Mac)

### Example Base64 Output:
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...
```

## 💡 Best Practices

### For Better Performance:
1. **Optimize images** before upload
2. **Use appropriate dimensions** (resize to actual display size)
3. **Choose right format**:
   - JPG for photos
   - PNG for graphics with transparency
   - SVG for icons and logos
   - WebP for modern browsers (smaller size)

### For Better User Experience:
1. **Always add alt text** for accessibility
2. **Use descriptive names** when uploading
3. **Preview before saving** to verify quality
4. **Test on mobile** to ensure responsive display

## 🚀 Usage Example

### Step-by-Step:
1. Open Puck editor
2. Find **"ImageBlock"** in components panel
3. Drag it to your page
4. Click the image on canvas
5. In properties panel:
   - Click "Choose File"
   - Select your image (e.g., logo.png)
   - Add alt text: "Company Logo"
   - Select width: "Small (384px)"
6. Click **Save** button
7. Image is now part of your page!

## 🔄 Alternative: Using Unsplash URLs

Instead of uploading, you can use free stock photos:

### Unsplash URLs:
```
https://images.unsplash.com/photo-[ID]?w=800
https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200
```

### Placeholder.com:
```
https://via.placeholder.com/800x400
https://via.placeholder.com/1200x600/3B82F6/FFFFFF
```

## ⚠️ Limitations

### Current Implementation:
- Images stored in browser localStorage
- Total storage limit: ~5-10MB
- Base64 encoding adds overhead
- Not suitable for very large images

### Future Improvements:
- [ ] Cloud storage integration (S3, Cloudinary)
- [ ] Image compression on upload
- [ ] Multiple image upload
- [ ] Image gallery/library
- [ ] Drag & drop upload
- [ ] Crop/resize tools

## 🐛 Troubleshooting

### Image Not Loading:
- Check file size (should be < 500KB)
- Verify format is supported
- Check browser console for errors
- Try different image

### Storage Full Error:
- Clear old funnels from localStorage
- Optimize and re-upload images
- Use external URLs instead

### Image Quality Issues:
- Upload higher resolution image
- Use PNG for graphics
- Use JPG at 80-90% quality
- Avoid over-compression

## 📚 Code Reference

The custom upload field is in:
```
components/editor/PuckEditor.tsx
Lines 329-386
```

Key implementation:
```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
}
```

This feature makes it super easy to add images without external hosting! 🎉

