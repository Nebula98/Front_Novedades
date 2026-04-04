<template>
  <DashboardLayout>
    <template #header>
      <DashboardHeader />
    </template>
    <template #sidebar>
      <DashboardSidebar @logout="handleLogout" />
    </template>

    <div class="space-y-6">

      <HistoryHeader @nueva-solicitud="router.push({ name: 'NuevaSolicitud' })" />

      <HistoryFilters
        v-model:busqueda="busqueda"
        v-model:filtroActivo="filtroActivo"
      />

      <HistoryGrid
        :solicitudes="solicitudesPaginadas"
        @ver-detalle="verDetalle"
      />

      <PaginationHistory
        v-model:paginaActual="paginaActual"
        :total-paginas="totalPaginas"
        :mostrando="solicitudesPaginadas.length"
        :total="solicitudesFiltradas.length"
      />

    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import DashboardLayout from '../components/dashboard/DashboardLayout.vue'
import DashboardHeader from '../components/dashboard/AppHeader.vue'
import DashboardSidebar from '../components/dashboard/AppSidebar.vue'
import HistoryHeader from '../components/historial/HistoryHeader.vue'
import HistoryFilters from '../components/historial/HistoryFilters.vue'
import HistoryGrid from '../components/historial/HistoryGrid.vue'
import PaginationHistory from '../components/historial/PaginationHistory.vue'

import { useAuthStore } from '../store/authStore'
import type { EstadoSolicitud } from '../types'

const router = useRouter()
const authStore = useAuthStore()

// ─── Datos mock ──────────────────────────────────────────────
const solicitudes = ref([
  { id: 'CJ-2023-8842', tipo: 'Cambio de Jornada',       descripcion: 'Solicitud de cambio de jornada diurna a nocturna por motivos laborales.',    fechaEnvio: '2023-10-12', facultad: 'Facultad de Ingeniería',  estado: 'Aprobada'   as EstadoSolicitud },
  { id: 'AC-2023-1120', tipo: 'Adición de Curso',        descripcion: 'Adición de la asignatura "Cálculo Multivariado" fuera de fechas.',            fechaEnvio: '2023-11-15', facultad: 'Facultad de Ciencias',    estado: 'Pendiente'  as EstadoSolicitud },
  { id: 'CD-2024-0051', tipo: 'Curso Dirigido',          descripcion: 'Solicitud de curso dirigido para la asignatura "Ética Profesional".',         fechaEnvio: '2024-02-02', facultad: 'Facultad de Humanidades', estado: 'Rechazada'  as EstadoSolicitud },
  { id: 'CS-2024-0992', tipo: 'Cancelación de Semestre', descripcion: 'Cancelación total del semestre 2024-1 por calamidad doméstica.',              fechaEnvio: '2024-03-10', facultad: 'Facultad de Ingeniería',  estado: 'En proceso' as EstadoSolicitud },
  { id: 'ES-2024-1543', tipo: 'Examen Supletorio',       descripcion: 'Supletorio del parcial final de "Base de Datos I".',                         fechaEnvio: '2024-03-22', facultad: 'Facultad de Ingeniería',  estado: 'Aprobada'   as EstadoSolicitud },
  { id: 'CP-2024-3321', tipo: 'Cambio de Programa',      descripcion: 'Traslado del programa de Ingeniería Civil a Ingeniería de Sistemas.',         fechaEnvio: '2024-04-05', facultad: 'Facultad de Ingeniería',  estado: 'Pendiente'  as EstadoSolicitud },
])

// ─── Búsqueda y filtros ──────────────────────────────────────
const busqueda = ref('')
const filtroActivo = ref('Todos')

const solicitudesFiltradas = computed(() =>
  solicitudes.value.filter(s => {
    const coincideBusqueda =
      s.tipo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      s.id.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideFiltro = filtroActivo.value === 'Todos' || s.estado === filtroActivo.value
    return coincideBusqueda && coincideFiltro
  })
)

// ─── Paginación ──────────────────────────────────────────────
const paginaActual = ref(1)
const porPagina = 6

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(solicitudesFiltradas.value.length / porPagina))
)

const solicitudesPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return solicitudesFiltradas.value.slice(inicio, inicio + porPagina)
})

watch([busqueda, filtroActivo], () => { paginaActual.value = 1 })

// ─── Handlers ────────────────────────────────────────────────
function verDetalle(id: string) {
  console.log('Ver detalle:', id)
  // TODO: router.push({ name: 'DetalleSolicitud', params: { id } })
}

async function handleLogout() {
  authStore.logout()
  await router.push({ name: 'Login' })
}
</script>