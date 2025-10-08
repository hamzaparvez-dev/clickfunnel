'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import grapesjs from 'grapesjs'
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

// Template color schemes based on funnel type
const TEMPLATE_THEMES = {
  lead: {
    primary: '#10B981', // green
    secondary: '#059669',
    gradient: 'from-green-600 to-emerald-600',
    accent: '#34D399'
  },
  sales: {
    primary: '#8B5CF6', // purple
    secondary: '#7C3AED',
    gradient: 'from-purple-600 to-violet-600',
    accent: '#A78BFA'
  },
  presentation: {
    primary: '#F59E0B', // orange
    secondary: '#D97706',
    gradient: 'from-orange-600 to-amber-600',
    accent: '#FBBF24'
  },
  phone: {
    primary: '#3B82F6', // blue
    secondary: '#2563EB',
    gradient: 'from-blue-600 to-indigo-600',
    accent: '#60A5FA'
  },
  unboxing: {
    primary: '#EC4899', // pink
    secondary: '#DB2777',
    gradient: 'from-pink-600 to-rose-600',
    accent: '#F472B6'
  },
  default: {
    primary: '#6366F1', // indigo
    secondary: '#4F46E5',
    gradient: 'from-indigo-600 to-purple-600',
    accent: '#818CF8'
  }
}

export function GrapesJSEditor({ funnelId, pageId }: GrapesJSEditorProps) {
  const router = useRouter()
  const { pages, funnels, updatePage } = useApp()
  const editorRef = useRef<any>(null)
  const [editor, setEditor] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const funnel = funnels.find((f: any) => f.id === funnelId)
  const page = pages.find((p: any) => p.id === pageId)

  useEffect(() => {
    if (!editorRef.current || editor) return

    console.log('🎨 Initializing GrapesJS Editor...')
    console.log('Page:', page)
    console.log('Funnel:', funnel)

    const grapesEditor = grapesjs.init({
      container: editorRef.current,
        height: '100%',
      width: '100%',
      fromElement: false,
      
        storageManager: false,
      
        canvas: {
          styles: [
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
          ],
        scripts: [],
        },

        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Tablet',
              width: '768px',
              widthMedia: '992px',
            },
            {
              name: 'Mobile',
              width: '375px',
              widthMedia: '480px',
            },
          ],
        },

      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true,
                className: 'btn-toggle-borders',
                label: '👁️',
                command: 'sw-visibility',
              },
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [
              {
                id: 'device-desktop',
                label: '💻',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              },
              {
                id: 'device-tablet',
                label: '📱',
                command: 'set-device-tablet',
                togglable: false,
              },
              {
                id: 'device-mobile',
                label: '📱',
                command: 'set-device-mobile',
                togglable: false,
              },
            ],
          },
        ],
      },

      plugins: [
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsPluginForms,
        gjsCountdown,
        gjsPluginExport,
        gjsNavbar,
        gjsTabs,
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

      layerManager: {
        appendTo: '.layers-container',
      },

      styleManager: {
        appendTo: '.styles-container',
        sectors: [
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration'],
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          },
          {
            name: 'Background',
            open: false,
            buildProps: ['background-color', 'background-image', 'background-repeat', 'background-position', 'background-size'],
          },
          {
            name: 'Border',
            open: false,
            buildProps: ['border', 'border-radius', 'border-width', 'border-style', 'border-color'],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['opacity', 'transition', 'transform', 'cursor', 'overflow', 'box-shadow'],
          },
          {
            name: 'Flex',
            open: false,
            buildProps: ['flex-direction', 'justify-content', 'align-items', 'flex-wrap', 'gap'],
          },
        ],
      },

      traitManager: {
        appendTo: '.traits-container',
      },

      blockManager: {
        appendTo: '.blocks-container',
      },
    })

    // Add custom commands
    grapesEditor.Commands.add('set-device-desktop', {
      run: (editor) => editor.setDevice('Desktop'),
    })

    grapesEditor.Commands.add('set-device-tablet', {
      run: (editor) => editor.setDevice('Tablet'),
    })

    grapesEditor.Commands.add('set-device-mobile', {
      run: (editor) => editor.setDevice('Mobile'),
    })

    // Add custom components and blocks
    addCustomComponents(grapesEditor, page?.type || 'landing')
    addCustomBlocks(grapesEditor, page?.type || 'landing')

    // Load page content
    loadPageContent(grapesEditor, page)

    setEditor(grapesEditor)
    setLoading(false)

    return () => {
      if (grapesEditor) {
        grapesEditor.destroy()
      }
    }
  }, [page, funnelId, pageId])

  const loadPageContent = (editor: any, page: any) => {
    if (!page) return

    try {
      if (page.content) {
        const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
        
        console.log('📄 Loading page content:', content)
        
        // Check if it's GrapesJS format
        if (content.html || content.components) {
          console.log('✅ Loading GrapesJS format')
          if (content.components && typeof content.components === 'string') {
            editor.setComponents(content.components)
          } else if (content.html) {
            editor.setComponents(content.html)
          }
          if (content.css) {
            editor.setStyle(content.css)
          }
        } 
        // Check if it's Puck format
        else if (content.content && Array.isArray(content.content)) {
          console.log('🔄 Converting Puck format to HTML')
          const html = convertPuckToHTML(content.content, page.type)
          editor.setComponents(html)
        }
      } else {
        // No content, load default template based on page type
        console.log('🆕 Loading default template for:', page.type)
        const defaultContent = getDefaultTemplate(page.type, page.name)
        editor.setComponents(defaultContent)
      }
    } catch (e) {
      console.error('❌ Error loading page content:', e)
      // Load fallback template
      const fallback = getDefaultTemplate(page.type || 'landing', page.name || 'Untitled')
      editor.setComponents(fallback)
    }
  }

  const convertPuckToHTML = (puckContent: any[], pageType: string) => {
    let html = ''
    
    puckContent.forEach((component: any) => {
      const { type, props } = component
      
      switch (type) {
        case 'HeroSection':
          html += `
            <section class="${props.backgroundColor || 'bg-gradient-to-br from-indigo-600 to-purple-600'} text-white py-24 px-6">
              <div class="max-w-5xl mx-auto text-center">
                <h1 class="text-6xl font-bold mb-6">${props.title || 'Welcome'}</h1>
                <p class="text-2xl mb-10">${props.subtitle || 'Get started today'}</p>
                <a href="${props.buttonLink || '#'}" class="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 inline-block">${props.buttonText || 'Get Started'}</a>
              </div>
            </section>
          `
          break
        case 'FeatureGrid':
          const features = props.features || []
          const featuresHTML = features.map((f: any) => `
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="text-4xl mb-4">${f.icon || '✨'}</div>
              <h3 class="text-2xl font-bold mb-3">${f.title || 'Feature'}</h3>
              <p class="text-gray-600">${f.description || 'Description'}</p>
            </div>
          `).join('')
          html += `
            <section class="py-20 px-6 bg-gray-50">
              <div class="max-w-7xl mx-auto">
                ${props.title ? `<div class="text-center mb-16"><h2 class="text-5xl font-bold mb-4">${props.title}</h2><p class="text-xl text-gray-600">${props.subtitle || ''}</p></div>` : ''}
                <div class="grid md:grid-cols-3 gap-8">${featuresHTML}</div>
              </div>
            </section>
          `
          break
        case 'HeadingBlock':
          html += `<div class="max-w-7xl mx-auto px-6 py-4"><h1 class="${props.size || 'text-4xl'} font-bold mb-4" style="text-align: ${props.align || 'left'}">${props.children || 'Heading'}</h1></div>`
          break
        case 'TextBlock':
          html += `<div class="max-w-7xl mx-auto px-6 py-2"><p class="text-lg text-gray-700 mb-4" style="text-align: ${props.align || 'left'}">${props.text || 'Text'}</p></div>`
          break
        case 'ButtonBlock':
          html += `<div class="max-w-7xl mx-auto px-6 text-center py-4"><a href="${props.href || '#'}" class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 inline-block">${props.text || 'Click'}</a></div>`
          break
      }
    })
    
    return html
  }

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

        <section class="py-20 px-6 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-5xl font-bold mb-4 text-gray-900">Why Choose Us</h2>
              <p class="text-xl text-gray-600">Everything you need to succeed in one place</p>
            </div>
                    <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="text-6xl mb-4">🚀</div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">Fast Results</h3>
                <p class="text-gray-600 text-lg">See measurable results in days, not months. Our proven system delivers.</p>
                      </div>
              <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="text-6xl mb-4">💎</div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">Premium Quality</h3>
                <p class="text-gray-600 text-lg">Top-tier service and 24/7 support to ensure your success.</p>
                      </div>
              <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="text-6xl mb-4">🎯</div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900">Proven System</h3>
                <p class="text-gray-600 text-lg">Tested and trusted by over 10,000 customers worldwide.</p>
                      </div>
                    </div>
                  </div>
                </section>

        <section class="py-20 px-6" style="background: linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})">
          <div class="max-w-4xl mx-auto text-center text-white">
            <h2 class="text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p class="text-2xl mb-10 opacity-90">Join now and get instant access</p>
            <a href="#signup" class="bg-white text-gray-900 px-12 py-5 rounded-xl font-bold text-xl inline-block shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">Start Your Free Trial →</a>
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

        <section class="py-20 px-6 bg-gray-900 text-white">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-5xl font-bold mb-4">Choose Your Plan</h2>
              <p class="text-xl opacity-80">Special pricing for a limited time</p>
            </div>
                    <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 class="text-2xl font-bold mb-2">Starter</h3>
                <div class="text-5xl font-bold mb-6">$97<span class="text-xl opacity-60">/mo</span></div>
                <ul class="space-y-3 mb-8 text-lg">
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Core features</li>
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Email support</li>
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 30-day guarantee</li>
                        </ul>
                <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-bold transition-all">Get Started</button>
                      </div>
              <div class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 transform scale-105 shadow-2xl">
                <div class="text-center mb-4">
                  <span class="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
                      </div>
                <h3 class="text-2xl font-bold mb-2">Professional</h3>
                <div class="text-6xl font-bold mb-6">$197<span class="text-xl opacity-60">/mo</span></div>
                <ul class="space-y-3 mb-8 text-lg">
                  <li class="flex items-center gap-2"><span class="text-yellow-400">✓</span> All Starter features</li>
                  <li class="flex items-center gap-2"><span class="text-yellow-400">✓</span> Priority support</li>
                  <li class="flex items-center gap-2"><span class="text-yellow-400">✓</span> Advanced analytics</li>
                  <li class="flex items-center gap-2"><span class="text-yellow-400">✓</span> Lifetime updates</li>
                        </ul>
                <button class="w-full bg-white text-purple-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">Get Started</button>
                      </div>
              <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 class="text-2xl font-bold mb-2">Enterprise</h3>
                <div class="text-5xl font-bold mb-6">$497<span class="text-xl opacity-60">/mo</span></div>
                <ul class="space-y-3 mb-8 text-lg">
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> All Pro features</li>
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> White label</li>
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> API access</li>
                  <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Custom integrations</li>
                        </ul>
                <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-bold transition-all">Get Started</button>
                      </div>
                    </div>
                  </div>
                </section>

        <section class="py-16 px-6 bg-white">
                  <div class="max-w-4xl mx-auto text-center">
            <div class="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg">
              <div class="flex items-center justify-center mb-4">
                <span class="text-6xl">🛡️</span>
              </div>
              <h3 class="text-3xl font-bold text-green-900 mb-3">30-Day Money Back Guarantee</h3>
              <p class="text-green-700 text-lg">If you're not satisfied, get a full refund. No questions asked.</p>
            </div>
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
              
              <div class="space-y-6 mb-8">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                  <input type="text" placeholder="4242 4242 4242 4242" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Expiry</label>
                    <input type="text" placeholder="MM/YY" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg" />
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">CVC</label>
                    <input type="text" placeholder="123" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg" />
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-2xl p-6 mb-8">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-gray-600 text-lg">Subtotal</span>
                  <span class="text-gray-900 font-bold text-xl">$197.00</span>
                </div>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-gray-600 text-lg">Tax</span>
                  <span class="text-gray-900 font-bold text-xl">$0.00</span>
                </div>
                <div class="border-t border-gray-300 pt-4 mt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-900 font-bold text-2xl">Total</span>
                    <span class="text-gray-900 font-bold text-3xl" style="color: ${theme.primary}">$197.00</span>
                  </div>
                </div>
              </div>

              <button class="w-full text-white py-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all" style="background: linear-gradient(to right, ${theme.primary}, ${theme.secondary})">Complete Purchase 🔒</button>
              
              <div class="text-center mt-6">
                <p class="text-sm text-gray-500">🔒 Secure checkout powered by Stripe</p>
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
            <p class="text-3xl mb-4">Your order has been confirmed</p>
            <p class="text-2xl mb-12 opacity-90">Check your email for details and next steps</p>
            
            <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12">
              <h2 class="text-3xl font-bold mb-6">What Happens Next?</h2>
              <div class="text-left space-y-4 text-xl">
                <div class="flex items-center gap-4">
                  <span class="text-4xl">📧</span>
                  <span>Check your email for order confirmation</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-4xl">🔐</span>
                  <span>Set up your account and get instant access</span>
                    </div>
                <div class="flex items-center gap-4">
                  <span class="text-4xl">🚀</span>
                  <span>Start using your purchase right away</span>
                </div>
              </div>
            </div>

            <a href="/dashboard" class="bg-white text-green-600 px-12 py-5 rounded-xl font-bold text-xl inline-block shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">Go to Dashboard →</a>
                  </div>
                </section>
              `,
      upsell: `
        <section class="min-h-screen bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center py-20 px-6">
          <div class="max-w-4xl mx-auto text-center text-white">
            <div class="bg-yellow-400 text-gray-900 inline-block px-8 py-3 rounded-full font-bold text-lg mb-8 animate-pulse">⏰ WAIT! SPECIAL ONE-TIME OFFER</div>
            <h1 class="text-7xl font-bold mb-6">${pageName}</h1>
            <p class="text-3xl mb-12">Upgrade your order now and get exclusive bonuses at a special price</p>
            
            <div class="bg-white text-gray-900 rounded-3xl p-12 mb-12 shadow-2xl">
              <div class="text-6xl mb-6">🎁</div>
              <h2 class="text-4xl font-bold mb-6">Premium Upgrade Package</h2>
              <div class="text-left space-y-4 text-xl mb-8">
                <div class="flex items-center gap-3">
                  <span class="text-green-500 text-2xl">✓</span>
                  <span>Lifetime access to all premium features</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-500 text-2xl">✓</span>
                  <span>Priority support with 1-hour response time</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-500 text-2xl">✓</span>
                  <span>Exclusive training materials worth $497</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-500 text-2xl">✓</span>
                  <span>Done-for-you templates and resources</span>
                </div>
              </div>
              
              <div class="border-t-2 border-gray-200 pt-8 mb-8">
                <div class="flex items-center justify-center gap-6 mb-4">
                  <span class="text-3xl text-gray-400 line-through">$497</span>
                  <span class="text-6xl font-bold text-orange-600">$97</span>
                </div>
                <p class="text-xl text-gray-600">Save $400 - Today Only!</p>
              </div>

              <button class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-6 rounded-xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all mb-4">Yes, Add This Upgrade! 🚀</button>
              <a href="#" class="text-gray-500 text-sm hover:text-gray-700">No thanks, I'll pass on this offer</a>
                    </div>
                  </div>
                </section>
              `,
    }

    return templates[pageType] || templates.landing
  }

  const handleSave = async () => {
    if (!editor) {
      alert('⚠️ Editor not ready yet. Please wait...')
      return
    }
    
    setSaving(true)
    try {
      const html = editor.getHtml()
      const css = editor.getCss()
      const components = editor.getWrapper()
      
      const content = {
        html,
        css,
        components: components ? JSON.stringify(components.toJSON()) : '',
        timestamp: Date.now(),
      }

      await updatePage(pageId, {
        content: JSON.stringify(content),
      })
      
      alert('✅ Page saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('❌ Failed to save page. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    if (!editor) {
      alert('⚠️ Editor not ready yet. Please wait...')
      return
    }

    try {
      const html = editor.getHtml()
      const css = editor.getCss()
      
      if (!html || html.trim() === '') {
        alert('⚠️ No content to preview. Please add some components first.')
        return
      }
      
      const previewWindow = window.open('', '_blank', 'width=1200,height=800')
      if (!previewWindow) {
        alert('❌ Please allow popups to preview your page')
        return
      }

      const fullHTML = `<!DOCTYPE html>
<html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page?.name || 'Preview'} - Preview</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css}</style>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
  </style>
        </head>
<body>
  ${html}
</body>
</html>`

      previewWindow.document.write(fullHTML)
      previewWindow.document.close()
    } catch (error) {
      console.error('Preview error:', error)
      alert('❌ Failed to generate preview. Please try again.')
    }
  }

  const handleExport = () => {
    if (!editor) {
      alert('⚠️ Editor not ready yet. Please wait...')
      return
    }

    try {
      const html = editor.getHtml()
      const css = editor.getCss()
      
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page?.name || 'Page'}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>${css}</style>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`

      const blob = new Blob([fullHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${page?.name || 'page'}.html`
      a.click()
      URL.revokeObjectURL(url)
      
      alert('✅ Page exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      alert('❌ Failed to export page. Please try again.')
    }
  }

  const handleUndo = () => {
    if (editor) editor.UndoManager.undo()
  }

  const handleRedo = () => {
    if (editor) editor.UndoManager.redo()
  }

  if (!page || !funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
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
    <div className="h-screen flex flex-col bg-white">
      {/* Top Toolbar */}
      <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between px-6 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/funnels/${funnelId}`)}
            className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <div className="font-bold text-lg">{page.name}</div>
            <div className="text-xs text-indigo-200">{funnel.name} • GrapesJS Editor</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <button
            onClick={handleUndo}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Undo (Ctrl+Z)"
            >
            <Undo size={20} />
            </button>
            <button
            onClick={handleRedo}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Redo (Ctrl+Shift+Z)"
            >
            <Redo size={20} />
            </button>
          
          <div className="h-6 w-px bg-white/20" />
          
          <div className="panel__devices flex items-center gap-1 bg-white/10 rounded-lg p-1"></div>
          
          <div className="h-6 w-px bg-white/20" />
          
          <button
            onClick={handlePreview}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-50"
          >
            <Eye size={18} />
            <span>Preview</span>
          </button>

          <button
            onClick={handleExport}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-50"
          >
            <Download size={18} />
            <span>Export</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition font-bold shadow-lg"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading Editor...</p>
            <p className="text-gray-500 mt-2">Please wait</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Blocks & Components */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🧩</span>
                Components
              </h3>
              <p className="text-xs text-gray-500 mt-1">Drag to add to canvas</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="blocks-container"></div>
            </div>
      </div>

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="panel__basic-actions flex items-center gap-2 p-2 border-b border-gray-200 bg-white"></div>
            <div ref={editorRef} className="flex-1 gjs-editor"></div>
          </div>

          {/* Right Sidebar - Layers & Styles */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* Layers */}
              <div className="border-b border-gray-200">
                <div className="p-4 bg-white border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">📑</span>
                    Layers
                  </h3>
                </div>
                <div className="layers-container p-2 bg-white"></div>
              </div>

              {/* Traits */}
              <div className="border-b border-gray-200">
                <div className="p-4 bg-white border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Settings2 size={18} />
                    Settings
                  </h3>
                </div>
                <div className="traits-container p-2 bg-white"></div>
      </div>

              {/* Styles */}
              <div>
                <div className="p-4 bg-white border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">🎨</span>
                    Styles
                  </h3>
                </div>
                <div className="styles-container p-2 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .gjs-one-bg {
          background-color: white;
        }
        .gjs-two-color {
          color: #4F46E5;
        }
        .gjs-three-bg {
          background-color: #4F46E5;
          color: white;
        }
        .gjs-four-color,
        .gjs-four-color-h:hover {
          color: #6366F1;
        }
        .gjs-block {
          width: auto;
          height: auto;
          min-height: 90px;
          padding: 12px;
          border-radius: 8px;
          background: white;
          border: 2px solid #E5E7EB;
          transition: all 0.2s;
        }
        .gjs-block:hover {
          background-color: #EEF2FF;
          border-color: #6366F1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
        .gjs-block-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
        .gjs-category-title {
          font-weight: 700;
          color: #1F2937;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 12px 8px 8px;
        }
        .gjs-toolbar {
          background-color: #1F2937 !important;
        }
        .gjs-toolbar-item {
          color: white !important;
        }
        .gjs-cv-canvas {
          background-color: #F3F4F6;
        }
        .gjs-frame {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

// Add custom components
function addCustomComponents(editor: any, pageType: string) {
  const theme = TEMPLATE_THEMES[pageType as keyof typeof TEMPLATE_THEMES] || TEMPLATE_THEMES.default
  
  // Hero Section Component
  editor.DomComponents.addType('hero-section', {
    model: {
      defaults: {
        tagName: 'section',
        draggable: true,
        droppable: true,
        attributes: { class: 'hero-section' },
        components: `
          <div class="bg-gradient-to-r ${theme.gradient} text-white py-24 px-6 min-h-screen flex items-center">
            <div class="max-w-5xl mx-auto text-center">
              <h1 class="text-7xl font-bold mb-6">Transform Your Business Today</h1>
              <p class="text-2xl mb-10 opacity-90">Join thousands of successful entrepreneurs</p>
              <a href="#" class="bg-white text-gray-900 px-12 py-5 rounded-xl font-bold text-xl inline-block shadow-2xl hover:shadow-3xl transition-all">Get Started Free</a>
            </div>
          </div>
        `,
      },
    },
  })

  // Feature Grid Component
  editor.DomComponents.addType('feature-grid', {
    model: {
      defaults: {
        tagName: 'section',
        draggable: true,
        droppable: true,
        components: `
          <div class="py-20 px-6 bg-white">
            <div class="max-w-7xl mx-auto">
              <div class="text-center mb-16">
                <h2 class="text-5xl font-bold mb-4 text-gray-900">Amazing Features</h2>
                <p class="text-xl text-gray-600">Everything you need to succeed</p>
              </div>
              <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div class="text-6xl mb-4">⚡</div>
                  <h3 class="text-2xl font-bold mb-3">Lightning Fast</h3>
                  <p class="text-gray-600 text-lg">Build pages in minutes</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div class="text-6xl mb-4">🎨</div>
                  <h3 class="text-2xl font-bold mb-3">Beautiful Design</h3>
                  <p class="text-gray-600 text-lg">Stunning templates</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div class="text-6xl mb-4">🔒</div>
                  <h3 class="text-2xl font-bold mb-3">Secure</h3>
                  <p class="text-gray-600 text-lg">Enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
    },
  })

  // Testimonial Component
  editor.DomComponents.addType('testimonial', {
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: true,
        components: `
          <div class="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
            <div class="flex items-center space-x-4 mb-4">
              <img src="https://ui-avatars.com/api/?name=John+Doe&size=200" alt="John Doe" class="w-20 h-20 rounded-full object-cover" />
              <div>
                <div class="font-bold text-xl text-gray-900">John Doe</div>
                <div class="text-gray-600">CEO, Company</div>
                <div class="flex space-x-1 mt-1">
                  <span class="text-yellow-400 text-xl">★★★★★</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed text-lg">"This product completely transformed my business! Highly recommended."</p>
          </div>
        `,
      },
    },
  })
}

// Add custom blocks
function addCustomBlocks(editor: any, pageType: string) {
  const blockManager = editor.BlockManager

  // Hero Section Block
  blockManager.add('hero-section', {
    label: '<div class="text-center"><div class="text-3xl mb-2">🎯</div><div class="text-sm font-semibold">Hero Section</div></div>',
    category: 'Sections',
    content: { type: 'hero-section' },
  })

  // Feature Grid Block
  blockManager.add('feature-grid', {
    label: '<div class="text-center"><div class="text-3xl mb-2">⭐</div><div class="text-sm font-semibold">Feature Grid</div></div>',
    category: 'Sections',
    content: { type: 'feature-grid' },
  })

  // Testimonial Block
  blockManager.add('testimonial', {
    label: '<div class="text-center"><div class="text-3xl mb-2">💬</div><div class="text-sm font-semibold">Testimonial</div></div>',
    category: 'Components',
    content: { type: 'testimonial' },
  })

  // CTA Button Block
  blockManager.add('cta-button', {
    label: '<div class="text-center"><div class="text-3xl mb-2">🔘</div><div class="text-sm font-semibold">CTA Button</div></div>',
    category: 'Components',
    content: '<div class="text-center py-6"><a href="#" class="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 inline-block transition-all shadow-lg">Get Started Now →</a></div>',
  })

  // Pricing Card
  blockManager.add('pricing-card', {
    label: '<div class="text-center"><div class="text-3xl mb-2">💰</div><div class="text-sm font-semibold">Pricing Card</div></div>',
    category: 'Components',
    content: `
      <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 max-w-sm mx-auto my-4">
        <h3 class="text-2xl font-bold mb-2">Professional</h3>
        <div class="text-5xl font-bold mb-6 text-indigo-600">$197<span class="text-xl text-gray-500">/mo</span></div>
        <ul class="space-y-3 mb-8 text-left">
          <li class="flex items-center gap-2"><span class="text-green-500">✓</span> All features included</li>
          <li class="flex items-center gap-2"><span class="text-green-500">✓</span> Priority support</li>
          <li class="flex items-center gap-2"><span class="text-green-500">✓</span> Lifetime updates</li>
        </ul>
        <button class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all">Get Started</button>
      </div>
    `,
  })

  // Video Section
  blockManager.add('video-section', {
    label: '<div class="text-center"><div class="text-3xl mb-2">📹</div><div class="text-sm font-semibold">Video</div></div>',
    category: 'Components',
    content: `
      <div class="py-12 px-6 bg-gray-50">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Watch This Video</h2>
            <p class="text-xl text-gray-600">See how it works in action</p>
          </div>
          <div class="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-all transform hover:scale-110">
                <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    `,
  })

  // Stats Section
  blockManager.add('stats-section', {
    label: '<div class="text-center"><div class="text-3xl mb-2">📊</div><div class="text-sm font-semibold">Stats</div></div>',
    category: 'Components',
    content: `
      <div class="py-16 px-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-6xl font-bold mb-2">50K+</div>
              <div class="text-xl opacity-90">Happy Customers</div>
            </div>
            <div>
              <div class="text-6xl font-bold mb-2">98%</div>
              <div class="text-xl opacity-90">Satisfaction Rate</div>
            </div>
            <div>
              <div class="text-6xl font-bold mb-2">24/7</div>
              <div class="text-xl opacity-90">Customer Support</div>
            </div>
            <div>
              <div class="text-6xl font-bold mb-2">100+</div>
              <div class="text-xl opacity-90">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    `,
  })

  // FAQ Accordion
  blockManager.add('faq-section', {
    label: '<div class="text-center"><div class="text-3xl mb-2">❓</div><div class="text-sm font-semibold">FAQ</div></div>',
    category: 'Components',
    content: `
      <div class="py-20 px-6 bg-white">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-gray-600">Everything you need to know</p>
          </div>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">How does it work?</h3>
              <p class="text-gray-700 text-lg">It's simple! Just sign up, follow our step-by-step guide, and you'll be up and running in minutes. Our intuitive platform makes it easy for anyone to get started.</p>
            </div>
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Is there a free trial?</h3>
              <p class="text-gray-700 text-lg">Yes! We offer a 30-day free trial with full access to all features. No credit card required to start.</p>
            </div>
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Can I cancel anytime?</h3>
              <p class="text-gray-700 text-lg">Absolutely! You can cancel your subscription at any time with no questions asked. We believe in earning your business every month.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  })

  // Timer/Countdown
  blockManager.add('countdown-timer', {
    label: '<div class="text-center"><div class="text-3xl mb-2">⏰</div><div class="text-sm font-semibold">Countdown</div></div>',
    category: 'Components',
    content: `
      <div class="py-12 px-6 bg-red-600 text-white">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-3xl font-bold mb-8">⚡ Limited Time Offer Ends In:</h3>
          <div class="flex justify-center gap-6 mb-6">
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 min-w-[100px]">
              <div class="text-5xl font-bold">23</div>
              <div class="text-sm opacity-90 mt-2">HOURS</div>
            </div>
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 min-w-[100px]">
              <div class="text-5xl font-bold">59</div>
              <div class="text-sm opacity-90 mt-2">MINUTES</div>
            </div>
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 min-w-[100px]">
              <div class="text-5xl font-bold">42</div>
              <div class="text-sm opacity-90 mt-2">SECONDS</div>
            </div>
          </div>
          <p class="text-xl opacity-90">Don't miss out on this incredible deal!</p>
        </div>
      </div>
    `,
  })

  // Form Section
  blockManager.add('lead-form', {
    label: '<div class="text-center"><div class="text-3xl mb-2">📝</div><div class="text-sm font-semibold">Lead Form</div></div>',
    category: 'Components',
    content: `
      <div class="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-3xl shadow-2xl p-12">
            <div class="text-center mb-8">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
              <p class="text-xl text-gray-600">Join thousands of satisfied customers</p>
            </div>
            <form class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
              </div>
              <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all">
                Get Instant Access →
              </button>
              <p class="text-center text-sm text-gray-500">🔒 Your information is 100% secure</p>
            </form>
          </div>
        </div>
      </div>
    `,
  })

  // Trust Badges
  blockManager.add('trust-badges', {
    label: '<div class="text-center"><div class="text-3xl mb-2">🛡️</div><div class="text-sm font-semibold">Trust Badges</div></div>',
    category: 'Components',
    content: `
      <div class="py-12 px-6 bg-white border-t border-b border-gray-200">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <div class="text-center">
              <div class="text-4xl mb-2">🔒</div>
              <div class="text-sm font-semibold text-gray-700">SSL Secure</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">💳</div>
              <div class="text-sm font-semibold text-gray-700">Stripe</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">🛡️</div>
              <div class="text-sm font-semibold text-gray-700">30-Day Guarantee</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">⭐</div>
              <div class="text-sm font-semibold text-gray-700">4.9/5 Rating</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">✓</div>
              <div class="text-sm font-semibold text-gray-700">Verified</div>
            </div>
          </div>
        </div>
      </div>
    `,
  })

  // Footer
  blockManager.add('footer', {
    label: '<div class="text-center"><div class="text-3xl mb-2">👣</div><div class="text-sm font-semibold">Footer</div></div>',
    category: 'Sections',
    content: `
      <footer class="bg-gray-900 text-white py-12 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4">Company</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">Product</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">Support</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">Legal</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `,
  })
}
