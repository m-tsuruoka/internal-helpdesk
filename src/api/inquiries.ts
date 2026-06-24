//API関数（inquiryApi.getAll）で呼び出して使う
import { api } from "../lib/api";
import type { Inquiry, InquiryCreateInput, InquiryStatus } from "../types/inquiry";

//オブジェクトを作成（箱）
export const inquiryApi = {
    //取得関数
    //getAllという関数を作成。特定のステータスを指定しているならそれを集めて通信が終わったら配列を送る
    getAll: async (status?: string):Promise<Inquiry[]> => {
        //指定したステータスをparamsに入れる
        const params = status && status !== 'all' ? { status } : {}
        //apiを使ってlaravelにデータを貰いに行く
        const response = await api.get<Inquiry[]>('/api/inquiries', { params })
        //もらってきたデータを返す
        return response.data
    },

    //作成関数
    create: async (input: InquiryCreateInput):
    Promise<Inquiry> => {
        const response = await api.post<Inquiry>('/api/inquiries', input)
        return response.data
    },

    //更新関数
    updateStatus: async (id: number, status:InquiryStatus): Promise<Inquiry> => {
        const response = await api.put<Inquiry>(`/api/inquiries/${id}`, { status })
        return response.data
    },

    //削除関数
    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/inquiries/${id}`)
    },
}