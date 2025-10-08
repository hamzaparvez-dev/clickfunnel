'use client'

import React, { useState } from 'react'
import { Search, Star, Eye } from 'lucide-react'

const templates = [
  {
    id: 1,
    name: 'Sales Page Pro',
    category: 'Sales',
    preview: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Sales+Page',
    popular: true
  },
  {
    id: 2,
    name: 'Lead Magnet Hero',
    category: 'Lead Gen',
    preview: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Lead+Gen',
    popular: true
  },
  {
    id: 3,
    name: 'Webinar Registration',
    category: 'Webinar',
    preview: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Webinar',
    popular: false
  },
  {
    id: 4,
    name: 'Product Launch',
    category: 'Launch',
    preview: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Launch',
    popular: true
  },
]

export function TemplateGallery({ onSelectTemplate }: { onSelectTemplate: (template: any) => void }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Template Gallery</h2>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="sales">Sales</option>
            <option value="leadgen">Lead Gen</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.popular && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-3 bg-white rounded-full">
                    <Eye size={20} className="text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


