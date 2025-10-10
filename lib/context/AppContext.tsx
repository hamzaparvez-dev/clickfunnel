'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

// App data now uses DATABASE via API calls
// Editor drafts still use localStorage (see GrapesJSEditor.tsx)

interface AppState {
  funnels: any[]
  pages: any[]
  orders: any[]
  analytics: {
    totalVisitors: number
    totalConversions: number
    totalRevenue: number
    conversionRate: number
  }
  loading: boolean
  error: string | null
}

type AppAction =
  | { type: 'SET_FUNNELS'; payload: any[] }
  | { type: 'SET_PAGES'; payload: any[] }
  | { type: 'SET_ORDERS'; payload: any[] }
  | { type: 'SET_ANALYTICS'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_FUNNEL'; payload: any }
  | { type: 'UPDATE_FUNNEL'; payload: { id: string; data: any } }
  | { type: 'DELETE_FUNNEL'; payload: string }
  | { type: 'ADD_PAGE'; payload: any }
  | { type: 'UPDATE_PAGE'; payload: { id: string; data: any } }
  | { type: 'DELETE_PAGE'; payload: string }
  | { type: 'LOAD_DATA'; payload: any }

const initialState: AppState = {
  funnels: [],
  pages: [],
  orders: [],
  analytics: {
    totalVisitors: 1250,
    totalConversions: 234,
    totalRevenue: 12450,
    conversionRate: 18.7,
  },
  loading: false,
  error: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload }
    case 'SET_FUNNELS':
      return { ...state, funnels: action.payload }
    case 'SET_PAGES':
      return { ...state, pages: action.payload }
    case 'SET_ORDERS':
      return { ...state, orders: action.payload }
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'ADD_FUNNEL':
      return { ...state, funnels: [...state.funnels, action.payload] }
    case 'UPDATE_FUNNEL':
      return {
        ...state,
        funnels: state.funnels.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.data } : f
        ),
      }
    case 'DELETE_FUNNEL':
      return {
        ...state,
        funnels: state.funnels.filter((f) => f.id !== action.payload),
        pages: state.pages.filter((p) => p.funnelId !== action.payload),
      }
    case 'ADD_PAGE':
      return { ...state, pages: [...state.pages, action.payload] }
    case 'UPDATE_PAGE':
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      }
    case 'DELETE_PAGE':
      return {
        ...state,
        pages: state.pages.filter((p) => p.id !== action.payload),
      }
    default:
      return state
  }
}

interface AppContextValue extends AppState {
  fetchFunnels: () => Promise<void>
  createFunnel: (data: any) => Promise<any>
  updateFunnel: (id: string, data: any) => Promise<void>
  deleteFunnel: (id: string) => Promise<void>
  fetchPages: (funnelId?: string) => Promise<void>
  createPage: (funnelId: string, data: any) => Promise<any>
  updatePage: (id: string, data: any) => Promise<void>
  deletePage: (id: string) => Promise<void>
  fetchAnalytics: () => Promise<void>
  fetchOrders: () => Promise<void>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { user } = useAuth()

  // Helper function to get auth headers
  const getAuthHeaders = async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (user) {
      try {
        const token = await user.getIdToken()
        headers['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error('Error getting auth token:', error)
      }
    }

    return headers
  }

  // Load funnels and pages from DATABASE on mount
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        // Get auth headers (will include token if user is logged in)
        const headers = await getAuthHeaders()
        
        // Fetch funnels from API
        // In development mode, the server will use a fallback user if no auth token
        const funnelsResponse = await fetch('/api/funnels', { headers })
        if (funnelsResponse.ok) {
          const funnels = await funnelsResponse.json()
          dispatch({ type: 'SET_FUNNELS', payload: Array.isArray(funnels) ? funnels : [] })
        } else if (funnelsResponse.status === 401) {
          console.warn('Not authenticated - some features may be limited')
        }
        
        // Note: Pages are loaded per funnel, not all at once
        // This keeps the initial load fast
      } catch (error) {
        console.error('Error loading data from database:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load data. Using offline mode.' })
        
        // Fallback to localStorage for offline development
        if (typeof window !== 'undefined') {
          const savedData = localStorage.getItem('funnelBuilderData_backup')
          if (savedData) {
            try {
              dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) })
            } catch (e) {
              console.error('Error loading backup data:', e)
            }
          }
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    
    // Load data regardless of auth status (server handles auth in dev mode)
    loadData()
  }, [])

  // Backup to localStorage for offline development (optional)
  useEffect(() => {
    if (typeof window !== 'undefined' && state.funnels.length > 0) {
      localStorage.setItem('funnelBuilderData_backup', JSON.stringify(state))
    }
  }, [state])

  const fetchFunnels = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const headers = await getAuthHeaders()
      const response = await fetch('/api/funnels', { headers })
      if (response.ok) {
        const funnels = await response.json()
        dispatch({ type: 'SET_FUNNELS', payload: Array.isArray(funnels) ? funnels : [] })
      }
    } catch (error) {
      console.error('Error fetching funnels:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch funnels' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const createFunnel = async (data: any) => {
    try {
      const headers = await getAuthHeaders()
      const response = await fetch('/api/funnels', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const funnel = await response.json()
        dispatch({ type: 'ADD_FUNNEL', payload: funnel })
        return funnel
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create funnel')
      }
    } catch (error) {
      console.error('Error creating funnel:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create funnel' })
      throw error
    }
  }

  const updateFunnel = async (id: string, data: any) => {
    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/funnels/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        dispatch({ type: 'UPDATE_FUNNEL', payload: { id, data } })
      } else {
        throw new Error('Failed to update funnel')
      }
    } catch (error) {
      console.error('Error updating funnel:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update funnel' })
      throw error
    }
  }

  const deleteFunnel = async (id: string) => {
    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/funnels/${id}`, {
        method: 'DELETE',
        headers,
      })
      
      if (response.ok) {
        dispatch({ type: 'DELETE_FUNNEL', payload: id })
      } else {
        throw new Error('Failed to delete funnel')
      }
    } catch (error) {
      console.error('Error deleting funnel:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete funnel' })
      throw error
    }
  }

  const fetchPages = async (funnelId?: string) => {
    try {
      const headers = await getAuthHeaders()
      const url = funnelId ? `/api/funnels/${funnelId}/pages` : '/api/pages'
      const response = await fetch(url, { headers })
      
      if (response.ok) {
        const pages = await response.json()
        dispatch({ type: 'SET_PAGES', payload: Array.isArray(pages) ? pages : [] })
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch pages' })
    }
  }

  const createPage = async (funnelId: string, data: any) => {
    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/funnels/${funnelId}/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const page = await response.json()
        dispatch({ type: 'ADD_PAGE', payload: page })
        return page
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create page')
      }
    } catch (error) {
      console.error('Error creating page:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create page' })
      throw error
    }
  }

  const updatePage = async (id: string, data: any) => {
    console.log('📤 Updating page in database:', id)
    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        dispatch({ type: 'UPDATE_PAGE', payload: { id, data } })
        console.log('✅ Page updated in database:', id)
      } else {
        throw new Error('Failed to update page')
      }
    } catch (error) {
      console.error('❌ Error updating page:', error)
      // Still update local state for offline capability
      dispatch({ type: 'UPDATE_PAGE', payload: { id, data } })
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update page in database' })
    }
  }

  const deletePage = async (id: string) => {
    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
        headers,
      })
      
      if (response.ok) {
        dispatch({ type: 'DELETE_PAGE', payload: id })
      } else {
        throw new Error('Failed to delete page')
      }
    } catch (error) {
      console.error('Error deleting page:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete page' })
      throw error
    }
  }

  const fetchAnalytics = async () => {
    return Promise.resolve()
  }

  const fetchOrders = async () => {
    return Promise.resolve()
  }

  const value: AppContextValue = {
    ...state,
    fetchFunnels,
    createFunnel,
    updateFunnel,
    deleteFunnel,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    fetchAnalytics,
    fetchOrders,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}