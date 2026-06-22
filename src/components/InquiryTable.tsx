import type { Inquiry } from "../types/inquiry";
import { InquiryRow } from "./InquiryRow";

type InquiryTableProps = {
  inquiries: Inquiry[];
  onSelect: (id: number) => void;
  onDelete: (id:number) => void;
};

export const InquiryTable = ({ inquiries, onSelect ,onDelete}: InquiryTableProps) => {
  return (
<table style={{ 
      width: "100%", 
      borderCollapse: "collapse", 
      marginTop: "20px",
      fontSize: "0.95rem",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <thead>
        <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
          <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>ID</th>
          <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>タイトル</th>
          <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>ステータス</th>
          <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>投稿者</th>
          <th style={{ padding: "12px", textAlign: "left", color: "#495057", fontWeight: "600" }}>日時</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <InquiryRow key={inquiry.id} inquiry={inquiry} onSelect={onSelect} onDelete={onDelete}/>
        ))}
      </tbody>
    </table>
  );
};