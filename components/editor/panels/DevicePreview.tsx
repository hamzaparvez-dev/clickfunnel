'use client'

import React from 'react'

export function DevicePreview({ content, device }: { content: any, device: 'mobile' | 'tablet' | 'desktop' }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`bg-white shadow-2xl rounded-lg overflow-hidden ${
        device === 'mobile' ? 'w-96' : device === 'tablet' ? 'w-[768px]' : 'w-full max-w-7xl'
      }`}>
        <div className="bg-gray-100 p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6">
          {/* Render page content here */}
          <p>Preview content...</p>
        </div>
      </div>
    </div>
  )
}


