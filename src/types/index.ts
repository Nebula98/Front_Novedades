// ═══════════════════════════════════════════════════════════════════════════
// AUTHENTICATION & USER TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface LoginPayload {
  codigo_estudiantil: string
  password: string
}

export interface LoginResponse {
  token: string
  requiresPasswordChange: boolean
  student: StudentInfo
}

export interface ChangePasswordPayload {
  password_actual: string
  password_nueva: string
  password_confirmacion: string
}

export interface ChangePasswordResponse {
  token: string
  student: StudentInfo
}

export interface StudentInfo {
  id: string
  nombre: string
  codigo: string
  rol?: RolUsuario
  carrera?: string
  semestre?: number
  email?: string
  requiresPasswordChange?: boolean
  programa?: string
  avatarUrl?: string
  promedio?: string | number
}

export interface User {
  code: string
  name: string
  program: string
  semester: string
  avatarInitials: string
  mustChangePassword?: boolean
}

// ═══════════════════════════════════════════════════════════════════════════
// SOLICITUDES & TRAMITES
// ═══════════════════════════════════════════════════════════════════════════

export type TipoTramite =
  | 'Cambio de Curso'
  | 'Cambio de Jornada'
  | 'Curso Dirigido'
  | 'Adición de Curso'
  | 'Cancelación de Semestre'
  | 'Examen Supletorio'
  | 'Cambio de Programa'

export type EstadoSolicitud = 'En proceso' | 'Aprobada' | 'Rechazada' | 'Pendiente' | 'En Revisión'

// Alias para mantener compatibilidad hacia atrás
export type EstadoSolicitudAdmin = EstadoSolicitud

export interface EstudianteDetalle {
  nombre: string
  codigo: string
  programa: string
  semestre: string
  promedio: string
  correo: string
  avatarUrl?: string
}

export interface DocumentoSoporte {
  nombre: string
  url: string
}

export interface EntradaHistorial {
  titulo: string
  fecha: string
  actor: string
  activo?: boolean
}

export interface Solicitud {
  id: string
  tipo: TipoTramite
  estado: EstadoSolicitud
  fechaEnvio: string
  fechaDecision?: string
  razonRechazo?: string
  programa?: string
  fecha?: string
}

export interface SolicitudAdmin {
  id: string
  estudiante: { nombre: string; codigo: string; avatarUrl?: string }
  tipo: TipoTramite
  estado: EstadoSolicitud
  fechaEnvio: string
  fechaDecision?: string
  razonRechazo?: string
  programa?: string
}

export interface SolicitudDetalle {
  id: string
  tipo: TipoTramite
  estado: EstadoSolicitudAdmin
  radicadoFecha: string
  estudiante: EstudianteDetalle
  estadoActual: string
  estadoSolicitado: string
  justificacion: string
  documentos: DocumentoSoporte[]
  notaReglamento?: string
  historial: EntradaHistorial[]
  guiaDecision?: string
}

export interface QuickAction {
  id: number
  type: TipoTramite
  label: string
  description?: string
  emoji?: string
  icon?: string
}

export interface DashboardStats {
  totalPendientes: number
  nuevasUltimaHora: number
  aprobadasHoy: number
  metaDiariaPercent: number
  solicitudesEnProceso?: number
  solicitudesAprobadas?: number
  solicitudesRechazadas?: number
  ultimaActualizacion?: string
}

export interface NavItemSecretaria {
  label: string
  routeName: string
  iconKey: 'dashboard' | 'solicitudes' | 'config'
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type RolUsuario = 'Administrador' | 'Secretaria' | 'Estudiante' | 'Docente'

export type EstadoUsuario = 'Activo' | 'Inactivo' | 'Suspendido' | 'Pendiente'

export interface UsuarioAdmin {
  id: string
  nombre: string
  email: string
  codigo: string
  rol: RolUsuario
  programa: string
  estado: EstadoUsuario
  fechaCreacion: string
  ultimoAcceso?: string
  idInstitucional?: string
  avatarUrl?: string
}

export interface UsuariosStats {
  totalUsuarios: number
  totalEstudiantes: number
  totalDocentes: number
  totalAdministrativos: number
  crecimientoSemestre: number
  usuariosPorRol: Record<string, number>
  usuariosActivos?: number
  porcentajeActivos?: number
}

export interface CreateUsuarioPayload {
  nombre_completo: string
  email_institucional: string
  rol: RolUsuario
  programa: string
  codigo_institucional?: string
}

export interface UpdateUsuarioPayload {
  nombre_completo?: string
  email_institucional?: string
  rol?: RolUsuario
  programa?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION & UI
// ═══════════════════════════════════════════════════════════════════════════

export interface NavItem {
  label: string
  routeName: string
  iconKey: 'home' | 'plus' | 'shield' | 'history'
}

export type NavItemSuperAdmin = NavItem

// ═══════════════════════════════════════════════════════════════════════════
// GRUPOS & ACADEMICO
// ═══════════════════════════════════════════════════════════════════════════

export interface Grupo {
  id: string
  nombre: string
  codigo: string
  descripcion?: string
  estudiantes?: string[]
}

export interface FiltrosGrupos {
  search?: string
  programa?: string
  semestre?: number
  periodo?: string
  curso_id?: number
  jornada?: string
}

export interface PerfilAcademico {
  promedio: number
  creditosAprobados: number
  creditosInscritos: number
  carrera: string
  semestre: number
}

export interface AdjuntoDocumento {
  id: string
  nombre: string
  url: string
  tipo: string
}

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

export interface ApiError {
  message: string
  statusCode?: number
  field?: string
}
