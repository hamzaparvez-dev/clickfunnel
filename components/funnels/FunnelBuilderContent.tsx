'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useApp } from '@/lib/context/AppContext'
import { FiPlus, FiEdit3, FiTrash2, FiEye, FiSettings, FiArrowDown, FiFileText, FiShoppingCart, FiGift, FiArrowLeft } from 'react-icons/fi'

const pageTypes = [
  { id: 'landing', name: 'Landing Page', icon: FiFileText, description: 'Capture leads and drive traffic' },
  { id: 'sales', name: 'Sales Page', icon: FiShoppingCart, description: 'Convert visitors into customers' },
  { id: 'checkout', name: 'Checkout Page', icon: FiShoppingCart, description: 'Process payments and orders' },
  { id: 'upsell', name: 'Upsell Page', icon: FiGift, description: 'Increase order value' },
  { id: 'thankyou', name: 'Thank You Page', icon: FiFileText, description: 'Confirm purchase and next steps' }
]

export function FunnelBuilderContent({ funnelId }: { funnelId: string }) {
  const router = useRouter()
  const { funnels, pages, createPage, deletePage, fetchPages } = useApp()
  const [showAddPageModal, setShowAddPageModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const funnel = funnels.find((f: any) => f.id === funnelId)
  const funnelPages = pages.filter((p: any) => p.funnelId === funnelId)

  useEffect(() => {
    setMounted(true)
    const loadData = async () => {
      setLoading(true)
      await fetchPages(funnelId)
      setLoading(false)
    }
    loadData()
  }, [funnelId])

  if (loading || !mounted) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (!funnel) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Funnel not found</h2>
          <p className="text-gray-600 mt-2">The funnel you're looking for doesn't exist.</p>
          <Link
            href="/funnels"
            className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Funnels
          </Link>
        </div>
      </div>
    )
  }

  const handleCreatePage = async (pageType: any) => {
    const pageName = `${pageType.name} ${funnelPages.length + 1}`
    try {
      await createPage(funnelId, { name: pageName, type: pageType.id })
      setShowAddPageModal(false)
    } catch (error) {
      console.error('Error creating page:', error)
    }
  }

  const handleDeletePage = async (pageId: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await deletePage(pageId)
      } catch (error) {
        console.error('Error deleting page:', error)
      }
    }
  }

  const handlePreviewPage = (pageId: string) => {
    const page = pages.find((p: any) => p.id === pageId)
    if (!page) return

    const previewWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!previewWindow) return

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Preview - ${page.name}</title>
          <style>body { margin: 0; padding: 0; }</style>
        </head>
        <body class="bg-white">
    `

    try {
      const pageData = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
      if (pageData && pageData.content) {
        pageData.content.forEach((component: any) => {
          html += renderComponentToHTML(component)
        })
      }
    } catch (e) {
      html += '<div class="flex items-center justify-center min-h-screen"><p class="text-xl text-gray-600">No content to preview yet. Click Edit to add content.</p></div>'
    }

    html += '</body></html>'
    previewWindow.document.write(html)
    previewWindow.document.close()
  }

  const renderComponentToHTML = (component: any): string => {
    const { type, props } = component
    
    switch (type) {
      case 'HeroSection':
        return `
          <section class="${props.backgroundColor} text-white py-24 px-6">
            <div class="max-w-5xl mx-auto text-center">
              <h1 class="text-6xl font-bold mb-6">${props.title}</h1>
              <p class="text-2xl mb-10">${props.subtitle}</p>
              <a href="${props.buttonLink}" class="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 inline-block">${props.buttonText}</a>
            </div>
          </section>
        `
      case 'FeatureGrid':
        const featuresHTML = props.features.map((f: any) => `
          <div class="bg-white p-8 rounded-2xl shadow-lg">
            <div class="text-4xl mb-4">${f.icon}</div>
            <h3 class="text-2xl font-bold mb-3">${f.title}</h3>
            <p class="text-gray-600">${f.description}</p>
          </div>
        `).join('')
        return `
          <section class="py-20 px-6 bg-gray-50">
            <div class="max-w-7xl mx-auto">
              ${props.title ? `<div class="text-center mb-16"><h2 class="text-5xl font-bold mb-4">${props.title}</h2><p class="text-xl text-gray-600">${props.subtitle}</p></div>` : ''}
              <div class="grid md:grid-cols-3 gap-8">${featuresHTML}</div>
            </div>
          </section>
        `
      case 'PricingSection':
        const plansHTML = props.plans.map((plan: any) => `
          <div class="${plan.popular === 'yes' ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105' : 'bg-gray-800 text-white'} rounded-2xl p-8">
            ${plan.popular === 'yes' ? '<div class="text-center mb-4"><span class="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span></div>' : ''}
            <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
            <div class="text-5xl font-bold mb-6">${plan.price}<span class="text-xl">/mo</span></div>
            <ul class="space-y-3 mb-8">
              ${plan.features.split('\n').map((f: string) => `<li class="flex items-center gap-2"><span class="text-green-400">✓</span> ${f}</li>`).join('')}
            </ul>
            <button class="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100">Get Started</button>
          </div>
        `).join('')
        return `
          <section class="py-20 px-6 bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto">
              <div class="text-center mb-16"><h2 class="text-5xl font-bold mb-4">${props.title}</h2><p class="text-xl text-gray-400">${props.subtitle}</p></div>
              <div class="grid md:grid-cols-3 gap-8">${plansHTML}</div>
            </div>
          </section>
        `
      case 'FormSection':
        return `
          <section class="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div class="max-w-xl mx-auto">
              <div class="bg-white rounded-3xl shadow-2xl p-10">
                <div class="text-center mb-8">
                  <h2 class="text-3xl font-bold mb-3">${props.title}</h2>
                  <p class="text-gray-600">${props.subtitle}</p>
                </div>
                <form class="space-y-4">
                  <input type="text" placeholder="Your Name" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl" />
                  <input type="email" placeholder="Your Email" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl" />
                  <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg">${props.buttonText}</button>
                </form>
              </div>
            </div>
          </section>
        `
      case 'HeadingBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-4"><h1 class="${props.size} font-bold mb-4" style="text-align: ${props.align}">${props.children}</h1></div>`
      case 'TextBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-2"><p class="text-lg text-gray-700 mb-4" style="text-align: ${props.align}">${props.text}</p></div>`
      case 'ButtonBlock':
        const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
        const variantClasses = { primary: 'bg-indigo-600 text-white', secondary: 'bg-gray-600 text-white', outline: 'border-2 border-indigo-600 text-indigo-600' }
        return `<div class="max-w-7xl mx-auto px-6 text-center py-4"><a href="${props.href}" class="font-semibold rounded-lg inline-block ${sizeClasses[props.size as keyof typeof sizeClasses]} ${variantClasses[props.variant as keyof typeof variantClasses]}">${props.text}</a></div>`
      case 'ImageBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-4"><div class="${props.width} mx-auto mb-8"><img src="${props.url}" alt="${props.alt}" class="w-full h-auto rounded-xl shadow-lg" /></div></div>`
      default:
        return ''
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    // Handle page reordering logic here
    console.log('Reorder pages:', result)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/funnels"
            className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{funnel.name}</h1>
            <p className="text-gray-600 mt-1">{funnel.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors">
            <FiSettings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAddPageModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Page</span>
          </button>
        </div>
      </div>

      {/* Funnel Flow */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Funnel Flow</h2>
        
        {funnelPages.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="funnel-pages" type="page">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {funnelPages.map((page: any, index: number) => {
                    const PageIcon = pageTypes.find(t => t.id === page.type)?.icon || FiFileText
                    
                    return (
                      <React.Fragment key={page.id}>
                        <Draggable draggableId={page.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 transition-all ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <PageIcon className="w-5 h-5 text-primary-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900">{page.name}</h3>
                                    <p className="text-sm text-gray-600">
                                      {pageTypes.find(t => t.id === page.type)?.name || 'Custom Page'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Link
                                    href={`/editor/${funnelId}/${page.id}`}
                                    className="p-2 text-primary-600 hover:text-primary-700 transition-colors"
                                    title="Edit Page"
                                  >
                                    <FiEdit3 className="w-4 h-4" />
                                  </Link>
                                  <button 
                                    onClick={() => handlePreviewPage(page.id)}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Preview Page"
                                  >
                                    <FiEye className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeletePage(page.id)}
                                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                    title="Delete Page"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                        {index < funnelPages.length - 1 && (
                          <div className="flex justify-center">
                            <FiArrowDown className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </React.Fragment>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="text-center py-12">
            <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pages yet</h3>
            <p className="text-gray-600 mb-6">Add your first page to start building your funnel</p>
            <button
              onClick={() => setShowAddPageModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Your First Page</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Page Modal */}
      <AnimatePresence>
        {showAddPageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddPageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Page</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageTypes.map((pageType) => {
                  const Icon = pageType.icon
                  return (
                    <button
                      key={pageType.id}
                      onClick={() => handleCreatePage(pageType)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{pageType.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{pageType.description}</p>
                    </button>
                  )
                })}
              </div>
              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setShowAddPageModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}