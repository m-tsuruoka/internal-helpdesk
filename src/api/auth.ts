import { api } from '../lib/api'
import type { AuthResponse, LoginInput, RegisterInput, User } from '../types/auth'

export const authApi = {
  register: async (input: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', input)
    return response.data
  },

  login: async (input: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', input)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout')
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },
}