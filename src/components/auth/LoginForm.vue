<template>
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit" novalidate>
        <!-- Codigo estudiantil -->
         <BaseInput
            v-model="form.codigo_estudiantil"
            label="Código Estudiantil"
            type="text"
            placeholder="Ej: 202310001"
            :error-message="errors.codigo_estudiantil"
            hint="Utiliza tu código de 5 dígitos asignado por registro."
            inputmode="numeric"
            autocomplete="username"
            @blur="validateField('codigo_estudiantil')"
         >
            <template>
                <!-- Icono de persona -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </template>
        </BaseInput>

        <!-- Contraseña -->
         <BaseInput
            v-model="form.password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            :error-message="errors.password"
            autocomplete="current-password"
            @blur="validateField('password')"
         >
         <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
         </template>
         <!-- Link ¿Olvido su contraseña? -->
          <template #label-right>
            <a href="#" class="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                ¿Olvido su contraseña?
            </a>
          </template>
        </BaseInput>

        <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            class="w-full mt-1"
        >
            Ingresar al Portal
            <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </BaseButton>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { validateStudentCode, validatePassword } from '../../utils/validators';
import type { LoginPayload } from '../../types';

const props = defineProps<{ loading: boolean }>();

const emit = defineEmits<{
    (e: 'submit', payload: LoginPayload): void;
}>();

// Estado del formulario
const form = reactive<LoginPayload>({
    codigo_estudiantil: '',
    password: ''
});

const errors = reactive ({
    codigo_estudiantil: '',
    password: ''
});

// Validacion por campo
function validateField(field: keyof typeof errors) {
    if (field === 'codigo_estudiantil') {
        errors.codigo_estudiantil = validateStudentCode(form.codigo_estudiantil) ?? '';
    }
    if (field === 'password') {
        errors.password = validatePassword(form.password) ?? '';
    }
}

function validateAll(): boolean {
    validateField('codigo_estudiantil');
    validateField('password');
    return !errors.codigo_estudiantil && !errors.password;
}

// Submit
function handleSubmit() {
    if (!validateAll()) return; {
        emit('submit', { ...form });
    }
}
</script>