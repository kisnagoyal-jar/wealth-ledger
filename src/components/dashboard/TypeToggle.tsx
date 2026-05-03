'use client'
/**
 * TypeToggle — Expense / Income selector for the "Add Transaction" form.
 *
 * Dumb component: receives the current type and an onChange callback.
 * The active button is highlighted — red for expense, green for income.
 */

interface Props {
  type: 'expense' | 'income'
  onChange: (type: 'expense' | 'income') => void
}

export function TypeToggle({ type, onChange }: Props) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-border">
      <button
        type="button"
        onClick={() => onChange('expense')}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          type === 'expense'
            ? 'bg-red-500 text-white'
            : 'bg-muted text-muted-foreground hover:text-foreground'
        }`}
      >
        Expense
      </button>
      <button
        type="button"
        onClick={() => onChange('income')}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          type === 'income'
            ? 'bg-emerald-500 text-white'
            : 'bg-muted text-muted-foreground hover:text-foreground'
        }`}
      >
        Income
      </button>
    </div>
  )
}
