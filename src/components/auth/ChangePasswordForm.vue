<template>
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit" novalidate>
        <!-- Contraseña Actual -->
        <BaseInput
            v-model="form.password_actual"
            label="Contraseña Actual"
            type="password"
            placeholder="••••••••"
            :error-message="errors.password_actual"
            autocomplete="current-password"
            @blur="validateField('password_actual')"
        >
            <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </template>
        </BaseInput>

        <!-- Nueva contra -->
         <div>
            <BaseInput
                v-model="form.password_nueva"
                label="Nueva Contraseña"
                type="password"
                placeholder="Minimo 8 caracteres"
                :error-message="errors.password_nueva"
                autocomplete="new-password"
                @input="updateStrenght"
                @blur="validateField('password_nueva')"
            >
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </template>
            </BaseInput>

            <!-- Indicador de fortaleza de contraseña -->
             <div v-if="form.password_nueva" class="mt-2 flex gap-1">
                <div
                    v-for="i in 4"
                    :key="i"
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    :class="i <= strenght.level ? strenght.color : 'bg-slate-200'"
                />
             </div>
             <p v-if="form.password_nueva && strenght.label" class="mt-1 text-xs" :class="strenght.textColor">
                Contraseña {{ strenght.label }}
             </p>
         </div>

         <!-- Requisitos -->
          <ul class="grid grid-cols-2 gap-1.5 text-xs">
            <li v-for="req in requeriments" :key="req.label" class="flex items-center gap-1.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5 shrink-0"
                    :class="req.met ? 'text-green-500' : 'text-slate-300'"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span :class="req.met ? 'text-slate-700' : 'text-slate-400'">{{ req.label }}</span>
            </li>
          </ul>

          <!-- Confirmar Contraseña -->
        <BaseInput
          v-model="form.password_confirmacion"
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite la nueva contraseña"
          :error-message="errors.password_confirmacion"
          autocomplete="new-password"
          @blur="validateField('password_confirmacion')"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </template>
        </BaseInput>

        <!-- Boton submit -->
         <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            class="w-full mt-1"
         >
            Establecer Nueva Contraseña
        </BaseButton>
    </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { validateNewPassword, validatePasswordMatch } from '../../utils/validators';
import type { ChangePasswordPayload } from '../../types';

defineProps<{ loading: boolean }>();

const emit = defineEmits<{
    (e: 'submit', payload: ChangePasswordPayload): void;
}>();

const form = reactive<ChangePasswordPayload>({ password_actual: '', password_nueva: '', password_confirmacion: '' });
const errors = reactive({ password_actual: '', password_nueva: '', password_confirmacion: '' });

// Indicador de fortaleza
const requeriments = computed(() => [
    { label: 'Minimo 8 caracteres', met: form.password_nueva.length >= 8 },
    { label: 'Una mayuscula', met: /[A-Z]/.test(form.password_nueva) },
    { label: 'Un numero', met: /[0-9]/.test(form.password_nueva) },
    { label: 'Sin espacios', met: !/\s/.test(form.password_nueva) && form.password_nueva.length > 0 },
]);

const strenght = computed(() => {
    const met = requeriments.value.filter(r => r.met).length;

    if (met <= 1) return { level: 1, color: 'bg-red-400', textColor: 'text-red-500', label: 'muy débil' };
    if (met === 2) return { level: 2, color: 'bg-orange-400', textColor: 'text-orange-500', label: 'débil' };
    if (met === 3) return { level: 3, color: 'bg-yellow-400', textColor: 'text-yellow-600', label: 'regular' };

    return { level: 4, color: 'bg-green-500', textColor: 'text-green-600', label: 'fuerte' }
});

function updateStrenght() {
    if (errors.password_nueva) validateField('password_nueva');
}

function validateField(field: keyof typeof errors) {
    if (field === 'password_actual') {
        errors.password_actual = validateNewPassword(form.password_actual) ?? '';
    }

    if (field === 'password_nueva') {
        errors.password_nueva = validateNewPassword(form.password_nueva) ?? '';
    }

    if (field === 'password_confirmacion') {
        errors.password_confirmacion = validatePasswordMatch(form.password_nueva, form.password_confirmacion) ?? '';
    }
}

function handleSubmit() {
    validateField('password_actual');
    validateField('password_nueva');
    validateField('password_confirmacion');
    if (errors.password_actual || errors.password_nueva || errors.password_confirmacion) return
        emit('submit', form);
}

</script>