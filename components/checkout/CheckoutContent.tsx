'use client'

export function CheckoutContent({ pageSlug }: { pageSlug: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
        <p className="text-gray-600">Page: {pageSlug}</p>
      </div>
    </div>
  )
}

