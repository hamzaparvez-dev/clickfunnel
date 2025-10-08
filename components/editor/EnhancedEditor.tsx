'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { 
  ArrowLeft, Save, Eye, Settings, Sparkles, BarChart3, 
  Smartphone, Monitor, Tablet, Share2, Download, Upload,
  Plus, Trash2, Copy, Grid, Layers, Move, Split
} from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { motion, AnimatePresence } from 'framer-motion'

// Import all editor panels
import { FunnelFlowPanel } from './panels/FunnelFlowPanel'
import { ComponentToolbar } from './panels/ComponentToolbar'
import { TemplateGallery } from './panels/TemplateGallery'
import { AnalyticsPanel } from './panels/AnalyticsPanel'
import { ABTestingPanel } from './panels/ABTestingPanel'
import { AIAssistant } from './panels/AIAssistant'
import { DevicePreview } from './panels/DevicePreview'
import { FormBuilder } from './panels/FormBuilder'
import { PublishPanel } from './panels/PublishPanel'
import { LayoutBuilder } from './panels/LayoutBuilder'

interface EnhancedEditorProps {
  funnelId: string
  pageId: string
}

type ViewMode = 'desktop' | 'tablet' | 'mobile'
type PanelMode = 'builder' | 'analytics' | 'abtesting' | 'templates' | 'publish'

export function EnhancedEditor({ funnelId, pageId }: EnhancedEditorProps) {
  const router = useRouter()
  const { pages, funnels, updatePage } = useApp()
  
  const funnel = funnels.find(f => f.id === funnelId)
  const page = pages.find(p => p.id === pageId)
  const funnelPages = pages.filter(p => p.funnelId === funnelId)

  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [panelMode, setPanelMode] = useState<PanelMode>('builder')
  const [showFunnelFlow, setShowFunnelFlow] = useState(true)
  const [showAI, setShowAI] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [pageData, setPageData] = useState<any>({ sections: [], settings: {} })

  useEffect(() => {
    if (page?.content) {
      try {
        const parsed = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
        setPageData(parsed)
      } catch (e) {
        console.error('Error parsing page content:', e)
      }
    }
  }, [page])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updatePage(pageId, {
        content: JSON.stringify(pageData),
      })
      alert('✅ Page saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('❌ Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(pageData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `${page?.name || 'page'}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          setPageData(imported)
          alert('✅ Page imported successfully!')
        } catch (error) {
          alert('❌ Invalid file format')
        }
      }
      reader.readAsText(file)
    }
  }

  if (!page || !funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Page Not Found</h1>
          <button
            onClick={() => router.push(`/funnels/${funnelId}`)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Back to Funnel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between px-6 shadow-lg z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/funnels/${funnelId}`)}
            className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Funnel</span>
          </button>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <div className="font-bold text-lg">{page.name}</div>
            <div className="text-xs text-indigo-200">{funnel.name} • {page.type} page</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded transition ${viewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Mobile View"
            >
              <Smartphone size={18} />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded transition ${viewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Tablet View"
            >
              <Tablet size={18} />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded transition ${viewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Desktop View"
            >
              <Monitor size={18} />
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg transition shadow-lg"
            title="AI Assistant"
          >
            <Sparkles size={18} />
            <span className="font-medium">AI</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            title="Export Page"
          >
            <Download size={18} />
          </button>

          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition cursor-pointer">
            <Upload size={18} />
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition font-bold shadow-lg"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={() => setPanelMode('publish')}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition font-bold shadow-lg"
          >
            <Share2 size={18} />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPanelMode('builder')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              panelMode === 'builder' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers size={18} />
              <span>Builder</span>
            </div>
          </button>
          <button
            onClick={() => setPanelMode('templates')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              panelMode === 'templates' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Grid size={18} />
              <span>Templates</span>
            </div>
          </button>
          <button
            onClick={() => setPanelMode('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              panelMode === 'analytics' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </div>
          </button>
          <button
            onClick={() => setPanelMode('abtesting')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              panelMode === 'abtesting' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Split size={18} />
              <span>A/B Testing</span>
            </div>
          </button>
        </div>

        <button
          onClick={() => setShowFunnelFlow(!showFunnelFlow)}
          className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          {showFunnelFlow ? 'Hide' : 'Show'} Funnel Flow
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Funnel Flow Sidebar */}
        <AnimatePresence>
          {showFunnelFlow && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-white border-r border-gray-200 overflow-y-auto"
            >
              <FunnelFlowPanel
                funnelId={funnelId}
                currentPageId={pageId}
                pages={funnelPages}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {panelMode === 'builder' && (
            <LayoutBuilder
              pageData={pageData}
              setPageData={setPageData}
              viewMode={viewMode}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
            />
          )}
          {panelMode === 'templates' && (
            <TemplateGallery
              onSelectTemplate={(template) => {
                setPageData(template)
                setPanelMode('builder')
              }}
            />
          )}
          {panelMode === 'analytics' && (
            <AnalyticsPanel pageId={pageId} />
          )}
          {panelMode === 'abtesting' && (
            <ABTestingPanel pageId={pageId} />
          )}
          {panelMode === 'publish' && (
            <PublishPanel
              pageId={pageId}
              funnelId={funnelId}
              onClose={() => setPanelMode('builder')}
            />
          )}
        </div>

        {/* Properties Panel */}
        {panelMode === 'builder' && selectedComponent && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            className="bg-white border-l border-gray-200 overflow-y-auto"
          >
            <ComponentToolbar
              component={selectedComponent}
              pageData={pageData}
              setPageData={setPageData}
              onClose={() => setSelectedComponent(null)}
            />
          </motion.div>
        )}
      </div>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {showAI && (
          <AIAssistant
            pageData={pageData}
            setPageData={setPageData}
            onClose={() => setShowAI(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}


