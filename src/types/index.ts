// Autenticacion
export interface LoginPayload {
    codigoEstudiantil: string,
    password: string   
}

export interface LoginResponse {
    token: string
    requiresPasswordChange: boolean
    student: StudentInfo
}

export interface ChangePasswordPayload {
    newPassword: string
    confirmPassword: string
}

export interface ChangePasswordResponse {
    message: string
    success: boolean
}

// Estudiante
export interface StudentInfo {
    id: string
    nombre: string
    codigo: string
    carrera: string
    sumestre: number
    email?: string
}

// Solicitudes
export type TipoTramite = 
    | 'Cambio de Curso'
    | 'Cambio de Jornada'
    | 'Cambio Dirigido'
    | 'Cambio de Curso'

export type EstadoSolicitud = 'En proceso' | 'Aprobada' | 'Rechazada' | 'Pendiente'

export interface Solicitud {
    id: string
    tipo: TipoTramite
    fechaEnvio: string
    estado: EstadoSolicitud
}

// Api
export interface ApiError {
    message: string
    statusCode?: number
    field?: string
}