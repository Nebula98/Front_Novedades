import http from '../utils/httpClient'
import type { LoginPayload, LoginResponse, ChangePasswordPayload, ChangePasswordResponse } from '../types'

interface BackendLoginResponse {
  ok: boolean
  mensaje: string
  datos: {
    id_usuario: number
    nombre_completo: string
    token: string
    primer_login: boolean
    rol: string
    codigo_estudiantil: string | null
  }
  codigo_estado: number
}

const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await http.post<BackendLoginResponse>('/auth/login', payload)
    
    // Mapeo de respuesta backend a tipo esperado por frontend
    return {
      token: data.datos.token,
      student: {
        id: String(data.datos.id_usuario),
        nombre: data.datos.nombre_completo,
        codigo: data.datos.codigo_estudiantil || '',
        rol: data.datos.rol,
      },
      requiresPasswordChange: data.datos.primer_login,
    }
  },

  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const { data } = await http.post<BackendLoginResponse>('/auth/change-password', payload)
    
    return {
      token: data.datos.token,
      student: {
        id: String(data.datos.id_usuario),
        nombre: data.datos.nombre_completo,
        codigo: data.datos.codigo_estudiantil || '',
        rol: data.datos.rol,
      },
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_student')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },
}

export default authService