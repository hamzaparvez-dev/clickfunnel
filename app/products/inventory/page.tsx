import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inventory | ClickFunnels Clone',
  description: 'Manage your product inventory',
}

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 font-medium">INVENTORY</span>
        </div>
      </div>
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Inventory</h1>
        <p className="text-gray-600">Track and manage your product inventory levels.</p>
      </div>
    </div>
  )
}

