import { Select } from 'antd'

export type SortOption =
  | 'release_desc'
  | 'release_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'title_asc'
  | 'title_desc'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
  style?: React.CSSProperties
}

export default function SortSelect(props: SortSelectProps) {
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      style={{ ...props.style }}
      options={[
        { label: '上映日期：新 → 舊', value: 'release_desc' },
        { label: '上映日期：舊 → 新', value: 'release_asc' },
        { label: '評分：高 → 低', value: 'rating_desc' },
        { label: '評分：低 → 高', value: 'rating_asc' },
        { label: '片名：A → Z', value: 'title_asc' },
        { label: '片名：Z → A', value: 'title_desc' }
      ]}
    />
  )
}
