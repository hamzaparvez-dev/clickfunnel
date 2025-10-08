'use client'

import React, { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiArrowLeft, FiChevronRight, FiEye } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/lib/context/AppContext'
import { getTemplatesByFunnelType, TemplateData } from '@/lib/data/templates'
import { getGrapesJSTemplate } from '@/lib/data/grapesjs-templates'

export function FunnelTemplatesGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createFunnel, createPage, updatePage } = useApp();
  const [installing, setInstalling] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  const funnelType = searchParams?.get('type') || 'squeeze';

  const templates = useMemo(() => getTemplatesByFunnelType(funnelType), [funnelType]);
  const currentFunnelTypeName = templates[0]?.funnelType.replace('-', ' ') || 'Templates';

  const handleSelectTemplate = async (template: TemplateData) => {
    setSelectedTemplate(template);
    setInstalling(true);

    try {
      const funnel = await createFunnel({
        name: template.name,
        description: template.description,
      });

      for (const pageDef of template.pageDefinitions) {
        const page = await createPage(funnel.id, {
          name: pageDef.name,
          type: pageDef.type,
        });
        
        const contentHtml = getGrapesJSTemplate(pageDef.type, template.category.toLowerCase().split(' ')[0], page.name, template.variation);
        
        const grapesJSContent = {
          html: contentHtml,
          css: '', // Using Tailwind via CDN
        };
        
        await updatePage(page.id, { content: JSON.stringify(grapesJSContent) });
      }

      setTimeout(() => {
        router.push(`/funnels/${funnel.id}`);
      }, 2000);

    } catch (error) {
      console.error('Error installing funnel:', error);
      setInstalling(false);
      alert('Failed to install funnel. Please try again.');
    }
  };

  const handlePreviewTemplate = (template: TemplateData) => {
    console.log('=== PREVIEW COMPLETE FUNNEL ===')
    console.log('Template:', template.name)
    
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!previewWindow) {
      alert('❌ Please allow popups to preview templates');
      return;
    }

    try {
      const templateCategory = template.category.toLowerCase().split(' ')[0];
      
      // Generate HTML for ALL pages
      const allPagesHTML = template.pageDefinitions.map((pageDef: any, index: number) => {
        const pageHTML = getGrapesJSTemplate(pageDef.type, templateCategory, pageDef.name, template.variation);
        return {
          name: pageDef.name,
          type: pageDef.type,
          html: pageHTML,
          index: index
        };
      });
      
      const pagesData = allPagesHTML.map((page: any, idx: number) => ({
        name: page.name,
        type: page.type,
        index: idx
      }));
      
      const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Preview - ${template.name} (Complete Funnel)</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
    .animate-bounce { animation: bounce 2s infinite; }
    .animate-pulse { animation: pulse 2s infinite; }
    .funnel-page { display: none; }
    .funnel-page.active { display: block; }
    .nav-step { transition: all 0.3s; }
    .nav-step.active { background-color: #4F46E5; color: white; }
    .nav-step.completed { background-color: #10B981; color: white; }
  </style>
</head>
<body>
  <!-- Funnel Navigation Bar -->
  <div style="position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 16px 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h1 style="color: white; font-size: 20px; font-weight: bold; margin: 0;">${template.name}</h1>
          <p style="color: #94a3b8; font-size: 14px; margin: 4px 0 0 0;">Complete Funnel Preview - ${template.pageDefinitions.length} Pages</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <button onclick="prevPage()" id="prevBtn" style="background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
            ← Previous
          </button>
          <button onclick="nextPage()" id="nextBtn" style="background: #4F46E5; color: white; border: none; padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
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
      document.querySelectorAll('.funnel-page').forEach((page, idx) => {
        page.classList.toggle('active', idx === currentPage);
      });

      document.querySelectorAll('.nav-step').forEach((step, idx) => {
        step.classList.remove('active', 'completed');
        if (idx === currentPage) step.classList.add('active');
        else if (idx < currentPage) step.classList.add('completed');
      });

      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
      prevBtn.style.cursor = currentPage === 0 ? 'not-allowed' : 'pointer';
      nextBtn.textContent = currentPage === totalPages - 1 ? '✓ Finish' : 'Next →';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function nextPage() {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateNavigation();
      } else {
        alert('🎉 You\\'ve completed the funnel preview!\\n\\nClick "Select Template" to create this funnel.');
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

    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('button, a').forEach(function(element) {
        if (element.id === 'prevBtn' || element.id === 'nextBtn' || element.classList.contains('nav-step')) return;
        element.style.cursor = 'pointer';
        element.addEventListener('click', function(e) {
          e.preventDefault();
          nextPage();
        });
      });

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
    });

    updateNavigation();
  </script>
</body>
</html>`;

      previewWindow.document.write(fullHTML);
      previewWindow.document.close();
    } catch (error) {
      console.error('❌ Preview error:', error);
      previewWindow.document.write('<html><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;"><div style="text-center;"><h1 style="color:red;">Preview Error</h1><p>Failed to generate preview</p></div></body></html>');
      previewWindow.document.close();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-4">
            <div className="flex items-center space-x-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-blue-600 font-medium">FUNNELS</span>
                    <FiChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 uppercase">{currentFunnelTypeName}</span>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-gray-900 capitalize">Browse {currentFunnelTypeName} Templates</h1>
                <button onClick={() => router.push('/funnels/create')} className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    <span>Back to Funnel Types</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                    >
                        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-500 hover:shadow-2xl transition-all duration-300">
                            <div className="h-56 bg-gray-100 p-4 relative">
                                <p className="text-center mt-16 text-gray-500">Template Thumbnail</p>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handlePreviewTemplate(template)}
                                        className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg font-semibold text-gray-900 flex items-center gap-2"
                                    >
                                        <FiEye /> Preview
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                                <p className="text-sm text-gray-600 mb-4 h-10">{template.description}</p>
                                <button
                                    onClick={() => handleSelectTemplate(template)}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                                >
                                    Select Template
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Installing Modal */}
      <AnimatePresence>
        {installing && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-12 max-w-md w-full mx-4 text-center"
            >
              <div className="mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Installing {selectedTemplate.name}...</h2>
                <p className="text-gray-600">Your new funnel is being created. You will be redirected shortly.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}