import { Metadata } from 'next'
import { ProductsContent } from '@/components/products/ProductsContent'

export const metadata: Metadata = {
  title: 'Products | ClickFunnels Clone',
  description: 'Manage your products',
}

export default function ProductsPage() {
  return <ProductsContent />
}

