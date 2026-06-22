// src/App.tsx
import { useState } from "react";
import type { Inquiry, InquiryStatus } from "./types/inquiry";
import { InquiryListPage } from "./pages/InquiryListPage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";
import { Nav } from "./components/Nav";

// 最初の初期データ（配列）
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    title: "PCが起動しません",
    content: "今朝出社したら、電源ボタンを押しても画面が真っ暗なままです。急ぎの業務があるので対応をお願いします。",
    requester: "山田 太郎",
    status: "pending",
    created_at: "2026-06-20",
  },
  {
    id: 2,
    title: "社内システムにログインできない",
    content: "パスワードを何度か間違えてしまい、アカウントがロックされてしまったようです。解除の手続きをお願いします。",
    requester: "佐藤 花子",
    status: "in_progress",
    created_at: "2026-06-21",
  },
  {
    id: 3,
    title: "新しいマウスの支給希望",
    content: "現在使用しているマウスのホイールが全く反応しなくなりました。業務に支障が出るため、新しいものの支給をお願いします。",
    requester: "鈴木 一郎",
    status: "completed",
    created_at: "2026-06-15",
  },
  {
    id: 4,
    title: "会議室AのWi-Fiが不安定",
    content: "会議室Aでオンラインミーティングをしていると、頻繁に接続が切れてしまいます。ルーターの再起動など確認をお願いできますか？",
    requester: "高橋 健太",
    status: "pending",
    created_at: "2026-06-22",
  },
  {
    id: 5,
    title: "経費精算マニュアルの場所について",
    content: "新しく導入された経費精算システムですが、交通費の入力手順がわかりません。マニュアルの格納場所を教えてください。",
    requester: "田中 美咲",
    status: "in_progress",
    created_at: "2026-06-22",
  }
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
      created_at: new Date().toISOString().split("T")[0], 
    };

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

  const handleDelete = (id: number) => {
    // 渡されたID「以外」のデータだけを残して、新しいデータで上書きする！
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  return (
    // 画面全体に薄いグレーを敷いて、アプリっぽさを出します
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", paddingBottom: "40px" }}>
      
      <Nav onNavigate={(page) => setCurrentPage(page)} />

      {/* ⚠️ ここがズレの解消ポイント！ textAlign:"center" をやめて、margin:"0 auto" にしました */}
      <main style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        padding: "20px",
        background: "#ffffff", // コンテンツ部分を白いカード風に
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
      }}>
        {/* ① 一覧画面：配列データをそのまま丸ごと渡す */}
        {currentPage === "list" && (
          <InquiryListPage inquiries={inquiries} onSelectInquiry={handleSelectInquiry} onDelete={handleDelete}/>
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