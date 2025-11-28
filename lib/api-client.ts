// Updated API client to use backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; message?: string }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') || localStorage.getItem('token') : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Request failed',
        message: data.message,
      }
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error',
    }
  }
}

export const apiClient = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData: { name: string; email: string; password: string }) =>
      apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
  },

  // Admin Auth
  admin: {
    auth: {
      login: (credentials: { email: string; password: string }) =>
        apiRequest('/admin/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        }),
      me: () => apiRequest('/admin/auth/me'),
    },
    dashboard: {
      stats: () => apiRequest('/admin/dashboard/stats'),
    },
    products: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/products${queryString}`)
      },
      get: (id: string) => apiRequest(`/admin/products/${id}`),
      create: (data: any) =>
        apiRequest('/admin/products', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: string, data: any) =>
        apiRequest(`/admin/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: string) =>
        apiRequest(`/admin/products/${id}`, {
          method: 'DELETE',
        }),
      inventory: () => apiRequest('/admin/products/inventory/stats'),
    },
    doctors: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/doctors${queryString}`)
      },
      verify: (id: string) =>
        apiRequest(`/admin/doctors/${id}/verify`, {
          method: 'POST',
        }),
    },
    orders: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/orders${queryString}`)
      },
    },
    consultations: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/consultations${queryString}`)
      },
    },
    prescriptions: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/prescriptions${queryString}`)
      },
    },
    customers: {
      list: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
        return apiRequest(`/admin/customers${queryString}`)
      },
    },
    analytics: {
      get: (range?: number) =>
        apiRequest(`/admin/analytics${range ? `?range=${range}` : ''}`),
    },
    settings: {
      get: () => apiRequest('/admin/settings'),
      update: (data: any) =>
        apiRequest('/admin/settings', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
    },
  },

  // Products (public)
  products: {
    list: (params?: Record<string, string>) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
      return apiRequest(`/products${queryString}`)
    },
    get: (id: string) => apiRequest(`/products/${id}`),
  },
}

export default apiClient
