<template>
  <DashboardLayout>

    <!-- Welcome row -->
    <div class="flex items-start justify-between mb-7">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          ¡Hola de nuevo, {{ student?.nombre }}! <span>👋</span>
        </h1>
        <p class="text-sm text-slate-400 mt-1">
          {{ student?.carrera }} | {{ student?.semestre }}º Semestre | Código: {{ student?.codigo }}
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Próxima Fecha de Registro</p>
          <p class="text-sm font-semibold text-slate-700 mt-0.5">24 de Noviembre, 2023</p>
        </div>
        <RouterLink :to="{ name: 'NuevaSolicitud' }">
          <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Nueva Solicitud
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mb-8">
      <AccionesRapidas
        :actions="quickActions"
        :selected="selectedAction"
        @select="handleActionSelect"
      />
    </div>

    <!-- Solicitudes table -->
    <div class="mb-6">
      <SolicitudesTable :solicitudes="solicitudes" />
    </div>

    <!-- Info banners -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4 items-start shadow-sm">
        <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div>
          <h4 class="text-[13px] font-bold text-slate-800 mb-1">Tiempos de Respuesta</h4>
          <p class="text-[11px] text-slate-400 leading-relaxed">Recuerda que la Secretaría Académica tiene hasta 5 días hábiles para procesar tu solicitud una vez enviada.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4 items-start shadow-sm">
        <div class="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <h4 class="text-[13px] font-bold text-slate-800 mb-1">Documentación Requerida</h4>
          <p class="text-[11px] text-slate-400 leading-relaxed">Asegúrate de tener tu recibo de pago y carnet vigente antes de iniciar trámites de Adición de Cursos.</p>
        </div>
      </div>
    </div>

  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/authStore'
import solicitudesService, { QUICK_ACTIONS } from '../services/solicitudesService'
import type { Solicitud, QuickAction } from '../types'

import DashboardLayout from '../components/layout/Dashboardlayout.vue'
import AccionesRapidas from '../components/dashboard/AccionesRapidas.vue'
import SolicitudesTable from '../components/dashboard/SolicitudesTabla.vue'

const router = useRouter()
const { student } = storeToRefs(useAuthStore())

const quickActions = QUICK_ACTIONS
const selectedAction = ref<number>(0)
const solicitudes = ref<Solicitud[]>([])

onMounted(async () => {
  solicitudes.value = await solicitudesService.getMisSolicitudes()
})

function handleActionSelect(type: QuickAction['type']): void {
  selectedAction.value = quickActions.findIndex((a: QuickAction) => a.type === type)
  router.push({ name: 'NuevaSolicitud', query: { type } })
}
</script>