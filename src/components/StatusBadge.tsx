//型定義をインポート
import { type InquiryStatus, inquiryStatusLabel } from "../types/inquiry";

//Propsの型定義
type StatusBadgeProps = {
  status: InquiryStatus;
};

//ステータスをレンダリング
export const StatusBadge = ({ status }: StatusBadgeProps) => {
    return <span>{inquiryStatusLabel[status]}</span>;
}