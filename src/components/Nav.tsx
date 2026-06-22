// src/components/Nav.tsx

type NavProps = {
  // 押されたボタンの行き先（"list" か "create"）を親に伝えるリモコン
  onNavigate: (page: "list" | "create") => void;
};

export const Nav = ({ onNavigate }: NavProps) => {
  return (
    <nav style={{
      display: "flex", 
      justifyContent: "center", 
      gap: "15px", 
      padding: "15px", 
      background: "#ffffff", 
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)", 
      marginBottom: "30px" 
    }}>
      <button 
        style={{
          padding: "10px 24px", 
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "20px", 
          background: "#ee32c5", 
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(238, 50, 197, 0.3)" 
        }} 
        // 👈 クリックされたら「"list" に行きたい！」と親に合図を送る
        onClick={() => onNavigate("list")} 
      >
        一覧
      </button>
      <button 
        style={{
          padding: "10px 24px", 
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "20px", 
          background: "#00bfff", 
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 191, 255, 0.3)" 
        }}  
        // 👈 クリックされたら「"create" に行きたい！」と親に合図を送る
        onClick={() => onNavigate("create")}
      >
        新規登録
      </button>
    </nav>
  );
};