import http from '../utils/httpClient'
import type { Solicitud, QuickAction, TipoTramite } from '../types' //Se le agrego TipoTramite a la importacion de tipos, ya que se utiliza en el payload de la funcion crearSolicitud

const solicitudesService = {
  async getMisSolicitudes(): Promise<Solicitud[]> {
    const { data } = await http.get<Solicitud[]>('/solicitudes/mis-solicitudes')
    return data
  },

  async getDetalle(id: string): Promise<Solicitud> {
    const { data } = await http.get<Solicitud>(`/solicitudes/${id}`)
    return data
  },

  async crear(payload: { //Nueva linea ingresada
    tipo: TipoTramite
    descripcion: string
    cursoActual?: string
    cursoNuevo?: string
    archivos?: File[]
  }) {
    const formData = new FormData()
    formData.append('tipo', payload.tipo)
    formData.append('descripcion', payload.descripcion)
    if (payload.cursoActual) formData.append('cursoActual', payload.cursoActual)
    if (payload.cursoNuevo) formData.append('cursoNuevo', payload.cursoNuevo)
    if (payload.archivos) {
      payload.archivos.forEach((archivo, index) => {
        formData.append(`archivos[${index}]`, archivo)
      })
    }
    const { data } = await http.post('/solicitudes', formData)
    return data
  }, // Fin de nueva linea


  getRecent(): Promise<Solicitud[]> {
    return Promise.resolve(RECENT_SOLICITUDES)
  },
}

export default solicitudesService

// Simulated data — replace with real API calls via httpClient
const RECENT_SOLICITUDES: Solicitud[] = [
  { id: 'REQ-2024-001', tipo: 'Cambio de Jornada', fechaEnvio: '15 Oct 2023', estado: 'En proceso' },
  { id: 'REQ-2024-002', tipo: 'Adición de Curso', fechaEnvio: '10 Oct 2023', estado: 'Aprobada' },
  { id: 'REQ-2024-003', tipo: 'Curso Dirigido', fechaEnvio: '05 Oct 2023', estado: 'Rechazada' },
  { id: 'REQ-2024-004', tipo: 'Cambio de Curso', fechaEnvio: '01 Oct 2023', estado: 'Aprobada' },
  { id: 'REQ-2024-005', tipo: 'Adición de Curso', fechaEnvio: '28 Sep 2023', estado: 'En proceso' },
]

export const QUICK_ACTIONS: QuickAction[] = [
  { type: 'Cambio de Curso', emoji: '🔄', description: 'Solicita moverte a una sección diferente del mismo curso.' },
  { type: 'Cambio de Jornada', emoji: '☀️', description: 'Modifica tu horario entre mañana, tarde o noche.' },
  { type: 'Curso Dirigido', emoji: '📚', description: 'Solicitud especial con tutoría personalizada.' },
  { type: 'Adición de Curso', emoji: '➕', description: 'Agrega una materia adicional a tu carga académica.' },
]