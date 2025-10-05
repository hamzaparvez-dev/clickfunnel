'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiStar, FiAward } from 'react-icons/fi'
import { useApp } from '@/lib/context/AppContext'
import { TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory, searchTemplates } from '@/lib/data/templates'

export function TemplatesGallery() {
  const router = useRouter()
  const { createFunnel, createPage } = useApp()
  const [category, setCategory] = useState('All Templates')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)

  const filtered = useMemo(() => {
    if (query.trim()) {
      return searchTemplates(query).filter((t) => category === 'All Templates' || t.category === category)
    }
    return getTemplatesByCategory(category)
  }, [category, query])

  const useTemplate = async (tpl: any) => {
    if (busy) return
    setBusy(true)
    try {
      const funnel = await createFunnel({
        name: tpl.name,
        description: tpl.description,
      })

      // Create pages from template definitions
      let firstPageId: string | null = null
      for (const pageDef of tpl.pageDefinitions) {
        const page = await createPage(funnel.id, {
          name: pageDef.name,
          type: pageDef.type,
        })
        
        // Update page with template content
        if (page && pageDef.content) {
          // Store the template HTML/CSS in the page
          page.content = pageDef.content
        }
        
        if (!firstPageId) firstPageId = page.id
      }

      // Redirect to funnel builder
      router.push(`/funnels/${funnel.id}`)
    } catch (error) {
      console.error('Error creating funnel from template:', error)
      alert('Failed to create funnel. Please try again.')
    } finally {
      setBusy(false)
    }
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
                <button
                  disabled={busy}
                  onClick={() => useTemplate(tpl)}
                  className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium transition-colors"
                >
                  {busy ? 'Creating Funnel...' : 'Use Template'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
