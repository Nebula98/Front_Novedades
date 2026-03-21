<template>
  <DashboardLayout>

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
      <span class="text-slate-500">Trámites Académicos</span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="text-indigo-600 font-semibold">Nueva Solicitud</span>
    </nav>

    <!-- Page header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">Formulario de Solicitud</h1>
      <p class="text-sm text-slate-500 leading-relaxed max-w-xl">
        Complete los siguientes campos para formalizar su requerimiento ante la secretaría académica. Asegúrese de adjuntar los soportes necesarios.
      </p>
    </div>

    <!-- Banner ayuda rápida -->
    <div class="flex items-start gap-3 bg-indigo-50 border border-indigo-200 border-l-[3px] border-l-indigo-500 rounded-xl px-4 py-3.5 mb-5">
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="text-sm text-indigo-800 leading-relaxed">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-indigo-500 mb-0.5">Ayuda rápida</span>
        Usted está realizando una solicitud de
        <strong class="font-semibold">{{ form.tipo || 'trámite académico' }}</strong>.
        El tiempo estimado de respuesta es de 3 a 5 días hábiles.
      </div>
    </div>

    <div class="max-w-2xl space-y-4 pb-24">

      <!-- ── SECCIÓN 1: Información Académica ── -->
      <section class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex items-start gap-3 px-6 py-5 border-b border-slate-100">
          <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <h2 class="text-[14px] font-bold text-slate-800">Información Académica</h2>
            <p class="text-xs text-slate-400 mt-0.5">Estos datos han sido cargados automáticamente desde su registro institucional.</p>
          </div>
        </div>

        <div class="grid grid-cols-2 divide-x divide-y divide-slate-100">
          <div class="px-6 py-4">
            <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Nombre Completo
            </p>
            <p class="text-[13.5px] font-semibold text-slate-800">{{ student?.nombre ?? '—' }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Código Estudiante
            </p>
            <p class="text-[13.5px] font-semibold text-slate-800 font-mono">{{ student?.codigo ?? '—' }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Programa Académico
            </p>
            <p class="text-[13.5px] font-semibold text-slate-800">{{ student?.carrera ?? '—' }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-6"/></svg>
              Semestre Actual
            </p>
            <p class="text-[13.5px] font-semibold text-slate-800">
              {{ student?.semestre ? `${student.semestre}º Semestre` : '—' }}
            </p>
          </div>
        </div>
      </section>

      <!-- ── SECCIÓN 2: Detalles de la Solicitud ── -->
      <section class="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5">
        <div class="flex items-start gap-3 pb-5 border-b border-slate-100 mb-5">
          <div class="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 text-indigo-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h2 class="text-[14px] font-bold text-slate-800">Detalles de la Solicitud</h2>
            <p class="text-xs text-slate-400 mt-0.5">Seleccione el tipo de trámite y proporcione la información requerida.</p>
          </div>
        </div>

        <!-- Tipo de Solicitud -->
        <div class="mb-5">
          <label class="block text-[13px] font-semibold text-slate-700 mb-2">
            Tipo de Solicitud <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              v-model="form.tipo"
              @change="onTipoChange"
              :class="[
                'w-full appearance-none px-3.5 py-2.5 pr-9 rounded-xl border text-sm text-slate-700 bg-slate-50',
                'outline-none transition-all duration-150 cursor-pointer',
                errors.tipo
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
              ]"
            >
              <option value="">— Seleccione un tipo de trámite —</option>
              <option v-for="t in TIPOS" :key="t" :value="t">{{ t }}</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <p v-if="form.tipo" class="flex items-center gap-1.5 text-[11.5px] text-slate-400 mt-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Seleccione el motivo principal de su requerimiento para habilitar los campos correspondientes.
          </p>
          <p v-if="errors.tipo" class="text-[11.5px] text-red-500 mt-1 font-medium">{{ errors.tipo }}</p>
        </div>

        <!-- Campos cursos — solo Cambio de Curso -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="form.tipo === 'Cambio de Curso'" class="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Curso Actual</p>
              <BaseInput v-model="form.cursoActual" placeholder="Ej: Cálculo Integral - G-02" />
            </div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Nuevo Curso Solicitado</p>
              <BaseInput v-model="form.cursoNuevo" placeholder="Ej: Cálculo Integral - G-35" />
            </div>
          </div>
        </Transition>

        <!-- Justificación -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-[13px] font-semibold text-slate-700">
              Justificación de la Solicitud <span class="text-red-500">*</span>
            </label>
            <span
              class="text-[11px] tabular-nums"
              :class="form.descripcion.length > 370 ? 'text-amber-500 font-semibold' : 'text-slate-400'"
            >
              {{ form.descripcion.length }} / 400
            </span>
          </div>
          <textarea
            v-model="form.descripcion"
            maxlength="400"
            rows="5"
            placeholder="Explique detalladamente los motivos de su solicitud (mínimo 50 caracteres)..."
            :class="[
              'w-full px-3.5 py-3 rounded-xl border text-sm text-slate-700 bg-slate-50',
              'resize-none outline-none leading-relaxed transition-all duration-150',
              errors.descripcion
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
            ]"
          />
          <div class="flex items-center justify-between mt-1.5">
            <div class="flex items-center gap-1.5 text-[11.5px] text-slate-400">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Mín. 50 caracteres para habilitar el envío de la solicitud.
            </div>
          </div>
          <p v-if="errors.descripcion" class="text-[11.5px] text-red-500 mt-1 font-medium">{{ errors.descripcion }}</p>
        </div>
      </section>

      <!-- ── SECCIÓN 3: Documentos Adjuntos ── -->
      <section class="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5">
        <div class="flex items-start gap-3 pb-5 border-b border-slate-100 mb-5">
          <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div>
            <h2 class="text-[14px] font-bold text-slate-800">Documentos Adjuntos</h2>
            <p class="text-xs text-slate-400 mt-0.5">Suba los soportes que validen su justificación (ej. certificados laborales, médicos, o cruces de horario).</p>
          </div>
        </div>

        <!-- Dropzone -->
        <div
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
          @click="fileInput?.click()"
          :class="[
            'border-2 border-dashed rounded-xl py-10 text-center cursor-pointer transition-all duration-200',
            isDragging
              ? 'border-indigo-400 bg-indigo-50'
              : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40'
          ]"
        >
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all', isDragging ? 'bg-indigo-100 text-indigo-500' : 'bg-slate-200 text-slate-400']">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <p class="text-sm font-semibold text-slate-600 mb-1">Haga clic o arrastre archivos aquí</p>
          <p class="text-xs text-slate-400">PDF, JPEG o PNG (Máx. 5 MB por archivo)</p>
        </div>
        <input ref="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="hidden" @change="handleFileChange" />

        <!-- Lista de archivos -->
        <TransitionGroup
          tag="ul"
          class="mt-3 space-y-2"
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <li
            v-for="(f, i) in form.archivos"
            :key="f.name + i"
            class="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 group hover:bg-white transition-colors"
          >
            <div class="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-slate-700 truncate">{{ f.name }}</p>
              <p class="text-[11px] text-slate-400">{{ formatSize(f.size) }}</p>
            </div>
            <button
              @click.stop="removeFile(i)"
              class="text-[12px] font-semibold text-red-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Eliminar
            </button>
          </li>
        </TransitionGroup>
      </section>

    </div>

    <!-- ── FOOTER STICKY ── -->
    <div class="fixed bottom-0 left-40 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-8 py-3.5 flex items-center justify-between z-30 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
      <div class="flex items-center gap-1.5 text-[11.5px] text-slate-400">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Campos obligatorios marcados con asterisco (*)
      </div>
      <div class="flex items-center gap-2.5">
        <button
          @click="router.back()"
          class="px-5 py-2 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          Cancelar y Volver
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-bold transition-all shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-px active:translate-y-0"
        >
          <svg v-if="isLoading" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          {{ isLoading ? 'Enviando...' : 'Enviar Solicitud' }}
        </button>
      </div>
    </div>

  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/authStore'
import solicitudesService from '../services/solicitudesService'
import type { TipoTramite } from '../types'
import DashboardLayout from '../components/layout/Dashboardlayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'

const router = useRouter()
const route = useRoute()
const fileInput = ref<HTMLInputElement | null>(null)

const { student } = storeToRefs(useAuthStore())

const TIPOS: TipoTramite[] = [
  'Cambio de Curso',
  'Cambio de Jornada',
  'Curso Dirigido',
  'Adición de Curso',
]

const isLoading  = ref(false)
const isDragging = ref(false)

const form = ref({
  tipo:        '' as TipoTramite | '',
  descripcion: '',
  cursoActual: '',
  cursoNuevo:  '',
  archivos:    [] as File[],
})

const errors = ref({ tipo: '', descripcion: '' })

onMounted(() => {
  const tipo = route.query.tipo as TipoTramite | undefined
  if (tipo && TIPOS.includes(tipo)) form.value.tipo = tipo
})

function onTipoChange() {
  if (form.value.tipo !== 'Cambio de Curso') {
    form.value.cursoActual = ''
    form.value.cursoNuevo  = ''
  }
  errors.value.tipo = ''
}

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) form.value.archivos.push(...Array.from(files))
  if (fileInput.value) fileInput.value.value = ''
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files) form.value.archivos.push(...Array.from(files))
}

function removeFile(i: number) {
  form.value.archivos.splice(i, 1)
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function validate(): boolean {
  errors.value = { tipo: '', descripcion: '' }
  if (!form.value.tipo)
    errors.value.tipo = 'Seleccione un tipo de trámite.'
  if (form.value.descripcion.trim().length < 50)
    errors.value.descripcion = 'La justificación debe tener al menos 50 caracteres.'
  return !errors.value.tipo && !errors.value.descripcion
}

async function handleSubmit() {
  if (!validate()) return
  isLoading.value = true
  try {
    await solicitudesService.crear({
      tipo:        form.value.tipo as TipoTramite,
      descripcion: form.value.descripcion,
      cursoActual: form.value.cursoActual || undefined,
      cursoNuevo:  form.value.cursoNuevo  || undefined,
      archivos:    form.value.archivos.length ? form.value.archivos : undefined,
    })
    router.push({ name: 'MiHistorial' })
  } catch (err: unknown) {
    errors.value.descripcion =
      (err as { message?: string })?.message ?? 'Error al enviar la solicitud.'
  } finally {
    isLoading.value = false
  }
}
</script>
