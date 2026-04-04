<template>
    <div class="h-full px-6 flex items-center">

    <!-- Título -->
    <span class="text-sm font-semibold text-slate-500 basis-1/3">
      Estudiante
    </span>

    <!-- Logo centrado -->
    <div class="flex items-center gap-2 basis-1/3 justify-center">
      <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      </div>
      <span class="text-lg font-bold text-blue-600 tracking-tight">AcademiaFlow</span>
    </div>

    <!-- Acciones -->
    <div class="flex items-center gap-3 basis-1/3 justify-end">

      <!-- Notificaciones -->
      <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      </button>

      <!-- Avatar con inicial del nombre -->
      <div class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold select-none">
        {{ initial }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../store/authStore'

const authStore = useAuthStore()

// Toma la primera letra del nombre del estudiante autenticado
const initial = computed(
  () => authStore.student?.nombre?.charAt(0).toUpperCase() ?? 'E'
)
</script>