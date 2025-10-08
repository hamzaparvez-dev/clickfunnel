import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers | ClickFunnels Clone',
  description: 'Manage your customers',
}

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 font-medium">CUSTOMERS</span>
        </div>
      </div>
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Customers</h1>
        <p className="text-gray-600">View and manage your customer base.</p>
      </div>
    </div>
  )
}

