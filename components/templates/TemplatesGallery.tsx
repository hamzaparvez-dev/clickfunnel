'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiStar, FiAward, FiEye } from 'react-icons/fi'
import { useApp } from '@/lib/context/AppContext'
import { TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory, searchTemplates } from '@/lib/data/templates'
import { getGrapesJSTemplate, TEMPLATE_THEMES } from '@/lib/data/grapesjs-templates'

export function TemplatesGallery() {
  const router = useRouter()
  const { createFunnel, createPage, updatePage } = useApp()
  const [category, setCategory] = useState('All Templates')
  const [query, setQuery] = useState('')
  const [busyTemplateId, setBusyTemplateId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (query.trim()) {
      return searchTemplates(query).filter((t) => category === 'All Templates' || t.category === category)
    }
    return getTemplatesByCategory(category)
  }, [category, query])

  const previewTemplate = (tpl: any) => {
    console.log('=== PREVIEW COMPLETE FUNNEL (Multi-Page) ===')
    console.log('Template:', tpl.name, 'Category:', tpl.category)
    console.log('Total pages:', tpl.pageDefinitions.length)
    
    const previewWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!previewWindow) {
      alert('❌ Please allow popups to preview templates')
      return
    }

    try {
      const templateCategory = tpl.category?.toLowerCase() || 'default'
      
      // Generate HTML for ALL pages
      const allPagesHTML = tpl.pageDefinitions.map((pageDef: any, index: number) => {
        console.log(`Generating page ${index + 1}:`, pageDef.name, `(${pageDef.type})`)
        const pageHTML = getGrapesJSTemplate(pageDef.type, templateCategory, pageDef.name)
        return {
          name: pageDef.name,
          type: pageDef.type,
          html: pageHTML,
          index: index
        }
      })
      
      // Create pages array for JavaScript
      const pagesData = allPagesHTML.map((page: any, idx: number) => ({
        name: page.name,
        type: page.type,
        index: idx
      }))
      
      const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Preview - ${tpl.name} (Complete Funnel)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    .animate-bounce {
      animation: bounce 2s infinite;
    }
    .animate-pulse {
      animation: pulse 2s infinite;
    }
    .funnel-page {
      display: none;
    }
    .funnel-page.active {
      display: block;
    }
    .nav-step {
      transition: all 0.3s;
    }
    .nav-step.active {
      background-color: #4F46E5;
      color: white;
    }
    .nav-step.completed {
      background-color: #10B981;
      color: white;
    }
  </style>
</head>
<body>
  <div style="position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 16px 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h1 style="color: white; font-size: 20px; font-weight: bold; margin: 0;">${tpl.name}</h1>
          <p style="color: #94a3b8; font-size: 14px; margin: 4px 0 0 0;">Complete Funnel Preview - ${tpl.pageDefinitions.length} Pages</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button onclick="prevPage()" id="prevBtn" style="background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            ← Previous
          </button>
          <button onclick="nextPage()" id="nextBtn" style="background: #4F46E5; color: white; border: none; padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#4338CA'" onmouseout="this.style.background='#4F46E5'">
            Next →
          </button>
        </div>
      </div>
      
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
        ${allPagesHTML.map((page: any, idx: number) => `
          <div class="nav-step ${idx === 0 ? 'active' : ''}" id="step-${idx}" onclick="goToPage(${idx})" style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center; border: 2px solid rgba(255,255,255,0.2);">
            <div style="color: white; font-size: 12px; font-weight: 600; margin-bottom: 4px;">STEP ${idx + 1}</div>
            <div style="color: white; font-size: 14px; font-weight: bold;">${page.name}</div>
            <div style="color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 2px; text-transform: uppercase;">${page.type}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <div style="margin-top: 140px;">
    ${allPagesHTML.map((page: any, idx: number) => `
      <div class="funnel-page ${idx === 0 ? 'active' : ''}" id="page-${idx}">
        ${page.html}
      </div>
    `).join('')}
  </div>

  <script>
    let currentPage = 0;
    const totalPages = ${allPagesHTML.length};
    const pages = ${JSON.stringify(pagesData)};

    function updateNavigation() {
      // Update page visibility
      document.querySelectorAll('.funnel-page').forEach((page, idx) => {
        if (idx === currentPage) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });

      // Update step indicators
      document.querySelectorAll('.nav-step').forEach((step, idx) => {
        step.classList.remove('active', 'completed');
        if (idx === currentPage) {
          step.classList.add('active');
        } else if (idx < currentPage) {
          step.classList.add('completed');
        }
      });

      // Update button states
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      if (currentPage === 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
      }

      if (currentPage === totalPages - 1) {
        nextBtn.textContent = '✓ Finish';
    } else {
        nextBtn.textContent = 'Next →';
      }

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

      console.log('📍 Current page:', currentPage + 1, '/', totalPages, '-', pages[currentPage].name);
    }

    function nextPage() {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateNavigation();
      } else {
        alert('🎉 You\\'ve completed the funnel preview!\\n\\nThis funnel has ' + totalPages + ' pages.\\n\\nClick "Use Template" to create this funnel.');
      }
    }

    function prevPage() {
      if (currentPage > 0) {
        currentPage--;
        updateNavigation();
      }
    }

    function goToPage(pageIndex) {
      currentPage = pageIndex;
      updateNavigation();
    }

    // Make all buttons and links in the pages navigate to next page
    document.addEventListener('DOMContentLoaded', function() {
      // Make all buttons clickable
      document.querySelectorAll('button, a').forEach(function(element) {
        // Skip navigation buttons
        if (element.id === 'prevBtn' || element.id === 'nextBtn' || element.classList.contains('nav-step')) {
          return;
        }
        
        element.style.cursor = 'pointer';
        element.addEventListener('click', function(e) {
          e.preventDefault();
          nextPage();
        });
      });

      // Keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nextPage();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevPage();
        }
      });

      console.log('✅ Funnel preview loaded with', totalPages, 'pages');
      console.log('💡 Use arrow keys or click buttons to navigate');
    });

    // Initialize
    updateNavigation();
  </script>
</body>
</html>`

      console.log('✅ Multi-page preview HTML generated with', allPagesHTML.length, 'pages')
      previewWindow.document.write(fullHTML)
      previewWindow.document.close()
      console.log('=== END PREVIEW ===')
    } catch (error) {
      console.error('❌ Preview error:', error)
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="flex items-center justify-center min-h-screen bg-gray-50">
            <div class="text-center">
              <p class="text-2xl font-bold text-red-600 mb-2">Preview Error</p>
              <p class="text-gray-600">Failed to generate template preview</p>
              <p class="text-sm text-gray-500 mt-2">${error}</p>
            </div>
          </body>
        </html>
      `)
      previewWindow.document.close()
    }
  }

  const useTemplate = async (tpl: any) => {
    if (busyTemplateId) return // Prevent multiple simultaneous creations
    setBusyTemplateId(tpl.id)
    
    console.log('=== USE TEMPLATE (GrapesJS) ===')
    console.log('Template:', tpl.name, 'ID:', tpl.id, 'Category:', tpl.category)
    
    try {
      const funnel = await createFunnel({
        name: tpl.name,
        description: tpl.description,
      })
      console.log('✅ Created funnel:', funnel.id)

      // Get template category for theming
      const templateCategory = tpl.category?.toLowerCase() || 'default'
      console.log('Using template category:', templateCategory)

      // Create pages from template definitions with GrapesJS data
      for (let i = 0; i < tpl.pageDefinitions.length; i++) {
        const pageDef = tpl.pageDefinitions[i]
        console.log(`\n📄 Creating page ${i + 1}/${tpl.pageDefinitions.length}:`, pageDef.name, `(${pageDef.type})`)
        
        // Generate GrapesJS HTML for this page type
        const htmlContent = getGrapesJSTemplate(pageDef.type, templateCategory, pageDef.name)
        console.log('Generated HTML length:', htmlContent.length)
        
        // Create the page
        const page = await createPage(funnel.id, {
          name: pageDef.name,
          type: pageDef.type,
        })
        console.log('✅ Created page:', page.id)

        // Save GrapesJS content (HTML format that GrapesJS editor can load)
        const grapesJSContent = {
          html: htmlContent,
          css: '', // No custom CSS needed, using Tailwind
          components: '', // Will be generated by GrapesJS when editor loads
          timestamp: Date.now(),
        }
        
        await updatePage(page.id, {
          content: JSON.stringify(grapesJSContent)
        })
        console.log('✅ Saved GrapesJS content to page:', page.id)
      }

      console.log('🎉 All pages created successfully!')
      console.log('Redirecting to funnel:', funnel.id)
      console.log('=== END USE TEMPLATE ===')
      
      // Redirect to funnel builder
      router.push(`/funnels/${funnel.id}`)
    } catch (error) {
      console.error('❌ Error creating funnel from template:', error)
      alert('❌ Failed to create funnel. Please try again.')
      setBusyTemplateId(null) // Reset on error so user can retry
    }
    // Don't reset on success - redirect will unmount component
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <FiStar className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600 font-medium">TEMPLATES</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600 mt-1">Choose a template to start building your funnel</p>
        </div>
        <button onClick={() => router.push('/dashboard')} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Back to Dashboard</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TEMPLATE_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm border ${category === c ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600">No templates found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-36 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-4xl">📄</div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{tpl.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{tpl.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {tpl.popular && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full whitespace-nowrap">
                        <FiStar className="w-3 h-3" /> Popular
                      </span>
                    )}
                    {tpl.premium && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
                        <FiAward className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{tpl.pages} pages</span>
                  {tpl.avgConversion && (
                    <span className="text-green-600 font-medium">{tpl.avgConversion} avg. conversion</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => previewTemplate(tpl)}
                    disabled={busyTemplateId === tpl.id}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 py-2.5 rounded-lg hover:bg-primary-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiEye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    disabled={busyTemplateId !== null}
                    onClick={() => useTemplate(tpl)}
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {busyTemplateId === tpl.id ? 'Creating...' : 'Use Template'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}