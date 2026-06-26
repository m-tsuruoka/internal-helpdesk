import { useState } from 'react'

// ⭕ 同じ「pages」フォルダ内にいるので、「./pages/」を削ってスッキリ！
import { InquiryListPage } from './InquiryListPage'
import { InquiryDetailPage } from './InquiryDetailPage'
import { InquiryCreatePage } from './InquiryCreatePage'

// ⭕ 1つ上の階層（..）に出てから、それぞれのフォルダに入るように修正！
import { useInquiries } from '../hooks/useInquiries'
import type { User } from '../types/auth'
import type { Inquiry, InquiryStatus } from '../types/inquiry'
import axios from 'axios'
type Page = 'list' | 'detail' | 'create'

type InquiryPageProps = {
  user: User
  onLogout: () => void
}

export function InquiryPage({ user, onLogout }: InquiryPageProps) {
  const {
    inquiries, filter, setFilter, isLoading, error,
    addInquiry, updateInquiry, removeInquiry,
  } = useInquiries()

  const [currentPage, setCurrentPage] = useState<Page>('list')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleSelectInquiry = (id: number) => { setSelectedId(id); setCurrentPage('detail') }
  const handleBack = () => { setSelectedId(null); setCurrentPage('list') }
  const handleCreated = (inquiry: Inquiry) => { addInquiry(inquiry); setCurrentPage('list') }

// ⭕ 修正後：ステータス更新
const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
  if (!selectedInquiry) return
  const updatedInquiryData = { ...selectedInquiry, status } // 💡 IDはselectedInquiryから取っている
  
  await updateInquiry(updatedInquiryData)
}

const handleDelete = async (id: number) => {
  if (!confirm('この問い合わせを削除しますか？')) return
  try {
    await removeInquiry(id)
    handleBack()
  } catch (e) {
    // 💡 フックから投げ返されたエラーをここでキャッチ！
    if (axios.isAxiosError(e) && e.response?.status === 403) {
      alert('削除には管理者権限が必要です') // 一般ユーザーの時はこっち！
    } else {
      alert('データベースの削除に失敗しました') // それ以外のエラーの時はこっち！
    }
  }
}

  const selectedInquiry = inquiries.find((i) => i.id === selectedId)

  return (
    <div>
<header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        fontFamily: 'sans-serif'
      }}>
        {/* 左側：タイトル */}
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#111827' 
        }}>
          問い合わせ管理
        </h1>

        {/* 右側：ナビゲーションとユーザー情報 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px' 
        }}>
          {/* ページ切り替えナビゲーション */}
          <nav style={{ 
            display: 'flex', 
            gap: '8px' 
          }}>
            <button 
              onClick={() => setCurrentPage('list')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: currentPage === 'list' ? '#edf2f7' : 'transparent',
                color: currentPage === 'list' ? '#2b6cb0' : '#4a5568',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              一覧
            </button>
            <button 
              onClick={() => setCurrentPage('create')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: currentPage === 'create' ? '#edf2f7' : 'transparent',
                color: currentPage === 'create' ? '#2b6cb0' : '#4a5568',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              新規登録
            </button>
          </nav>

          {/* 境界線（仕切り） */}
          <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb' }} />

          {/* ユーザー情報とログアウト */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#4a5568',
              fontWeight: '500'
            }}>
              ログイン中：{user.name}
            </span>
            <button 
              onClick={onLogout}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                color: '#e53e3e',
                backgroundColor: '#fff5f5',
                border: '1px solid #fed7d7',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fff0f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fff5f5';
              }}
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'list' && (
          <InquiryListPage
            inquiries={inquiries}
            filter={filter}
            onChangeFilter={setFilter}
            isLoading={isLoading}
            error={error}
            onSelectInquiry={handleSelectInquiry}
            onDelete={handleDelete}
          />
        )}
{currentPage === 'detail' && selectedInquiry && (
          <InquiryDetailPage
            inquiry={selectedInquiry}
            onBack={handleBack}
            onStatusChange={(id, newStatus) => {
              handleUpdateStatus(id, newStatus)
            }}
          />
        )}
        {currentPage === 'create' && (
          <InquiryCreatePage onCreated={handleCreated} onBack={handleBack} />
        )}
      </main>
      
    </div>
  )
}