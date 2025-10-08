'use client'

import React, { useState, useEffect } from 'react'
import { FiLayers, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface Collection {
  id: string
  name: string
  description?: string
  slug: string
  image?: string
  status: string
  products?: any[]
}

export function CollectionsContent() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    status: 'active'
  })

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections')
      const data = await res.json()
      setCollections(data.collections || [])
    } catch (error) {
      console.error('Error fetching collections:', error)
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingCollection ? `/api/collections/${editingCollection.id}` : '/api/collections'
      const method = editingCollection ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        await fetchCollections()
        handleCloseModal()
      }
    } catch (error) {
      console.error('Error saving collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return

    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchCollections()
      }
    } catch (error) {
      console.error('Error deleting collection:', error)
    }
  }

  const handleOpenModal = (collection?: Collection) => {
    if (collection) {
      setEditingCollection(collection)
      setFormData({
        name: collection.name,
        description: collection.description || '',
        slug: collection.slug,
        status: collection.status
      })
    } else {
      setEditingCollection(null)
      setFormData({
        name: '',
        description: '',
        slug: '',
        status: 'active'
      })
    }
    setShowModal(true)
  }

  const handleCloseModal() {
    setShowModal(false)
    setEditingCollection(null)
  }

  const generateSlug = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setFormData({ ...formData, name, slug })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <FiLayers className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600 font-medium">COLLECTIONS</span>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Collections</h1>
            <p className="text-gray-600 mt-1">Organize your products into collections for easier management.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Create Collection</span>
          </button>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <FiLayers className="w-12 h-12 text-blue-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{collection.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{collection.description || 'No description'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {collection.products?.length || 0} products
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(collection)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(collection.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
            <FiLayers className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No collections yet</h2>
            <p className="text-gray-700 mb-6">Create your first collection to organize your products.</p>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Collection
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCollection ? 'Edit Collection' : 'Create Collection'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => generateSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingCollection ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

