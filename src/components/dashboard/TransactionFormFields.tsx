'use client'
/**
 * TransactionFormFields — the input grid inside the "Add Transaction" form.
 *
 * Dumb component: receives form state and an onChange callback.
 * Contains: Description, Amount+Currency, Category, and Date fields.
 *
 * No Redux, no validation — parent component (AddTransactionForm) handles both.
 */

import { type TransactionFormData } from './shared'
import { type Category } from '../../store/slices/transactionsSlice'
import { SUPPORTED_CURRENCIES } from '../../store/slices/currencySlice'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ALL_CATEGORIES } from './shared'

interface Props {
  form: TransactionFormData
  onChange: (partial: Partial<TransactionFormData>) => void
}

export function TransactionFormFields({ form, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Description</label>
        <Input placeholder="e.g. Grocery run" value={form.description}
          onChange={(e) => onChange({ description: e.target.value })} />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Amount</label>
        <div className="flex gap-2">
          <Input type="number" min={0} step="0.01" placeholder="0.00" className="flex-1 min-w-0"
            value={form.amount} onChange={(e) => onChange({ amount: e.target.value })} />
          {/* Currency can differ from the display currency — the thunk converts it */}
          <Select value={form.currency} onValueChange={(v) => { if (v) onChange({ currency: v }) }}>
            <SelectTrigger className="w-24 shrink-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SUPPORTED_CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Category</label>
        <Select value={form.category}
          onValueChange={(v) => onChange({ category: v as Category })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {ALL_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Date</label>
        <Input type="date" value={form.date}
          onChange={(e) => onChange({ date: e.target.value })} />
      </div>

    </div>
  )
}
