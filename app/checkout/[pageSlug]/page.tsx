import { CheckoutContent } from '@/components/checkout/CheckoutContent'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    pageSlug: string
  }
}

export default async function CheckoutPage({ params }: PageProps) {
  const { pageSlug } = params

  if (!pageSlug) {
    notFound()
  }

  // This will be a server component that fetches page data
  return <CheckoutContent pageSlug={pageSlug} />
}

export async function generateMetadata({ params }: PageProps) {
  // Fetch page metadata from API
  return {
    title: 'Checkout | ClickFunnels Clone',
    description: 'Complete your purchase',
  }
}

