import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { loginUser } from './slices/authSlice'
import { fetchTransactions } from './slices/transactionsSlice'
import { fetchCryptoPrices } from './slices/portfolioSlice'
import { addNotification, clearBudgetNotifications } from './slices/notificationsSlice'

export const listenerMiddleware = createListenerMiddleware()

const startListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()

// Cross-slice pattern 1: after login, bootstrap transactions and crypto prices
startListening({
  actionCreator: loginUser.fulfilled,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(fetchTransactions())
    listenerApi.dispatch(fetchCryptoPrices())
  },
})

// Step 6 — budget threshold: check every budgeted category after transactions load
startListening({
  actionCreator: fetchTransactions.fulfilled,
  effect: (_action, listenerApi) => {
    // Clear stale budget warnings before re-evaluating (prevents duplicates on re-fetch)
    listenerApi.dispatch(clearBudgetNotifications())

    const state = listenerApi.getState()
    const { items, budgets } = state.transactions

    for (const [category, budget] of Object.entries(budgets) as [string, number][]) {
      const spent = items
        .filter((txn) => txn.category === category && txn.amount < 0)
        .reduce<number>((sum, txn) => sum + Math.abs(txn.amount), 0)

      if (spent > budget) {
        listenerApi.dispatch(
          addNotification({
            message: `Budget exceeded — ${category}`,
            type: 'warning',
            spentUSD: spent,
            budgetUSD: budget,
          }),
        )
      }
    }
  },
})
