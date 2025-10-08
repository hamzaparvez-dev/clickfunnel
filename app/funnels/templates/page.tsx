import { Metadata } from 'next'
import { FunnelTemplatesGallery } from '@/components/funnels/FunnelTemplatesGallery'

export const metadata: Metadata = {
  title: 'Browse Templates | ClickFunnels Clone',
  description: 'Choose from our high-quality funnel templates',
}

export default function FunnelTemplatesPage() {
  return <FunnelTemplatesGallery />
}


