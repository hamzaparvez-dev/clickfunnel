'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useApp } from '@/lib/context/AppContext'
import { FiTarget, FiEye, FiDollarSign, FiTrendingUp, FiPlus, FiEdit3 } from 'react-icons/fi'

export function DashboardContent() {
  const { funnels, analytics } = useApp()

  const stats = [
    {
      name: 'Total Funnels',
      value: funnels.length,
      icon: FiTarget,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Total Visitors',
      value: analytics.totalVisitors.toLocaleString(),
      icon: FiEye,
      color: 'bg-green-500',
      change: '+23%'
    },
    {
      name: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-purple-500',
      change: '+18%'
    },
    {
      name: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ]

  const recentFunnels = funnels.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your funnels.</p>
        </div>
        <Link
          href="/templates"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Funnel</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Funnels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Funnels</h2>
            <Link
              href="/funnels"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentFunnels.length > 0 ? (
            recentFunnels.map((funnel: any, index: number) => (
              <motion.div
                key={funnel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FiTarget className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{funnel.name}</h3>
                      <p className="text-gray-600">{funnel.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Created {new Date(funnel.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      funnel.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {funnel.status}
                    </span>
                    <Link
                      href={`/funnels/${funnel.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center">
              <FiTarget className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No funnels yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first marketing funnel.</p>
              <Link
                href="/templates"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
              >
                <FiPlus className="w-4 h-4" />
                <span>Create Your First Funnel</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

