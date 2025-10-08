import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Base | ClickFunnels Clone',
  description: 'Browse the knowledge base',
}

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 font-medium">KNOWLEDGE BASE</span>
        </div>
      </div>
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
        <p className="text-gray-600">Find answers to common questions and learn best practices.</p>
      </div>
    </div>
  )
}

