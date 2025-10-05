'use client'

export function PageEditor({ funnelId, pageId }: { funnelId: string; pageId: string }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Page Editor</h1>
        <p className="text-gray-600">
          Editing page {pageId} in funnel {funnelId}
        </p>
      </div>
    </div>
  )
}

