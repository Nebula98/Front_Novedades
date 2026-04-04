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
          class="grid grid-cols-2 gap-4 border border-slate-100 rounded-lg p-4 bg-slate-50">
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Curso
              Actual</label>
            <input :value="modelValue.cursoActual"
              @input="update('cursoActual', ($event.target as HTMLInputElement).value)" type="text"
              placeholder="Ej: Cálculo Integral - G.02"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nuevo Curso
              Solicitado</label>
            <input :value="modelValue.nuevoCurso"
              @input="update('nuevoCurso', ($event.target as HTMLInputElement).value)" type="text"
              placeholder="Ej: Cálculo Integral - G.05"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
          </div>
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Cambio de Jornada'"
          class="grid grid-cols-2 gap-4 border border-slate-100 rounded-lg p-4 bg-slate-50">
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

        <div v-if="modelValue.tipoSolicitud === 'Curso Dirigido'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Materia</label>
          <input :value="modelValue.materia" @input="update('materia', ($event.target as HTMLInputElement).value)"
            type="text" placeholder="Ej: Álgebra Lineal"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
        </div>

        <div v-if="modelValue.tipoSolicitud === 'Adición de Curso'"
          class="border border-slate-100 rounded-lg p-4 bg-slate-50">
          <label class="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Curso a
            Adicionar</label>
          <input :value="modelValue.cursoAdicionar"
            @input="update('cursoAdicionar', ($event.target as HTMLInputElement).value)" type="text"
            placeholder="Ej: Estadística II - G.01"
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all" />
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
import type { TipoTramite } from '../../types'

interface FormModel {
  tipoSolicitud: TipoTramite | ''
  cursoActual: string
  nuevoCurso: string
  jornadaActual: string
  jornadaNueva: string
  materia: string
  cursoAdicionar: string
  justificacion: string
}

const props = defineProps<{ modelValue: FormModel }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: FormModel): void }>()

const tiposSolicitud: TipoTramite[] = [
  'Cambio de Curso',
  'Cambio de Jornada',
  'Curso Dirigido',
  'Adición de Curso',
]

// Emite el objeto completo actualizado con el campo modificado
function update(field: keyof FormModel, value: string) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
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