import { useState } from "react";
import type { Inquiry, InquiryStatus } from "./types/inquiry";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    title: "PC が起動しない",
    content: "朝から電源を入れても反応がありません。",
    requester: "山田 太郎",
    status: "pending",
    created_at: "2026-06-01T09:00:00Z",
  },
  {
    id: 2,
    title: "社内 Wi-Fi に接続できない",
    content: "昨日から急に繋がらなくなりました。",
    requester: "鈴木 花子",
    status: "in_progress",
    created_at: "2026-06-02T10:30:00Z",
  },
  {
    id: 3,
    title: "パスワードをリセットしたい",
    content: "ロックアウトされてしまいました。",
    requester: "田中 次郎",
    status: "completed",
    created_at: "2026-06-03T14:00:00Z",
  },
];

//ページをuseStateで管理
type Page = "list" | "detail" | "create";

function App() {
  //inquiriesの状態
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  //ユーザが今見ているページを管理。初期値はlist
  const [currentPage, setCurrentPage] = useState<Page>("list");

  //どの詳細ページが選ばれたかを記憶するState
  const [selectedId, setSelectedId] = useState<number | null>(null);

  //詳細画面に遷移するための関数
  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  //詳細ページから一覧ページに戻る関数を定義
  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };
  console.log(currentPage);

  // 1. App.tsx の中にステータス書き換え用の関数を追加
const handleStatusChange = (id: number, newStatus: InquiryStatus) => {
  setInquiries((prev) =>
    prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
  );
};

  return (
    <div>
      <nav>
        {/* ボタンが押されたらcrrentPageを変える */}
        <button onClick={() => setCurrentPage("list")}>一覧</button>

        <button onClick={() => setCurrentPage("create")}>新規登録</button>
      </nav>
      <main>
        {/* 選択されたボタンによって表示内容を変更する */}
        {currentPage === "list" && (
          <InquiryListPage
            inquiries={inquiries}
            onSelectInquiry={handleSelectInquiry}
          />
        )}
{currentPage === "detail" && selectedId !== null && (
  (() => {
    // 全データの中から、いま選ばれているIDのデータを1件だけ引っ張り出す
    const selectedInquiry = inquiries.find(item => item.id === selectedId);
    
    return selectedInquiry ? (
      <InquiryDetailPage
        inquiry={selectedInquiry} // 絞り込んだ1件を渡す
        onBack={handleBack}
        onStatusChange={handleStatusChange} // リモコンを渡す
      />
    ) : (
      <p>データが見つかりません</p>
    );
  })()
)}

        {currentPage === "create" && <p>登録フォーム</p>}
      </main>
    </div>
  );
}

export default App;
