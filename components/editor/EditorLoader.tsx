'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * EditorLoader - Strict Client-Side Boundary for GrapesJS Editor
 * 
 * This component implements a strict client-side boundary to ensure:
 * 1. GrapesJS never runs on the server
 * 2. The editor only loads when the browser is ready
 * 3. Prevents hydration mismatches and SSR errors
 * 
 * Performance optimizations:
 * - Lazy loads the editor component only when needed
 * - Uses React.lazy for code splitting
 * - Prevents unnecessary re-renders with stable dependencies
 */

const GrapesJSEditor = dynamic(
  () => import('@/components/editor/GrapesJSEditor').then(mod => ({ default: mod.GrapesJSEditor })),
  {
    ssr: false, // Critical: GrapesJS requires browser APIs and cannot run on server
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-indigo-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">🎨</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Loading Your Editor...</h2>
          <p className="text-gray-600 mb-2">Optimizing design canvas</p>
          <p className="text-sm text-gray-500">First load may take a moment</p>
        </div>
      </div>
    ),
  }
)

interface EditorLoaderProps {
  funnelId: string
  pageId: string
}

export function EditorLoader({ funnelId, pageId }: EditorLoaderProps) {
  const [isClient, setIsClient] = useState(false)

  // Strict client-side boundary: only render when truly on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything until client is ready
  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-pulse rounded-full h-20 w-20 border-4 border-indigo-600 mx-auto opacity-50"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing Editor...</h2>
          <p className="text-sm text-gray-500">Initializing client-side rendering</p>
        </div>
      </div>
    )
  }

  return <GrapesJSEditor funnelId={funnelId} pageId={pageId} />
}