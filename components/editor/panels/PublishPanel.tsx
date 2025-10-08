'use client'

import React, { useState } from 'react'
import { X, Globe, Link as LinkIcon, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export function PublishPanel({ pageId, funnelId, onClose }: any) {
  const [customDomain, setCustomDomain] = useState('')
  const [copied, setCopied] = useState(false)
  
  const pageUrl = `https://yourdomain.com/funnel/${pageId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Publish Page</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Page URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pageUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2"
              >
                {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Custom Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Domain
            </label>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-gray-400" />
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">SEO Settings</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Page Title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <textarea
                placeholder="Meta Description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Publish Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


