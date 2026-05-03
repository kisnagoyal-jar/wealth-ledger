import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { applyBudgetPeriod } from '../../utils/budgetPeriod'
import type { Category, BudgetStatus } from './transactionsTypes'

// --- Base selectors (read directly from state) ---

const selectItems  = (state: RootState) => state.transactions.items
const selectFilter = (state: RootState) => state.transactions.filter

export const selectBudgets             = (state: RootState) => state.transactions.budgets
export const selectTransactionsLoading = (state: RootState) => state.transactions.loading
export const selectTransactionsError   = (state: RootState) => state.transactions.error
export const selectBudgetPeriod        = (state: RootState) => state.transactions.budgetPeriod
export const selectClockDate           = (state: RootState) => state.transactions.clockDate
export const selectTransactionFilter   = selectFilter

// --- Memoised selectors (computed, re-run only when inputs change) ---

// Returns the filtered transaction list based on the current filter state.
export const selectFilteredTransactions = createSelector([selectItems, selectFilter], (items, filter) =>
  items.filter((txn) => {
    if (filter.category !== null && txn.category !== filter.category) return false
    if (filter.dateFrom !== null && txn.date < filter.dateFrom) return false
    if (filter.dateTo !== null && txn.date > filter.dateTo) return false
    if (filter.amountMin !== null && txn.amount < filter.amountMin) return false
    if (filter.amountMax !== null && txn.amount > filter.amountMax) return false
    return true
  }),
)

// Sum of all transaction amounts (income positive, expenses negative) = net worth in USD.
export const selectNetWorth = createSelector([selectItems], (items) =>
  items.reduce((sum, t) => sum + t.amount, 0),
)

// Spending per category across filtered transactions (for the breakdown chart).
export const selectCategoryBreakdown = createSelector([selectFilteredTransactions], (txns) => {
  const breakdown: Partial<Record<Category, number>> = {}
  for (const t of txns) breakdown[t.category] = (breakdown[t.category] ?? 0) + t.amount
  return breakdown
})

// For each budgeted category, computes how much was spent vs the limit in the selected period.
export const selectBudgetStatus = createSelector(
  [selectItems, selectBudgets, selectBudgetPeriod, selectClockDate],
  (items, budgets, budgetPeriod, clockDate) => {
    const periodItems = applyBudgetPeriod(items, budgetPeriod, clockDate)
    const status: Partial<Record<Category, BudgetStatus>> = {}
    for (const [category, budget] of Object.entries(budgets) as [Category, number][]) {
      const spent = periodItems
        .filter((t) => t.category === category && t.amount < 0)
        .reduce<number>((s, t) => s + Math.abs(t.amount), 0)
      status[category] = { spent, budget, exceeded: spent > budget, percentageUsed: Math.min((spent / budget) * 100, 100) }
    }
    return status
  },
)

// List of category names where the budget has been exceeded (used for notifications).
export const selectOverBudgetCategories = createSelector([selectBudgetStatus], (s) =>
  (Object.entries(s) as [Category, BudgetStatus][]).filter(([, v]) => v.exceeded).map(([c]) => c),
)
