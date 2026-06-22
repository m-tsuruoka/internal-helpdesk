import type { Inquiry } from "../types/inquiry";
import { StatusBadge } from "./StatusBadge";
type InquiryRowProps = {
  inquiry: Inquiry;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export const InquiryRow = ({ inquiry, onSelect, onDelete }: InquiryRowProps) => {
  return (
    <tr>
      <td>{inquiry.id}</td>
      <td>
        <button onClick={() => onSelect(inquiry.id)}>
          {inquiry.title}
        </button>
      </td>
      <td>
        <StatusBadge status={inquiry.status} />
      </td>
      <td>{inquiry.requester}</td>
      <td>{inquiry.created_at}</td>
      <button onClick={() => onDelete(inquiry.id)}>削除</button>
    </tr>
  );
};