import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { withRetry } from '../../utils/retry'
import mockTransactions from '../../data/mockTransactions'
import type { Transaction, Category, AddWithCurrencyArg } from './transactionsTypes'

async function mockFetchTransactionsApi(): Promise<Transaction[]> {
  await new Promise((res) => setTimeout(res, 300))
  return mockTransactions
}

// Loads the initial transaction list from the mock API.
export const fetchTransactions = createAsyncThunk<
  Transaction[], void, { state: RootState; rejectValue: string }
>('transactions/fetchTransactions', async (_, { rejectWithValue }) => {
  try {
    return await withRetry(() => mockFetchTransactionsApi())
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch transactions')
  }
})

// Adds a new transaction. Converts the entered amount from the user's chosen
// currency back to USD so all stored amounts are in the same unit.
export const addTransactionWithCurrency = createAsyncThunk<
  Omit<Transaction, 'id'>, AddWithCurrencyArg, { state: RootState }
>('transactions/addWithCurrency', async (payload, { getState }) => {
  const rate = getState().currency.rates[payload.currency] ?? 1
  const usdAmount = payload.amount / rate
  return {
    description: payload.description,
    amount: payload.type === 'expense' ? -Math.abs(usdAmount) : Math.abs(usdAmount),
    category: payload.category,
    date: payload.date,
    type: payload.type,
  }
})

// Updates a category budget limit. Converts from the user's currency to USD.
export const setBudgetWithCurrency = createAsyncThunk<
  { category: Category; amountUSD: number }, { category: Category; amount: number }, { state: RootState }
>('transactions/setBudgetWithCurrency', async (payload, { getState }) => {
  const { rates, selectedCurrency } = getState().currency
  return { category: payload.category, amountUSD: payload.amount / (rates[selectedCurrency] ?? 1) }
})
