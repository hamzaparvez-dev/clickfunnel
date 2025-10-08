'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Settings } from 'lucide-react'

export function FormBuilder() {
  const [fields, setFields] = useState([
    { id: '1', type: 'text', label: 'Name', required: true },
    { id: '2', type: 'email', label: 'Email', required: true },
  ])

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
  ]

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Form Builder</h3>
      
      <div className="space-y-4 mb-6">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900">{field.label}</div>
              <div className="text-sm text-gray-600">{field.type}</div>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded transition">
              <Settings size={16} />
            </button>
            <button className="p-2 hover:bg-red-100 text-red-600 rounded transition">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center gap-2">
        <Plus size={20} />
        Add Field
      </button>
    </div>
  )
}


