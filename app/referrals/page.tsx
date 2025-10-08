import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referrals | ClickFunnels Clone',
  description: 'Manage your referral program',
}

export default function ReferralsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 font-medium">REFERRALS</span>
        </div>
      </div>
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-600 mt-2">Earn 30% commission on every referral</p>
          </div>
          <span className="text-2xl font-bold text-green-600">Earn 30%</span>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Earning Today</h2>
          <p className="text-gray-700 mb-6">Share ClickFunnels with your network and earn generous commissions on every successful referral.</p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
            Get Your Referral Link
          </button>
        </div>
      </div>
    </div>
  )
}

