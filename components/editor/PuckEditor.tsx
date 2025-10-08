'use client'

import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context/AppContext'
import { useEffect, useState } from 'react'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import {
  Testimonial,
  FAQ,
  CountdownTimer,
  StatsSection,
  VideoSection,
  ProgressBar,
  GuaranteeBadge,
  ComparisonTable,
  SocialProof,
  LogoCloud,
  AlertBanner
} from '@/components/editor/AdvancedComponents'

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
        url: { 
          type: 'custom' as const,
          render: ({ value, onChange }: any) => {
            const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]
              if (file) {
                // Convert to base64 for local storage
                const reader = new FileReader()
                reader.onloadend = () => {
                  onChange(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }

            return (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL or Upload
                  </label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <label className="block">
                    <span className="sr-only">Choose file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload from computer or paste URL above
                  </p>
                </div>
                {value && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img 
                      src={value} 
                      alt="Preview" 
                      className="max-w-full h-auto rounded-md border border-gray-200"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
            )
          }
        },
        alt: { 
          type: 'text' as const,
          label: 'Alt Text (for accessibility)',
        },
        width: {
          type: 'select' as const,
          label: 'Image Width',
          options: [
            { label: 'Small (384px)', value: 'max-w-sm' },
            { label: 'Medium (448px)', value: 'max-w-md' },
            { label: 'Large (672px)', value: 'max-w-2xl' },
            { label: 'Extra Large (896px)', value: 'max-w-4xl' },
            { label: 'Full Width', value: 'w-full' },
          ],
        },
      },
      defaultProps: {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        alt: 'Professional image',
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
    Testimonial: {
      fields: {
        name: { type: 'text' as const },
        role: { type: 'text' as const },
        quote: { type: 'textarea' as const },
        image: { type: 'text' as const },
        rating: {
          type: 'select' as const,
          options: [
            { label: '5 Stars', value: 5 },
            { label: '4 Stars', value: 4 },
            { label: '3 Stars', value: 3 },
          ],
        },
        style: {
          type: 'radio' as const,
          options: [
            { label: 'Card', value: 'card' },
            { label: 'Quote', value: 'quote' },
          ],
        },
      },
      defaultProps: {
        name: 'John Doe',
        role: 'CEO, Company',
        quote: 'This product completely transformed my business!',
        image: 'https://ui-avatars.com/api/?name=John+Doe&size=200',
        rating: 5,
        style: 'card',
      },
      render: (props: any) => <Testimonial props={props} />,
    },
    FAQ: {
      fields: {
        title: { type: 'text' as const },
        items: {
          type: 'array' as const,
          arrayFields: {
            question: { type: 'text' as const },
            answer: { type: 'textarea' as const },
          },
          defaultItemProps: {
            question: 'How does it work?',
            answer: 'Our system is designed to be simple and effective.',
          },
        },
      },
      defaultProps: {
        title: 'Frequently Asked Questions',
        items: [
          { question: 'How does it work?', answer: 'Our system is designed to be simple and effective.' },
          { question: 'Is there a guarantee?', answer: 'Yes, we offer a 30-day money-back guarantee.' },
        ],
      },
      render: (props: any) => <FAQ props={props} />,
    },
    CountdownTimer: {
      fields: {
        title: { type: 'text' as const },
        backgroundColor: {
          type: 'select' as const,
          options: [
            { label: 'Red', value: 'bg-red-600' },
            { label: 'Orange', value: 'bg-orange-600' },
            { label: 'Purple', value: 'bg-purple-600' },
          ],
        },
      },
      defaultProps: {
        title: 'Limited Time Offer Ends In:',
        backgroundColor: 'bg-red-600',
      },
      render: (props: any) => <CountdownTimer props={props} />,
    },
    StatsSection: {
      fields: {
        stats: {
          type: 'array' as const,
          arrayFields: {
            number: { type: 'text' as const },
            label: { type: 'text' as const },
          },
          defaultItemProps: {
            number: '10K+',
            label: 'Happy Customers',
          },
        },
        backgroundColor: {
          type: 'select' as const,
          options: [
            { label: 'Indigo', value: 'bg-indigo-600' },
            { label: 'Blue', value: 'bg-blue-600' },
            { label: 'Purple', value: 'bg-purple-600' },
          ],
        },
      },
      defaultProps: {
        stats: [
          { number: '10K+', label: 'Happy Customers' },
          { number: '$50M+', label: 'Revenue Generated' },
          { number: '99%', label: 'Satisfaction Rate' },
        ],
        backgroundColor: 'bg-indigo-600',
      },
      render: (props: any) => <StatsSection props={props} />,
    },
    VideoSection: {
      fields: {
        title: { type: 'text' as const },
        subtitle: { type: 'textarea' as const },
        videoUrl: { type: 'text' as const },
      },
      defaultProps: {
        title: 'Watch This Video',
        subtitle: 'Discover how our system works',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      render: (props: any) => <VideoSection props={props} />,
    },
    ProgressBar: {
      fields: {
        title: { type: 'text' as const },
        percentage: {
          type: 'number' as const,
          min: 0,
          max: 100,
        },
        showPercentage: {
          type: 'radio' as const,
          options: [
            { label: 'Show', value: true },
            { label: 'Hide', value: false },
          ],
        },
      },
      defaultProps: {
        title: 'Your Progress',
        percentage: 75,
        showPercentage: true,
      },
      render: (props: any) => <ProgressBar props={props} />,
    },
    GuaranteeBadge: {
      fields: {
        title: { type: 'text' as const },
        description: { type: 'textarea' as const },
        icon: { type: 'text' as const },
        style: {
          type: 'radio' as const,
          options: [
            { label: 'Badge', value: 'badge' },
            { label: 'Banner', value: 'banner' },
          ],
        },
      },
      defaultProps: {
        title: '30-Day Money Back Guarantee',
        description: "If you're not satisfied, get a full refund. No questions asked.",
        icon: '🛡️',
        style: 'badge',
      },
      render: (props: any) => <GuaranteeBadge props={props} />,
    },
    ComparisonTable: {
      fields: {
        title: { type: 'text' as const },
        plans: {
          type: 'array' as const,
          arrayFields: {
            name: { type: 'text' as const },
            price: { type: 'text' as const },
            features: { type: 'textarea' as const },
            highlighted: {
              type: 'radio' as const,
              options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ],
            },
          },
          defaultItemProps: {
            name: 'Basic',
            price: '$29',
            features: 'Feature 1\nFeature 2\nFeature 3',
            highlighted: false,
          },
        },
      },
      defaultProps: {
        title: 'Choose Your Plan',
        plans: [
          { name: 'Basic', price: '$29', features: 'Feature 1\nFeature 2\nFeature 3', highlighted: false },
          { name: 'Pro', price: '$99', features: 'All Basic\nFeature 4\nFeature 5\nFeature 6', highlighted: true },
        ],
      },
      render: (props: any) => <ComparisonTable props={props} />,
    },
    SocialProof: {
      fields: {
        message: { type: 'text' as const },
        type: {
          type: 'select' as const,
          options: [
            { label: 'Viewers', value: 'viewers' },
            { label: 'Sales', value: 'sales' },
          ],
        },
        backgroundColor: {
          type: 'select' as const,
          options: [
            { label: 'Orange', value: 'bg-orange-500' },
            { label: 'Red', value: 'bg-red-500' },
            { label: 'Green', value: 'bg-green-500' },
          ],
        },
      },
      defaultProps: {
        message: '1,247 people are viewing this offer right now',
        type: 'viewers',
        backgroundColor: 'bg-orange-500',
      },
      render: (props: any) => <SocialProof props={props} />,
    },
    LogoCloud: {
      fields: {
        title: { type: 'text' as const },
        logos: {
          type: 'array' as const,
          arrayFields: {
            name: { type: 'text' as const },
            url: { type: 'text' as const },
          },
          defaultItemProps: {
            name: 'Company 1',
            url: 'https://via.placeholder.com/150x50?text=Logo',
          },
        },
      },
      defaultProps: {
        title: 'Trusted by leading companies',
        logos: [
          { name: 'Company 1', url: 'https://via.placeholder.com/150x50?text=Logo1' },
          { name: 'Company 2', url: 'https://via.placeholder.com/150x50?text=Logo2' },
          { name: 'Company 3', url: 'https://via.placeholder.com/150x50?text=Logo3' },
        ],
      },
      render: (props: any) => <LogoCloud props={props} />,
    },
    AlertBanner: {
      fields: {
        message: { type: 'text' as const },
        type: {
          type: 'select' as const,
          options: [
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Info', value: 'info' },
          ],
        },
        dismissible: {
          type: 'radio' as const,
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultProps: {
        message: 'Limited time offer - Save 50% today!',
        type: 'warning',
        dismissible: true,
      },
      render: (props: any) => <AlertBanner props={props} />,
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
        console.log('Loading page content:', page.content)
        const parsed = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
        console.log('Parsed content:', parsed)
        if (parsed && (parsed.content || parsed.root)) {
          setData(parsed)
          console.log('Page data loaded successfully with', parsed.content?.length || 0, 'components')
        } else {
          console.log('No valid content found, using empty data')
        }
      } catch (e) {
        console.error('Error parsing page content:', e)
        console.log('Using default empty data')
      }
    } else {
      console.log('No page content available yet')
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
    const previewWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!previewWindow) return

    // Render Puck components to HTML
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Preview - ${page?.name}</title>
          <style>body { margin: 0; padding: 0; }</style>
        </head>
        <body class="bg-white">
    `
    
    // Render each component
    if (data.content) {
      data.content.forEach((component: any) => {
        html += renderComponentToHTML(component)
      })
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
                  <input type="text" placeholder="Your Name" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
                  <input type="email" placeholder="Your Email" class="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none" />
                  <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg">${props.buttonText}</button>
                </form>
              </div>
            </div>
          </section>
        `
      case 'HeadingBlock':
        return `<div class="max-w-7xl mx-auto px-6"><h1 class="${props.size} font-bold mb-4" style="text-align: ${props.align}">${props.children}</h1></div>`
      case 'TextBlock':
        return `<div class="max-w-7xl mx-auto px-6"><p class="text-lg text-gray-700 mb-4" style="text-align: ${props.align}">${props.text}</p></div>`
      case 'ButtonBlock':
        const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
        const variantClasses = { primary: 'bg-indigo-600 text-white hover:bg-indigo-700', secondary: 'bg-gray-600 text-white hover:bg-gray-700', outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50' }
        return `<div class="max-w-7xl mx-auto px-6 text-center mb-8"><a href="${props.href}" class="font-semibold rounded-lg inline-block ${sizeClasses[props.size as keyof typeof sizeClasses]} ${variantClasses[props.variant as keyof typeof variantClasses]}">${props.text}</a></div>`
      case 'ImageBlock':
        return `<div class="max-w-7xl mx-auto px-6"><div class="${props.width} mx-auto mb-8"><img src="${props.url}" alt="${props.alt}" class="w-full h-auto rounded-xl shadow-lg" /></div></div>`
      case 'DividerBlock':
        return `<div class="max-w-7xl mx-auto px-6"><hr class="my-8 border-gray-300 border-${props.style}" /></div>`
      case 'SpacerBlock':
        return `<div style="height: ${props.height}"></div>`
      case 'Testimonial':
        const stars = Array.from({ length: 5 }, (_, i) => i < props.rating)
        const starsHTML = stars.map(filled => `<span class="${filled ? 'text-yellow-400' : 'text-gray-300'}">★</span>`).join('')
        if (props.style === 'quote') {
          return `
            <div class="bg-white p-8 rounded-2xl relative max-w-4xl mx-auto my-8">
              <div class="text-6xl text-indigo-600 opacity-20 absolute top-4 left-4">"</div>
              <p class="text-xl text-gray-700 italic mb-6 pl-12">${props.quote}</p>
              <div class="flex items-center space-x-4">
                <img src="${props.image}" alt="${props.name}" class="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div class="font-bold text-gray-900">${props.name}</div>
                  <div class="text-gray-600">${props.role}</div>
                  <div class="flex space-x-1 mt-1">${starsHTML}</div>
                </div>
              </div>
            </div>
          `
        }
        return `
          <div class="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
            <div class="flex items-center space-x-4 mb-4">
              <img src="${props.image}" alt="${props.name}" class="w-20 h-20 rounded-full object-cover" />
              <div>
                <div class="font-bold text-xl text-gray-900">${props.name}</div>
                <div class="text-gray-600">${props.role}</div>
                <div class="flex space-x-1 mt-1">${starsHTML}</div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed">${props.quote}</p>
          </div>
        `
      case 'FAQ':
        const faqItems = props.items.map((item: any) => `
          <details class="bg-white rounded-xl p-6 shadow-sm">
            <summary class="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
              ${item.question}
              <span class="text-indigo-600 text-2xl">+</span>
            </summary>
            <p class="mt-4 text-gray-600">${item.answer}</p>
          </details>
        `).join('')
        return `
          <div class="bg-gray-50 py-16 px-6">
            <div class="max-w-4xl mx-auto">
              <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">${props.title}</h2>
              <div class="space-y-4">${faqItems}</div>
            </div>
          </div>
        `
      case 'CountdownTimer':
        return `
          <div class="${props.backgroundColor} text-white py-8 px-6">
            <div class="max-w-4xl mx-auto text-center">
              <h3 class="text-2xl font-bold mb-6">${props.title}</h3>
              <div class="flex justify-center space-x-4">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div class="text-4xl font-bold">23</div>
                  <div class="text-sm opacity-90">Hours</div>
                </div>
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div class="text-4xl font-bold">59</div>
                  <div class="text-sm opacity-90">Minutes</div>
                </div>
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div class="text-4xl font-bold">45</div>
                  <div class="text-sm opacity-90">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        `
      case 'StatsSection':
        const statsHTML = props.stats.map((stat: any) => `
          <div class="text-center">
            <div class="text-5xl font-bold mb-2">${stat.number}</div>
            <div class="text-lg opacity-90">${stat.label}</div>
          </div>
        `).join('')
        return `
          <div class="${props.backgroundColor} text-white py-16 px-6">
            <div class="max-w-7xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">${statsHTML}</div>
            </div>
          </div>
        `
      case 'VideoSection':
        return `
          <div class="bg-gray-900 text-white py-20 px-6">
            <div class="max-w-5xl mx-auto">
              <div class="text-center mb-12">
                <h2 class="text-5xl font-bold mb-4">${props.title}</h2>
                <p class="text-xl opacity-90">${props.subtitle}</p>
              </div>
              <div class="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p class="text-sm opacity-75">Click to play video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      case 'ProgressBar':
        return `
          <div class="py-8 px-6">
            <div class="max-w-3xl mx-auto">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900">${props.title}</h3>
                ${props.showPercentage ? `<span class="text-sm font-medium text-gray-600">${props.percentage}%</span>` : ''}
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-green-500 h-full transition-all duration-500" style="width: ${props.percentage}%"></div>
              </div>
            </div>
          </div>
        `
      case 'GuaranteeBadge':
        if (props.style === 'banner') {
          return `
            <div class="bg-green-50 border-l-4 border-green-500 p-6 max-w-6xl mx-auto my-8">
              <div class="flex items-center space-x-4">
                <span class="text-5xl">${props.icon}</span>
                <div>
                  <h3 class="text-xl font-bold text-green-900">${props.title}</h3>
                  <p class="text-green-700">${props.description}</p>
                </div>
              </div>
            </div>
          `
        }
        return `
          <div class="flex justify-center py-8">
            <div class="bg-white rounded-full shadow-lg px-8 py-4 flex items-center space-x-3 border-2 border-green-500">
              <span class="text-3xl">${props.icon}</span>
              <div>
                <div class="font-bold text-gray-900">${props.title}</div>
                <div class="text-sm text-gray-600">${props.description}</div>
              </div>
            </div>
          </div>
        `
      case 'ComparisonTable':
        const compPlansHTML = props.plans.map((plan: any) => `
          <div class="${plan.highlighted ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105' : 'bg-white border-2 border-gray-200'} rounded-2xl p-8">
            ${plan.highlighted ? '<div class="text-center mb-4"><span class="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">BEST VALUE</span></div>' : ''}
            <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
            <div class="text-5xl font-bold mb-6">${plan.price}</div>
            <ul class="space-y-3 mb-8">
              ${plan.features.split('\n').map((f: string) => `<li class="flex items-center space-x-2"><span class="text-green-400">✓</span><span>${f}</span></li>`).join('')}
            </ul>
            <button class="w-full ${plan.highlighted ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} py-3 rounded-lg font-bold">Get Started</button>
          </div>
        `).join('')
        return `
          <div class="py-16 px-6">
            <div class="max-w-6xl mx-auto">
              <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">${props.title}</h2>
              <div class="grid md:grid-cols-2 gap-8">${compPlansHTML}</div>
            </div>
          </div>
        `
      case 'SocialProof':
        return `
          <div class="${props.backgroundColor} text-white py-3 px-6 text-center">
            <div class="flex items-center justify-center space-x-2">
              <span class="animate-pulse">🔥</span>
              <span class="font-semibold">${props.message}</span>
            </div>
          </div>
        `
      case 'LogoCloud':
        const logosHTML = props.logos.map((logo: any) => `
          <div class="opacity-50 hover:opacity-100 transition-opacity">
            <img src="${logo.url}" alt="${logo.name}" class="h-12 grayscale hover:grayscale-0" />
          </div>
        `).join('')
        return `
          <div class="bg-gray-100 py-12 px-6">
            <div class="max-w-6xl mx-auto">
              <h3 class="text-center text-gray-600 font-semibold mb-8">${props.title}</h3>
              <div class="flex flex-wrap justify-center items-center gap-8">${logosHTML}</div>
            </div>
          </div>
        `
      case 'AlertBanner':
        const alertColors: any = {
          success: 'bg-green-100 border-green-500 text-green-900',
          warning: 'bg-yellow-100 border-yellow-500 text-yellow-900',
          error: 'bg-red-100 border-red-500 text-red-900',
          info: 'bg-blue-100 border-blue-500 text-blue-900'
        }
        return `
          <div class="${alertColors[props.type]} border-l-4 p-4">
            <div class="flex items-center justify-between">
              <p class="font-medium">${props.message}</p>
              ${props.dismissible ? '<button class="text-xl opacity-50 hover:opacity-100">×</button>' : ''}
            </div>
          </div>
        `
      default:
        return ''
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
