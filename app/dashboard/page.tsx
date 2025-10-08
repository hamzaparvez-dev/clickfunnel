import { Suspense } from 'react'
import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'

export const metadata = {
  title: 'Dashboard | ClickFunnels Clone',
  description: 'Manage your funnels and view analytics',
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}

