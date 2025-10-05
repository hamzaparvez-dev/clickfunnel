'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { apiClient } from '@/lib/api/client'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

interface StripeContextValue {
  stripe: Promise<Stripe | null>
  createCheckoutSession: (items: any[], successUrl: string, cancelUrl: string) => Promise<string>
  createSubscription: (priceId: string) => Promise<any>
}

const StripeContext = createContext<StripeContextValue | undefined>(undefined)

export function StripeProvider({ children }: { children: ReactNode }) {
  const createCheckoutSession = async (
    items: any[],
    successUrl: string,
    cancelUrl: string
  ) => {
    try {
      const response = await apiClient.createCheckoutSession({
        items,
        successUrl,
        cancelUrl,
      })
      
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe not initialized')
      
      await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      })
      
      return response.sessionId
    } catch (error) {
      console.error('Checkout error:', error)
      throw error
    }
  }

  const createSubscription = async (priceId: string) => {
    try {
      return await apiClient.createSubscription({ priceId })
    } catch (error) {
      console.error('Subscription error:', error)
      throw error
    }
  }

  const value: StripeContextValue = {
    stripe: stripePromise,
    createCheckoutSession,
    createSubscription,
  }

  return <StripeContext.Provider value={value}>{children}</StripeContext.Provider>
}

export function useStripe() {
  const context = useContext(StripeContext)
  if (context === undefined) {
    throw new Error('useStripe must be used within a StripeProvider')
  }
  return context
}

