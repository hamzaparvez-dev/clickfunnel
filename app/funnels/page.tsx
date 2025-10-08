import { Suspense } from 'react'
import { FunnelsContent } from '@/components/funnels/FunnelsContent'
import { FunnelsSkeleton } from '@/components/funnels/FunnelsSkeleton'

export const metadata = {
  title: 'Funnels | ClickFunnels Clone',
  description: 'Manage your marketing funnels',
}

export default function FunnelsPage() {
  return (
    <Suspense fallback={<FunnelsSkeleton />}>
      <FunnelsContent />
    </Suspense>
  )
}

