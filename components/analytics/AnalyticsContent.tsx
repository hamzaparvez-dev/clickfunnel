'use client'

import { FiBarChart2 } from 'react-icons/fi'

export function AnalyticsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <FiBarChart2 className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600 font-medium">ANALYTICS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics</h1>
        <p className="text-gray-600 mb-8">Track your funnel performance and conversion metrics.</p>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-12 text-center">
          <FiBarChart2 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-700">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

