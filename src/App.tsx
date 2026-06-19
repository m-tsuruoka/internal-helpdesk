// src/App.tsx
import { useState } from "react";
import type { Inquiry, InquiryStatus } from "./types/inquiry";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";

// 最初の初期データ（配列）
const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, title: "PC が起動しない", content: "電源が入りません。", requester: "山田", status: "pending", created_at: "2026-06-01" },
  { id: 2, title: "Wi-Fi に接続できない", content: "急に切れました。", requester: "鈴木", status: "in_progress", created_at: "2026-06-02" },
];

type Page = "list" | "detail" | "create";

function App() {
  // 📦 全部のデータを配列として State で管理！
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ➕ 【配列への追加】新規登録画面からデータが送られてきたとき
  const handleCreateInquiry = (title: string, content: string, requester: string) => {
    const newInquiry: Inquiry = {
      id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1, // 被らない新しいIDを作る
      title,
      content,
      requester,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0], // 今日の日付
    };

    // 🔥 重要：Reactでは push() は使わず、スプレッド構文 `[...]` を使う！
    // 新しいデータを先頭にして、後ろにこれまでの配列（...inquiries）を合体させる
    setInquiries([newInquiry, ...inquiries]);
    setCurrentPage("list"); // 一覧に戻る
  };

  // 🔄 【配列の書き換え】詳細画面でステータスが変更されたとき
  const handleStatusChange = (id: number, newStatus: InquiryStatus) => {
    // map関数を使って、配列を1件ずつチェックする
    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry) =>
        // IDが一致したものだけ、status を上書きした新しいオブジェクトに差し替える
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
      )
    );
  };

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };

  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}>
        <button onClick={() => setCurrentPage("list")} style={{ marginRight: "10px" }}>一覧</button>
        <button onClick={() => setCurrentPage("create")}>新規登録</button>
      </nav>

      <main style={{ padding: "0 20px" }}>
        {/* ① 一覧画面：配列データをそのまま丸ごと渡す */}
        {currentPage === "list" && (
          <InquiryListPage inquiries={inquiries} onSelectInquiry={handleSelectInquiry} />
        )}

        {/* ② 詳細画面：配列の中から、特定のIDの1件だけを .find() で探して渡す */}
        {currentPage === "detail" && selectedId !== null && (
          (() => {
            const selectedInquiry = inquiries.find(item => item.id === selectedId);
            return selectedInquiry ? (
              <InquiryDetailPage inquiry={selectedInquiry} onBack={handleBack} onStatusChange={handleStatusChange} />
            ) : (
              <p>データが見つかりません</p>
            );
          })()
        )}

        {/* ③ 新規登録画面：配列に追加するための関数（リモコン）を渡す */}
        {currentPage === "create" && (
          <InquiryCreatePage onSubmitInquiry={handleCreateInquiry} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;