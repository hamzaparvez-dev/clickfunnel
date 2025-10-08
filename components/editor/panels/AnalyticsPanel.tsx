'use client'

import React from 'react'
import { TrendingUp, Users, MousePointerClick, DollarSign } from 'lucide-react'

export function AnalyticsPanel({ pageId }: { pageId: string }) {
  const stats = [
    { label: 'Page Views', value: '12,543', change: '+15.3%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Conversion Rate', value: '4.2%', change: '+2.1%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Click Through Rate', value: '8.7%', change: '+5.4%', icon: MousePointerClick, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Revenue', value: '$45,230', change: '+23.5%', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Visitor Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}


