<template>
  <div class="flex items-center justify-between mb-6">
    <!-- Saludo -->
    <div>
      <h1 class="text-lg font-bold text-slate-800">
        ¡Hola de nuevo, {{ authStore.mockStudent?.nombre }}! 👋
      </h1>
      <div class="flex items-center mt-1">
        <span class="text-xs text-slate-500 pr-1">{{ authStore.mockStudent?.carrera }}</span>
        <span class="text-xs text-slate-500 px-1 border-l border-slate-300">{{ authStore.mockStudent?.sumestre }}vo Semestre</span>
        <span class="text-xs text-slate-500 px-1 border-l border-slate-300">Código: {{ authStore.mockStudent?.codigo }}</span>
      </div>
    </div>

    <!-- Derecha: fecha + botón -->
    <div class="flex items-center gap-3">
      <div class="text-right hidden sm:block">
        <p class="text-sm font-semibold text-slate-700">Próxima fecha de registro</p>
        <p class="text-xs text-slate-400">24 de Noviembre, 2023</p>
      </div>
      <button
        class="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700
               active:bg-blue-800 text-white text-sm font-medium px-4 py-2.5
               rounded-lg transition-colors"
        @click="$emit('nueva-solicitud')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        Nueva Solicitud
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/authStore';

const authStore = useAuthStore();

defineEmits<{ (e: 'nueva-solicitud'): void }>()
</script>