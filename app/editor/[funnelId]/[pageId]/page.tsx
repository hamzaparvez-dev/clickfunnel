import { PageEditor } from '@/components/editor/PageEditor'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Page Editor | ClickFunnels Clone',
  description: 'Build and customize your pages',
}

interface PageProps {
  params: Promise<{
    funnelId: string
    pageId: string
  }>
}

export default async function EditorPage({ params }: PageProps) {
  const { funnelId, pageId } = await params

  if (!funnelId || !pageId) {
    notFound()
  }

  return <PageEditor funnelId={funnelId} pageId={pageId} />
}