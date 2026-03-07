<template>
    <div class="min-h-screen bg-slate-50 flex flex-col">
        <!-- Header con logo -->
        <header class="w-full py-4 px-6 bg-white border-b border-slate-200 flex items-center justify-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                </div>
                <span class="text-lg font-bold text-blue-600 tracking-tight">AcademiaFlow</span>
            </div>
        </header>

        <!-- Contenido principal centrado -->
        <main class="flex-1 flex items-center justify-center px-4 py-12">
            <div class="w-full max-w-md">
                <!-- Tarjeta del formulario -->
                <div class="bg-white border border-slate-200 rounded-t-md shadow p-8 pb-5">
                    <!-- Cabecera con icono -->
                    <div class="text-center mb-8">
                        <div class="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                            </svg>
                        </div>
                        <h1 class="text-xl font-bold text-slate-800">{{ title }}</h1>
                        <p class="text-sm text-slate-500 mt-1">{{ subtitle }}</p>
                    </div>

                    <!-- Slot para el contenido del formulario -->
                    <slot />
                </div>

                <!-- Footer de seguridad -->
                <div
                    class="border bg-white border-t-0 border-slate-200 rounded-b-md shadow-sm px-5 py-4 text-center flex flex-col items-center gap-2">
                    <slot name="footer-extra" />
                </div>

                <div class="flex items-center justify-center mt-6 gap-1.5 text-xs text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>CONEXIÓN SEGURA · SSL INSTITUCIONAL</span>
                </div>
            </div>
        </main>

        <!-- Footer global -->
        <footer
            class="py-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <span>© 2025 AcademiaFlow · Gestión Académica Universitaria</span>
            <div class="flex gap-4">
                <a href="#" class="hover:text-slate-600 transition-colors">Soporte Técnico</a>
                <a href="#" class="hover:text-slate-600 transition-colors">Privacidad</a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    subtitle?: string
}>();
</script>