<template>
  <div class="min-h-screen bg-slate-50 flex font-sans text-slate-800">

    <SecreteriaSidebar @logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-40">
      <!-- Navbar reutilizado — tag SECRETARÍA centrado -->
      <header class="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Secretaría</span>

        <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div class="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="white" width="13" height="13">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <span class="font-bold text-[15px] text-slate-800 tracking-tight">AcademiaFlow</span>
        </div>

        <div class="flex items-center gap-3">
          <button class="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="w-[17px] h-[17px] text-slate-500">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer select-none">
            S
          </div>
        </div>
      </header>

      <main class="flex-1 px-8 py-7">
        <slot />
      </main>

      <footer class="px-8 py-4 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] text-slate-400">
        <span>© 2026 AcademiaFlow – Gestión Académica Universitaria</span>
        <div class="flex gap-4">
          <a href="#" class="hover:text-slate-600 transition-colors">Soporte Técnico</a>
          <a href="#" class="hover:text-slate-600 transition-colors">Privacidad</a>
        </div>
      </footer>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/authStore'
import SecreteriaSidebar from '../secretaria/SecreteriaSideabar.vue'

const router    = useRouter()
const authStore = useAuthStore()

function handleLogout(): void {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>
