import type { Inquiry } from "../types/inquiry";
import { InquiryTable } from "../components/InquiryTable";

type InquiryListPageProps = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
};

export const InquiryListPage = ({ inquiries, onSelectInquiry }: InquiryListPageProps) => {
  return (
    <div>
      <h2>問い合わせ一（{inquiries.length} 件）</h2>
      <InquiryTable inquiries={inquiries} onSelect={onSelectInquiry} />
    </div>
  );
};