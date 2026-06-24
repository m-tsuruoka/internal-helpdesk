import { useEffect, useState } from "react";
import { inquiryApi } from "../api/inquiries";
import type { Inquiry } from "../types/inquiry";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //一回だけかフィルターが変わるたびに走る処理
  useEffect(() => {
    //初期化
    setIsLoading(true);
    setError(null);

    //apiを使って取得する
    inquiryApi
      .getAll(filter)
      .then(setInquiries)
      .catch(() => setError("お問い合わせの取得に失敗しました"))
      .finally(() => setIsLoading(false));
  }, [filter]);

  //追加処理
  const addInquiry = (inquiry: Inquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  //更新処理
const updateInquiry = async (updated: Inquiry) => {
    try {
      // 1. 工具箱を使って、Laravel側のデータベースを先に更新する！
      await inquiryApi.updateStatus(updated.id, updated.status);

      // 2. データベースの更新が成功したら、Reactの画面（名簿）を書き換える
      setInquiries((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i)),
      );
    } catch (error) {
      console.error("データベースの更新に失敗しました", error);
      alert("ステータスの更新に失敗しました。");
    }
  };

  //削除処理
  // 💡 async を付け足す
  const removeInquiry = async (id: number) => {
    try {
      // 1. まずは工具箱（inquiryApi）を使って、Laravel側のデータを消す！
      await inquiryApi.delete(id);

      // 2. データベースの削除が成功したら、Reactの画面（名簿）からも消す
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      // 万が一通信エラーが起きたらここでキャッチする
      console.error("削除に失敗しました", error);
      alert("データベースの削除に失敗しました。");
    }
  };

  return {
    inquiries,
    filter,
    setFilter,
    isLoading,
    setIsLoading,
    error,
    setError,
    addInquiry,
    updateInquiry,
    removeInquiry,
  };
}
