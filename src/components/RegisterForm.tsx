import { useForm } from 'react-hook-form'
import type { RegisterInput } from '../types/auth'

type RegisterFormProps = {
  onRegister: (input: RegisterInput) => Promise<unknown>
  onSwitchToLogin: () => void
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterInput>()

  const onSubmit = async (data: RegisterInput) => {
    await onRegister(data)
  }

  return (
<form onSubmit={handleSubmit(onSubmit)}>
      <h2>アカウント作成</h2>
      
      {/* 名前 */}
      <div>
        <label>名前</label>
        <input
          type="text" // 💡 一般的には type="text" を使います
          {...register('name', { required: '名前を入力してください' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      
      {/* メールアドレス */}
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          {...register('email', { required: 'メールアドレスを入力してください' })}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      {/* 💡 1回目のパスワード */}
      <div>
        <label>パスワード</label>
        <input
          type="password"
          {...register('password', { 
            required: 'パスワードを入力してください',
            minLength: { value: 6, message: 'パスワードは6文字以上で入力してください' } // 💡 教材に合わせて適宜調整してください
          })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      {/* 💡 2回目のパスワード（確認用） */}
      <div>
        <label>パスワード（確認）</label>
        <input
          type="password"
          {...register('password_confirmation', {
            required: '確認用パスワードを入力してください',
            // 💡 ここでリアルタイムに1回目と一致するかチェック！
            validate: (value) => value === watch('password') || 'パスワードが一致しません'
          })}
        />
        {errors.password_confirmation && <p style={{ color: 'red' }}>{errors.password_confirmation.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>登録する</button>
      <button type="button" onClick={onSwitchToLogin}>ログインに戻る</button>
    </form>
  )
}