import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import { authApi } from '../api/auth'
import type { User, LoginInput } from '../types/auth'

const TOKEN_KEY = 'auth_token'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 起動時に localStorage のトークンを確認してユーザーを復元する
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setIsLoading(false)
      return
    }

    // axios のデフォルトヘッダーにトークンをセット
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    authApi.me()
      .then(setUser)
      .catch(() => {
        // トークンが無効な場合はクリアする
        localStorage.removeItem(TOKEN_KEY)
        delete api.defaults.headers.common['Authorization']
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (input: LoginInput) => {
    const { user, token } = await authApi.login(input)

    // トークンを保存して axios に設定する
    localStorage.setItem(TOKEN_KEY, token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(user)
    return user
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      delete api.defaults.headers.common['Authorization']
      setUser(null)
    }
  }

  const isLoggedIn = user !== null

  return { user, isLoggedIn, isLoading, login, logout }
}