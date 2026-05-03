// Shared constants and types for all dashboard components.

import type { Category } from '../../store/slices/transactionsSlice'

// Glassmorphism card style — frosted glass look for light + dark mode.
export const CARD_CLASS =
  'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-slate-200/60 dark:border-slate-700/30 shadow-sm'

// All categories including Income — used in the transaction form and filters.
export const ALL_CATEGORIES = [
  'Food', 'Transport', 'Entertainment', 'Housing',
  'Healthcare', 'Shopping', 'Income', 'Utilities',
] as const

// Spending categories only (no Income) — used in budget dropdowns.
export const EXPENSE_CATEGORIES = [
  'Food', 'Transport', 'Entertainment', 'Housing',
  'Healthcare', 'Shopping', 'Utilities',
] as const

// Shape of the "Add Transaction" form — shared between AddTransactionForm and TransactionFormFields.
export interface TransactionFormData {
  description: string
  amount: string
  currency: string
  category: Category
  date: string
  type: 'income' | 'expense'
}
