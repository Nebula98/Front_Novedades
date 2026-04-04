<template>
  <DashboardLayout>
    <template #header>
      <AppHeader />
    </template>
    <template #sidebar>
      <AppSidebar />
    </template>

    <div class="max-w-3xl mx-auto space-y-6">

      <FormHeader />

      <QuickHelp :tipo-solicitud="form.tipoSolicitud" />

      <AcademicInfo :student="authStore.student" />

      <ApplicationDetails v-model="form" />

      <AttachedDocuments />

      <!-- Footer -->
      <div class="flex items-center justify-between pb-8">
        <p class="text-xs text-slate-400">Campos obligatorios marcados con asterisco (*)</p>
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-300
                   rounded-lg hover:bg-slate-50 transition-colors"
            @click="router.push({ name: 'Dashboard' })"
          >
            Cancelar y Volver
          </button>
          <button
            class="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                   bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!formularioValido || isSubmitting"
            @click="handleSubmit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zM21.854 2.147l-10.94 10.939"/>
            </svg>
            {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitud' }}
          </button>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import DashboardLayout from '../components/dashboard/DashboardLayout.vue'
import AppHeader from '../components/dashboard/AppHeader.vue'
import AppSidebar from '../components/dashboard/AppSidebar.vue'
import FormHeader from '../components/solicitud/FormHeader.vue'
import QuickHelp from '../components/solicitud/QuickHelp.vue'
import AcademicInfo from '../components/solicitud/AcademicInfo.vue'
import ApplicationDetails from '../components/solicitud/ApplicationDetails.vue'
import AttachedDocuments from '../components/solicitud/AttachedDocuments.vue'

import { useAuthStore } from '../store/authStore'
import type { TipoTramite } from '../types'

const router = useRouter()
const authStore = useAuthStore()
const isSubmitting = ref(false)

const form = ref({
  tipoSolicitud: '' as TipoTramite | '',
  cursoActual: '',
  nuevoCurso: '',
  jornadaActual: '',
  jornadaNueva: '',
  materia: '',
  cursoAdicionar: '',
  justificacion: '',
})

const formularioValido = computed(() =>
  !!form.value.tipoSolicitud && form.value.justificacion.length >= 50
)

async function handleSubmit() {
  if (!formularioValido.value) return
  isSubmitting.value = true
  try {
    // TODO: await solicitudesService.crearSolicitud({ ...form.value })
    console.log('Enviando:', form.value)
    await router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Error al enviar:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>