'use client'

import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { useEffect, useState } from 'react'
import { ArrowLeft, Save, Eye } from 'lucide-react'

// Define your components
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: { type: 'text' as const },
        align: {
          type: 'radio' as const,
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        size: {
          type: 'select' as const,
          options: [
            { label: 'Small', value: 'text-2xl' },
            { label: 'Medium', value: 'text-4xl' },
            { label: 'Large', value: 'text-6xl' },
          ],
        },
      },
      defaultProps: {
        children: 'Heading',
        align: 'left',
        size: 'text-4xl',
      },
      render: ({ children, align, size }: any) => {
        return (
          <h1 className={`${size} font-bold mb-4 text-${align}`} style={{ textAlign: align }}>
            {children}
          </h1>
        )
      },
    },
    TextBlock: {
      fields: {
        text: { type: 'textarea' as const },
        align: {
          type: 'radio' as const,
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        text: 'Enter your text here...',
        align: 'left',
      },
      render: ({ text, align }: any) => {
        return (
          <p className={`text-lg text-gray-700 mb-4 text-${align}`} style={{ textAlign: align }}>
            {text}
          </p>
        )
      },
    },
    ButtonBlock: {
      fields: {
        text: { type: 'text' as const },
        href: { type: 'text' as const },
        variant: {
          type: 'select' as const,
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        size: {
          type: 'select' as const,
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
      defaultProps: {
        text: 'Click Me',
        href: '#',
        variant: 'primary',
        size: 'md',
      },
      render: ({ text, href, variant, size }: any) => {
        const baseClasses = 'font-semibold rounded-lg transition-all inline-block'
        const sizeClasses = {
          sm: 'px-4 py-2 text-sm',
          md: 'px-6 py-3 text-base',
          lg: 'px-8 py-4 text-lg',
        }
        const variantClasses = {
          primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
          secondary: 'bg-gray-600 text-white hover:bg-gray-700',
          outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
        }
        return (
          <a
            href={href}
            className={`${baseClasses} ${sizeClasses[size as keyof typeof sizeClasses]} ${variantClasses[variant as keyof typeof variantClasses]}`}
          >
            {text}
          </a>
        )
      },
    },
    HeroSection: {
      fields: {
        title: { type: 'text' as const },
        subtitle: { type: 'textarea' as const },
        buttonText: { type: 'text' as const },
        buttonLink: { type: 'text' as const },
        backgroundColor: {
          type: 'select' as const,
          options: [
            { label: 'Indigo', value: 'bg-gradient-to-br from-indigo-600 to-purple-600' },
            { label: 'Blue', value: 'bg-gradient-to-br from-blue-600 to-cyan-600' },
            { label: 'Pink', value: 'bg-gradient-to-br from-pink-600 to-rose-600' },
          ],
        },
      },
      defaultProps: {
        title: 'Transform Your Business Today',
        subtitle: 'Join thousands of successful entrepreneurs',
        buttonText: 'Get Started Free',
        buttonLink: '#',
        backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
      },
      render: ({ title, subtitle, buttonText, buttonLink, backgroundColor }: any) => {
        return (
          <section className={`${backgroundColor} text-white py-24 px-6`}>
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-6xl font-bold mb-6">{title}</h1>
              <p className="text-2xl mb-10">{subtitle}</p>
              <a
                href={buttonLink}
                className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 inline-block"
              >
                {buttonText}
              </a>
            </div>
          </section>
        )
      },
    },
    FeatureGrid: {
      fields: {
        title: { type: 'text' as const },
        subtitle: { type: 'textarea' as const },
        features: {
          type: 'array' as const,
          arrayFields: {
            icon: { type: 'text' as const },
            title: { type: 'text' as const },
            description: { type: 'textarea' as const },
          },
          defaultItemProps: {
            icon: '⚡',
            title: 'Feature Title',
            description: 'Feature description goes here',
          },
        },
      },
      defaultProps: {
        title: 'Everything You Need',
        subtitle: 'Powerful features to help you succeed',
        features: [
          { icon: '⚡', title: 'Lightning Fast', description: 'Build pages in minutes' },
          { icon: '🎨', title: 'Beautiful Design', description: 'Stunning templates' },
          { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
        ],
      },
      render: ({ title, subtitle, features }: any) => {
        return (
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <p className="text-xl text-gray-600">{subtitle}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      },
    },
    PricingSection: {
      fields: {
        title: { type: 'text' as const },
        subtitle: { type: 'textarea' as const },
        plans: {
          type: 'array' as const,
          arrayFields: {
            name: { type: 'text' as const },
            price: { type: 'text' as const },
            features: { type: 'textarea' as const },
            popular: { type: 'radio' as const, options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
          },
          defaultItemProps: {
            name: 'Plan Name',
            price: '$29',
            features: 'Feature 1\nFeature 2\nFeature 3',
            popular: 'no',
          },
        },
      },
      defaultProps: {
        title: 'Simple Pricing',
        subtitle: 'Choose the perfect plan',
        plans: [
          { name: 'Starter', price: '$29', features: 'Up to 1,000 visitors\n5 funnels\nBasic analytics', popular: 'no' },
          { name: 'Professional', price: '$79', features: 'Up to 25,000 visitors\nUnlimited funnels\nAdvanced analytics', popular: 'yes' },
          { name: 'Enterprise', price: '$199', features: 'Unlimited visitors\nUnlimited funnels\nCustom analytics', popular: 'no' },
        ],
      },
      render: ({ title, subtitle, plans }: any) => {
        return (
          <section className="py-20 px-6 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4">{title}</h2>
                <p className="text-xl text-gray-400">{subtitle}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-8 ${
                      plan.popular === 'yes'
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 transform scale-105'
                        : 'bg-gray-800'
                    }`}
                  >
                    {plan.popular === 'yes' && (
                      <div className="text-center mb-4">
                        <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-5xl font-bold mb-6">
                      {plan.price}<span className="text-xl">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.split('\n').map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-green-400">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      },
    },
    FormSection: {
      fields: {
        title: { type: 'text' as const },
        subtitle: { type: 'textarea' as const },
        buttonText: { type: 'text' as const },
      },
      defaultProps: {
        title: 'Get Your Free Guide',
        subtitle: 'Download our comprehensive guide',
        buttonText: 'Download Now',
      },
      render: ({ title, subtitle, buttonText }: any) => {
        return (
          <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">{title}</h2>
                  <p className="text-gray-600">{subtitle}</p>
                </div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg"
                  >
                    {buttonText}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )
      },
    },
    ImageBlock: {
      fields: {
        url: { type: 'text' as const },
        alt: { type: 'text' as const },
        width: {
          type: 'select' as const,
          options: [
            { label: 'Small', value: 'max-w-sm' },
            { label: 'Medium', value: 'max-w-md' },
            { label: 'Large', value: 'max-w-2xl' },
            { label: 'Full', value: 'w-full' },
          ],
        },
      },
      defaultProps: {
        url: 'https://via.placeholder.com/800x400',
        alt: 'Placeholder image',
        width: 'max-w-2xl',
      },
      render: ({ url, alt, width }: any) => {
        return (
          <div className={`${width} mx-auto mb-8`}>
            <img src={url} alt={alt} className="w-full h-auto rounded-xl shadow-lg" />
          </div>
        )
      },
    },
    DividerBlock: {
      fields: {
        style: {
          type: 'select' as const,
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
          ],
        },
      },
      defaultProps: {
        style: 'solid',
      },
      render: ({ style }: any) => {
        return <hr className={`my-8 border-gray-300 border-${style}`} />
      },
    },
    SpacerBlock: {
      fields: {
        height: {
          type: 'select' as const,
          options: [
            { label: 'Small (20px)', value: '20px' },
            { label: 'Medium (40px)', value: '40px' },
            { label: 'Large (80px)', value: '80px' },
          ],
        },
      },
      defaultProps: {
        height: '40px',
      },
      render: ({ height }: any) => {
        return <div style={{ height }} />
      },
    },
  },
}

export function PuckEditor({ funnelId, pageId }: { funnelId: string; pageId: string }) {
  const router = useRouter()
  const { pages, updatePage } = useApp()
  const page = pages.find((p) => p.id === pageId)
  const [data, setData] = useState<any>({ content: [], root: {} })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (page?.content) {
      try {
        const parsed = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
        if (parsed.content || parsed.root) {
          setData(parsed)
        }
      } catch (e) {
        console.log('Using default empty data')
      }
    }
  }, [page])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updatePage(pageId, {
        content: JSON.stringify(data),
      })
      alert('✅ Page saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('❌ Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    // Open preview in new window
    const previewWindow = window.open('', '_blank')
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://cdn.tailwindcss.com"></script>
            <title>Preview - ${page?.name}</title>
          </head>
          <body class="bg-white">
            <div id="preview-root"></div>
          </body>
        </html>
      `)
      previewWindow.document.close()
    }
  }

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
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
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between px-6 shadow-lg z-50">
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
            <div className="font-bold">{page.name}</div>
            <div className="text-xs text-indigo-200">{page.type} page</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            <Eye size={18} />
            <span className="font-medium">Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition font-bold"
          >
            <Save size={18} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck config={config} data={data} onPublish={handleSave} onChange={setData} />
      </div>
    </div>
  )
}
