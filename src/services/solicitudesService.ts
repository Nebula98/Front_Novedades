import http from '../utils/httpClient'
import type { Solicitud } from '../types'

export const QUICK_ACTIONS = [
  { id: 'cambio_grupo', label: 'Cambio de Grupo', icon: 'swap', type: 'solicitud', emoji: '🔄' },
  { id: 'cambio_carrera', label: 'Cambio de Carrera', icon: 'graduation-cap', type: 'solicitud', emoji: '🎓' },
  { id: 'certificado', label: 'Certificado', icon: 'document', type: 'documento', emoji: '📄' },
  { id: 'historial', label: 'Historial Académico', icon: 'history', type: 'consulta', emoji: '📊' },
]

const solicitudesService = {
  async getMisSolicitudes(): Promise<Solicitud[]> {
    const { data } = await http.get<Solicitud[]>('/solicitudes/mis-solicitudes')
    return data
  },

  async getDetalle(id: string): Promise<Solicitud> {
    const { data } = await http.get<Solicitud>(`/solicitudes/${id}`)
    return data
  },

  async crear(payload: { motivo: string; detalles: Record<string, any> }): Promise<Solicitud> {
    const { data } = await http.post<Solicitud>('/solicitudes', payload)
    return data
  },

  async obtenerSolicitudes(params?: { 
    pagina?: number
    limite?: number
    estado?: string
  }): Promise<{ data: Solicitud[]; total: number }> {
    const { data } = await http.get('/solicitudes', { params })
    return data
  },

  async actualizarEstado(id: string, payload: any): Promise<Solicitud> {
    const { data } = await http.put<Solicitud>(`/solicitudes/${id}`, payload)
    return data
  },

  async cancelar(id: string): Promise<Solicitud> {
    const { data } = await http.put<Solicitud>(`/solicitudes/${id}/cancelar`)
    return data
  },
}

export default solicitudesService