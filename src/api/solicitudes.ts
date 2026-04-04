/**
 * 📝 SERVICIOS DE SOLICITUDES
 * 
 * Métodos para gestionar solicitudes de trayectorias:
 * - Listar solicitudes del estudiante
 * - Crear nueva solicitud
 * - Obtener historial
 */

import http from '../utils/httpClient'

interface SolicitudResponse {
  id: number
  id_estudiante: number
  codigo_solicitud: string
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA'
  fecha_creacion: string
  fecha_actualizacion: string
  motivo?: string
  detalles?: Record<string, any>
}

const solicitudesApi = {
  /**
   * 📋 Listar mis solicitudes (para estudiante)
   */
  async misSolicitudes(params?: { pagina?: number; limite?: number; estado?: string }) {
    const { data } = await http.get('/solicitudes/mis-solicitudes', { params })
    return data as { data: SolicitudResponse[]; total: number }
  },

  /**
   * 📋 Listar todas las solicitudes (para ADMIN/SECRETARIA)
   */
  async obtenerSolicitudes(params?: {
    pagina?: number
    limite?: number
    estado?: string
    id_estudiante?: number
  }) {
    const { data } = await http.get('/solicitudes', { params })
    return data as { data: SolicitudResponse[]; total: number }
  },

  /**
   * 🔍 Obtener detalle de una solicitud
   */
  async obtenerDetalle(id: number) {
    const { data } = await http.get(`/solicitudes/${id}`)
    return data as SolicitudResponse
  },

  /**
   * ✅ Crear nueva solicitud
   */
  async crear(payload: { motivo: string; detalles: Record<string, any> }) {
    const { data } = await http.post('/solicitudes', payload)
    return data as SolicitudResponse
  },

  /**
   * ✏️ Actualizar estado de solicitud (ADMIN/SECRETARIA)
   */
  async actualizarEstado(
    id: number,
    payload: { estado: 'APROBADA' | 'RECHAZADA' | 'CANCELADA'; observaciones?: string }
  ) {
    const { data } = await http.put(`/solicitudes/${id}`, payload)
    return data as SolicitudResponse
  },

  /**
   * ❌ Cancelar solicitud
   */
  async cancelar(id: number) {
    const { data } = await http.put(`/solicitudes/${id}/cancelar`)
    return data as SolicitudResponse
  },

  /**
   * 📊 Obtener historial
   */
  async obtenerHistorial(params?: { pagina?: number; limite?: number }) {
    const { data } = await http.get('/solicitudes/historial', { params })
    return data as { data: SolicitudResponse[]; total: number }
  },
}

export default solicitudesApi
