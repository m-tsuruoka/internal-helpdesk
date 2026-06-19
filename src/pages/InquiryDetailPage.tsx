// src/pages/InquiryDetailPage.tsx
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { StatusBadge } from "../components/StatusBadge";

type InquiryDetailPageProps = {
  inquiry: Inquiry; // 👈 親から絞り込まれて届く「1件分のデータ」
  onBack: () => void;
  onStatusChange: (id: number, newStatus: InquiryStatus) => void; // 👈 ステータス変更を親に伝えるリモコン
};

export const InquiryDetailPage = ({ inquiry, onBack, onStatusChange }: InquiryDetailPageProps) => {
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>◀ 一覧に戻る</button>

      {/* 親のデータと結びついているので、クリックされた中身が動的に出ます */}
      <h2>【詳細】{inquiry.title}</h2>
      
      <div style={{ margin: "10px 0" }}>
        <span>現在の状態: </span>
        <StatusBadge status={inquiry.status} />
      </div>

      {/* 👇 ステータス変更のプルダウン */}
      <div style={{ margin: "20px 0", padding: "15px", background: "#f5f5f5", borderRadius: "4px" }}>
        <label htmlFor="status-select" style={{ marginRight: "10px", fontWeight: "bold" }}>
          ステータスを更新:
        </label>
        <select
          id="status-select"
          value={inquiry.status}
          // 変更されたら、このIDと新しいステータスを親に送る
          onChange={(e) => onStatusChange(inquiry.id, e.target.value as InquiryStatus)}
          style={{ padding: "5px", fontSize: "1rem" }}
        >
          <option value="pending">未対応</option>
          <option value="in_progress">対応中</option>
          <option value="completed">完了</option>
        </select>
      </div>

      <hr />
      <p style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: "15px" }}>{inquiry.content}</p>
      <p style={{ color: "#666" }}>投稿者: {inquiry.requester}</p>
    </div>
  );
};