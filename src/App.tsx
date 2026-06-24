// // src/App.tsx
// import { useState } from "react";
// import type { Inquiry, InquiryStatus } from "./types/inquiry";
// import { InquiryListPage } from "./pages/InquiryListPage";
// import { InquiryDetailPage } from "./pages/InquiryDetailPage";
// import { InquiryCreatePage } from "./pages/InquiryCreatePage";
// import { Nav } from "./components/Nav";

// // 最初の初期データ（配列）
// const INITIAL_INQUIRIES: Inquiry[] = [];

// type Page = "list" | "detail" | "create";

// function App() {
//   //全部のデータを配列として State で管理
//   const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
//   const [currentPage, setCurrentPage] = useState<Page>("list");
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   //【配列への追加】新規登録画面からデータが送られてきたとき
//   const handleCreateInquiry = (title: string, content: string, requester: string) => {
//     const newInquiry: Inquiry = {
//       id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1, // 被らない新しいIDを作る
//       title,
//       content,
//       requester,
//       status: "pending",
//       created_at: new Date().toISOString().split("T")[0],
//     };

//     setInquiries([newInquiry, ...inquiries]);
//     setCurrentPage("list"); // 一覧に戻る
//   };

//   //【配列の書き換え】詳細画面でステータスが変更されたとき
//   const handleStatusChange = (id: number, newStatus: InquiryStatus) => {
//     // map関数を使って、配列を1件ずつチェックする
//     setInquiries((prevInquiries) =>
//       prevInquiries.map((inquiry) =>
//         // IDが一致したものだけ、status を上書きした新しいオブジェクトに差し替える
//         inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
//       )
//     );
//   };

//   const handleSelectInquiry = (id: number) => {
//     setSelectedId(id);
//     setCurrentPage("detail");
//   };

//   const handleBack = () => {
//     setSelectedId(null);
//     setCurrentPage("list");
//   };

//   const handleDelete = (id: number) => {
//     // 渡されたID「以外」のデータだけを残して、新しいデータで上書きする！
//     setInquiries(prev => prev.filter(item => item.id !== id));
//   };

//   return (
//     // 画面全体に薄いグレーを敷いて、アプリっぽさを出します
//     <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", paddingBottom: "40px" }}>

//       <Nav onNavigate={(page) => setCurrentPage(page)} />

//       <main style={{
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: "20px",
//         background: "#ffffff",
//         borderRadius: "12px",
//         boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
//       }}>
//         {/* ① 一覧画面：配列データをそのまま丸ごと渡す */}
//         {currentPage === "list" && (
//           <InquiryListPage inquiries={inquiries} onSelectInquiry={handleSelectInquiry} onDelete={handleDelete}/>
//         )}

{
  /* ② 詳細画面：配列の中から、特定のIDの1件だけを .find() で探して渡す */
}
// {currentPage === "detail" && selectedId !== null && (
//   (() => {
//     const selectedInquiry = inquiries.find(item => item.id === selectedId);
//     return selectedInquiry ? (
//       <InquiryDetailPage inquiry={selectedInquiry} onBack={handleBack} onStatusChange={handleStatusChange} />
//     ) : (
//       <p>データが見つかりません</p>
//     );
//   })()
// )}

//         {/* ③ 新規登録画面：配列に追加するための関数（リモコン）を渡す */}
//         {currentPage === "create" && (
//           <InquiryCreatePage onSubmitInquiry={handleCreateInquiry} onBack={handleBack} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import { useInquiries } from "./hooks/useInquiries";
import { InquiryListPage } from "./pages/InquiryListPage";
import type {Inquiry, InquiryStatus } from "./types/inquiry";
import { InquiryCreatePage } from "./pages/InquiryCreatePage";
import { InquiryDetailPage } from "./pages/InquiryDetailPage";

type Page = "list" | "detail" | "create";

function App() {
  const {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error,
    addInquiry,
    updateInquiry,
    removeInquiry,

  } = useInquiries();

  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };
  // App 関数内
  const handleCreated = (inquiry: Inquiry) => {
    addInquiry(inquiry); // useInquiries の関数で一覧の先頭に追加
    setCurrentPage("list"); // 一覧へ戻る
  };
// 💡 handleStatusChange の中身を updateInquiry を使う形に改造！
const handleStatusChange = async (id: number, newStatus: InquiryStatus) => {
  try {
    // 1. 今ある一覧の中から、変更したいデータの元の姿を探す
    const targetInquiry = inquiries.find((inquiry) => inquiry.id === id);
    if (!targetInquiry) return;

    // 2. 元のデータの一部分（status）だけを新しく書き換えた、新しいデータ（オブジェクト）を作る
    const updatedData = { ...targetInquiry, status: newStatus };

    // 3. 💡 フックが用意してくれていた「updateInquiry」に丸ごと手渡す！
    // これだけで、Laravelへの通信 ＋ Reactの画面更新が両方走ります
    await updateInquiry(updatedData);

  } catch (error) {
    console.error("ステータスの更新に失敗しました", error);
  }
};

  return (
    <div>
      <header>
        <h1>問い合わせ管理</h1>
        <nav>
          <button onClick={() => setCurrentPage("list")}>一覧</button>
          <button onClick={() => setCurrentPage("create")}>新規登録</button>
        </nav>
      </header>

      <main>
        {currentPage === "list" && (
          <InquiryListPage
            inquiries={inquiries}
            filter={filter}
            onChangeFilter={setFilter}
            isLoading={isLoading}
            error={error}
            onSelectInquiry={handleSelectInquiry}
            onDelete={removeInquiry}
          />
        )}
        {currentPage === "create" && (
          <InquiryCreatePage onCreated={handleCreated} onBack={handleBack} />
        )}
        {currentPage === "detail" &&
          selectedId !== null &&
          (() => {
            const selectedInquiry = inquiries.find(
              (item) => item.id === selectedId,
            );
            return selectedInquiry ? (
              <InquiryDetailPage
                inquiry={selectedInquiry}
                onBack={handleBack}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <p>データが見つかりません</p>
            );
          })()}
      </main>
    </div>
  );
}

export default App;
