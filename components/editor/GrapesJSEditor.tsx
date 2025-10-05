'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { FiSave, FiEye, FiMonitor, FiSmartphone, FiArrowLeft } from 'react-icons/fi'

export function GrapesJSEditor({ funnelId, pageId }: { funnelId: string; pageId: string }) {
  const router = useRouter()
  const { pages, updatePage } = useApp()
  const page = pages.find((p) => p.id === pageId)
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return

    const initEditor = async () => {
      const grapesjs = (await import('grapesjs')).default
      await import('grapesjs-preset-webpage')
      await import('grapesjs-blocks-basic')

      const editor = grapesjs.init({
        container: containerRef.current!,
        height: '100%',
        width: 'auto',
        storageManager: false,
        plugins: ['gjs-preset-webpage', 'gjs-blocks-basic'],
        pluginsOpts: {
          'gjs-preset-webpage': {
            blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video', 'map'],
            modalImportTitle: 'Import Template',
            modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
            modalImportContent: (editor: any) => editor.getHtml() + '<style>' + editor.getCss() + '</style>',
          },
        },
        canvas: {
          styles: [
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
          ],
        },
        deviceManager: {
          devices: [
            {
              id: 'desktop',
              name: 'Desktop',
              width: '',
            },
            {
              id: 'tablet',
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              id: 'mobile',
              name: 'Mobile',
              width: '375px',
              widthMedia: '480px',
            },
          ],
        },
        blockManager: {
          appendTo: '#blocks-container',
          blocks: [
            {
              id: 'section',
              label: '<div class="gjs-block-label">Section</div>',
              content: '<section class="py-12 px-4"><div class="max-w-6xl mx-auto"><h2>New Section</h2></div></section>',
              category: 'Layout',
            },
            {
              id: 'hero',
              label: '<div class="gjs-block-label">Hero</div>',
              content: `
                <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
                  <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl font-bold mb-4">Your Compelling Headline</h1>
                    <p class="text-xl mb-8">Subheadline that explains your unique value proposition</p>
                    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Started</button>
                  </div>
                </section>
              `,
              category: 'Sections',
            },
            {
              id: 'features',
              label: '<div class="gjs-block-label">Features</div>',
              content: `
                <section class="py-16 px-4">
                  <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl font-bold text-center mb-12">Amazing Features</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                      <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                        <h3 class="text-xl font-semibold mb-2">Feature One</h3>
                        <p class="text-gray-600">Description of your first feature</p>
                      </div>
                      <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                        <h3 class="text-xl font-semibold mb-2">Feature Two</h3>
                        <p class="text-gray-600">Description of your second feature</p>
                      </div>
                      <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div>
                        <h3 class="text-xl font-semibold mb-2">Feature Three</h3>
                        <p class="text-gray-600">Description of your third feature</p>
                      </div>
                    </div>
                  </div>
                </section>
              `,
              category: 'Sections',
            },
            {
              id: 'testimonial',
              label: '<div class="gjs-block-label">Testimonial</div>',
              content: `
                <section class="bg-gray-50 py-16 px-4">
                  <div class="max-w-4xl mx-auto text-center">
                    <p class="text-2xl italic mb-6">"This product changed my life! Highly recommended."</p>
                    <div class="font-semibold">John Doe</div>
                    <div class="text-gray-600">CEO, Company Inc.</div>
                  </div>
                </section>
              `,
              category: 'Sections',
            },
            {
              id: 'pricing',
              label: '<div class="gjs-block-label">Pricing</div>',
              content: `
                <section class="py-16 px-4">
                  <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                      <div class="border rounded-lg p-8">
                        <h3 class="text-2xl font-bold mb-4">Basic</h3>
                        <div class="text-4xl font-bold mb-6">$29<span class="text-lg text-gray-600">/mo</span></div>
                        <ul class="space-y-3 mb-8">
                          <li>✓ Feature 1</li>
                          <li>✓ Feature 2</li>
                          <li>✓ Feature 3</li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Choose Plan</button>
                      </div>
                      <div class="border-2 border-blue-600 rounded-lg p-8 relative">
                        <div class="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg">Popular</div>
                        <h3 class="text-2xl font-bold mb-4">Pro</h3>
                        <div class="text-4xl font-bold mb-6">$79<span class="text-lg text-gray-600">/mo</span></div>
                        <ul class="space-y-3 mb-8">
                          <li>✓ Everything in Basic</li>
                          <li>✓ Feature 4</li>
                          <li>✓ Feature 5</li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Choose Plan</button>
                      </div>
                      <div class="border rounded-lg p-8">
                        <h3 class="text-2xl font-bold mb-4">Enterprise</h3>
                        <div class="text-4xl font-bold mb-6">$199<span class="text-lg text-gray-600">/mo</span></div>
                        <ul class="space-y-3 mb-8">
                          <li>✓ Everything in Pro</li>
                          <li>✓ Feature 6</li>
                          <li>✓ Priority Support</li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Choose Plan</button>
                      </div>
                    </div>
                  </div>
                </section>
              `,
              category: 'Sections',
            },
            {
              id: 'cta',
              label: '<div class="gjs-block-label">Call to Action</div>',
              content: `
                <section class="bg-blue-600 text-white py-16 px-4">
                  <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p class="text-xl mb-8">Join thousands of satisfied customers today</p>
                    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Start Free Trial</button>
                  </div>
                </section>
              `,
              category: 'Sections',
            },
            {
              id: 'form-lead',
              label: '<div class="gjs-block-label">Lead Form</div>',
              content: `
                <section class="py-16 px-4">
                  <div class="max-w-md mx-auto">
                    <h2 class="text-3xl font-bold text-center mb-8">Get Your Free Guide</h2>
                    <form class="space-y-4">
                      <input type="text" placeholder="Your Name" class="w-full px-4 py-3 border rounded-lg" />
                      <input type="email" placeholder="Your Email" class="w-full px-4 py-3 border rounded-lg" />
                      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Download Now</button>
                    </form>
                  </div>
                </section>
              `,
              category: 'Forms',
            },
            {
              id: 'countdown',
              label: '<div class="gjs-block-label">Countdown Timer</div>',
              content: `
                <div class="bg-red-600 text-white py-4 text-center">
                  <div class="text-sm mb-2">Limited Time Offer Ends In:</div>
                  <div class="text-3xl font-bold">23:59:45</div>
                </div>
              `,
              category: 'Marketing',
            },
            {
              id: 'video-embed',
              label: '<div class="gjs-block-label">Video</div>',
              content: `
                <section class="py-16 px-4">
                  <div class="max-w-4xl mx-auto">
                    <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div class="text-gray-500">Video Player</div>
                    </div>
                  </div>
                </section>
              `,
              category: 'Media',
            },
          ],
        },
      })

      // Load existing content
      if (page?.content) {
        editor.setComponents(page.content.html || '')
        editor.setStyle(page.content.css || '')
      }

      editorRef.current = editor
    }

    initEditor()

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [page])

  const handleSave = async () => {
    if (!editorRef.current) return
    setSaving(true)
    try {
      const html = editorRef.current.getHtml()
      const css = editorRef.current.getCss()
      await updatePage(pageId, {
        content: { html, css },
      })
      alert('Page saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    if (!editorRef.current) return
    const html = editorRef.current.getHtml()
    const css = editorRef.current.getCss()
    const previewWindow = window.open('', '_blank')
    previewWindow?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `)
    previewWindow?.document.close()
  }

  const handleDeviceChange = (newDevice: 'desktop' | 'mobile') => {
    setDevice(newDevice)
    if (editorRef.current) {
      editorRef.current.setDevice(newDevice === 'mobile' ? 'mobile' : 'desktop')
    }
  }

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-gray-600">The page you're trying to edit doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Toolbar */}
      <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/funnels/${funnelId}`)}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-gray-700" />
          <div className="text-white font-medium">{page.name}</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => handleDeviceChange('desktop')}
              className={`px-3 py-1.5 rounded ${device === 'desktop' ? 'bg-gray-600 text-white' : 'text-gray-400'}`}
            >
              <FiMonitor />
            </button>
            <button
              onClick={() => handleDeviceChange('mobile')}
              className={`px-3 py-1.5 rounded ${device === 'mobile' ? 'bg-gray-600 text-white' : 'text-gray-400'}`}
            >
              <FiSmartphone />
            </button>
          </div>
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            <FiEye />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <FiSave />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 overflow-hidden">
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {/* Blocks Panel (hidden, will show in GrapesJS sidebar) */}
      <div id="blocks-container" style={{ display: 'none' }} />
    </div>
  )
}
