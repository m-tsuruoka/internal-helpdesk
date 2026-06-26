export type User = {
  id: number
  name: string
  email: string
}

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type AuthResponse = {
  user: User
  token: string
}