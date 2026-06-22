import type { Inquiry } from "../types/inquiry";
import { StatusBadge } from "./StatusBadge";

type InquiryRowProps = {
  inquiry: Inquiry;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export const InquiryRow = ({ inquiry, onSelect, onDelete }: InquiryRowProps) => {
  // 🎨 セル（td）の共通スタイルを変数化してスッキリさせる
  const tdStyle = {
    padding: "16px 12px", // 上下にゆとりを持たせる
    borderBottom: "1px solid #f1f3f5", // 行の間に薄いグレーの区切り線を引く
    color: "#495057",
    verticalAlign: "middle", // 文字を縦方向の真ん中に揃える
  };

  return (
    // 行全体にマウスを乗せたときのスタイルを変えたい場合は、CSSクラスを使うとより綺麗ですが、今回はシンプルに書いています
    <tr>
      <td style={tdStyle}>{inquiry.id}</td>
      
      {/* タイトルは「リンク風」にして、クリックできることをアピール */}
      <td style={tdStyle}>
        <button 
          onClick={() => onSelect(inquiry.id)}
          style={{
            background: "transparent",
            border: "none",
            color: "#007bff", // リンクらしい青色
            cursor: "pointer",
            padding: 0,
            fontSize: "1rem",
            fontWeight: "bold",
            textDecoration: "underline",
            textUnderlineOffset: "3px" // 下線を少し離してスッキリ見せる
          }}
        >
          {inquiry.title}
        </button>
      </td>
      
      <td style={tdStyle}>
        <StatusBadge status={inquiry.status} />
      </td>
      
      <td style={tdStyle}>{inquiry.requester}</td>
      
      <td style={tdStyle}>{inquiry.created_at}</td>
      
      {/* ⚠️ ここが修正ポイント！削除ボタンも必ず <td> で囲みます */}
      <td style={{ ...tdStyle, textAlign: "center" }}>
        <button 
          onClick={() => {
            const isConfirmed = window.confirm("本当にこの問い合わせを削除しますか？");
            if (isConfirmed) {
              onDelete(inquiry.id);
            }
          }}
          style={{
            padding: "6px 12px",
            backgroundColor: "#fff0f0", // 薄い赤の背景
            color: "#e03131", // 濃い赤の文字
            border: "1px solid #ffc9c9",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "bold",
            transition: "all 0.2s"
          }}
        >
          削除
        </button>
      </td>
    </tr>
  );
};