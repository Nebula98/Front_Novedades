import http from '../utils/httpClient'
import type { Solicitud } from '../types'

const solicitudesService = {
  async getMisSolicitudes(): Promise<Solicitud[]> {
    const { data } = await http.get<Solicitud[]>('/solicitudes/mis-solicitudes')
    return data
  },

  async getDetalle(id: string): Promise<Solicitud> {
    const { data } = await http.get<Solicitud>(`/solicitudes/${id}`)
    return data
  },
}

export default solicitudesService