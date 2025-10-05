import { Suspense } from 'react'
import { TemplatesGallery } from '@/components/templates/TemplatesGallery'

export const metadata = {
  title: 'Templates | ClickFunnels Clone',
  description: 'Choose a template to start building your funnel',
}

export default function TemplatesPage() {
  return (
    <div className="p-6 space-y-6">
      <Suspense fallback={<div>Loading templates...</div>}>
        <TemplatesGallery />
      </Suspense>
    </div>
  )
}
