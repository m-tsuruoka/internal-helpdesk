// src/pages/InquiryDetailPage.tsx
import type { Inquiry, InquiryStatus } from "../types/inquiry";

type InquiryDetailPageProps = {
  inquiry: Inquiry;
  onBack: () => void;
  onStatusChange: (id: number, newStatus: InquiryStatus) => void;
};

export const InquiryDetailPage = ({ inquiry, onBack, onStatusChange }: InquiryDetailPageProps) => {
  return (
    <div style={{ padding: "10px 20px", textAlign: "left" }}>
      {/* 戻るボタン（新規登録画面と同じ控えめなテキストリンク風） */}
      <button 
        onClick={onBack} 
        style={{ marginBottom: "20px", background: "none", border: "none", color: "#6c757d", cursor: "pointer", padding: 0, fontSize: "0.95rem" }}
      >
        ◀ 一覧に戻る
      </button>

      {/* タイトル */}
      <h2 style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "15px", borderBottom: "2px solid #f1f3f5", paddingBottom: "15px", marginTop: 0 }}>
        {inquiry.title}
      </h2>
      
      {/* メタ情報とステータス変更エリア（Flexboxで左右に振り分け） */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px", 
        flexWrap: "wrap", 
        gap: "15px" 
      }}>
        
        {/* 左側：投稿者と日付 */}
        <div style={{ color: "#6c757d", fontSize: "0.95rem" }}>
          <span style={{ marginRight: "20px" }}>投稿者: <strong style={{ color: "#495057" }}>{inquiry.requester}</strong></span>
          <span>投稿日: {inquiry.created_at}</span>
        </div>

        {/* 右側：ステータス確認＆操作エリア */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          background: "#f8f9fa", 
          padding: "10px 16px", 
          borderRadius: "8px", 
          border: "1px solid #e9ecef" 
        }}>
          <select
            id="status-select"
            value={inquiry.status}
            onChange={(e) => onStatusChange(inquiry.id, e.target.value as InquiryStatus)}
            style={{ 
              padding: "6px 12px", 
              fontSize: "0.9rem", 
              borderRadius: "6px", 
              border: "1px solid #ced4da", 
              background: "#fff",
              cursor: "pointer",
              color: "#495057",
              outline: "none"
            }}
          >
            <option value="pending">未対応</option>
            <option value="in_progress">対応中</option>
            <option value="completed">完了</option>
          </select>
        </div>
      </div>

      {/* 本文エリア（チャットやメールの吹き出しのような見やすいデザイン） */}
      <div style={{ 
        background: "#f8f9fa", 
        padding: "25px", 
        borderRadius: "8px", 
        borderLeft: "4px solid #007bff", // 左側に青いアクセントライン
        minHeight: "150px"
      }}>
        <h3 style={{ marginTop: 0, fontSize: "1rem", color: "#6c757d", marginBottom: "15px" }}>問い合わせ内容</h3>
        <p style={{ 
          whiteSpace: "pre-wrap", 
          color: "#212529", 
          lineHeight: "1.7", // 行間を広げて読みやすく
          margin: 0,
          fontSize: "1.05rem"
        }}>
          {inquiry.content}
        </p>
      </div>
    </div>
  );
};