// Types shared by transactionsSlice, thunks, and selectors.
// Kept in its own file to avoid circular imports with the Redux store.

export type Category =
  | 'Food' | 'Transport' | 'Entertainment' | 'Housing'
  | 'Healthcare' | 'Shopping' | 'Income' | 'Utilities'

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number          // stored in USD; convert with selectConversionRate for display
  category: Category
  type: 'income' | 'expense'
}

export interface TransactionFilter {
  category: Category | null
  dateFrom: string | null
  dateTo: string | null
  amountMin: number | null
  amountMax: number | null
}

export type BudgetPeriod = 'all' | 'month' | 'week' | 'custom'

export interface BudgetPeriodFilter {
  period: BudgetPeriod
  dateFrom: string | null
  dateTo: string | null
}

export interface TransactionsState {
  items: Transaction[]
  filter: TransactionFilter
  budgetPeriod: BudgetPeriodFilter
  budgets: Partial<Record<Category, number>>   // budget limits per category, in USD
  clockDate: string                             // today's date string (YYYY-MM-DD), ticked by polling
  loading: boolean
  error: string | null
}

export interface BudgetStatus {
  spent: number
  budget: number
  exceeded: boolean
  percentageUsed: number
}

// Argument shape for adding a transaction in a non-USD currency.
// The thunk converts the amount to USD before storing it.
export interface AddWithCurrencyArg {
  description: string
  amount: number
  currency: string
  category: Category
  date: string
  type: 'income' | 'expense'
}
