import { Metadata } from 'next'
import { CollectionsContent } from '@/components/products/CollectionsContent'

export const metadata: Metadata = {
  title: 'Collections | ClickFunnels Clone',
  description: 'Manage your product collections',
}

export default function CollectionsPage() {
  return <CollectionsContent />
}

