<template>
    <AuthLayout
        title="Portal Estudiantil"
        subtitle="Ingrese sus credenciales universitarias para gestionar sus solicitudes academicas."
    >
    <!-- Alerta de error de la API -->
     <AlertMessage :message="authStore.error" class="mb-5"/>

     <!-- Fomulario de login -->
      <LoginForm :loading="authStore.isLoading" @submit="handleLogin"/>

      <!-- Enlace de soporte -->
       <template #footer-extra>
      <p class="text-xs text-slate-500 mt-1">
        ¿Problemas para ingresar?
        <a href="#" class="text-blue-600 hover:underline font-medium">Contactar Soporte</a>
      </p>
    </template>

    </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '../components/layout/AuthLayout.vue';
import LoginForm  from '../components/auth/LoginForm.vue';
import AlertMessage from '../components/ui/AlertMessage.vue';
import { useAuthStore } from '../store/authStore';
import type { LoginPayload } from '../types';

const router = useRouter();
const authStore = useAuthStore();

// Limpiar errores previos al entrar a la paginas
onMounted(() => authStore.clearError());

/*
* Maneja el submit del formulario:
* 1. Llama al store para hacer login
* 2. Redirige segun si quiere cambio de contraseña 
*/

async function handleLogin(payload: LoginPayload) {
    try {
        const { requiresPasswordChange } = await authStore.login(payload);

        if (requiresPasswordChange) {
            // El backend indica que debe cambiar la contraseña
            await router.push({ name: 'ChangePassword' });
        } else {
            // Login normal -> redirigir según rol
            const student = authStore.student;
            
            // DEBUG: Verificar qué rol se obtiene
            console.log('📍 Redirigiendo - Rol del estudiante:', student?.rol);
            
            if (student?.rol === 'Administrador') {
                console.log('👤 Usuario ADMIN detectado');
                await router.push({ name: 'AdminUsuarios' });
            } else if (student?.rol === 'Secretaria') {
                console.log('👤 Usuario SECRETARIA detectado');
                await router.push({ name: 'SecretariaDashboard' });
            } else {
                console.log('👤 Usuario ESTUDIANTE (default)');
                await router.push({ name: 'Dashboard' });
            }
        }
    } catch {
        // El error ya fue capturado y guardado en authStore.error
        // AlerMessage lo muestra automaticamente
    }
}

</script>