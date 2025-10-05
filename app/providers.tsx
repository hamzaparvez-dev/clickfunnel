'use client'

import { ReactNode } from 'react'
import { AppProvider } from '@/lib/context/AppContext'
import { AuthProvider } from '@/lib/context/AuthContext'
import { StripeProvider } from '@/lib/context/StripeContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StripeProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </StripeProvider>
    </AuthProvider>
  )
}

