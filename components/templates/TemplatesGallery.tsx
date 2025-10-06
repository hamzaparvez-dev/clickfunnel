'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiStar, FiAward, FiEye } from 'react-icons/fi'
import { useApp } from '@/lib/context/AppContext'
import { TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory, searchTemplates } from '@/lib/data/templates'
import { getPuckTemplateData } from '@/lib/data/puck-templates'

export function TemplatesGallery() {
  const router = useRouter()
  const { createFunnel, createPage, updatePage } = useApp()
  const [category, setCategory] = useState('All Templates')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)

  const filtered = useMemo(() => {
    if (query.trim()) {
      return searchTemplates(query).filter((t) => category === 'All Templates' || t.category === category)
    }
    return getTemplatesByCategory(category)
  }, [category, query])

  const previewTemplate = (tpl: any) => {
    console.log('=== PREVIEW TEMPLATE ===')
    console.log('Template:', tpl.name)
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!previewWindow) {
      alert('Please allow popups to preview templates')
      return
    }

    // Get first page template data
    const firstPageDef = tpl.pageDefinitions[0]
    console.log('First page definition:', firstPageDef)
    
    const puckKey = `${firstPageDef.type}-${tpl.id.replace('tpl-', '')}`
    console.log('Looking for puck key:', puckKey)
    
    let puckData = getPuckTemplateData(puckKey)
    console.log('Puck data from key:', puckData)

    // If no specific template data, use generic template
    if (!puckData || !puckData.content || puckData.content.length === 0) {
      console.log('Using generic template fallback')
      puckData = getGenericTemplateData(firstPageDef.type, tpl.name)
      console.log('Generic template data:', puckData)
    }

    // Render Puck components to HTML
    let html = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script src="https://cdn.tailwindcss.com"></script><style>body { margin: 0; padding: 0; }</style></head><body>'
    
    // Render each component
    if (puckData && puckData.content && puckData.content.length > 0) {
      console.log('Rendering', puckData.content.length, 'components')
      puckData.content.forEach((component: any, index: number) => {
        console.log(`Component ${index}:`, component)
        const componentHTML = renderComponentToHTML(component)
        html += componentHTML
      })
    } else {
      console.error('No content to render!')
      html += '<div class="flex items-center justify-center min-h-screen"><div class="text-center"><p class="text-2xl font-bold text-gray-900 mb-4">No Preview Available</p><p class="text-gray-600">This template has no content yet.</p></div></div>'
    }
    
    html += '</body></html>'
    
    console.log('Final HTML length:', html.length)
    console.log('=== END PREVIEW ===')
    
    previewWindow.document.write(html)
    previewWindow.document.close()
  }

  const renderComponentToHTML = (component: any): string => {
    if (!component || !component.type || !component.props) {
      console.error('Invalid component:', component)
      return ''
    }
    
    const { type, props } = component
    
    switch (type) {
      case 'HeroSection':
        return `
          <section class="${props.backgroundColor || 'bg-gradient-to-br from-indigo-600 to-purple-600'} text-white py-24 px-6">
            <div class="max-w-5xl mx-auto text-center">
              <h1 class="text-6xl font-bold mb-6">${props.title || 'Welcome'}</h1>
              <p class="text-2xl mb-10">${props.subtitle || 'Get started today'}</p>
              <a href="${props.buttonLink || '#'}" class="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 inline-block">${props.buttonText || 'Get Started'}</a>
            </div>
          </section>
        `
      case 'FeatureGrid':
        const features = props.features || []
        const featuresHTML = features.map((f: any) => `
          <div class="bg-white p-8 rounded-2xl shadow-lg">
            <div class="text-4xl mb-4">${f.icon || '✨'}</div>
            <h3 class="text-2xl font-bold mb-3">${f.title || 'Feature'}</h3>
            <p class="text-gray-600">${f.description || 'Description'}</p>
          </div>
        `).join('')
        return `
          <section class="py-20 px-6 bg-gray-50">
            <div class="max-w-7xl mx-auto">
              ${props.title ? `<div class="text-center mb-16"><h2 class="text-5xl font-bold mb-4">${props.title}</h2><p class="text-xl text-gray-600">${props.subtitle || ''}</p></div>` : ''}
              <div class="grid md:grid-cols-3 gap-8">${featuresHTML}</div>
            </div>
          </section>
        `
      case 'PricingSection':
        const plans = props.plans || []
        const plansHTML = plans.map((plan: any) => `
          <div class="${plan.popular === 'yes' ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105' : 'bg-gray-800 text-white'} rounded-2xl p-8">
            ${plan.popular === 'yes' ? '<div class="text-center mb-4"><span class="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span></div>' : ''}
            <h3 class="text-2xl font-bold mb-2">${plan.name || 'Plan'}</h3>
            <div class="text-5xl font-bold mb-6">${plan.price || '$0'}<span class="text-xl">/mo</span></div>
            <ul class="space-y-3 mb-8">
              ${(plan.features || '').split('\n').filter((f: string) => f.trim()).map((f: string) => `<li class="flex items-center gap-2"><span class="text-green-400">✓</span> ${f}</li>`).join('')}
            </ul>
            <button class="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100">Get Started</button>
          </div>
        `).join('')
        return `
          <section class="py-20 px-6 bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto">
              <div class="text-center mb-16"><h2 class="text-5xl font-bold mb-4">${props.title || 'Pricing'}</h2><p class="text-xl text-gray-400">${props.subtitle || ''}</p></div>
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
                  <h2 class="text-3xl font-bold mb-3">${props.title || 'Get Started'}</h2>
                  <p class="text-gray-600">${props.subtitle || 'Sign up today'}</p>
                </div>
                <form class="space-y-4">
                  <input type="text" placeholder="Your Name" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
                  <input type="email" placeholder="Your Email" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
                  <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg">${props.buttonText || 'Submit'}</button>
                </form>
              </div>
            </div>
          </section>
        `
      case 'HeadingBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-4"><h1 class="${props.size || 'text-4xl'} font-bold mb-4" style="text-align: ${props.align || 'left'}">${props.children || 'Heading'}</h1></div>`
      case 'TextBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-2"><p class="text-lg text-gray-700 mb-4" style="text-align: ${props.align || 'left'}">${props.text || 'Text content'}</p></div>`
      case 'ButtonBlock':
        const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
        const variantClasses = { primary: 'bg-indigo-600 text-white', secondary: 'bg-gray-600 text-white', outline: 'border-2 border-indigo-600 text-indigo-600' }
        const btnSize = props.size || 'md'
        const btnVariant = props.variant || 'primary'
        return `<div class="max-w-7xl mx-auto px-6 text-center py-4"><a href="${props.href || '#'}" class="font-semibold rounded-lg inline-block ${sizeClasses[btnSize as keyof typeof sizeClasses]} ${variantClasses[btnVariant as keyof typeof variantClasses]}">${props.text || 'Click Here'}</a></div>`
      case 'ImageBlock':
        return `<div class="max-w-7xl mx-auto px-6 py-4"><div class="${props.width || 'max-w-2xl'} mx-auto mb-8"><img src="${props.url || 'https://via.placeholder.com/800x400'}" alt="${props.alt || 'Image'}" class="w-full h-auto rounded-xl shadow-lg" /></div></div>`
      default:
        console.warn('Unknown component type:', type)
        return ''
    }
  }

  const useTemplate = async (tpl: any) => {
    if (busy) return
    setBusy(true)
    
    console.log('=== USE TEMPLATE ===')
    console.log('Template:', tpl.name, 'ID:', tpl.id)
    
    try {
      const funnel = await createFunnel({
        name: tpl.name,
        description: tpl.description,
      })
      console.log('Created funnel:', funnel.id)

      // Create pages from template definitions with Puck data
      let firstPageId: string | null = null
      for (let i = 0; i < tpl.pageDefinitions.length; i++) {
        const pageDef = tpl.pageDefinitions[i]
        console.log(`\nCreating page ${i + 1}/${tpl.pageDefinitions.length}:`, pageDef.name, `(${pageDef.type})`)
        
        // Get Puck template data for this page type
        const puckKey = `${pageDef.type}-${tpl.id.replace('tpl-', '')}`
        console.log('Puck key:', puckKey)
        
        let puckData = getPuckTemplateData(puckKey)
        console.log('Got puck data:', puckData ? `${puckData.content?.length || 0} components` : 'null')
        
        // If no specific template data, use generic template based on page type
        if (!puckData || !puckData.content || puckData.content.length === 0) {
          console.log('Using generic template for', pageDef.type)
          puckData = getGenericTemplateData(pageDef.type, tpl.name)
          console.log('Generic data:', puckData ? `${puckData.content?.length || 0} components` : 'null')
        }
        
        const page = await createPage(funnel.id, {
          name: pageDef.name,
          type: pageDef.type,
        })
        console.log('Created page:', page.id)

        // Update page with Puck component data using updatePage
        if (page && puckData) {
          const contentString = JSON.stringify(puckData)
          console.log('Saving content, length:', contentString.length)
          
          await updatePage(page.id, {
            content: contentString
          })
          console.log('Content saved to page:', page.id)
        } else {
          console.error('Failed to save content - missing page or puckData')
        }

        if (!firstPageId) firstPageId = page.id
      }

      console.log('All pages created. Redirecting to funnel:', funnel.id)
      console.log('=== END USE TEMPLATE ===')
      
      // Redirect to funnel builder
      router.push(`/funnels/${funnel.id}`)
    } catch (error) {
      console.error('Error creating funnel from template:', error)
      alert('Failed to create funnel. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  // Generic template data generator for when specific template doesn't exist
  const getGenericTemplateData = (pageType: string, funnelName: string) => {
    const genericTemplates: Record<string, any> = {
      landing: {
        content: [
          {
            type: 'HeroSection',
            props: {
              id: 'hero-generic',
              title: `Welcome to ${funnelName}`,
              subtitle: 'Transform your business with our proven system',
              buttonText: 'Get Started Today',
              buttonLink: '#signup',
              backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
            },
          },
          {
            type: 'FeatureGrid',
            props: {
              id: 'features-generic',
              title: 'Why Choose Us',
              subtitle: 'Everything you need to succeed',
              features: [
                { icon: '🚀', title: 'Fast Results', description: 'See results in days, not months' },
                { icon: '💎', title: 'Premium Quality', description: 'Top-tier service and support' },
                { icon: '🎯', title: 'Proven System', description: 'Tested by thousands of customers' },
              ],
            },
          },
        ],
        root: {},
      },
      sales: {
        content: [
          {
            type: 'HeadingBlock',
            props: {
              id: 'heading-sales',
              children: 'Special Offer - Limited Time',
              align: 'center',
              size: 'text-6xl',
            },
          },
          {
            type: 'PricingSection',
            props: {
              id: 'pricing-sales',
              title: 'Choose Your Plan',
              subtitle: 'Get started today',
              plans: [
                { name: 'Basic', price: '$97', features: 'Core features\nEmail support\n30-day guarantee', popular: 'no' },
                { name: 'Pro', price: '$197', features: 'All Basic features\nPriority support\nBonus materials\nLifetime updates', popular: 'yes' },
              ],
            },
          },
        ],
        root: {},
      },
      checkout: {
        content: [
          {
            type: 'FormSection',
            props: {
              id: 'form-checkout',
              title: 'Complete Your Order',
              subtitle: 'Secure checkout - Your information is safe',
              buttonText: 'Complete Purchase',
            },
          },
        ],
        root: {},
      },
      thankyou: {
        content: [
          {
            type: 'HeroSection',
            props: {
              id: 'hero-thankyou',
              title: 'Thank You!',
              subtitle: 'Your order has been confirmed. Check your email for details.',
              buttonText: 'Go to Dashboard',
              buttonLink: '/dashboard',
              backgroundColor: 'bg-gradient-to-br from-green-600 to-teal-600',
            },
          },
        ],
        root: {},
      },
      upsell: {
        content: [
          {
            type: 'HeadingBlock',
            props: {
              id: 'heading-upsell',
              children: 'Wait! Special One-Time Offer',
              align: 'center',
              size: 'text-6xl',
            },
          },
          {
            type: 'TextBlock',
            props: {
              id: 'text-upsell',
              text: 'Upgrade your order now and get exclusive bonuses at a special price.',
              align: 'center',
            },
          },
          {
            type: 'ButtonBlock',
            props: {
              id: 'button-upsell',
              text: 'Yes, Add This Upgrade!',
              href: '#upgrade',
              variant: 'primary',
              size: 'lg',
            },
          },
        ],
        root: {},
      },
    }

    return genericTemplates[pageType] || genericTemplates.landing
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
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
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 py-2.5 rounded-lg hover:bg-primary-50 font-medium transition-colors"
                  >
                    <FiEye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => useTemplate(tpl)}
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium transition-colors"
                  >
                    {busy ? 'Creating...' : 'Use Template'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
