import http from '../utils/httpClient'
import type { UsuarioAdmin, UsuariosStats } from '../types'

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
  /**
   * Obtiene estadísticas generales de usuarios
   */
  async getStats(): Promise<UsuariosStats> {
    const { data } = await http.get('/admin/usuarios/stats')
    return data
  },

  /**
   * Obtiene lista paginada de usuarios
   */
  async getUsuarios(params: GetUsuariosParams): Promise<GetUsuariosResponse> {
    const q = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') q.set(k, String(v))
    })
    const { data } = await http.get(`/admin/usuarios?${q}`)
    return data
  },

  /**
   * Obtiene un usuario por ID
   */
  async getUsuarioById(id: string): Promise<UsuarioAdmin> {
    const { data } = await http.get(`/admin/usuarios/${id}`)
    return data
  },

  /**
   * Crea un nuevo usuario
   */
  async crear(payload: {
    nombre: string
    email: string
    rol: import('../types').RolUsuario
    programa: string
    idInstitucional?: string
  }): Promise<UsuarioAdmin> {
    const { data } = await http.post('/admin/usuarios', payload)
    return data
  },

  /**
   * Edita un usuario existente
   */
  async editar(id: string, payload: Partial<UsuarioAdmin>): Promise<UsuarioAdmin> {
    const { data } = await http.put(`/admin/usuarios/${id}`, payload)
    return data
  },

  /**
   * Elimina un usuario
   */
  async eliminar(id: string): Promise<void> {
    await http.delete(`/admin/usuarios/${id}`)
  },

  /**
   * Exporta los usuarios a archivo (CSV/Excel)
   */
  async exportar(): Promise<Blob> {
    const res = await http.get('/admin/usuarios/export', { responseType: 'blob' })
    return res.data as unknown as Blob
  },
}

export default usuariosService
