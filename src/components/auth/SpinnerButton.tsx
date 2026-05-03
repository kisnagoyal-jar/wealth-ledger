import { Button } from '../ui/button'

function Spinner() {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      {/* label slot rendered by parent via children when loading */}
    </span>
  )
}

interface Props {
  loading: boolean
  label: string
  loadingLabel: string
  className?: string
}

export function SpinnerButton({ loading, label, loadingLabel, className }: Props) {
  return (
    <Button type="submit" disabled={loading} className={className}>
      {loading
        ? <span className="flex items-center justify-center gap-2"><Spinner />{loadingLabel}</span>
        : label}
    </Button>
  )
}
