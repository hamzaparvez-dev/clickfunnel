'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/lib/context/AppContext'
import { getPuckTemplateData } from '@/lib/data/puck-templates'

const allTemplates = [
  // Lead Funnel Templates
  {
    id: 'squeeze-orange',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'orange',
    preview: '/templates/squeeze-orange.png',
    gradient: 'from-orange-500 to-orange-600',
    steps: 2
  },
  {
    id: 'squeeze-purple',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'purple',
    preview: '/templates/squeeze-purple.png',
    gradient: 'from-purple-500 to-purple-600',
    steps: 2
  },
  {
    id: 'squeeze-teal',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'teal',
    preview: '/templates/squeeze-teal.png',
    gradient: 'from-teal-500 to-teal-600',
    steps: 2
  },
  {
    id: 'squeeze-green',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'green',
    preview: '/templates/squeeze-green.png',
    gradient: 'from-green-500 to-green-600',
    steps: 2
  },
  {
    id: 'squeeze-blue',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'blue',
    preview: '/templates/squeeze-blue.png',
    gradient: 'from-blue-500 to-blue-600',
    steps: 2
  },
  {
    id: 'squeeze-dark',
    name: 'Lead Squeeze Funnel',
    type: 'squeeze',
    category: 'lead',
    color: 'dark',
    preview: '/templates/squeeze-dark.png',
    gradient: 'from-gray-800 to-gray-900',
    steps: 2
  },
  {
    id: 'summit-orange',
    name: 'Summit Funnel',
    type: 'summit',
    category: 'lead',
    color: 'orange',
    preview: '/templates/summit-orange.png',
    gradient: 'from-orange-600 to-red-600',
    steps: 4
  },
  {
    id: 'summit-purple',
    name: 'Summit Funnel',
    type: 'summit',
    category: 'lead',
    color: 'purple',
    preview: '/templates/summit-purple.png',
    gradient: 'from-purple-600 to-pink-600',
    steps: 4
  },
  
  // Unboxing Funnel Templates
  {
    id: 'book-orange',
    name: 'Book Funnel',
    type: 'book',
    category: 'unboxing',
    color: 'orange',
    preview: '/templates/book-orange.png',
    gradient: 'from-orange-500 to-amber-600',
    steps: 3
  },
  {
    id: 'book-blue',
    name: 'Book Funnel',
    type: 'book',
    category: 'unboxing',
    color: 'blue',
    preview: '/templates/book-blue.png',
    gradient: 'from-blue-600 to-indigo-700',
    steps: 3
  },
  {
    id: 'cart-green',
    name: 'Cart Funnel',
    type: 'cart',
    category: 'unboxing',
    color: 'green',
    preview: '/templates/cart-green.png',
    gradient: 'from-green-500 to-emerald-600',
    steps: 3
  },
  {
    id: 'cart-purple',
    name: 'Cart Funnel',
    type: 'cart',
    category: 'unboxing',
    color: 'purple',
    preview: '/templates/cart-purple.png',
    gradient: 'from-purple-500 to-violet-600',
    steps: 3
  },
  {
    id: 'challenge-orange',
    name: 'Challenge Funnel',
    type: 'challenge',
    category: 'unboxing',
    color: 'orange',
    preview: '/templates/challenge-orange.png',
    gradient: 'from-orange-600 to-red-700',
    steps: 4
  },
  {
    id: 'challenge-teal',
    name: 'Challenge Funnel',
    type: 'challenge',
    category: 'unboxing',
    color: 'teal',
    preview: '/templates/challenge-teal.png',
    gradient: 'from-teal-500 to-cyan-600',
    steps: 4
  },
  
  // Presentation Funnel Templates
  {
    id: 'vsl-orange',
    name: 'Video Sales Letter',
    type: 'vsl',
    category: 'presentation',
    color: 'orange',
    preview: '/templates/vsl-orange.png',
    gradient: 'from-orange-600 to-red-600',
    steps: 4
  },
  {
    id: 'vsl-blue',
    name: 'Video Sales Letter',
    type: 'vsl',
    category: 'presentation',
    color: 'blue',
    preview: '/templates/vsl-blue.png',
    gradient: 'from-blue-600 to-indigo-700',
    steps: 4
  },
  {
    id: 'webinar-purple',
    name: 'Webinar Funnel',
    type: 'webinar',
    category: 'presentation',
    color: 'purple',
    preview: '/templates/webinar-purple.png',
    gradient: 'from-purple-600 to-pink-700',
    steps: 4
  },
  {
    id: 'webinar-teal',
    name: 'Webinar Funnel',
    type: 'webinar',
    category: 'presentation',
    color: 'teal',
    preview: '/templates/webinar-teal.png',
    gradient: 'from-teal-600 to-cyan-700',
    steps: 4
  },
  
  // Phone Funnel Templates
  {
    id: 'application-orange',
    name: 'Application Funnel',
    type: 'application',
    category: 'phone',
    color: 'orange',
    preview: '/templates/application-orange.png',
    gradient: 'from-orange-600 to-amber-700',
    steps: 3
  },
  {
    id: 'application-blue',
    name: 'Application Funnel',
    type: 'application',
    category: 'phone',
    color: 'blue',
    preview: '/templates/application-blue.png',
    gradient: 'from-blue-600 to-indigo-700',
    steps: 3
  }
]

export function FunnelTemplatesGallery() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createFunnel, createPage, updatePage } = useApp()
  const [installing, setInstalling] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  const funnelType = searchParams?.get('type') || 'squeeze'
  const funnelCategory = searchParams?.get('category') || 'lead'

  // Filter templates based on category
  const templates = allTemplates.filter(t => t.category === funnelCategory)

  const handlePreviewTemplate = (template: any) => {
    // Open preview in new window
    const previewWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!previewWindow) {
      alert('Please allow popups to preview templates')
      return
    }

    // Build HTML for preview
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Template Preview - ${template.name}</title>
          <style>body { margin: 0; padding: 0; }</style>
        </head>
        <body>
    `

    // Add Squeeze Page content
    html += `
      <section class="bg-gradient-to-br ${template.gradient} text-white py-24 px-6 min-h-screen flex items-center">
        <div class="max-w-5xl mx-auto text-center w-full">
          <h1 class="text-6xl font-bold mb-6">Get Your Free Guide Now!</h1>
          <p class="text-2xl mb-10 opacity-90">Join thousands of successful entrepreneurs who have transformed their business</p>
          
          <div class="max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-10 mt-12">
            <h2 class="text-3xl font-bold mb-6">Enter Your Details</h2>
            <p class="text-lg mb-8 opacity-90">Get instant access to your free guide</p>
            <form class="space-y-4">
              <input type="text" placeholder="Your Name" class="w-full px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30" />
              <input type="email" placeholder="Your Email" class="w-full px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30" />
              <button type="submit" class="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                Get Free Access →
              </button>
            </form>
            <p class="text-sm mt-4 opacity-75">🔒 Your information is 100% secure</p>
          </div>
        </div>
      </section>

      <section class="py-20 px-6 bg-gray-50">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">What You'll Get</h2>
          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="text-5xl mb-4">📚</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Complete Guide</h3>
              <p class="text-gray-600">Everything you need to get started</p>
            </div>
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="text-5xl mb-4">🎯</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Action Steps</h3>
              <p class="text-gray-600">Clear roadmap to success</p>
            </div>
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="text-5xl mb-4">💎</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Bonus Resources</h3>
              <p class="text-gray-600">Extra tools and templates</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="bg-gray-900 text-white py-8 px-6">
        <div class="max-w-5xl mx-auto text-center">
          <p class="text-sm opacity-75">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    `

    html += '</body></html>'
    
    previewWindow.document.write(html)
    previewWindow.document.close()
  }

  const getTemplateContent = (template: any, pageType: string) => {
    const baseContent: any = { content: [], root: {} }

    // Lead Funnel Content
    if (template.category === 'lead') {
      if (template.type === 'squeeze') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'Get Your Free Guide Now!',
                subtitle: 'Join thousands of successful entrepreneurs who have transformed their business',
                buttonText: 'Download Free Guide',
                buttonLink: '#form',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FormSection',
              props: {
                id: 'form-1',
                title: 'Enter Your Details Below',
                subtitle: 'Get instant access to your free guide',
                buttonText: 'Get Free Access →',
              },
            },
          ]
        } else if (pageType === 'thankyou') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-ty',
                title: 'Thank You! 🎉',
                subtitle: 'Check your email for your free guide',
                buttonText: 'Back to Home',
                buttonLink: '/',
                backgroundColor: 'bg-gradient-to-br from-green-500 to-teal-600',
              },
            },
          ]
        }
      } else if (template.type === 'summit') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'Join Our Exclusive Summit',
                subtitle: 'Learn from 20+ industry experts over 5 days',
                buttonText: 'Register Now - Free',
                buttonLink: '#register',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FeatureGrid',
              props: {
                id: 'speakers',
                title: 'Featured Speakers',
                subtitle: 'World-class experts sharing their secrets',
                features: [
                  { icon: '👨‍💼', title: 'John Doe', description: 'CEO of TechCorp' },
                  { icon: '👩‍💼', title: 'Jane Smith', description: 'Marketing Expert' },
                  { icon: '👨‍🏫', title: 'Bob Johnson', description: 'Sales Strategist' },
                ],
              },
            },
          ]
        }
      }
    }
    
    // Unboxing Funnel Content
    else if (template.category === 'unboxing') {
      if (template.type === 'book') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'Get Your FREE Book',
                subtitle: 'Just cover shipping & handling',
                buttonText: 'Claim Your Copy',
                buttonLink: '#order',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'PricingSection',
              props: {
                id: 'pricing-1',
                title: 'Special Offer',
                subtitle: 'Limited time only',
                plans: [
                  { 
                    name: 'Physical Book', 
                    price: '$7.95', 
                    features: 'Free book\nJust pay shipping\n30-day guarantee',
                    popular: 'yes'
                  },
                ],
              },
            },
          ]
        }
      } else if (template.type === 'cart') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'Shop Our Products',
                subtitle: 'Premium quality, unbeatable prices',
                buttonText: 'Browse Collection',
                buttonLink: '#products',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FeatureGrid',
              props: {
                id: 'products',
                title: 'Featured Products',
                subtitle: 'Our best sellers',
                features: [
                  { icon: '📦', title: 'Product 1', description: 'Starting at $29.99' },
                  { icon: '🎁', title: 'Product 2', description: 'Starting at $49.99' },
                  { icon: '💎', title: 'Product 3', description: 'Starting at $99.99' },
                ],
              },
            },
          ]
        }
      } else if (template.type === 'challenge') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: '5-Day Challenge',
                subtitle: 'Transform your business in just 5 days',
                buttonText: 'Join The Challenge',
                buttonLink: '#join',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FeatureGrid',
              props: {
                id: 'days',
                title: 'What You\'ll Learn',
                subtitle: 'Daily actionable lessons',
                features: [
                  { icon: '📅', title: 'Day 1', description: 'Foundation & Strategy' },
                  { icon: '🚀', title: 'Day 2', description: 'Launch & Scale' },
                  { icon: '💰', title: 'Day 3', description: 'Monetization' },
                ],
              },
            },
          ]
        }
      }
    }
    
    // Presentation Funnel Content
    else if (template.category === 'presentation') {
      if (template.type === 'vsl') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeadingBlock',
              props: {
                id: 'headline',
                children: 'Watch This Video To Discover...',
                align: 'center',
                size: 'text-5xl',
              },
            },
            {
              type: 'TextBlock',
              props: {
                id: 'subhead',
                text: 'The secret system that helped 10,000+ entrepreneurs scale their business',
                align: 'center',
              },
            },
            {
              type: 'ButtonBlock',
              props: {
                id: 'cta',
                text: 'Get Started Now',
                href: '#order',
                variant: 'primary',
                size: 'lg',
              },
            },
          ]
        }
      } else if (template.type === 'webinar') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'FREE Live Webinar',
                subtitle: 'Learn the exact strategies to 10x your business',
                buttonText: 'Register For Free',
                buttonLink: '#register',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FormSection',
              props: {
                id: 'register',
                title: 'Save Your Seat',
                subtitle: 'Limited spots available',
                buttonText: 'Register Now',
              },
            },
          ]
        }
      }
    }
    
    // Phone Funnel Content
    else if (template.category === 'phone') {
      if (template.type === 'application') {
        if (pageType === 'landing') {
          baseContent.content = [
            {
              type: 'HeroSection',
              props: {
                id: 'hero-1',
                title: 'Apply To Work With Us',
                subtitle: 'Limited coaching spots available',
                buttonText: 'Start Application',
                buttonLink: '#apply',
                backgroundColor: `bg-gradient-to-br ${template.gradient}`,
              },
            },
            {
              type: 'FormSection',
              props: {
                id: 'application',
                title: 'Application Form',
                subtitle: 'Tell us about your business',
                buttonText: 'Submit Application',
              },
            },
          ]
        }
      }
    }

    return baseContent
  }

  const handleSelectTemplate = async (template: any) => {
    setSelectedTemplate(template)
    setInstalling(true)

    try {
      // Create funnel
      const funnel = await createFunnel({
        name: `${template.name} - ${template.color}`,
        description: `High-quality ${template.name} template`,
      })

      // Determine pages based on template type
      const pages = []
      
      if (template.type === 'squeeze') {
        pages.push(
          { name: 'Squeeze Page', type: 'landing' },
          { name: 'Thank You Page', type: 'thankyou' }
        )
      } else if (template.type === 'summit') {
        pages.push(
          { name: 'Registration Page', type: 'landing' },
          { name: 'Confirmation Page', type: 'thankyou' }
        )
      } else if (template.type === 'book') {
        pages.push(
          { name: 'Sales Page', type: 'landing' },
          { name: 'Checkout', type: 'checkout' },
          { name: 'Thank You', type: 'thankyou' }
        )
      } else if (template.type === 'cart') {
        pages.push(
          { name: 'Product Page', type: 'landing' },
          { name: 'Cart', type: 'checkout' },
          { name: 'Order Confirmation', type: 'thankyou' }
        )
      } else if (template.type === 'challenge') {
        pages.push(
          { name: 'Challenge Landing', type: 'landing' },
          { name: 'Registration', type: 'landing' },
          { name: 'Confirmation', type: 'thankyou' }
        )
      } else if (template.type === 'vsl' || template.type === 'webinar') {
        pages.push(
          { name: 'Video Page', type: 'landing' },
          { name: 'Sales Page', type: 'sales' },
          { name: 'Checkout', type: 'checkout' },
          { name: 'Thank You', type: 'thankyou' }
        )
      } else if (template.type === 'application') {
        pages.push(
          { name: 'Application Page', type: 'landing' },
          { name: 'Booking Page', type: 'thankyou' }
        )
      }

      // Create all pages with content
      for (const pageInfo of pages) {
        const page = await createPage(funnel.id, {
          name: pageInfo.name,
          type: pageInfo.type,
        })

        const content = getTemplateContent(template, pageInfo.type)
        await updatePage(page.id, { content: JSON.stringify(content) })
      }

      // Redirect to funnel after a delay
      setTimeout(() => {
        router.push(`/funnels/${funnel.id}`)
      }, 2000)
    } catch (error) {
      console.error('Error installing funnel:', error)
      setInstalling(false)
      alert('Failed to install funnel. Please try again.')
    }
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-blue-600 font-medium">FUNNELS</span>
              <FiChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">NEW</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Browse Templates</h1>
            <button
              onClick={() => router.push('/funnels/templates?scratch=true')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
            >
              <span>⚡</span>
              <span>Start from Scratch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-xl transition-all">
                  {/* Template Preview */}
                  <div className={`h-48 bg-gradient-to-br ${template.gradient} p-6 flex items-center justify-center text-white relative`}>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{template.name}</div>
                      <div className="text-sm opacity-90">FUNNEL STEPS - {template.steps}</div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-xs font-semibold">CF 2.0</span>
                    </div>
                  </div>

                  {/* Template Actions */}
                  <div className="p-4 space-y-3">
                    <button
                      onClick={() => handleSelectTemplate(template)}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2"
                    >
                      <span>→</span>
                      <span>Select Funnel</span>
                    </button>
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                      Preview Template
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
        {installing && (
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
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Installing your new Funnel...</h2>
                <p className="text-gray-600">When we're finished, we'll make a suggestion on what to do next.</p>
              </div>
              <p className="text-sm text-gray-500">You can close this screen at any time.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

