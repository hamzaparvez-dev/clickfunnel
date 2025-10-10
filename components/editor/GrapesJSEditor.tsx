'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import grapesjs, { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsPluginForms from 'grapesjs-plugin-forms'
import gjsCountdown from 'grapesjs-component-countdown'
import gjsPluginExport from 'grapesjs-plugin-export'
import gjsNavbar from 'grapesjs-navbar'
import gjsTabs from 'grapesjs-tabs'
import { 
  ArrowLeft, Save, Eye, Monitor, Tablet, Smartphone,
  Undo, Redo, Download, Settings2
} from 'lucide-react'

interface GrapesJSEditorProps {
  funnelId: string
  pageId: string
}

const TEMPLATE_THEMES = {
  lead: { primary: '#10B981', secondary: '#059669', gradient: 'from-green-600 to-emerald-600', accent: '#34D399' },
  sales: { primary: '#8B5CF6', secondary: '#7C3AED', gradient: 'from-purple-600 to-violet-600', accent: '#A78BFA' },
  presentation: { primary: '#F59E0B', secondary: '#D97706', gradient: 'from-orange-600 to-amber-600', accent: '#FBBF24' },
  phone: { primary: '#3B82F6', secondary: '#2563EB', gradient: 'from-blue-600 to-indigo-600', accent: '#60A5FA' },
  unboxing: { primary: '#EC4899', secondary: '#DB2777', gradient: 'from-pink-600 to-rose-600', accent: '#F472B6' },
  default: { primary: '#6366F1', secondary: '#4F46E5', gradient: 'from-indigo-600 to-purple-600', accent: '#818CF8' }
};

export function GrapesJSEditor({ funnelId, pageId }: GrapesJSEditorProps) {
  const router = useRouter()
  const { pages, funnels, updatePage } = useApp()
  const editorRef = useRef<any>(null)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [loading, setLoading] = useState(true) // Start with true to fetch page data
  const [initializing, setInitializing] = useState(true)
  const [draftRestored, setDraftRestored] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const initializingRef = useRef(false)
  const [pageData, setPageData] = useState<any>(null)
  
  const funnel = funnels.find((f: any) => f.id === funnelId)
  const page = pageData || pages.find((p: any) => p.id === pageId)
  
  // LocalStorage key for drafts
  const DRAFT_KEY = `editor_draft_${pageId}`

  // Fetch page data with content
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/pages/${pageId}`)
        if (response.ok) {
          const { page: fetchedPage } = await response.json()
          setPageData(fetchedPage)
          console.log('✅ Fetched page data with revisions:', fetchedPage)
        }
      } catch (error) {
        console.error('❌ Error fetching page data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPageData()
  }, [pageId])

  useEffect(() => {
    // Prevent multiple initializations
    if (!editorRef.current || editor || initializingRef.current || loading) return;
    
    initializingRef.current = true;
    let grapesEditor: Editor | null = null;
    
    try {
        console.log('🎨 Initializing GrapesJS Editor for page:', pageId);
        console.time('Editor Initialization');

        // Initialize editor with localStorage StorageManager for auto-saving
        grapesEditor = grapesjs.init({
            container: editorRef.current,
            height: '100%',
            width: '100%',
            fromElement: false,
            avoidInlineStyle: true, // Performance: avoid inline styles
            storageManager: {
                type: 'local',
                autosave: true,
                autoload: false, // Disable auto-load, we'll load manually for better control
                stepsBeforeSave: 1,
                options: {
                    local: {
                        key: DRAFT_KEY,
                    }
                }
            },
            canvas: {
                styles: ['https://cdn.tailwindcss.com/3.4.1'],
                scripts: [],
            },
            deviceManager: {
                devices: [
                    { name: 'Desktop', width: '' },
                    { name: 'Tablet', width: '768px', widthMedia: '992px' },
                    { name: 'Mobile', width: '375px', widthMedia: '480px' },
                ],
            },
            panels: {
                defaults: [
                    {
                        id: 'basic-actions',
                        el: '.panel__basic-actions',
                        buttons: [{
                            id: 'visibility',
                            active: true,
                            className: 'btn-toggle-borders',
                            label: '👁️',
                            command: 'sw-visibility',
                        }],
                    },
                    {
                        id: 'panel-devices',
                        el: '.panel__devices',
                        buttons: [
                            { id: 'device-desktop', label: '💻', command: 'set-device-desktop', active: true, togglable: false },
                            { id: 'device-tablet', label: '📱', command: 'set-device-tablet', togglable: false },
                            { id: 'device-mobile', label: '📱', command: 'set-device-mobile', togglable: false },
                        ],
                    },
                ],
            },
            plugins: [
                gjsPresetWebpage, gjsBlocksBasic, gjsPluginForms, gjsCountdown, 
                gjsPluginExport, gjsNavbar, gjsTabs
            ],
            pluginsOpts: {
                [gjsPresetWebpage as any]: {
                    blocksBasicOpts: {
                        blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video'],
                        flexGrid: true,
                    },
                    blocks: ['link-block', 'quote', 'text-basic'],
                },
            },
            layerManager: { appendTo: '.layers-container' },
            styleManager: { appendTo: '.styles-container' },
            traitManager: { appendTo: '.traits-container' },
            blockManager: { appendTo: '.blocks-container' },
        });

        // Add device commands
        grapesEditor.Commands.add('set-device-desktop', { run: (ed) => ed.setDevice('Desktop') });
        grapesEditor.Commands.add('set-device-tablet', { run: (ed) => ed.setDevice('Tablet') });
        grapesEditor.Commands.add('set-device-mobile', { run: (ed) => ed.setDevice('Mobile') });

        // Add custom components and blocks
        addCustomComponents(grapesEditor, page?.type || 'landing');
        addCustomBlocks(grapesEditor, page?.type || 'landing');
        
        // Track changes to show unsaved indicator
        grapesEditor.on('storage:start:store', () => {
            setHasUnsavedChanges(true);
            console.log('💾 Auto-saving draft to localStorage...');
        });
        
        grapesEditor.on('storage:end:store', () => {
            console.log('✅ Draft auto-saved to localStorage');
        });

        console.timeEnd('Editor Initialization');
        console.log('✅ Editor UI initialized, loading content...');

        // Set editor immediately so UI is available
        setEditor(grapesEditor);
        setInitializing(false);

        // Load content asynchronously - check for draft first
        setTimeout(() => {
            if (grapesEditor) {
                console.time('Content Loading');
                const hasDraft = loadEditorContent(grapesEditor, page);
                if (hasDraft) {
                    setDraftRestored(true);
                    setHasUnsavedChanges(true);
                    // Auto-hide notification after 5 seconds
                    setTimeout(() => setDraftRestored(false), 5000);
                }
                console.timeEnd('Content Loading');
                console.log('✅ Content loaded successfully!');
            }
        }, 100);

    } catch(err) {
        console.error("❌ Error initializing GrapesJS:", err);
        setInitializing(false);
        initializingRef.current = false;
    }

    return () => {
        if (grapesEditor) {
            console.log('🧹 Cleaning up editor...');
            grapesEditor.destroy();
        }
        setEditor(null);
        initializingRef.current = false;
    };
    // Only re-initialize if pageId or loading status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, loading]); // Stable dependencies to prevent unnecessary re-renders
  
  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Check if there's a draft in localStorage
      const hasDraft = localStorage.getItem(DRAFT_KEY);
      
      if (hasDraft && hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [DRAFT_KEY, hasUnsavedChanges]);

  const loadEditorContent = (editor: Editor | null, page: any): boolean => {
    // Defensive guard: editor can be undefined if init was canceled/unmounted
    if (!editor || typeof (editor as any).setComponents !== 'function') {
      console.warn('⚠️ Editor instance not ready when loading content');
      return false;
    }
    if (!page) {
      console.warn('⚠️ No page data provided');
      return false;
    }

    try {
      console.log('📄 Loading content for page:', page.name, '| Type:', page.type);
      
      // **PRIORITY 1**: Check for local draft first (uses GrapesJS native format)
      const draftData = localStorage.getItem(DRAFT_KEY);
      if (draftData) {
        try {
          const draft = JSON.parse(draftData);
          console.log('🔄 Found local draft! Restoring unpublished changes...');
          
          // Load using GrapesJS native load() method for optimal performance
          if (draft.components || draft['gjs-components']) {
            editor.load(() => draft);
            setDraftRestored(true);
            setHasUnsavedChanges(true);
            console.log('✅ Draft loaded using native GrapesJS format');
            return true;
          }
        } catch (err) {
          console.warn('⚠️ Error parsing draft, will load from database:', err);
          localStorage.removeItem(DRAFT_KEY); // Clear corrupted draft
        }
      }
      
      // **PRIORITY 2**: Load from database (use native JSON format for best performance)
      if (page.content) {
        try {
          const content = typeof page.content === 'string' 
            ? JSON.parse(page.content) 
            : page.content;
          
          // OPTIMIZED: Try loading as GrapesJS native components JSON first (fastest)
          if (content && content.components) {
            console.log('✅ Loading components using native JSON format (optimized)');
            try {
              const componentsData = typeof content.components === 'string' 
                ? JSON.parse(content.components) 
                : content.components;
              
              editor.setComponents(componentsData);
              if (content.css) {
                editor.setStyle(content.css);
              }
              console.log('🎉 Successfully loaded page content (native JSON)');
              return false;
            } catch (jsonErr) {
              console.warn('⚠️ Failed to parse native JSON, trying HTML fallback');
            }
          }
          
          // FALLBACK: Load from HTML if JSON not available
          if (content && content.html) {
            console.log('✅ Loading published content from HTML');
            editor.setComponents(content.html);
            if (content.css) {
              editor.setStyle(content.css);
            }
            console.log('🎉 Successfully loaded published page content (HTML)');
            return false;
          }
        } catch (parseError) {
          console.warn('⚠️ Could not parse database content, loading default:', parseError);
        }
      }
      
      // **PRIORITY 3**: Fallback to default template
      console.log('🆕 No content found. Loading default template for:', page.type);
      const defaultContent = getDefaultTemplate(page.type || 'landing', page.name || 'Untitled Page');
      editor.setComponents(defaultContent);
      console.log('✅ Default template loaded');
      return false;

    } catch (error) {
      console.error('❌ Error loading content:', error);
      // Ultimate fallback
      try {
        const fallback = getDefaultTemplate(page.type || 'landing', page.name || 'Untitled Page');
        editor.setComponents(fallback);
        console.log('🔄 Fallback template loaded');
      } catch (fallbackError) {
        console.error('❌ Fatal: Could not load any content:', fallbackError);
      }
      return false;
    }
  };
  
  // All other functions (getDefaultTemplate, handleSave, etc.) remain the same...

  // ... (rest of the GrapesJSEditor component code)
  const getDefaultTemplate = (pageType: string, pageName: string) => {
    const theme = TEMPLATE_THEMES[pageType as keyof typeof TEMPLATE_THEMES] || TEMPLATE_THEMES.default
    
    const templates: Record<string, string> = {
      landing: `
        <section class="bg-gradient-to-br ${theme.gradient} text-white py-24 px-6 min-h-screen flex items-center">
          <div class="max-w-5xl mx-auto text-center">
            <h1 class="text-7xl font-bold mb-6 leading-tight">${pageName}</h1>
            <p class="text-2xl mb-4 opacity-90">Transform your business with our proven system</p>
            <p class="text-xl mb-10 opacity-80">Join thousands of successful entrepreneurs who are already winning</p>
            <a href="#signup" class="bg-white hover:bg-gray-100 text-gray-900 px-12 py-5 rounded-xl font-bold text-xl inline-block shadow-2xl transition-all transform hover:scale-105" style="color: ${theme.primary}">Get Started Free Today →</a>
                  </div>
                </section>
      `,
      sales: `
        <section class="bg-gradient-to-br ${theme.gradient} text-white py-16 px-6">
          <div class="max-w-6xl mx-auto text-center">
            <div class="bg-yellow-400 text-gray-900 inline-block px-6 py-2 rounded-full font-bold text-sm mb-6">⚡ LIMITED TIME OFFER</div>
            <h1 class="text-7xl font-bold mb-6">${pageName}</h1>
            <p class="text-3xl mb-8 font-semibold">Save 50% Today Only!</p>
          </div>
        </section>
      `,
      checkout: `
        <section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-3xl shadow-2xl p-12">
              <div class="text-center mb-12">
                <h1 class="text-5xl font-bold mb-4 text-gray-900">${pageName}</h1>
                <p class="text-xl text-gray-600">Complete your order - Secure checkout</p>
              </div>
            </div>
          </div>
        </section>
      `,
      thankyou: `
        <section class="min-h-screen bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center py-20 px-6">
          <div class="max-w-3xl mx-auto text-center text-white">
            <div class="text-8xl mb-8 animate-bounce">🎉</div>
            <h1 class="text-7xl font-bold mb-6">${pageName}!</h1>
          </div>
        </section>
      `,
      upsell: `
        <section class="min-h-screen bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center py-20 px-6">
          <div class="max-w-4xl mx-auto text-center text-white">
            <div class="bg-yellow-400 text-gray-900 inline-block px-8 py-3 rounded-full font-bold text-lg mb-8 animate-pulse">⏰ WAIT! SPECIAL ONE-TIME OFFER</div>
            <h1 class="text-7xl font-bold mb-6">${pageName}</h1>
          </div>
        </section>
      `,
    }

    return templates[pageType] || templates.landing
  }

  const handlePublish = async () => {
    if (!editor) return alert('⚠️ Editor not ready yet.');
    
    setPublishing(true);
    try {
      console.log('📤 Publishing page to database...');
      
      const content = {
        html: editor.getHtml(),
        css: editor.getCss(),
        components: JSON.stringify(editor.getComponents()),
        timestamp: Date.now(),
      };
      
      // Save to database
      await updatePage(pageId, { content: JSON.stringify(content) });
      
      // Clear the draft from localStorage after successful publish
      localStorage.removeItem(DRAFT_KEY);
      setHasUnsavedChanges(false);
      
      console.log('✅ Page published successfully!');
      alert('✅ Page published successfully!');
    } catch (error) {
      console.error('❌ Publish error:', error);
      alert('❌ Failed to publish page. Please try again.');
    } finally {
      setPublishing(false);
    }
  }

  const handleDiscardDraft = () => {
    if (!confirm('⚠️ Are you sure you want to discard all unpublished changes? This action cannot be undone.')) {
      return;
    }
    
    // Clear draft from localStorage
    localStorage.removeItem(DRAFT_KEY);
    setHasUnsavedChanges(false);
    setDraftRestored(false);
    
    // Reload from database
    if (editor && page) {
      loadEditorContent(editor, page);
    }
    
    alert('✅ Draft discarded. Loaded last published version.');
  }

  const handlePreview = () => {
    if (!editor) return alert('⚠️ Editor not ready yet.');
    const html = editor.getHtml();
    const css = editor.getCss();
    if (!html.trim()) return alert('⚠️ No content to preview.');
    
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!previewWindow) return alert('❌ Please allow popups to preview.');

    previewWindow.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preview</title><script src="https://cdn.tailwindcss.com/3.4.1"></script><style>${css}</style></head><body>${html}</body></html>`);
    previewWindow.document.close();
  }

  const handleExport = () => {
      if (!editor) return alert('⚠️ Editor not ready yet.');
      // This functionality is part of the grapesjs-plugin-export
      editor.runCommand('gjs-export-zip');
  }

  const handleUndo = () => editor?.UndoManager.undo();
  const handleRedo = () => editor?.UndoManager.redo();
  
  if (!page || !funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page or Funnel Not Found</h1>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/funnels')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Back to Funnels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Draft Restored Notification */}
      {draftRestored && (
        <div className="fixed top-20 right-6 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in">
          <span className="text-2xl">📝</span>
          <div>
            <div className="font-bold">Draft Restored!</div>
            <div className="text-sm opacity-90">Your unpublished changes have been loaded</div>
          </div>
        </div>
      )}
      
      {/* Top Toolbar */}
      <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between px-6 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push(`/funnels/${funnelId}`)} className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition">
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <div className="font-bold text-lg">{page.name}</div>
            <div className="text-xs text-indigo-200">
              {funnel.name} • GrapesJS Editor
              {hasUnsavedChanges && (
                <span className="ml-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs font-semibold">
                  Unpublished
                </span>
              )}
            </div>
          </div>
          {initializing && (
            <div className="flex items-center gap-2 ml-4 bg-white/10 px-3 py-1 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-xs">Loading content...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleUndo} disabled={!editor} className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-30" title="Undo"><Undo size={20} /></button>
          <button onClick={handleRedo} disabled={!editor} className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-30" title="Redo"><Redo size={20} /></button>
          <div className="h-6 w-px bg-white/20" />
          <div className="panel__devices flex items-center gap-1 bg-white/10 rounded-lg p-1"></div>
          <div className="h-6 w-px bg-white/20" />
          <button onClick={handlePreview} disabled={!editor} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-50">
            <Eye size={18} /><span>Preview</span>
          </button>
          <button onClick={handleExport} disabled={!editor} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-50">
            <Download size={18} /><span>Export</span>
          </button>
          {hasUnsavedChanges && (
            <button onClick={handleDiscardDraft} disabled={!editor} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition disabled:opacity-50 border border-red-400/30">
              <span className="text-sm">Discard Draft</span>
            </button>
          )}
          <button onClick={handlePublish} disabled={publishing || !editor} className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition font-bold shadow-lg">
            <Save size={18} /><span>{publishing ? 'Publishing...' : 'Publish'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-white"><h3 className="font-bold text-gray-900">Components</h3></div>
            <div className="flex-1 overflow-y-auto p-2"><div className="blocks-container"></div></div>
          </div>
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="panel__basic-actions flex items-center gap-2 p-2 border-b border-gray-200 bg-white"></div>
            <div ref={editorRef} className="flex-1 gjs-editor"></div>
          </div>
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="border-b border-gray-200">
                <div className="p-4 bg-white border-b"><h3 className="font-bold">Layers</h3></div>
                <div className="layers-container p-2 bg-white"></div>
              </div>
              <div className="border-b border-gray-200">
                <div className="p-4 bg-white border-b"><h3 className="font-bold">Settings</h3></div>
                <div className="traits-container p-2 bg-white"></div>
              </div>
              <div>
                <div className="p-4 bg-white border-b"><h3 className="font-bold">Styles</h3></div>
                <div className="styles-container p-2 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

function addCustomComponents(editor: Editor, pageType: string) {
  const theme = TEMPLATE_THEMES[pageType as keyof typeof TEMPLATE_THEMES] || TEMPLATE_THEMES.default;
  // Define custom components
}
function addCustomBlocks(editor: Editor, pageType: string) {
  const blockManager = editor.BlockManager;
  // Define custom blocks
}