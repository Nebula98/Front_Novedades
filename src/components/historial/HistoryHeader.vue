<template>
  <div class="flex items-start justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Historial de Solicitudes</h1>
      <p class="text-sm text-slate-500 mt-1">
        Consulta el estado y seguimiento de tus trámites académicos activos y pasados.
      </p>
    </div>
    <button
      class="inline-flex items-center gap-1.5 bg-white hover:bg-blue-700 text-blue-600
             hover:text-white text-xs font-semibold px-3 py-2.5 rounded-lg border
             border-slate-200 transition-colors shrink-0"
      @click="$emit('nueva-solicitud')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      Nueva Solicitud
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'nueva-solicitud'): void }>()
</script>