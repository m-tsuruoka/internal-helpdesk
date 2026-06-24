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
    <div>
      <button onClick={onBack}>← 一覧へ戻る</button>
      <h2>新規問い合わせ</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>タイトル</label>
          <input
            {...register('title', {
              required: 'タイトルを入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>

        <div>
          <label>内容</label>
          <textarea
            {...register('content', {
              required: '内容を入力してください',
              maxLength: { value: 1000, message: '1000文字以内で入力してください' },
            })}
            rows={4}
          />
          {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        </div>

        <div>
          <label>投稿者名</label>
          <input
            {...register('requester', {
              required: '投稿者名を入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
          />
          {errors.requester && <p style={{ color: 'red' }}>{errors.requester.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '登録する'}
        </button>
      </form>
    </div>
  )
}