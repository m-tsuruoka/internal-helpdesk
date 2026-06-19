// src/pages/InquiryCreatePage.tsx
import { useState } from "react";

type InquiryCreatePageProps = {
  // 登録ボタンが押されたときに、入力された中身を親に送るためのリモコン
  onSubmitInquiry: (title: string, content: string, requester: string) => void;
  onBack: () => void; // 一覧に戻るボタン用
};

export const InquiryCreatePage = ({ onSubmitInquiry, onBack }: InquiryCreatePageProps) => {
  // 📝 入力された文字をリアルタイムにメモする State（初期値は空っぽ ""）
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [requester, setRequester] = useState("");

  // フォームが送信されたときの処理
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim() || !content.trim() || !requester.trim()) return;

  // ✨ 親から届いた本物のリモコン「onAdd」を実行する！
  onSubmitInquiry(title, content, requester); 
};

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>◀ 一覧に戻る</button>
      <h2>新規問い合わせ登録</h2>

      <form onSubmit={handleSubmit}>
        {/* ① タイトル入力欄 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 文字が打たれるたびにStateを更新
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            placeholder="例: PCが起動しません"
          />
        </div>

        {/* ② 投稿者入力欄 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>投稿者（氏名）</label>
          <input
            type="text"
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            placeholder="例: 山田 太郎"
          />
        </div>

        {/* ③ 本文入力欄 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>問い合わせ内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            placeholder="詳しい状況を入力してください"
          />
        </div>

        {/* 送信ボタン */}
        <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          送信する
        </button>
      </form>
    </div>
  );
};