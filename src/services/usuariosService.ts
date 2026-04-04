import http from '../utils/httpClient'
import type { UsuarioAdmin, UsuariosStats, CreateUsuarioPayload, UpdateUsuarioPayload } from '../types'

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

export interface GetUsuariosParams {
  page?: number
  limit?: number
  search?: string
  rol?: string
  programa?: string
}

export interface GetUsuariosResponse {
  data: UsuarioAdmin[]
  total: number
}

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE
// ═══════════════════════════════════════════════════════════════════════════

const usuariosService = {
  // 🔹 LISTAR USUARIOS con filtros y paginación
  async getUsuarios(params?: {
    pagina?: number
    limite?: number
    rol?: 'ADMIN' | 'SECRETARIA' | 'ESTUDIANTE'
    activo?: boolean
  }) {
    const { data } = await http.get('/usuarios', { params })
    return data
  },

  // 🔹 BUSCAR USUARIOS por nombre, email o código
  async buscar(q: string) {
    const { data } = await http.get('/usuarios/buscar', {
      params: { q }
    })
    return data
  },

  // 🔹 OBTENER USUARIO POR ID
  async getById(id: number) {
    const { data } = await http.get(`/usuarios/${id}`)
    return data
  },

  // 🔹 ACTUALIZAR USUARIO (nombre y email)
  async actualizar(id: number, payload: {
    nombre_completo?: string
    email_institucional?: string
  }) {
    const { data } = await http.put(`/usuarios/${id}`, payload)
    return data
  },

  // 🔹 CREAR USUARIO NUEVO (solo ADMIN)
  async crear(payload: CreateUsuarioPayload) {
    const { data } = await http.post('/usuarios', payload)
    return data
  },

  // 🔹 DESACTIVAR USUARIO
  async desactivar(id: number) {
    const { data } = await http.put(`/usuarios/${id}/desactivar`)
    return data
  },

  // 🔹 REACTIVAR USUARIO (solo ADMIN)
  async reactivar(id: number) {
    const { data } = await http.put(`/usuarios/${id}/reactivar`)
    return data
  },

  // 🔹 CAMBIAR ESTADO DE MATRÍCULA (estudiantes)
  async cambiarMatricula(id: number, matricula_activa: boolean) {
    const { data } = await http.put(`/usuarios/${id}/estado-matricula`, {
      matricula_activa
    })
    return data
  }
}

export default usuariosService
