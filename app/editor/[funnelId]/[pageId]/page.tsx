import { notFound } from 'next/navigation'
import { EditorLoader } from '@/components/editor/EditorLoader'

export const metadata = {
  title: 'Page Editor | ClickFunnels Clone',
}

interface PageProps {
  params: {
    funnelId: string
    pageId: string
  }
}

export default function EditorPage({ params }: PageProps) {
  const { funnelId, pageId } = params

  if (!funnelId || !pageId) {
    notFound()
  }

  return <EditorLoader funnelId={funnelId} pageId={pageId} />
}