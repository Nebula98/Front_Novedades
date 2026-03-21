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
  rol?: string
  carrera?: string
  semestre?: number
  email?: string
  requiresPasswordChange?: boolean
  programa?: string
  avatarUrl?: string
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

export type EstadoSolicitud = 'En proceso' | 'Aprobada' | 'Rechazada' | 'Pendiente' | 'En Revisión'

// Alias para mantener compatibilidad hacia atrás
export type EstadoSolicitudAdmin = EstadoSolicitud

export interface Solicitud {
  id: string
  tipo: TipoTramite
  fechaEnvio: string
  estado: EstadoSolicitud
  descripcion?: string
  facultad?: string
  fecha?: string
}

export interface QuickAction {
  type: TipoTramite
  emoji: string
  description: string
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

export interface SolicitudAdmin {
  id: string
  estudiante: StudentInfo
  tipo: TipoTramite
  estado: EstadoSolicitud
  fechaEnvio: string
  fechaDecision?: string
  razonRechazo?: string
  programa?: string
  fecha?: string
}

export interface SolicitudDetalle extends SolicitudAdmin {
  notas: string
  documentos: string[]
}

export interface DashboardStats {
  solicitudesEnProceso: number
  solicitudesAprobadas: number
  solicitudesRechazadas: number
  ultimaActualizacion: string
  totalPendientes?: number
  nuevasUltimaHora?: number
  aprobadasHoy?: number
  metaDiariaPercent?: number
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
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

export interface ApiError {
  message: string
  statusCode?: number
  field?: string
}
