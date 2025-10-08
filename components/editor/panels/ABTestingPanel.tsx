'use client'

import React, { useState } from 'react'
import { Plus, Play, Pause, Trophy } from 'lucide-react'

export function ABTestingPanel({ pageId }: { pageId: string }) {
  const [tests, setTests] = useState([
    { id: 1, name: 'Headline Test', variantA: 'Original', variantB: 'New Headline', status: 'running', winner: null },
    { id: 2, name: 'CTA Button Color', variantA: 'Blue', variantB: 'Orange', status: 'completed', winner: 'B' },
  ])

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">A/B Testing</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
            <Plus size={20} />
            Create Test
          </button>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {test.status === 'running' ? 'Currently running' : 'Test completed'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {test.status === 'running' ? (
                    <button className="p-2 text-orange-600 bg-orange-100 rounded-lg hover:bg-orange-200 transition">
                      <Pause size={20} />
                    </button>
                  ) : (
                    <button className="p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition">
                      <Play size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border-2 ${test.winner === 'A' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Variant A</span>
                    {test.winner === 'A' && (
                      <Trophy size={16} className="text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{test.variantA}</p>
                  <div className="text-2xl font-bold text-gray-900">45.2%</div>
                  <p className="text-xs text-gray-500">Conversion Rate</p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${test.winner === 'B' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Variant B</span>
                    {test.winner === 'B' && (
                      <Trophy size={16} className="text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{test.variantB}</p>
                  <div className="text-2xl font-bold text-gray-900">52.8%</div>
                  <p className="text-xs text-gray-500">Conversion Rate</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


