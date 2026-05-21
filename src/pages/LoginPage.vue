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
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=yudith.agredo.r@uniautonoma.edu.co,luis.ramos.sanjuan@uniautonoma.edu.co,cristian.aranda.h@uniautonoma.edu.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline font-medium"
                >
                    Contactar Soporte
                </a>
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
        console.log('📝 LoginPage.handleLogin iniciando con payload:', payload)
        const { requiresPasswordChange } = await authStore.login(payload);
        console.log('✅ Login exitoso. requiresPasswordChange:', requiresPasswordChange)

        if (requiresPasswordChange) {
            // El backend indica que debe cambiar la contraseña
            console.log('🔄 Redirigiendo a ChangePassword...')
            await router.push({ name: 'ChangePassword' });
        } else {
            // Login normal -> ir al home según rol
            const rol = authStore.student?.rol
            if (rol === 'Administrador') {
                await router.push({ name: 'AdminUsuarios' })
            } else if (rol === 'Secretaria') {
                await router.push({ name: 'SecretariaDashboard' })
            } else {
                await router.push({ name: 'Dashboard' })
            }
        }
    } catch (err) {
        // El error ya fue capturado y guardado en authStore.error
        // AlerMessage lo muestra automaticamente
        console.error('❌ LoginPage.handleLogin catch:', err)
    }
}

</script>