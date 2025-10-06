'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Using localStorage for now (no API calls until database is set up)
// This matches your original implementation
// key required to load the page.
const STORAGE_KEY = 'clickfunnels-clone-data'

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

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('funnelBuilderData')
      if (savedData) {
        try {
          dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) })
        } catch (e) {
          console.error('Error loading data:', e)
        }
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('funnelBuilderData', JSON.stringify(state))
    }
  }, [state])

  const fetchFunnels = async () => {
    // Data is already loaded from localStorage
    return Promise.resolve()
  }

  const createFunnel = async (data: any) => {
    const funnel = {
      id: 'funnel_' + Date.now(),
      name: data.name,
      description: data.description,
      status: 'draft',
      pages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_FUNNEL', payload: funnel })
    return funnel
  }

  const updateFunnel = async (id: string, data: any) => {
    dispatch({ type: 'UPDATE_FUNNEL', payload: { id, data } })
  }

  const deleteFunnel = async (id: string) => {
    dispatch({ type: 'DELETE_FUNNEL', payload: id })
  }

  const fetchPages = async (funnelId?: string) => {
    // Data is already loaded from localStorage
    return Promise.resolve()
  }

  const createPage = async (funnelId: string, data: any) => {
    const page = {
      id: 'page_' + Date.now(),
      funnelId,
      name: data.name,
      type: data.type,
      elements: [],
      settings: {
        title: data.name,
        description: '',
        favicon: '',
        customCSS: '',
        customJS: '',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_PAGE', payload: page })
    return page
  }

  const updatePage = async (id: string, data: any) => {
    console.log('Updating page:', id, 'with data:', data)
    dispatch({ type: 'UPDATE_PAGE', payload: { id, data } })
    
    // Persist to localStorage immediately
    setTimeout(() => {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (state.pages) {
        const updatedPages = state.pages.map((p: any) =>
          p.id === id ? { ...p, ...data } : p
        )
        state.pages = updatedPages
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        console.log('Page persisted to localStorage:', id)
      }
    }, 100)
  }

  const deletePage = async (id: string) => {
    dispatch({ type: 'DELETE_PAGE', payload: id })
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
