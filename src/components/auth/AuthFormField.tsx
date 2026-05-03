import { Input } from '../ui/input'

const LABEL_CLS = 'block mb-1.5 text-xs font-medium text-blue-700 dark:text-blue-200 uppercase tracking-widest'
const INPUT_CLS = 'bg-white dark:bg-white/8 border-slate-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus-visible:ring-blue-500'

interface Props {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  required?: boolean
}

export function AuthFormField({ label, type, placeholder, value, onChange, disabled, required }: Props) {
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        className={INPUT_CLS}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </div>
  )
}
