import { Suspense } from 'react'
import { AnalyticsContent } from '@/components/analytics/AnalyticsContent'
import { AnalyticsSkeleton } from '@/components/analytics/AnalyticsSkeleton'

export const metadata = {
  title: 'Analytics | ClickFunnels Clone',
  description: 'Track your funnel performance',
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent />
    </Suspense>
  )
}

