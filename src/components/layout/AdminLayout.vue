<template>
  <div class="min-h-screen bg-slate-100 flex font-sans text-slate-800">

    <AdminSidebar @logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-[200px]">

      <!-- Topbar Admin — breadcrumb + buscador global + acciones -->
      <header class="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 sticky top-0 z-10">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-1.5 text-[12.5px] text-slate-400 mr-2">
          <span class="text-slate-500 font-medium">Admin</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          <span class="text-slate-700 font-semibold">{{ paginaActual }}</span>
        </nav>

        <!-- Buscador global -->
        <div class="relative flex-1 max-w-xs ml-auto">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en el sistema..."
            class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[12.5px] text-slate-600 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          />
        </div>

        <!-- Campana -->
        <button class="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="w-[17px] h-[17px] text-slate-500">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <!-- Avatar -->
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer select-none">
          A
        </div>
      </header>

      <main class="flex-1 px-8 py-7">
        <slot />
      </main>

      <footer class="px-8 py-4 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] text-slate-400">
        <span>© 2026 AcademiaFlow – Sistema de Gestión de Novedades Académicas. Universidad Autónoma.</span>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../store/authStore'
import AdminSidebar from '../admin/AdminSidebar.vue'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const paginaActual = computed(() => {
  const map: Record<string, string> = {
    AdminUsuarios:  'Gestión de usuarios',
    AdminAuditoria: 'Auditoría',
  }
  return map[route.name as string] ?? 'Admin'
})

function handleLogout(): void {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>
