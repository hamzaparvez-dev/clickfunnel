import { Metadata } from 'next'
import { FunnelTypeSelector } from '@/components/funnels/FunnelTypeSelector'

export const metadata: Metadata = {
  title: 'Create Funnel | ClickFunnels Clone',
  description: 'Choose a funnel type to get started',
}

export default function CreateFunnelPage() {
  return <FunnelTypeSelector />
}


