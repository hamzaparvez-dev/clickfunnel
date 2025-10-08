'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiChevronRight, FiPlay } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const funnelCategories = [
  {
    id: 'lead',
    name: 'Lead Funnels',
    icon: '🎯',
    color: 'from-blue-500 to-indigo-600',
    types: [
      {
        id: 'squeeze',
        name: 'Lead "Squeeze" Funnel',
        description: 'Use curiosity to generate leads with this simple two page funnel',
        steps: 2,
        videoUrl: 'https://www.youtube.com/embed/example'
      },
      {
        id: 'summit',
        name: 'Summit Funnel',
        description: 'Grow your list and build your following by running a summit funnel',
        steps: 4
      }
    ]
  },
  {
    id: 'unboxing',
    name: 'Unboxing Funnels',
    icon: '📦',
    color: 'from-green-500 to-teal-600',
    types: [
      {
        id: 'book',
        name: 'Book Funnel',
        description: 'Use a low ticket front end product and then upsell your other products',
        steps: 3
      },
      {
        id: 'cart',
        name: 'Cart Funnel',
        description: 'Sell your products online',
        steps: 3
      },
      {
        id: 'challenge',
        name: 'Challenge Funnel',
        description: 'Create engagement, build momentum and sell your high ticket offer',
        steps: 4
      }
    ]
  },
  {
    id: 'presentation',
    name: 'Presentation Funnels',
    icon: '🎬',
    color: 'from-purple-500 to-pink-600',
    types: [
      {
        id: 'vsl',
        name: 'Video Sales Letter Funnel',
        description: 'Use video to sell your products or services through a VSL funnel',
        steps: 4
      },
      {
        id: 'webinar',
        name: 'Webinar Funnel',
        description: 'This funnel will get people to registered and attend your webinar events',
        steps: 4
      },
      {
        id: 'product-launch',
        name: 'Product Launch Funnel',
        description: 'Built anticipation for your new product with our product launch funnels',
        steps: 6
      }
    ]
  },
  {
    id: 'phone',
    name: 'Phone Funnels',
    icon: '📞',
    color: 'from-orange-500 to-red-600',
    types: [
      {
        id: 'application',
        name: 'Application Funnel',
        description: 'Get people to apply to work with you or your company',
        steps: 3
      },
      {
        id: 'auto-webinar',
        name: 'Auto Webinar Funnel',
        description: 'Run automated webinars to sell your products on autopilot',
        steps: 5
      }
    ]
  }
]

export function FunnelTypeSelector() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<any>(null)
  const [showVideo, setShowVideo] = useState(false)

  const handleSelectType = (category: any, type: any) => {
    setSelectedCategory(category.id)
    setSelectedType({ ...type, category: category.name, categoryColor: category.color })
    setShowVideo(true)
  }

  const handleBrowseTemplates = () => {
    const category = funnelCategories.find(c => c.name === selectedType.category)
    router.push(`/funnels/templates?type=${selectedType.id}&category=${category?.id}`)
  }

  if (showVideo && selectedType) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowVideo(false)}
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
        <div className="px-8 py-8">
          <div className={`bg-gradient-to-r ${selectedType.categoryColor} rounded-xl p-1 mb-8`}>
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{funnelCategories.find(c => c.name === selectedType.category)?.icon}</span>
                <h2 className={`text-3xl font-bold bg-gradient-to-r ${selectedType.categoryColor} bg-clip-text text-transparent`}>
                  {selectedType.category}
                </h2>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedType.name}</h1>
            <p className="text-gray-600">
              Not interested? <button onClick={() => setShowVideo(false)} className="text-blue-600 hover:underline">Pick another funnel type</button>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Section */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                      <FiPlay className="w-10 h-10 ml-1" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Enable sound</h3>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">FUNNEL OVERVIEW</h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">STEP #1</p>
                        <p className="text-gray-600">Squeeze Page</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎉</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">STEP #2</p>
                        <p className="text-gray-600">Thank You Page</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Locked Sections */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 relative">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Overview</h3>
                <p className="text-sm text-gray-600">Learn about this funnel type</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 relative">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Strategy</h3>
                <p className="text-sm text-gray-600">Marketing strategy breakdown</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 relative">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Implementation</h3>
                <p className="text-sm text-gray-600">Step-by-step setup guide</p>
              </div>

              <button
                onClick={handleBrowseTemplates}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:from-gray-900 hover:to-black transition-all shadow-lg"
              >
                Browse Templates
              </button>

              <button className="w-full border-2 border-gray-800 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                ⚡ Start from Scratch
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/funnels')}
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">What Would You Like To Build?</h1>
          <p className="text-xl text-gray-600">Get started by selecting a proven funnel type</p>
          <button
            onClick={() => router.push('/funnels/templates')}
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
          >
            <span>⚡</span>
            <span>Start from Scratch</span>
          </button>
        </div>

        {/* Funnel Categories */}
        <div className="space-y-16">
          {funnelCategories.map((category) => (
            <div key={category.id}>
              <div className={`inline-flex items-center space-x-3 mb-6 bg-gradient-to-r ${category.color} rounded-xl px-6 py-3`}>
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.types.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-400 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleSelectType(category, type)}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{type.name}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Includes {type.steps} funnel steps</span>
                      <button className={`px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all`}>
                        Select
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

