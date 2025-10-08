import { GrapesJSEditor } from '@/components/editor/GrapesJSEditor'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'GrapesJS Editor | ClickFunnels Clone',
  description: 'Professional drag & drop page builder powered by GrapesJS',
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

  return <GrapesJSEditor funnelId={funnelId} pageId={pageId} />
}