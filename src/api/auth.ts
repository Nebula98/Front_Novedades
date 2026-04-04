/**
 * 🔐 SERVICIOS DE AUTENTICACIÓN
 * 
 * El token se gestiona automáticamente:
 * ✅ Se guarda en localStorage después del login
 * ✅ Se envía automáticamente en cada request (interceptor)
 * ✅ Si expira (401), automáticamente redirige a /login
 */

import http from '../utils/httpClient'
import type { LoginPayload, LoginResponse, ChangePasswordPayload, RolUsuario } from '../types'

interface BackendLoginResponse {
  ok: boolean
  mensaje: string
  datos: {
    id_usuario: number
    nombre_completo: string
    token: string
    primer_login: boolean
    rol: string
    codigo_estudiantil?: string
    carrera?: string
    programa?: string
    semestre?: number
    email?: string
    promedio?: string | number
    avatarUrl?: string
  }
  codigo_estado: number
}

/**
 * Normalizar rol para asegurar consistencia en toda la app
 */
function normalizeRole(rol: string): RolUsuario {
  const rolMap: Record<string, RolUsuario> = {
    'ADMIN': 'Administrador',
    'ADMINISTRADOR': 'Administrador',
    'SECRETARIA': 'Secretaria',
    'ESTUDIANTE': 'Estudiante',
    'admin': 'Administrador',
    'administrador': 'Administrador',
    'secretaria': 'Secretaria',
    'estudiante': 'Estudiante',
  }
  return rolMap[rol?.trim() || ''] || 'Estudiante'
}

const authApi = {
  /**
   * 🔐 LOGIN - Inicia sesión y guarda token automáticamente
   * 
   * @param payload - { codigo_estudiantil, password }
   * @returns Token y datos del usuario
   * 
   * ⚡ Uso:
   * const result = await authApi.login({ codigo_estudiantil: '20240', password: 'abc123' })
   * localStorage.getItem('auth_token')  // ✅ Ya está guardado
   * localStorage.getItem('auth_student') // ✅ Datos del usuario guardados
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await http.post<BackendLoginResponse>('/auth/login', payload)

    const normalizedRol = normalizeRole(data.datos.rol)

    return {
      token: data.datos.token,
      student: {
        id: String(data.datos.id_usuario),
        nombre: data.datos.nombre_completo,
        codigo: data.datos.codigo_estudiantil || '',
        rol: normalizedRol,
        carrera: data.datos.carrera,
        programa: data.datos.programa,
        semestre: data.datos.semestre,
        email: data.datos.email,
        promedio: data.datos.promedio,
        avatarUrl: data.datos.avatarUrl,
      },
      requiresPasswordChange: data.datos.primer_login,
    }
  },

  /**
   * 🔑 CAMBIAR CONTRASEÑA - Solo para primer login
   */
  async changePassword(payload: ChangePasswordPayload): Promise<LoginResponse> {
    const { data } = await http.post<BackendLoginResponse>('/auth/change-password', payload)

    const normalizedRol = normalizeRole(data.datos.rol)

    return {
      token: data.datos.token,
      student: {
        id: String(data.datos.id_usuario),
        nombre: data.datos.nombre_completo,
        codigo: data.datos.codigo_estudiantil || '',
        rol: normalizedRol,
        carrera: data.datos.carrera,
        programa: data.datos.programa,
        semestre: data.datos.semestre,
        email: data.datos.email,
        promedio: data.datos.promedio,
        avatarUrl: data.datos.avatarUrl,
      },
      requiresPasswordChange: false,
    }
  },

  /**
   * 🚪 LOGOUT - Limpia todo
   */
  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_student')
    localStorage.removeItem('primer_login')
  },

  /**
   * ✅ Verifcar si está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * 👤 Obtener rol del usuario actual
   */
  getCurrentRole(): string | null {
    const studentData = localStorage.getItem('auth_student')
    if (!studentData) return null
    try {
      const student = JSON.parse(studentData)
      return student.rol || null
    } catch {
      return null
    }
  },

  /**
   * 👤 Obtener datos del usuario actual
   */
  getCurrentUser() {
    const studentData = localStorage.getItem('auth_student')
    if (!studentData) return null
    try {
      return JSON.parse(studentData)
    } catch {
      return null
    }
  },
}

export default authApi
