# 🎨 **GrapesJS Editor - Complete Guide**

## 🎉 **Overview**

Your funnel editor now uses **GrapesJS** - a powerful, professional, and **completely FREE** open-source page builder that provides:

✅ **Enterprise-grade features** without licensing costs
✅ **Mature, battle-tested codebase** used by thousands
✅ **Rich plugin ecosystem** for unlimited extensibility
✅ **Professional drag-and-drop** interface
✅ **Visual CSS editor** for precise styling
✅ **Responsive design tools** built-in
✅ **Asset manager** for images and files
✅ **Component system** for reusable blocks
✅ **Custom code support** (HTML/CSS/JS)
✅ **Export functionality** for deployment

---

## 🚀 **Why GrapesJS?**

### **vs Puck Editor**

| Feature | Puck | GrapesJS |
|---------|------|----------|
| **Cost** | Paid/Limited | 100% Free |
| **Visual Editing** | Basic | Advanced |
| **CSS Editor** | ❌ | ✅ Full Visual |
| **Responsive** | Limited | ✅ Device Manager |
| **Plugins** | Few | 100+ Available |
| **Component Library** | Limited | ✅ Extensive |
| **Asset Manager** | ❌ | ✅ Built-in |
| **Code Editor** | ❌ | ✅ HTML/CSS |
| **Layer Manager** | ❌ | ✅ Visual Tree |
| **Trait Manager** | Basic | ✅ Advanced |
| **Community** | Small | ✅ Large & Active |
| **Documentation** | Limited | ✅ Comprehensive |
| **Maturity** | New | ✅ 7+ Years |

---

## 📦 **Installed Packages**

```json
{
  "grapesjs": "Latest",                      // Core framework
  "grapesjs-preset-webpage": "Latest",       // Webpage building blocks
  "grapesjs-blocks-basic": "Latest",         // Basic components
  "grapesjs-plugin-forms": "Latest",         // Form builder
  "grapesjs-component-countdown": "Latest",  // Countdown timers
  "grapesjs-plugin-export": "Latest",        // Export functionality
  "grapesjs-navbar": "Latest",               // Navigation bars
  "grapesjs-tabs": "Latest"                  // Tab components
}
```

---

## 🎨 **Editor Interface**

### **Layout**

```
┌─────────────────────────────────────────────────────────────┐
│  Top Toolbar (Back, Save, Preview, Export, Device Toggle)    │
├──────────┬────────────────────────────────────┬─────────────┤
│          │                                    │             │
│  Blocks  │         Canvas Area                │   Layers    │
│  Panel   │      (Drag & Drop)                 │   Styles    │
│  (Left)  │                                    │   Settings  │
│          │                                    │   (Right)   │
│          │                                    │             │
└──────────┴────────────────────────────────────┴─────────────┘
```

### **Top Toolbar**
- **Back Button**: Return to funnel overview
- **Undo/Redo**: Step backward/forward
- **Device Toggle**: Desktop/Tablet/Mobile preview
- **Preview**: Open in new window
- **Export**: Download HTML
- **Save**: Save to database

### **Left Sidebar - Components**
- Pre-built blocks library
- Drag to canvas
- Categorized by type
- Custom components

### **Main Canvas**
- Visual editing area
- Drag & drop interface
- Live preview
- Component selection
- Inline editing

### **Right Sidebar**
- **Layers**: Component hierarchy
- **Settings**: Element properties
- **Styles**: Visual CSS editor

---

## 🧩 **Built-in Components**

### **Layout Components**
- **Columns** (1, 2, 3, 4 columns)
- **Containers**
- **Sections**
- **Rows**
- **Grids**

### **Content Components**
- **Text** (headings, paragraphs)
- **Images** (with lazy loading)
- **Videos** (YouTube, Vimeo, self-hosted)
- **Links**
- **Buttons**
- **Icons**

### **Form Components**
- **Text Input**
- **Email Input**
- **Textarea**
- **Select Dropdown**
- **Checkbox**
- **Radio Buttons**
- **Submit Button**
- **Form Container**

### **Advanced Components**
- **Navigation Bar** (responsive menu)
- **Tabs** (content tabs)
- **Countdown Timer** (urgency)
- **Map** (Google Maps embed)
- **Custom Code** (HTML/CSS/JS)

### **Custom Components** (Added by us)
- **Hero Section** - Full-width header with CTA
- **Feature Grid** - 3-column feature showcase
- **Testimonial** - Customer review card
- **CTA Button** - Call-to-action button
- **Countdown Timer** - Urgency timer

---

## 🎯 **How to Use**

### **1. Basic Page Building**

1. **Add Components**
   - Browse blocks in left panel
   - Drag component to canvas
   - Drop in desired location

2. **Edit Content**
   - Double-click text to edit
   - Single-click to select element
   - Use toolbar for quick actions

3. **Style Elements**
   - Select element
   - Open Styles panel (right)
   - Adjust properties visually
   - See changes in real-time

4. **Save Page**
   - Click Save button
   - Content stored in database
   - Reload to continue editing

---

### **2. Responsive Design**

1. **Switch Devices**
   - Click device icons in top toolbar
   - Preview mobile/tablet/desktop
   - Adjust styles per breakpoint

2. **Mobile Optimization**
   - Hide elements on mobile
   - Adjust font sizes
   - Reorder components
   - Change layouts

3. **Breakpoints**
   - Desktop: > 992px
   - Tablet: 768px - 992px
   - Mobile: < 768px

---

### **3. Advanced Styling**

#### **Visual CSS Editor**

The Styles panel provides visual controls for:

**Typography**
- Font family
- Font size
- Font weight
- Letter spacing
- Line height
- Text alignment
- Text decoration
- Text shadow

**Dimensions**
- Width/Height
- Min/Max dimensions
- Margin
- Padding

**Background**
- Background color
- Background image
- Background repeat
- Background position
- Background size

**Border**
- Border width
- Border style
- Border color
- Border radius

**Effects**
- Opacity
- Transitions
- Transforms
- Cursor
- Overflow

**Flexbox**
- Flex direction
- Justify content
- Align items
- Flex wrap
- Gap

---

### **4. Component Management**

#### **Layer Manager**

- **View Hierarchy**: See component tree
- **Reorder Elements**: Drag to reposition
- **Hide Elements**: Toggle visibility
- **Lock Elements**: Prevent editing
- **Delete Elements**: Remove components

#### **Trait Manager**

Configure element properties:
- ID and classes
- Attributes
- Custom traits
- Data attributes

---

### **5. Forms & Lead Capture**

1. **Add Form Block**
   - Drag "Form" from blocks
   - Add form fields
   - Configure attributes

2. **Field Configuration**
   - Set input type
   - Add placeholder
   - Set required fields
   - Add validation

3. **Form Submission**
   - Set action URL
   - Configure method (POST/GET)
   - Add success message
   - Integrate with backend

---

## 🔧 **Advanced Features**

### **1. Custom Code Injection**

Add custom HTML/CSS/JavaScript:

```html
<!-- Add via Code component -->
<script>
  // Your custom JavaScript
  console.log('Custom code works!');
</script>

<style>
  /* Your custom CSS */
  .custom-class {
    color: red;
  }
</style>
```

### **2. Asset Manager**

- Upload images
- Manage files
- Use external URLs
- Organize assets

### **3. Component Traits**

Add custom properties:

```javascript
// In GrapesJSEditor.tsx
editor.DomComponents.addType('custom-component', {
  model: {
    defaults: {
      traits: [
        {
          type: 'text',
          label: 'Custom Text',
          name: 'custom-text',
        },
      ],
    },
  },
})
```

### **4. Custom Blocks**

Create reusable components:

```javascript
editor.BlockManager.add('my-block', {
  label: 'My Block',
  category: 'Custom',
  content: '<div class="my-component">Content</div>',
  media: '<svg>...</svg>',
})
```

---

## 🎨 **Custom Components Added**

### **1. Hero Section**

**Category:** Sections

**Features:**
- Gradient background
- Centered content
- Headline + Subtitle
- CTA button

**Usage:**
- Drag "Hero Section" from Sections
- Edit text inline
- Customize colors in Styles
- Change button link in Settings

---

### **2. Feature Grid**

**Category:** Sections

**Features:**
- 3-column layout
- Icon placeholders
- Title + Description
- Responsive grid

**Usage:**
- Add to page
- Replace icon emojis
- Edit titles/descriptions
- Adjust spacing

---

### **3. Testimonial**

**Category:** Components

**Features:**
- Customer photo
- Name + Title
- Star rating
- Quote text

**Usage:**
- Drag to page
- Update image URL
- Edit customer info
- Modify quote

---

### **4. CTA Button**

**Category:** Components

**Features:**
- Large, prominent button
- Hover effects
- Customizable colors
- Link configuration

**Usage:**
- Add button
- Edit text
- Set link URL
- Style in Styles panel

---

### **5. Countdown Timer**

**Category:** Components

**Features:**
- Hours/Minutes/Seconds
- Urgency design
- Background color options
- Responsive layout

**Usage:**
- Add timer
- Update time values
- Change background
- Position on page

---

## 📱 **Responsive Design**

### **Device Manager**

**Desktop View**
- Full-width canvas
- All features visible
- Default editing mode

**Tablet View**
- 768px width
- Test tablet layouts
- Adjust for medium screens

**Mobile View**
- 375px width
- Mobile optimization
- Touch-friendly testing

### **Responsive Utilities**

- Hide on mobile: Add class `hidden md:block`
- Mobile only: Add class `md:hidden`
- Responsive text: Use `text-base md:text-lg lg:text-xl`
- Responsive spacing: Use `p-4 md:p-8 lg:p-12`

---

## 💾 **Storage & Export**

### **Save to Database**

- Click "Save" button
- Stores HTML + CSS
- Preserves components
- Version tracked

**Saved Data:**
```json
{
  "html": "<div>...</div>",
  "css": ".class { ... }",
  "components": [...],
  "timestamp": 1234567890
}
```

### **Export HTML**

- Click "Export" button
- Downloads complete HTML file
- Includes all CSS
- Includes Tailwind CDN
- Ready for hosting

**Exported File:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>/* Your CSS */</style>
</head>
<body>
  <!-- Your HTML -->
</body>
</html>
```

---

## 🔌 **Plugin Ecosystem**

### **Currently Installed**

1. **grapesjs-preset-webpage**
   - Webpage building blocks
   - Common components
   - Form elements

2. **grapesjs-blocks-basic**
   - Basic HTML elements
   - Layout components
   - Container blocks

3. **grapesjs-plugin-forms**
   - Form builder
   - Input fields
   - Form validation

4. **grapesjs-component-countdown**
   - Countdown timer
   - Urgency elements
   - Date/time features

5. **grapesjs-plugin-export**
   - Export to ZIP
   - Download HTML
   - Code export

6. **grapesjs-navbar**
   - Responsive navbar
   - Mobile menu
   - Navigation builder

7. **grapesjs-tabs**
   - Tab components
   - Content organization
   - Accordion support

### **Available Plugins**

Over 100+ plugins available:

- **grapesjs-preset-newsletter** - Email templates
- **grapesjs-lory-slider** - Image sliders
- **grapesjs-tooltip** - Tooltips
- **grapesjs-typed** - Typing animation
- **grapesjs-custom-code** - Code editor
- **grapesjs-touch** - Touch events
- **grapesjs-parser-postcss** - PostCSS support
- **grapesjs-style-bg** - Background styles
- **grapesjs-style-gradient** - Gradients
- **grapesjs-style-filter** - CSS filters

**Install any plugin:**
```bash
pnpm add grapesjs-[plugin-name]
```

---

## ⌨️ **Keyboard Shortcuts**

| Action | Shortcut |
|--------|----------|
| Undo | `Cmd/Ctrl + Z` |
| Redo | `Cmd/Ctrl + Shift + Z` |
| Delete Component | `Delete/Backspace` |
| Duplicate | `Cmd/Ctrl + D` |
| Copy | `Cmd/Ctrl + C` |
| Paste | `Cmd/Ctrl + V` |
| Select Parent | `Esc` |
| Save | `Cmd/Ctrl + S` (custom) |

---

## 🎯 **Best Practices**

### **1. Component Organization**

- Use semantic HTML
- Organize with layers
- Name components clearly
- Group related elements

### **2. Styling**

- Use Tailwind classes when possible
- Keep custom CSS minimal
- Use component styles over inline
- Test responsive breakpoints

### **3. Performance**

- Optimize images
- Minimize custom code
- Use lazy loading
- Keep DOM structure clean

### **4. Maintainability**

- Create reusable components
- Document custom blocks
- Use consistent naming
- Version control exports

---

## 🔍 **Troubleshooting**

### **Common Issues**

**1. Styles Not Applying**
- Check Tailwind CDN is loaded
- Verify class names are correct
- Clear browser cache
- Check style priority

**2. Components Not Draggable**
- Ensure blocks panel is visible
- Check for JavaScript errors
- Reload editor
- Clear local storage

**3. Save Not Working**
- Check network connection
- Verify page permissions
- Check console for errors
- Try manual export

**4. Preview Not Showing**
- Allow popup windows
- Check browser settings
- Try different browser
- Export and open locally

---

## 🚀 **Advanced Customization**

### **Add Custom Component Type**

```javascript
// In GrapesJSEditor.tsx
editor.DomComponents.addType('my-component', {
  model: {
    defaults: {
      tagName: 'div',
      attributes: { class: 'my-component' },
      components: '<h1>My Component</h1>',
      traits: [
        {
          type: 'text',
          label: 'Title',
          name: 'title',
        },
      ],
    },
  },
})
```

### **Add Custom Block**

```javascript
editor.BlockManager.add('my-block', {
  label: 'My Block',
  category: 'Custom',
  content: { type: 'my-component' },
  media: `<svg>...</svg>`,
})
```

### **Custom Style Sector**

```javascript
editor.StyleManager.addSector('custom-styles', {
  name: 'Custom',
  open: true,
  buildProps: ['custom-property'],
})
```

---

## 📊 **Comparison with ClickFunnels**

| Feature | ClickFunnels | GrapesJS Editor |
|---------|--------------|-----------------|
| **Drag & Drop** | ✅ | ✅ Advanced |
| **Visual CSS** | Limited | ✅ Full Control |
| **Responsive** | ✅ | ✅ Enhanced |
| **Components** | Fixed Set | ✅ Unlimited |
| **Custom Code** | Limited | ✅ Full Support |
| **Export** | ❌ | ✅ HTML/ZIP |
| **Plugins** | Proprietary | ✅ 100+ Free |
| **Cost** | $97-$297/mo | ✅ FREE |
| **Learning Curve** | Medium | Medium |
| **Customization** | Limited | ✅ Unlimited |

---

## 🎓 **Learning Resources**

### **Official Documentation**
- [GrapesJS Docs](https://grapesjs.com/docs/)
- [API Reference](https://grapesjs.com/docs/api/)
- [Modules](https://grapesjs.com/docs/modules/)

### **Tutorials**
- Component creation
- Custom blocks
- Plugin development
- Theme customization

### **Community**
- [GitHub Discussions](https://github.com/GrapesJS/grapesjs/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/grapesjs)
- [Discord Community](https://discord.gg/QAbgGXq)

---

## 🔮 **Future Enhancements**

### **Planned Features**

1. **AI Integration**
   - AI-powered design suggestions
   - Content generation
   - Image recommendations

2. **Template Library**
   - Pre-built page templates
   - Industry-specific designs
   - Instant import

3. **Collaboration**
   - Real-time editing
   - Team comments
   - Version history

4. **Advanced Export**
   - React components
   - Vue components
   - WordPress themes

5. **Analytics Integration**
   - Heatmaps
   - Click tracking
   - Conversion optimization

---

## 💡 **Pro Tips**

1. **Start with Templates**
   - Use custom components as starting point
   - Modify to fit your needs
   - Save successful designs

2. **Master Keyboard Shortcuts**
   - Speed up workflow
   - Reduce mouse usage
   - Increase efficiency

3. **Use Layer Manager**
   - Keep structure organized
   - Easy component finding
   - Better maintenance

4. **Preview Often**
   - Test on different devices
   - Check responsiveness
   - Validate functionality

5. **Export Regularly**
   - Backup your work
   - Version control
   - Deploy easily

---

## 🏆 **Success Metrics**

### **GrapesJS Advantages**

✅ **100% Free** - No licensing costs ever
✅ **Open Source** - Full control over code
✅ **Active Development** - Regular updates
✅ **Large Community** - 15K+ GitHub stars
✅ **Plugin Ecosystem** - 100+ free plugins
✅ **Production Ready** - Used by thousands
✅ **Customizable** - Unlimited possibilities
✅ **Well Documented** - Comprehensive guides
✅ **Future Proof** - Long-term support

---

## 📞 **Support**

### **Get Help**

1. **Documentation**: Check `GRAPESJS_EDITOR_GUIDE.md`
2. **Code Examples**: See inline comments
3. **Official Docs**: [grapesjs.com/docs](https://grapesjs.com/docs/)
4. **Community**: GitHub Discussions
5. **Stack Overflow**: Tag `grapesjs`

---

## 🎉 **You're Ready!**

Your funnel editor now has:

✅ **Professional drag-and-drop builder**
✅ **Visual CSS editor**
✅ **Responsive design tools**
✅ **Component library**
✅ **Custom blocks**
✅ **Export functionality**
✅ **Plugin support**
✅ **100% FREE forever**

**Start building beautiful, high-converting pages with GrapesJS!** 🚀✨

---

**Happy Building!** 🎨


