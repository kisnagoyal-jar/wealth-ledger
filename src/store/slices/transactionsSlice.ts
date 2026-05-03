import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchTransactions, addTransactionWithCurrency, setBudgetWithCurrency } from './transactionsThunks'
import { loginUser } from './authSlice'
import type { Transaction, Category, TransactionsState, TransactionFilter, BudgetPeriodFilter, BudgetStatus } from './transactionsTypes'

// Re-export types and thunks so other files only need to import from this one file.
export type { Transaction, Category, TransactionsState, TransactionFilter, BudgetPeriodFilter, BudgetStatus }
export type { BudgetPeriod, AddWithCurrencyArg } from './transactionsTypes'
export { fetchTransactions, addTransactionWithCurrency, setBudgetWithCurrency }
export * from './transactionsSelectors'

const initialFilter: TransactionFilter = { category: null, dateFrom: null, dateTo: null, amountMin: null, amountMax: null }

const initialState: TransactionsState = {
  items: [],
  filter: initialFilter,
  budgetPeriod: { period: 'month', dateFrom: null, dateTo: null },
  budgets: { Food: 400, Transport: 200, Entertainment: 150, Housing: 2000, Healthcare: 200, Shopping: 250, Utilities: 200 },
  clockDate: new Date().toISOString().split('T')[0],
  loading: false,
  error: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<TransactionFilter>>) {
      state.filter = { ...state.filter, ...action.payload }
    },
    clearFilter(state) { state.filter = initialFilter },
    setBudget(state, action: PayloadAction<{ category: Category; amount: number }>) {
      state.budgets[action.payload.category] = action.payload.amount
    },
    addTransaction(state, action: PayloadAction<Omit<Transaction, 'id'>>) {
      state.items.unshift({ ...action.payload, id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` })
    },
    setBudgetPeriod(state, action: PayloadAction<Partial<BudgetPeriodFilter>>) {
      state.budgetPeriod = { ...state.budgetPeriod, ...action.payload }
    },
    tickClock(state) { state.clockDate = new Date().toISOString().split('T')[0] },
  },
  extraReducers: (builder) => {
    builder
      // Cross-slice pattern 1: reset all filters when a new user logs in.
      .addCase(loginUser.fulfilled, (state) => { state.filter = initialFilter })
      .addCase(fetchTransactions.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        const existingIds = new Set(state.items.map((t) => t.id))
        const newItems = action.payload.filter((t) => !existingIds.has(t.id))
        if (newItems.length > 0) state.items = [...state.items, ...newItems]
      })
      .addCase(fetchTransactions.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed' })
      .addCase(addTransactionWithCurrency.fulfilled, (state, action) => {
        state.items.unshift({ ...action.payload, id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` })
      })
      .addCase(setBudgetWithCurrency.fulfilled, (state, action) => {
        state.budgets[action.payload.category] = action.payload.amountUSD
      })
  },
})

export const { setFilter, clearFilter, setBudget, addTransaction, setBudgetPeriod, tickClock } = transactionsSlice.actions
export default transactionsSlice.reducer
