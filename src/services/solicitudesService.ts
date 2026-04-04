import http from '../utils/httpClient'
import type { Solicitud, QuickAction, TipoTramite } from '../types' //Se le agrego TipoTramite a la importacion de tipos, ya que se utiliza en el payload de la funcion crearSolicitud

const solicitudesService = {
  async getMisSolicitudes(): Promise<Solicitud[]> {
    const response = await http.get('/solicitudes/mias')
    return response.data.data || response.data
  },

  async getDetalle(id: string): Promise<Solicitud> {
    const { data } = await http.get<Solicitud>(`/solicitudes/${id}`)
    return data
  },

  async crear(payload: {
    tipo: TipoTramite
    descripcion: string
    codigo_estudiantil?: string
    email_estudiante?: string
    nombre_estudiante?: string
    cursoActual?: string
    cursoNuevo?: string
    jornada_actual?: string
    jornada_nueva?: string
    archivos?: File[]
  }) {
    const formData = new FormData()
    formData.append('tipo', payload.tipo)
    formData.append('descripcion', payload.descripcion)
    if (payload.codigo_estudiantil) formData.append('codigo_estudiantil', payload.codigo_estudiantil)
    if (payload.email_estudiante) formData.append('email_estudiante', payload.email_estudiante)
    if (payload.nombre_estudiante) formData.append('nombre_estudiante', payload.nombre_estudiante)
    if (payload.cursoActual) formData.append('curso_actual', payload.cursoActual)
    if (payload.cursoNuevo) formData.append('curso_nuevo', payload.cursoNuevo)
    if (payload.jornada_actual) formData.append('jornada_actual', payload.jornada_actual)
    if (payload.jornada_nueva) formData.append('jornada_nueva', payload.jornada_nueva)
    if (payload.archivos) {
      payload.archivos.forEach((archivo, index) => {
        formData.append(`archivos[${index}]`, archivo)
      })
    }
    const { data } = await http.post('/solicitudes', formData)
    return data
  },

  // async function obtnerJornadas() {
  //   const res = await api.get('/jornadas')
  //   return res.data 
  // }
  
  // export default{
  //   crear,
  //   obtenerJornadas,
  // },
  



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
  { id: 1, type: 'Cambio de Curso', label: 'Cambio de Curso', emoji: '🔄', description: 'Solicita moverte a una sección diferente del mismo curso.' },
  { id: 2, type: 'Cambio de Jornada', label: 'Cambio de Jornada', emoji: '☀️', description: 'Modifica tu horario entre mañana, tarde o noche.' },
  { id: 3, type: 'Curso Dirigido', label: 'Curso Dirigido', emoji: '📚', description: 'Solicitud especial con tutoría personalizada.' },
  { id: 4, type: 'Adición de Curso', label: 'Adición de Curso', emoji: '➕', description: 'Agrega una materia adicional a tu carga académico.' },
]