import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { InquiryTable } from "../components/InquiryTable";
import { useState } from "react";

type FilterValue = InquiryStatus | "all";

type InquiryListPageProps = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
  onDelete: (id:number) => void;
};

export const InquiryListPage = ({ inquiries, onSelectInquiry, onDelete }: InquiryListPageProps) => {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredInquiries = 
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  return (
    <div style={{textAlign:"center"}}>
      <h2>問い合わせ一（{filteredInquiries.length} 件）</h2>
      <div>
        <button onClick={() => setFilter("all")}>すべて</button>
        <button onClick={() => setFilter("pending")}>未対応</button>
        <button onClick={() => setFilter("in_progress")}>対応中</button>
        <button onClick={() => setFilter("completed")}>完了</button>
      </div>

      {filteredInquiries.length === 0 ? (
  <p>該当する問い合わせがありません。</p>
) : (
  <InquiryTable
    inquiries={filteredInquiries}
    onSelect={onSelectInquiry}
    onDelete={onDelete}
  />
)}
    </div>
  );
};