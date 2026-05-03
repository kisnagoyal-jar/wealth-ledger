import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { withRetry } from '../../utils/retry'
import { fetchExchangeRates } from '../../utils/exchangeRatesApi'

export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'] as const
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

export interface CurrencyState {
  selectedCurrency: string
  rates: Record<string, number>
  loading: boolean
  error: string | null
}

export const fetchRates = createAsyncThunk<
  { rates: Record<string, number>; currency: string },
  string,
  { state: RootState; rejectValue: string }
>('currency/fetchRates', async (currency, { rejectWithValue }) => {
  try {
    const rates = await withRetry(() => fetchExchangeRates())
    return { rates, currency }
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch exchange rates')
  }
})

const initialState: CurrencyState = {
  selectedCurrency: 'INR',
  rates: {},
  loading: false,
  error: null,
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCurrency(state, action: PayloadAction<string>) { state.selectedCurrency = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(fetchRates.fulfilled, (state, action) => { state.loading = false; state.rates = action.payload.rates; state.selectedCurrency = action.payload.currency })
      .addCase(fetchRates.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed to fetch rates' })
  },
})

export const { setSelectedCurrency } = currencySlice.actions

export const selectSelectedCurrency  = (state: RootState) => state.currency.selectedCurrency
export const selectRates             = (state: RootState) => state.currency.rates
export const selectCurrencyLoading   = (state: RootState) => state.currency.loading
export const selectCurrencyError     = (state: RootState) => state.currency.error
export const selectRatesLoaded       = (state: RootState) => Object.keys(state.currency.rates).length > 0

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'CA$', AUD: 'A$', INR: '₹',
}
export const selectCurrencySymbol = (state: RootState) =>
  CURRENCY_SYMBOLS[state.currency.selectedCurrency] ?? state.currency.selectedCurrency

export default currencySlice.reducer
