import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Training Courses | ClickFunnels Clone',
  description: 'Access training courses',
}

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 font-medium">TRAINING COURSES</span>
        </div>
      </div>
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Courses</h1>
        <p className="text-gray-600">Access comprehensive training to master your funnel building skills.</p>
      </div>
    </div>
  )
}

