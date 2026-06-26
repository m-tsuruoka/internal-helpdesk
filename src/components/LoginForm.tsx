import { useForm } from 'react-hook-form'
import axios from 'axios'
import type { LoginInput, User } from '../types/auth'

type LaravelValidationError = {
  errors: Record<string, string[]>
}

type LoginFormProps = {
  onLogin: (input: LoginInput) => Promise<User>
  
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>()

  const onSubmit = async (data: LoginInput) => {
    try {
      await onLogin(data)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginInput, { type: 'server', message: messages[0] })
        })
      }
    }
  }

  return (
<div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', // 画面の縦中央あたりに配置するための設定
      fontFamily: 'sans-serif',
      color: '#1f2937',
      backgroundColor: '#f9fafb' // 画面全体の背景をほんのりグレーにしてカードを引き立てる
    }}>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          maxWidth: '400px', // ログイン画面なので少しスマートな幅に
          backgroundColor: '#ffffff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          textAlign: 'center',
          margin: '0 0 8px 0',
          color: '#111827'
        }}>
          ログイン
        </h2>

        {/* メールアドレス */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor='email' style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>
            メールアドレス
          </label>
          <input
            id='email'
            type="email"
            {...register('email', { required: 'メールアドレスを入力してください' })}
            style={{
              padding: '10px 12px',
              fontSize: '15px',
              border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#3b82f6';
              if (!errors.email) e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {errors.email && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0', fontWeight: '500' }}>
              ⚠️ {errors.email.message}
            </p>
          )}
        </div>

        {/* パスワード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor='password' style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>
            パスワード
          </label>
          <input
            id='password'
            type="password"
            {...register('password', { required: 'パスワードを入力してください' })}
            style={{
              padding: '10px 12px',
              fontSize: '15px',
              border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = errors.password ? '#ef4444' : '#3b82f6';
              if (!errors.password) e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.password ? '#ef4444' : '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0', fontWeight: '500' }}>
              ⚠️ {errors.password.message}
            </p>
          )}
        </div>

        {/* ログインボタン */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            marginTop: '12px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            boxShadow: isSubmitting ? 'none' : '0 2px 4px 0 rgba(37, 99, 235, 0.2)'
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1d4ed8';
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#2563eb';
          }}
        >
          {isSubmitting ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  )
}