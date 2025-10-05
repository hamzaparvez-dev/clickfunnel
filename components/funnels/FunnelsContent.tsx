'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useApp } from '@/lib/context/AppContext'
import { FiPlus, FiTarget, FiEdit3, FiTrash2, FiEye, FiCopy, FiMoreVertical } from 'react-icons/fi'

export function FunnelsContent() {
  const { funnels, createFunnel, deleteFunnel, fetchFunnels } = useApp()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newFunnel, setNewFunnel] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFunnels()
  }, [])

  const handleCreateFunnel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newFunnel.name.trim()) {
      setLoading(true)
      try {
        await createFunnel({
          name: newFunnel.name.trim(),
          description: newFunnel.description.trim()
        })
        setNewFunnel({ name: '', description: '' })
        setShowCreateModal(false)
      } catch (error) {
        console.error('Error creating funnel:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteFunnel = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this funnel?')) {
      try {
        await deleteFunnel(id)
      } catch (error) {
        console.error('Error deleting funnel:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funnels</h1>
          <p className="text-gray-600 mt-1">Create and manage your marketing funnels</p>
        </div>
        <Link
          href="/templates"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Funnel</span>
        </Link>
      </div>

      {/* Funnels Grid */}
      {funnels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funnels.map((funnel: any, index: number) => (
            <motion.div
              key={funnel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FiTarget className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="relative">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <FiMoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{funnel.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{funnel.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Pages: {funnel.pages?.length || 0}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    funnel.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {funnel.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/funnels/${funnel.id}`}
                    className="flex-1 bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Edit Funnel
                  </Link>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-lg">
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-lg">
                    <FiCopy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteFunnel(funnel.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FiTarget className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No funnels yet</h3>
          <p className="text-gray-600 mb-6">Create your first marketing funnel to get started</p>
          <Link
            href="/templates"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Create Your First Funnel</span>
          </Link>
        </div>
      )}

      {/* Create Funnel Modal (unused when routing to /templates) */}
    </div>
  )
}
