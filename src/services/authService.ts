import http from '../utils/httpClient'
import type { LoginPayload, LoginResponse, ChangePasswordPayload, ChangePasswordResponse } from '../types'

const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/auth/login', payload)
    return data
  },

  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const { data } = await http.post<ChangePasswordResponse>('/auth/change-password', payload)
    return data
  },

  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_student')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },
}

export default authService