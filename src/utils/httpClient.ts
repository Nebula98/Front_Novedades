import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import type { ApiError } from '../types'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Adjunta el token en cada request automáticamente
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Normaliza errores y maneja el 401 globalmente
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Error de conexión.',
      statusCode: error.response?.status,
      field: error.response?.data?.field,
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_student')
      window.location.href = '/login'
    }

    return Promise.reject(apiError)
  }
)

export default http