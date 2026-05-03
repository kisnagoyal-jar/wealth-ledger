import { createSelector } from '@reduxjs/toolkit'
import {
  selectNetWorth, selectCategoryBreakdown, selectBudgetStatus,
  selectFilteredTransactions,
  type BudgetStatus, type Category,
} from './slices/transactionsSlice'
import { selectRates, selectSelectedCurrency } from './slices/currencySlice'
import { selectPortfolioValue } from './slices/portfolioSlice'

// Multiplies every value in a partial record by a rate (used for currency conversion).
function convertPartialRecord<K extends string>(obj: Partial<Record<K, number>>, rate: number): Partial<Record<K, number>> {
  const result: Partial<Record<K, number>> = {}
  for (const [k, v] of Object.entries(obj) as [K, number][]) result[k] = v * rate
  return result
}

// The multiplier to convert any USD amount to the user's selected currency.
export const selectConversionRate = createSelector(
  [selectRates, selectSelectedCurrency],
  (rates, currency) => rates?.[currency] ?? 1,
)

// Currency-converted versions of the key metrics.
export const selectNetWorthConverted          = createSelector([selectNetWorth,          selectConversionRate], (v, r) => v * r)
export const selectPortfolioValueConverted    = createSelector([selectPortfolioValue,    selectConversionRate], (v, r) => v * r)
export const selectCategoryBreakdownConverted = createSelector([selectCategoryBreakdown, selectConversionRate], (b, r) => convertPartialRecord(b, r))

// Converts each category's spent/budget amounts so the UI shows the right currency.
export const selectBudgetStatusConverted = createSelector([selectBudgetStatus, selectConversionRate], (status, rate) => {
  const result: Partial<Record<Category, BudgetStatus>> = {}
  for (const [cat, s] of Object.entries(status) as [Category, BudgetStatus | undefined][]) {
    if (!s) continue
    result[cat] = { ...s, spent: s.spent * rate, budget: s.budget * rate }
  }
  return result
})

// Transaction list with amounts already converted to the display currency.
export const selectFilteredTransactionsConverted = createSelector(
  [selectFilteredTransactions, selectConversionRate],
  (txns, r) => txns.map((t) => ({ ...t, amount: t.amount * r })),
)
