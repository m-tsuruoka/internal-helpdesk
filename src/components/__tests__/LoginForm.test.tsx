import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../LoginForm'

describe('LoginForm', () => {
  it('フォームのラベルとボタンが表示される', () => {
    render(<LoginForm onLogin={vi.fn()} />)

    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  it('入力して送信すると onLogin が呼ばれる', async () => {
    const user = userEvent.setup()
    const mockOnLogin = vi.fn().mockResolvedValue({ id: 1, name: 'テスト', email: 'test@example.com' })

    render(<LoginForm onLogin={mockOnLogin} />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByLabelText('パスワード'), 'password123')
    await user.click(screen.getByRole('button', { name: 'ログイン' }))

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })
})