import http from '../utils/httpClient'
import type { PerfilAcademico, AdjuntoDocumento, StudentInfo } from '../types'

const estudiantesService = {
  /**
   * Obtiene la información completa del estudiante autenticado
   */
  async getInfoCompleta(): Promise<StudentInfo> {
    const { data } = await http.get<StudentInfo>('/estudiantes/info')
    return data
  },

  /**
   * Obtiene el perfil académico del estudiante autenticado
   * Retorna: código, semestre, programa, jornada, créditos
   */
  async getPerfilAcademico(): Promise<PerfilAcademico> {
    const { data } = await http.get<PerfilAcademico>('/estudiantes/perfil')
    return data
  },

  /**
   * Adjunta un documento a una solicitud específica
   * Soporta: PDF, JPG, PNG (máximo 5MB, máximo 3 por solicitud)
   */
  async adjuntarDocumento(
    solicitudId: string,
    archivo: File,
  ): Promise<AdjuntoDocumento> {
    const form = new FormData()
    form.append('archivo', archivo)

    const { data } = await http.post<AdjuntoDocumento>(
      `/estudiantes/solicitudes/${solicitudId}/adjunto`,
      form,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
    return data
  },
}

export default estudiantesService
