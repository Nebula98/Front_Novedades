import http from '../utils/httpClient'
import type { Grupo, FiltrosGrupos } from '../types'

const gruposService = {
  /**
   * Lista todos los grupos disponibles
   * Soporta filtros por período, curso y jornada
   */
  async listarGrupos(filtros?: FiltrosGrupos): Promise<Grupo[]> {
    const params = new URLSearchParams()
    if (filtros) {
      if (filtros.periodo) params.append('periodo', filtros.periodo)
      if (filtros.curso_id) params.append('curso_id', String(filtros.curso_id))
      if (filtros.jornada) params.append('jornada', filtros.jornada)
    }

    const { data } = await http.get<Grupo[]>(
      `/grupos${params.toString() ? `?${params.toString()}` : ''}`,
    )
    return data
  },

  /**
   * Lista todos los grupos de un período específico
   */
  async listarPorPeriodo(periodo: string): Promise<Grupo[]> {
    return this.listarGrupos({ periodo })
  },

  /**
   * Lista grupos filtrados por curso
   */
  async listarPorCurso(periodo: string, cursoId: number): Promise<Grupo[]> {
    return this.listarGrupos({ periodo, curso_id: cursoId })
  },

  /**
   * Lista grupos filtrados por jornada
   */
  async listarPorJornada(
    periodo: string,
    jornada: 'manana' | 'tarde' | 'noche',
  ): Promise<Grupo[]> {
    return this.listarGrupos({ periodo, jornada })
  },
}

export default gruposService
