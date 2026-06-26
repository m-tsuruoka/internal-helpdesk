import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 401 レスポンス時にトークンをクリアしてリロード
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']
      window.location.href = '/'  // ログイン画面にリダイレクト
    }
    return Promise.reject(error)
  }
)