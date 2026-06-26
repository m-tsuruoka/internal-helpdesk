// // src/pages/InquiryCreatePage.tsx
// import { useForm, type SubmitHandler } from "react-hook-form";

// type InquiryCreatePageProps = {
//   onSubmitInquiry: (title: string, content: string, requester: string) => void;
//   onBack: () => void;
// };

// // 📝 react-hook-form で管理する入力データの型（箱の形）を定義します
// type Inputs = {
//   title: string;
//   requester: string;
//   content: string;
// };

// export const InquiryCreatePage = ({ onSubmitInquiry, onBack }: InquiryCreatePageProps) => {
//   // ✨ useForm を呼び出して、必要な便利ツール（関数）を取り出す
//   const {
//     register, // 入力欄を react-hook-form に紐付けるための関数
//     handleSubmit, // 送信ボタンが押されたときの処理をまとめる関数
//     formState: { errors }, // バリデーションのエラー情報が入っている箱
//   } = useForm<Inputs>();

//   // フォームが送信され、かつ入力ルール（必須など）をクリアした時だけ実行される処理
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     // 空白文字だけの送信を防ぐ（trim）
//     if (!data.title.trim() || !data.content.trim() || !data.requester.trim()) return;
    
//     // 親にデータを渡す
//     onSubmitInquiry(data.title, data.content, data.requester);
//   };

//   // 🎨 入力欄の共通スタイル（元のまま）
//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     boxSizing: "border-box" as const,
//     border: "1px solid #ced4da",
//     borderRadius: "6px",
//     fontSize: "1rem",
//     backgroundColor: "#f8f9fa",
//   };

//   const labelStyle = {
//     display: "block",
//     fontWeight: "bold",
//     marginBottom: "8px",
//     color: "#495057",
//     fontSize: "0.95rem",
//   };

//   const requiredBadgeStyle = {
//     color: "#e03131",
//     fontSize: "0.8rem",
//     marginLeft: "8px",
//     fontWeight: "normal",
//   };

//   // 🎨 エラーメッセージ用のスタイルを追加
//   const errorMessageStyle = {
//     color: "#e03131",
//     fontSize: "0.85rem",
//     marginTop: "5px",
//     display: "block",
//   };

//   return (
//     <div style={{ padding: "10px 20px", maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
//       <button 
//         onClick={onBack} 
//         style={{ marginBottom: "20px", background: "none", border: "none", color: "#6c757d", cursor: "pointer", padding: 0, fontSize: "0.95rem" }}
//       >
//         ◀ 一覧に戻る
//       </button>

//       <h2 style={{ marginBottom: "25px", color: "#2c3e50", borderBottom: "2px solid #f1f3f5", paddingBottom: "10px", marginTop: 0 }}>
//         新規問い合わせ登録
//       </h2>

//       {/* handleSubmit(自分が作ったonSubmit関数) でラップする */}
//       <form onSubmit={handleSubmit(onSubmit)}>
        
//         {/* ① タイトル入力欄 */}
//         <div style={{ marginBottom: "20px" }}>
//           <label style={labelStyle}>
//             タイトル <span style={requiredBadgeStyle}>*必須</span>
//           </label>
//           <input
//             type="text"
//             // ✨ 変更点：value と onChange を消して、register に置き換え！
//             {...register("title", { required: "タイトルを入力してください" })}
//             style={{
//               ...inputStyle,
//               border: errors.title ? "1px solid #e03131" : inputStyle.border // エラー時は枠を赤くする
//             }}
//             placeholder="例: PCが起動しません"
//           />
//           {/* エラーがあればメッセージを表示 */}
//           {errors.title && <span style={errorMessageStyle}>{errors.title.message}</span>}
//         </div>

//         {/* ② 投稿者入力欄 */}
//         <div style={{ marginBottom: "20px" }}>
//           <label style={labelStyle}>
//             投稿者（氏名） <span style={requiredBadgeStyle}>*必須</span>
//           </label>
//           <input
//             type="text"
//             {...register("requester", { required: "投稿者名を入力してください" })}
//             style={{
//               ...inputStyle,
//               border: errors.requester ? "1px solid #e03131" : inputStyle.border
//             }}
//             placeholder="例: 山田 太郎"
//           />
//           {errors.requester && <span style={errorMessageStyle}>{errors.requester.message}</span>}
//         </div>

//         {/* ③ 本文入力欄 */}
//         <div style={{ marginBottom: "30px" }}>
//           <label style={labelStyle}>
//             問い合わせ内容 <span style={requiredBadgeStyle}>*必須</span>
//           </label>
//           <textarea
//             {...register("content", { required: "問い合わせ内容を入力してください" })}
//             rows={6}
//             style={{
//               ...inputStyle,
//               resize: "vertical",
//               border: errors.content ? "1px solid #e03131" : inputStyle.border
//             }}
//             placeholder="詳しい状況を入力してください（エラーメッセージ等があればご記入ください）"
//           />
//           {errors.content && <span style={errorMessageStyle}>{errors.content.message}</span>}
//         </div>

//         {/* 送信ボタン */}
//         <button 
//           type="submit" 
//           style={{ 
//             width: "100%", 
//             padding: "14px", 
//             background: "#00bfff", 
//             color: "#fff", 
//             border: "none", 
//             borderRadius: "8px", 
//             cursor: "pointer",
//             fontSize: "1.1rem",
//             fontWeight: "bold",
//             boxShadow: "0 4px 6px rgba(0, 191, 255, 0.2)"
//           }}
//         >
//           送信する
//         </button>
//       </form>
//     </div>
//   );
// };

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { inquiryApi } from '../api/inquiries'
import type { InquiryCreateInput, Inquiry } from '../types/inquiry'

type LaravelValidationError = {
  message: string
  errors: Record<string, string[]>
}

type InquiryCreatePageProps = {
  onCreated: (inquiry: Inquiry) => void
  onBack: () => void
}

export const InquiryCreatePage = ({ onCreated, onBack }: InquiryCreatePageProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryCreateInput>()

  const onSubmit = async (data: InquiryCreateInput) => {
    try {
      const inquiry = await inquiryApi.create(data)
      onCreated(inquiry)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError
        // Laravel の 422 バリデーションエラーをフィールドに紐付ける
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof InquiryCreateInput, {
            type: 'server',
            message: messages[0],
          })
        })
      }
    }
  }

  return (
<div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
      color: '#1f2937'
    }}>
      {/* 控えめな戻るボタン（新規登録画面と同じテキストリンク風） */}
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#4b5563',
          cursor: 'pointer',
          fontSize: '14px',
          padding: 0,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontWeight: '500'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
        onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
      >
        ← 一覧へ戻る
      </button>

      <h2 style={{ 
        fontSize: '22px', 
        fontWeight: '600', 
        marginBottom: '24px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '8px'
      }}>
        新規問い合わせ
      </h2>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: '#ffffff',
          padding: '28px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* タイトル */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            タイトル
          </label>
          <input
            {...register('title', {
              required: 'タイトルを入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
            style={{
              padding: '10px 12px',
              fontSize: '15px',
              border: errors.title ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#f9fafb',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = errors.title ? '#ef4444' : '#3b82f6'}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.title ? '#ef4444' : '#d1d5db'}
          />
          {errors.title && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0', fontWeight: '500' }}>
              ⚠️ {errors.title.message}
            </p>
          )}
        </div>

        {/* 内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            内容
          </label>
          <textarea
            {...register('content', {
              required: '内容を入力してください',
              maxLength: { value: 1000, message: '1000文字以内で入力してください' },
            })}
            rows={5}
            style={{
              padding: '10px 12px',
              fontSize: '15px',
              border: errors.content ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#f9fafb',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = errors.content ? '#ef4444' : '#3b82f6'}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.content ? '#ef4444' : '#d1d5db'}
          />
          {errors.content && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0', fontWeight: '500' }}>
              ⚠️ {errors.content.message}
            </p>
          )}
        </div>

        {/* 投稿者名 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            投稿者名
          </label>
          <input
            {...register('requester', {
              required: '投稿者名を入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
            style={{
              padding: '10px 12px',
              fontSize: '15px',
              border: errors.requester ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#f9fafb',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = errors.requester ? '#ef4444' : '#3b82f6'}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.requester ? '#ef4444' : '#d1d5db'}
          />
          {errors.requester && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0', fontWeight: '500' }}>
              ⚠️ {errors.requester.message}
            </p>
          )}
        </div>

        {/* 送信ボタン */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            marginTop: '8px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb', // 送信中はグレーアウト
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
          {isSubmitting ? '送信中...' : '登録する'}
        </button>
      </form>
    </div>
  )
}