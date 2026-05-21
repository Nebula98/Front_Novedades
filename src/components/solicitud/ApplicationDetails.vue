<template>
  <section class="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
    <div class="flex items-center gap-2">
      <div class="bg-slate-100 p-2 rounded-md flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h2 class="text-sm font-bold text-slate-700">Detalles de la Solicitud</h2>
        <p class="text-xs text-slate-400">Seleccione el tipo de trámite y proporcione la información requerida.</p>
      </div>
    </div>

    <!-- Tipo de Solicitud -->
    <div class="border-t border-slate-100 pt-4">
      <label class="block text-xs font-semibold text-slate-600 mb-1.5">
        Tipo de Solicitud <span class="text-red-500">*</span>
      </label>
      <select :value="modelValue.tipoSolicitud"
        @change="update('tipoSolicitud', ($event.target as HTMLSelectElement).value)" class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-700
               focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
        <option value="" disabled>Seleccione un tipo...</option>
        <option v-for="tipo in tiposSolicitud" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
      <p class="text-xs text-slate-400 mt-1">
        Seleccione el motivo principal de su requerimiento para habilitar los campos correspondientes.
      </p>
    </div>

    <!-- Campos dinámicos -->
    <Transition name="fade">
      <div v-if="modelValue.tipoSolicitud" class="space-y-4">

        <div v-if="modelValue.tipoSolicitud === 'Cambio de Curso'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Curso
                Actual</label>
              <select :value="modelValue.cursoActual"
                @change="onCursoActualChange(($event.target as HTMLSelectElement).value)"
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
                <option value="" disabled>Selecciona un curso...</option>
                <option v-for="curso in cursosActual" :key="curso.id" :value="curso.nombre_curso">
                  {{ etiquetaCurso(curso) }}
                </option>
              </select>
              <!-- Detalle del curso actual seleccionado -->
              <CuposDetalle v-if="modelValue.cursoActual" :grupo="cuposInfo(cursosActual, modelValue.cursoActual)" :matriculados-ids="gruposMatriculadosIds" />
              <p v-else-if="cargando || cursosActual.length === 0" class="text-xs text-slate-400 mt-1">{{ cargando ? '⏳ Cargando...' : 'Sin cursos disponibles' }}</p>
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nuevo Curso
                Solicitado</label>
              <select :value="modelValue.nuevoCurso"
                @change="onNuevoCursoChange(($event.target as HTMLSelectElement).value)"
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
                <option value="" disabled>Selecciona un curso...</option>
                <option v-for="curso in cursosActual" :key="curso.id" :value="curso.nombre_curso">
                  {{ etiquetaCurso(curso) }}
                </option>
              </select>
              <!-- Detalle del nuevo curso seleccionado -->
              <CuposDetalle v-if="modelValue.nuevoCurso" :grupo="cuposInfo(cursosActual, modelValue.nuevoCurso)" :matriculados-ids="gruposMatriculadosIds" />
              <p v-else-if="cargando || cursosActual.length === 0" class="text-xs text-slate-400 mt-1">{{ cargando ? '⏳ Cargando...' : 'Sin cursos disponibles' }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Código Curso
                Actual</label>
              <input :value="modelValue.codigoCursoActual"
                @input="update('codigoCursoActual', ($event.target as HTMLInputElement).value)" type="text"
                placeholder="Ej: CSE-2025"
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Código Nuevo Curso</label>
              <input :value="modelValue.codigoCursoNuevo"
                @input="update('codigoCursoNuevo', ($event.target as HTMLInputElement).value)" type="text"
                placeholder="Ej: CSE-2035"
                class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
            </div>
          </div>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Cambio de Jornada'"
          class="grid grid-cols-2 gap-4 border border-slate-100 rounded-lg p-4 bg-slate-50 space-y-4">
          <div class="col-span-full">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Jornada
                  Actual</label>
                <select :value="modelValue.jornadaActual"
                  @change="update('jornadaActual', ($event.target as HTMLSelectElement).value)"
                  class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
                  <option value="" disabled>Seleccione...</option>
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Jornada
                  Solicitada</label>
                <select :value="modelValue.jornadaNueva"
                  @change="update('jornadaNueva', ($event.target as HTMLSelectElement).value)"
                  class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
                  <option value="" disabled>Seleccione...</option>
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Cursos disponibles para la nueva jornada -->
          <div v-if="modelValue.jornadaNueva" class="col-span-full">
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Cursos Disponibles en la Nueva Jornada</label>
            <select 
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all"
              @change="update('nuevoCurso', ($event.target as HTMLSelectElement).value)"
              :value="modelValue.nuevoCurso">
              <option value="" disabled>Selecciona un curso...</option>
              <option v-for="curso in cursosNuevo" :key="curso.id" :value="curso.nombre_curso">
                {{ etiquetaCurso(curso) }}
              </option>
            </select>
            <CuposDetalle v-if="modelValue.nuevoCurso" :grupo="cuposInfo(cursosNuevo, modelValue.nuevoCurso)" :matriculados-ids="gruposMatriculadosIds" />
            <p v-else-if="cargando" class="text-xs text-slate-400 mt-1">⏳ Cargando cursos...</p>
            <p v-else-if="cursosNuevo.length === 0" class="text-xs text-slate-400 mt-1">ℹ️ No hay cursos disponibles para esta jornada</p>
          </div>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Curso Dirigido'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Materia</label>
          <select :value="modelValue.materia"
            @change="onGrupoNuevoChange('materia', ($event.target as HTMLSelectElement).value)"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
            <option value="" disabled>Selecciona un curso...</option>
            <option v-for="curso in todosLosCursos" :key="curso.id" :value="curso.nombre_curso">
              {{ etiquetaCurso(curso) }}
            </option>
          </select>
          <CuposDetalle v-if="modelValue.materia" :grupo="cuposInfo(todosLosCursos, modelValue.materia)" :matriculados-ids="gruposMatriculadosIds" />
          <p v-else-if="cargando && todosLosCursos.length === 0" class="text-xs text-slate-400 mt-1">⏳ Cargando cursos...</p>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Adición de Curso'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Curso a
            Adicionar</label>
          <select :value="modelValue.cursoAdicionar"
            @change="onGrupoNuevoChange('cursoAdicionar', ($event.target as HTMLSelectElement).value)"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
            <option value="" disabled>Selecciona un curso...</option>
            <option v-for="curso in todosLosCursos" :key="curso.id" :value="curso.nombre_curso">
              {{ etiquetaCurso(curso) }}
            </option>
          </select>
          <CuposDetalle v-if="modelValue.cursoAdicionar" :grupo="cuposInfo(todosLosCursos, modelValue.cursoAdicionar)" :matriculados-ids="gruposMatriculadosIds" />
          <p v-else-if="cargando && todosLosCursos.length === 0" class="text-xs text-slate-400 mt-1">⏳ Cargando cursos...</p>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Cancelación de Semestre'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Motivo de Cancelación</label>
          <select :value="modelValue.motivoCancelacion"
            @change="update('motivoCancelacion', ($event.target as HTMLSelectElement).value)"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
            <option value="" disabled>Seleccione un motivo...</option>
            <option>Razones Personales</option>
            <option>Razones Médicas</option>
            <option>Razones Laborales</option>
            <option>Razones Familiares</option>
            <option>Otros</option>
          </select>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Examen Supletorio'"
          class="space-y-4 border border-slate-100 rounded-lg p-4 bg-slate-50">
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Materia del Examen</label>
            <select :value="modelValue.materiaExamen"
              @change="onGrupoNuevoChange('materiaExamen', ($event.target as HTMLSelectElement).value)"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
              <option value="" disabled>Selecciona una materia...</option>
              <option v-for="curso in todosLosCursos" :key="curso.id" :value="curso.nombre_curso">
                {{ etiquetaCurso(curso) }}
              </option>
            </select>
            <CuposDetalle v-if="modelValue.materiaExamen" :grupo="cuposInfo(todosLosCursos, modelValue.materiaExamen)" :matriculados-ids="gruposMatriculadosIds" />
            <p v-else-if="cargando && todosLosCursos.length === 0" class="text-xs text-slate-400 mt-1">⏳ Cargando cursos...</p>
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Motivo de Solicitud</label>
            <select :value="modelValue.motivoExamen"
              @change="update('motivoExamen', ($event.target as HTMLSelectElement).value)"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
              <option value="" disabled>Seleccione un motivo...</option>
              <option>Enfermedad</option>
              <option>Conflicto de Horario</option>
              <option>Razones Justificadas</option>
              <option>Otros</option>
            </select>
          </div>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Cambio de Programa'"
          class="space-y-4 border border-slate-100 rounded-lg p-4 bg-slate-50">
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Programa Actual</label>
            <select :value="modelValue.programaActual"
              @change="update('programaActual', ($event.target as HTMLSelectElement).value)"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
              <option value="" disabled>Seleccione su programa actual...</option>
              <option v-for="prog in programas" :key="prog.id" :value="prog.nombre">
                {{ prog.nombre }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Programa Solicitado</label>
            <select :value="modelValue.programaNuevo"
              @change="update('programaNuevo', ($event.target as HTMLSelectElement).value)"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all">
              <option value="" disabled>Seleccione programa solicitado...</option>
              <option v-for="prog in programas" :key="prog.id" :value="prog.nombre"
                :disabled="prog.nombre === modelValue.programaActual">
                {{ prog.nombre }}
              </option>
            </select>
          </div>
        </div>

      </div>
    </Transition>

    <!-- Justificación -->
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1.5">
        Justificación de la Solicitud <span class="text-red-500">*</span>
      </label>
      <textarea :value="modelValue.justificacion"
        @input="update('justificacion', ($event.target as HTMLTextAreaElement).value)" rows="5" maxlength="500"
        placeholder="Explique detalladamente los motivos de su solicitud (mínimo 50 caracteres)." class="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-700
               focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400
               resize-none transition-all" />
      <div class="flex items-center justify-between mt-1">
        <p class="flex items-center gap-1 text-xs text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          Sea claro y conciso para facilitar el proceso de revision
        </p>
        <span class="text-xs" :class="modelValue.justificacion.length < 50 ? 'text-red-400' : 'text-slate-400'">
          {{ modelValue.justificacion.length }} / 500
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { TipoTramite, Grupo } from '../../types'
import grupoService from '../../services/grupoService'
import estudianteService from '../../services/estudianteService'
import CuposDetalle from './CuposDetalle.vue'

interface FormModel {
  tipoSolicitud: TipoTramite | ''
  codigoCursoActual: string
  codigoCursoNuevo: string
  cursoActual: string
  nuevoCurso: string
  grupoActualId: number | null
  grupoNuevoId: number | null
  jornadaActual: string
  jornadaNueva: string
  materia: string
  cursoAdicionar: string
  motivoCancelacion: string
  materiaExamen: string
  motivoExamen: string
  programaActual: string
  programaNuevo: string
  justificacion: string
}

interface Props {
  modelValue: FormModel
  jornadaActual?: string
}

const props = withDefaults(defineProps<Props>(), {
  jornadaActual: 'Mañana'
})
const emit = defineEmits<{ (e: 'update:modelValue', value: FormModel): void }>()

const tiposSolicitud: TipoTramite[] = [
  'Cambio de Curso',
  'Cambio de Jornada',
  'Curso Dirigido',
  'Adición de Curso',
  'Cancelación de Semestre',
  'Examen Supletorio',
  'Cambio de Programa',
]

// Programas académicos disponibles
const programas = [
  { id: 1, nombre: 'Ingeniería de Sistemas' },
  { id: 2, nombre: 'Ingeniería Industrial' },
  { id: 3, nombre: 'Administración de Empresas' },
]

// Estado reactivo para cursos disponibles
const cursosActual = ref<Grupo[]>([])
const cursosNuevo = ref<Grupo[]>([])
const todosLosCursos = ref<Grupo[]>([])
const cargando = ref(false)
// IDs de grupos en los que el estudiante ya está matriculado
const gruposMatriculadosIds = ref<number[]>([])

// Cargar grupos matriculados al montar el componente
onMounted(async () => {
  try {
    gruposMatriculadosIds.value = await estudianteService.getGruposMatriculadosIds()
  } catch {
    gruposMatriculadosIds.value = []
  }
})

function estaMatriculado(grupoId: number): boolean {
  return gruposMatriculadosIds.value.includes(grupoId)
}

function etiquetaCurso(curso: Grupo): string {
  const inscrito = estaMatriculado(curso.id) ? ' ✓ Inscrito' : ''
  const cupos = curso.cupos_disponibles === 0
    ? ' — Sin cupos'
    : ` — ${curso.cupos_disponibles} cupos`
  return `${curso.nombre_curso} (${curso.codigo_grupo}) · ${curso.dia_semana} ${curso.hora_inicio.slice(0,5)}-${curso.hora_fin.slice(0,5)}${cupos}${inscrito}`
}

function cuposInfo(lista: Grupo[], nombreCurso: string): Grupo | undefined {
  return lista.find(c => c.nombre_curso === nombreCurso)
}

// Emite el objeto completo actualizado con el campo modificado
function update(field: keyof FormModel, value: string) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

// Al seleccionar curso actual en "Cambio de Curso", auto-rellenar código y grupo ID
function onCursoActualChange(nombre: string) {
  const curso = cursosActual.value.find(c => c.nombre_curso === nombre)
  emit('update:modelValue', {
    ...props.modelValue,
    cursoActual: nombre,
    codigoCursoActual: curso?.cod_curso || '',
    grupoActualId: curso?.id ?? null
  })
}

// Al seleccionar nuevo curso en "Cambio de Curso", auto-rellenar código y grupo ID
function onNuevoCursoChange(nombre: string) {
  const curso = cursosActual.value.find(c => c.nombre_curso === nombre)
  emit('update:modelValue', {
    ...props.modelValue,
    nuevoCurso: nombre,
    codigoCursoNuevo: curso?.cod_curso || '',
    grupoNuevoId: curso?.id ?? null
  })
}

// Al seleccionar curso en tipos que solo necesitan grupoNuevoId
function onGrupoNuevoChange(field: keyof FormModel, nombre: string) {
  const curso = todosLosCursos.value.find(c => c.nombre_curso === nombre)
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: nombre,
    grupoNuevoId: curso?.id ?? null
  })
}

// Carga cursos para la jornada especificada
async function cargarCursos(jornada: string) {
  cargando.value = true
  try {
    const cursos = await grupoService.obtenerCursosPorJornada(jornada)
    return cursos
  } catch (error) {
    console.error('❌ Error cargando cursos:', error)
    return []
  } finally {
    cargando.value = false
  }
}

// Carga todos los cursos del período (sin filtro de jornada)
async function cargarTodosLosCursos() {
  cargando.value = true
  try {
    return await grupoService.obtenerTodosLosCursos()
  } catch (error) {
    console.error('❌ Error cargando todos los cursos:', error)
    return []
  } finally {
    cargando.value = false
  }
}

// Watcher: al cambiar tipo de solicitud, cargar cursos si es necesario
watch(
  () => props.modelValue.tipoSolicitud,
  async (tipo) => {
    const tiposConCursos = ['Curso Dirigido', 'Adición de Curso', 'Examen Supletorio']
    if (tiposConCursos.includes(tipo) && todosLosCursos.value.length === 0) {
      todosLosCursos.value = await cargarTodosLosCursos()
    }
    if (tipo === 'Cambio de Curso' && props.jornadaActual) {
      cursosActual.value = await cargarCursos(props.jornadaActual)
    }
  }
)

// Watchers para cargar cursos según la jornada seleccionada
watch(
  () => props.jornadaActual,
  async (nuevaJornada) => {
    if (props.modelValue.tipoSolicitud === 'Cambio de Curso' && nuevaJornada) {
      cursosActual.value = await cargarCursos(nuevaJornada)
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue.jornadaNueva,
  async (nuevaJornada) => {
    if (props.modelValue.tipoSolicitud === 'Cambio de Jornada' && nuevaJornada) {
      cursosNuevo.value = await cargarCursos(nuevaJornada)
    }
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>