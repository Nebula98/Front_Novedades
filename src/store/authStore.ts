import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api'
import type { StudentInfo, LoginPayload, ChangePasswordPayload } from '../types'

export const useAuthStore = defineStore('auth', () => {

  // ─── Mock de estudiante ─────────────────────────────────────
  const mockStudent = ref<StudentInfo>({
    id: '1',
    nombre: 'Alejandro',
    codigo: '20401',
    carrera: 'Ingeniería de Sistemas',
    semestre: 8,
    email: 'juan.perez@universidad.edu'
  })

  // ─── Estado ────────────────────────────────────────────────
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const student = ref<StudentInfo | null>(
    JSON.parse(localStorage.getItem('auth_student') || 'null')
  )
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ─── Computed ───────────────────────────────────────────────
  const isAuthenticated = computed(() => !!token.value)
  const studentFirstName = computed(() => student.value?.nombre?.split(' ')[0] ?? '')

  // ─── Acciones ───────────────────────────────────────────────
  async function login(payload: LoginPayload): Promise<{ requiresPasswordChange: boolean }> {
    isLoading.value = true
    error.value = null
    try {
      const response = await authApi.login(payload)
      token.value = response.token
      student.value = response.student
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('auth_student', JSON.stringify(response.student))
      return { requiresPasswordChange: response.requiresPasswordChange }
    } catch (err: unknown) {
      error.value = (err as { message?: string })?.message || 'Error al iniciar sesión.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function changePassword(payload: ChangePasswordPayload): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const response = await authApi.changePassword(payload)
      token.value = response.token
      student.value = response.student
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('auth_student', JSON.stringify(response.student))
    } catch (err: unknown) {
      error.value = (err as { message?: string })?.message || 'Error al cambiar la contraseña.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout(): void {
    token.value = null
    student.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_student')
  }

  function clearError(): void {
    error.value = null
  }

  return { token, student, mockStudent, isLoading, error, isAuthenticated, studentFirstName, login, changePassword, logout, clearError }
})