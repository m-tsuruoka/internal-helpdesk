// src/pages/InquiryListPage.tsx
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { InquiryTable } from "../components/InquiryTable";
import { useState } from "react";

type FilterValue = InquiryStatus | "all";
type SortOrder = "desc" | "asc"; // 👈 追加：「降順(新しい順)」「昇順(古い順)」の型

type InquiryListPageProps = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
  onDelete: (id: number) => void;
};

export const InquiryListPage = ({ inquiries, onSelectInquiry, onDelete }: InquiryListPageProps) => {
  // 📝 フィルターのメモ帳
  const [filter, setFilter] = useState<FilterValue>("all");
  // 📝 👈 追加：並び替えのメモ帳（初期値は "desc" = 新しい順）
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc"); 

  // ① まず、選ばれているステータスでデータを絞り込む（フィルター）
  const filteredInquiries = 
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  // ② 👈 追加：絞り込んだデータを、指定された順番に並び替える（ソート）
  // ※ [...filteredInquiries] と書くことで、元の配列を壊さずにコピーを作ってから並び替えます
  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id; // 新しい順（IDが大きい方が上）
    } else {
      return a.id - b.id; // 古い順（IDが小さい方が上）
    }
  });

  return (
    <div style={{ textAlign: "left" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
        問い合わせ一覧（{sortedInquiries.length} 件）
      </h2>
      
      {/* 操作エリア（フィルターと並び替えを左右に並べる） */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px", 
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        
        {/* 左側：フィルターボタン群（今までと同じ） */}
        <div>
          <button 
            onClick={() => setFilter("all")}
            style={{
              border: "none", background: "#fff", color: "#20a2ff", padding: "8px 16px", cursor: "pointer",
              fontWeight: filter === "all" ? "bold" : "normal",
              borderBottom: filter === "all" ? "2px solid #20a2ff" : "2px solid transparent"
            }}
          >すべて</button>
          <button 
            onClick={() => setFilter("pending")}
            style={{
              border: "none", background: "#fff", color: "#20a2ff", padding: "8px 16px", cursor: "pointer",
              fontWeight: filter === "pending" ? "bold" : "normal",
              borderBottom: filter === "pending" ? "2px solid #20a2ff" : "2px solid transparent"
            }}
          >未対応</button>
          <button 
            onClick={() => setFilter("in_progress")}
            style={{
              border: "none", background: "#fff", color: "#20a2ff", padding: "8px 16px", cursor: "pointer",
              fontWeight: filter === "in_progress" ? "bold" : "normal",
              borderBottom: filter === "in_progress" ? "2px solid #20a2ff" : "2px solid transparent"
            }}
          >対応中</button>
          <button 
            onClick={() => setFilter("completed")}
            style={{
              border: "none", background: "#fff", color: "#20a2ff", padding: "8px 16px", cursor: "pointer",
              fontWeight: filter === "completed" ? "bold" : "normal",
              borderBottom: filter === "completed" ? "2px solid #20a2ff" : "2px solid transparent"
            }}
          >完了</button>
        </div>

        {/* 右側：👈 追加：並び替えプルダウン */}
        <div>
          <label htmlFor="sort-select" style={{ marginRight: "10px", color: "#6c757d", fontSize: "0.9rem", fontWeight: "bold" }}>
            並び替え:
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            style={{ 
              padding: "6px 12px", 
              borderRadius: "6px", 
              border: "1px solid #ced4da", 
              outline: "none",
              cursor: "pointer",
              color: "#495057"
            }}
          >
            <option value="desc">新しい順</option>
            <option value="asc">古い順</option>
          </select>
        </div>
      </div>

      {/* ⚠️ ここが変更点！ filtered ではなく sorted を渡す！ */}
      {sortedInquiries.length === 0 ? (
        <p style={{ color: "#6c757d", textAlign: "center", padding: "20px" }}>該当する問い合わせがありません。</p>
      ) : (
        <InquiryTable
          inquiries={sortedInquiries} 
          onSelect={onSelectInquiry}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};