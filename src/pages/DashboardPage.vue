<template>
  <DashboardLayout>

    <template #header>
      <DashboardHeader />
    </template>

    <template #sidebar>
      <DashboardSidebar @logout="handleLogout" />
    </template>

    <div>
      <!-- Saludo -->
      <WelcomeBanner @nueva-solicitud="router.push({ name: 'NuevaSolicitud' })" />

      <!-- Acciones rápidas -->
      <section class="mb-6">
        <div class="flex items-center gap-1 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
          </svg>
          <h3 class="text-sm font-semibold text-slate-800">Acciones Rápidas</h3>
        </div>
        <AccionesRapidas @seleccionar="handleSeleccionarAccion" />
      </section>

      <!-- Solicitudes recientes -->
      <RecentRequest
        :solicitudes="solicitudesMock"
        @ver-historial="router.push({ name: 'Historial' })"
        @ver-detalle="handleVerDetalle"
      />

      <!-- Info cards -->
      <InfoCards />
    </div>

  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import DashboardLayout from '../components/dashboard/DashboardLayout.vue'
import DashboardHeader from '../components/dashboard/AppHeader.vue'
import DashboardSidebar from '../components/dashboard/AppSidebar.vue'
import AccionesRapidas from '../components/dashboard/QuickActions.vue'
import WelcomeBanner from '../components/dashboard/WelcomeBanner.vue'
import RecentRequest from '../components/dashboard/RecentRequest.vue'
import InfoCards from '../components/dashboard/InfoCards.vue'

import { useAuthStore } from '../store/authStore'
import type { TipoTramite } from '../types'

const router = useRouter()
const authStore = useAuthStore()

// Mock — reemplazar con solicitudesService.getMisSolicitudes() cuando el backend esté listo
const solicitudesMock = ref([
  { id: 'REQ-2024-001', tipo: 'Cambio de Jornada', fecha: '15 Oct 2023', estado: 'En proceso' as const },
  { id: 'REQ-2024-002', tipo: 'Adición de Curso',  fecha: '10 Oct 2023', estado: 'Aprobada'   as const },
  { id: 'REQ-2024-003', tipo: 'Curso Dirigido',    fecha: '05 Oct 2023', estado: 'Rechazada'  as const },
  { id: 'REQ-2024-004', tipo: 'Cambio de Curso',   fecha: '01 Oct 2023', estado: 'En proceso' as const },
])

function handleSeleccionarAccion(tipo: TipoTramite) {
  console.log('Acción:', tipo)
}

function handleVerDetalle(id: string) {
  console.log('Detalle:', id)
}

async function handleLogout() {
  authStore.logout()
  await router.push({ name: 'Login' })
}
</script>