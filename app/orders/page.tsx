import { OrdersContent } from '@/components/orders/OrdersContent'

export const metadata = {
  title: 'Orders | ClickFunnels Clone',
  description: 'Manage your orders and transactions',
}

export default function OrdersPage() {
  return (
    <div className="p-6">
      <OrdersContent />
    </div>
  )
}

