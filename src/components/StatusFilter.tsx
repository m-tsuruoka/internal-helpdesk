//InquiryListPageに書いていたフィルターをコンポーネント化

const filters = [
    {value: 'all', label: 'すべて'},
    {value: 'pending', label: '未対応'},
    {value: 'in_progress', label: '対応中'},
    {value: 'completed', label: '完了'},
]

type StatusFilterProps = {
    current: string
    onChange: (status: string) => void
}

export function StatusFilter({ current, onChange}: StatusFilterProps) {
    return (
<div style={{
          display: 'flex',
          gap: '4px',
          backgroundColor: '#f3f4f6', // 薄いグレーの背景
          padding: '4px',
          borderRadius: '8px',
          width: 'fit-content', // ボタンの幅に合わせる
          marginBottom: '16px',
          fontFamily: 'sans-serif'
        }}>
          {filters.map((f) => {
            const isSelected = current === f.value;
            return (
              <button
                key={f.value}
                onClick={() => onChange(f.value)}
                style={{
                  padding: '6px 16px',
                  fontSize: '14px',
                  fontWeight: isSelected ? '600' : '400',
                  // 💡 選択されているボタンだけ白背景＆影をつけて浮き立たせる（タブ風）
                  backgroundColor: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? '#1f2937' : '#4b5563',
                  boxShadow: isSelected ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
    )
}