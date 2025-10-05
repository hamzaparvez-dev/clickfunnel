import { FunnelBuilderContent } from '@/components/funnels/FunnelBuilderContent'

export const metadata = {
  title: 'Funnel Builder | ClickFunnels Clone',
  description: 'Build and manage your funnel pages',
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function FunnelBuilderPage({ params }: PageProps) {
  const { id } = await params
  return <FunnelBuilderContent funnelId={id} />
}