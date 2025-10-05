/**
 * API Client for Next.js API Routes
 */

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

interface RequestOptions extends RequestInit {
  token?: string
}

class APIClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const token = options.token || this.token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(`${this.baseURL}/api${endpoint}`, config)

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || `HTTP Error ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: { email: string; password: string; name: string }) {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Funnel endpoints
  async getFunnels() {
    return this.request<any[]>('/funnels')
  }

  async getFunnel(id: string) {
    return this.request<any>(`/funnels/${id}`)
  }

  async createFunnel(data: any) {
    return this.request<any>('/funnels', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateFunnel(id: string, data: any) {
    return this.request<any>(`/funnels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteFunnel(id: string) {
    return this.request(`/funnels/${id}`, {
      method: 'DELETE',
    })
  }

  // Stripe endpoints
  async createCheckoutSession(data: any) {
    return this.request<{ sessionId: string }>('/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Upload endpoints
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const token = this.token
    const headers: HeadersInit = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}/api/upload`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return await response.json()
  }
}

export const apiClient = new APIClient(API_URL)
export default apiClient
