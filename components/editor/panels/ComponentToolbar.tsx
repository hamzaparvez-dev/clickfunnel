'use client'

import React from 'react'
import { X } from 'lucide-react'

interface ComponentToolbarProps {
  component: string
  pageData: any
  setPageData: (data: any) => void
  onClose: () => void
}

export function ComponentToolbar({ component, pageData, setPageData, onClose }: ComponentToolbarProps) {
  const updateComponentProp = (key: string, value: any) => {
    // TODO: Implement component prop updates
    console.log('Update prop:', key, value)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Component Settings</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <input
            type="color"
            className="w-full h-10 rounded border border-gray-300"
            onChange={(e) => updateComponentProp('backgroundColor', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Padding
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => updateComponentProp('padding', e.target.value)}
          >
            <option value="p-4">Small</option>
            <option value="p-8">Medium</option>
            <option value="p-16">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Alignment
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-indigo-500 transition text-sm">
              Left
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-indigo-500 transition text-sm">
              Center
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-indigo-500 transition text-sm">
              Right
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


