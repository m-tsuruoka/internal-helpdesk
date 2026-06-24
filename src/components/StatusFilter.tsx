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
        <div>
            {filters.map((f) => (
                <button key={f.value} onClick={() => onChange(f.value)} style={{ fontWeight: current === f.value ? 'bold' : 'normal'}}>
                    {f.label}
                </button>
            ))}
        </div>
    )
}