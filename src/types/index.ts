// ═══════════════════════════════════════════════════════════════════════════
// TIPOS DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════

export type RolUsuario = 'Administrador' | 'Secretaria' | 'Estudiante' | 'Docente'

export interface LoginPayload {
    codigoEstudiantil: string
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

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS DE ESTUDIANTE
// ═══════════════════════════════════════════════════════════════════════════

export interface StudentInfo {
    id: string
    nombre: string
    codigo: string
    rol?: RolUsuario
    carrera?: string
    programa?: string
    semestre?: number
    email?: string
    requiresPasswordChange?: boolean
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
// TIPOS DE SOLICITUDES
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

// Alias para mantener compatibilidad
export type EstadoSolicitudAdmin = EstadoSolicitud

export interface Solicitud {
    id: string
    tipo: TipoTramite
    fechaEnvio: string
    estado: EstadoSolicitud
    razonRechazo?: string
    descripcion?: string
    facultad?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS DE USUARIO (ADMIN)
// ═══════════════════════════════════════════════════════════════════════════

export interface UsuarioAdmin {
    id: number
    nombre: string
    nombre_completo: string
    email: string
    email_institucional?: string
    rol: RolUsuario
    codigo_estudiantil?: string
    codigo_institucional?: string
    activo: boolean
    estado?: EstadoUsuario
    carrera?: string
    programa?: string
    semestre?: number
    promedio?: string
    avatarUrl?: string
    idInstitucional?: string
}

export interface CreateUsuarioPayload {
    nombre_completo: string
    codigo_estudiantil?: string
    codigo_institucional?: string
    email_institucional?: string
    email?: string
    rol: RolUsuario
    carrera?: string
    programa?: string
    semestre?: number
}

export interface UpdateUsuarioPayload {
    nombre_completo?: string
    email_institucional?: string
    carrera?: string
    programa?: string
    semestre?: number
}

export interface UsuariosStats {
    total_usuarios: number
    estudiantes: number
    secretarias: number
    administradores: number
    activos: number
    inactivos: number
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS DE ERROR
// ═══════════════════════════════════════════════════════════════════════════

export interface ApiError {
    message: string
    statusCode?: number
    field?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS ADICIONALES (Compatibilidad)
// ═══════════════════════════════════════════════════════════════════════════

export type EstadoUsuario = 'Activo' | 'Inactivo' | 'Suspension'

export interface SolicitudAdmin {
    id: number | string
    id_estudiante: number | string
    codigo_solicitud: string
    tipo: TipoTramite
    estado: EstadoSolicitud
    fecha_creacion: string
    fecha_actualizacion: string
    estudiante_nombre: string
    estudiante_codigo: string
    descripcion?: string
    razonRechazo?: string
    observaciones?: string
    programa?: string
    fechaEnvio?: string
    estudiante?: {
        nombre: string
        codigo: string
        programa: string
        semestre: number
        promedio: string
        email: string
        avatarUrl?: string
    }
}

export interface SolicitudDetalle extends SolicitudAdmin {
    detalles?: Record<string, any>
    documentos?: AdjuntoDocumento[]
    radicadoFecha?: string
    estadoActual?: string
    estadoSolicitado?: string
    justificacion?: string
    notaReglamento?: string
    historial?: any[]
    guiaDecision?: string
    programa?: string
    fechaEnvio?: string
    estudiante?: {
        nombre: string
        codigo: string
        programa: string
        semestre: number
        promedio: string
        email: string
    }
}

export interface DashboardStats {
    total_usuarios: number
    totalUsuarios?: number
    estudiantes: number
    secretarias: number
    administradores: number
    activos: number
    usuariosActivos?: number
    inactivos: number
    solicitudes_pendientes?: number
    totalPendientes?: number
    solicitudes_aprobadas?: number
    nuevasUltimaHora?: number
    crecimientoSemestre?: number
    porcentajeActivos?: number
    aprobadasHoy?: number
    metaDiariaPercent?: number
}

export interface PerfilAcademico {
    carrera: string
    programa: string
    semestre: number
    promedio: number
}

export interface AdjuntoDocumento {
    nombre: string
    url: string
    tipo: string
    fecha_subida: string
}

export interface Grupo {
    id: number
    codigo: string
    nombre: string
    carrera: string
    semestre: number
    profesor: string
    horario: string
}

export interface FiltrosGrupos {
    carrera?: string
    semestre?: number
    programa?: string
    periodo?: string
    curso_id?: number
    jornada?: string
}

export interface NavItem {
    id: string
    label: string
    icon?: string
    route?: string
    children?: NavItem[]
    active?: boolean
}