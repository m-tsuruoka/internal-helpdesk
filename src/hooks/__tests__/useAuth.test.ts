// @vitest-environment jsdom

import { renderHook, waitFor, act } from '@testing-library/react'
import { useAuth } from '../useAuth'

vi.mock('../../api/auth', () => ({
  authApi: {
    me: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

import { authApi } from '../../api/auth'

describe('useAuth', () => {
  beforeEach(() => {
    // 完全に環境をモック化
    const store: Record<string, string> = {}
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value },
      removeItem: (key: string) => { delete store[key] },
      clear: () => { Object.keys(store).forEach(key => delete store[key]) },
      length: 0,
      key: (index: number) => Object.keys(store)[index] || null,
    })

    localStorage.clear()
    vi.clearAllMocks()
    // ❌ ここにあった一律の authApi.me のモックを削除！（各テストで個別に書くため）
  })

  it('トークンがない場合、isLoggedIn は false', async () => {
    // トークンが無い状態を確実に保証する
    vi.mocked(authApi.me).mockRejectedValue(new Error('no token'))
    
    const { result } = renderHook(() => useAuth())

    // 💡 最初から isLoading は false になっているはずなので確認
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('有効なトークンがある場合、ユーザー情報が取得される', async () => {
    const mockUser = { id: 1, name: 'テスト', email: 'test@example.com' }
    localStorage.setItem('auth_token', 'valid-token')
    vi.mocked(authApi.me).mockResolvedValue(mockUser)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isLoading).toBe(false)
  })

  it('トークンが無効な場合、isLoggedIn は false', async () => {
    localStorage.setItem('auth_token', 'invalid-token')
    vi.mocked(authApi.me).mockRejectedValue(new Error('401'))

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isLoggedIn).toBe(false)
  })

  it('login() を呼ぶするとユーザーがセットされる', async () => {
    const mockUser = { id: 1, name: 'テスト', email: 'test@example.com' }
    // 最初はログインしていない（トークン無し）状態にする
    vi.mocked(authApi.me).mockRejectedValue(new Error('no token'))
    vi.mocked(authApi.login).mockResolvedValue({ user: mockUser, token: 'new-token' })

    const { result } = renderHook(() => useAuth())

    // ログインを呼ぶ
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password123' })
    })

    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.user).toEqual(mockUser)
    expect(localStorage.getItem('auth_token')).toBe('new-token')
  })
})