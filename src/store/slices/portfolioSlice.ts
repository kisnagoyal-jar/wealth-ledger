import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { withRetry } from '../../utils/retry'
import { fetchRates } from './currencySlice'
import { type CryptoAsset, fetchCoinGeckoPrices } from '../../utils/cryptoApi'

export type { CryptoAsset }
export interface Holding { coinId: string; symbol: string; name: string; quantity: number }
export interface PortfolioState { holdings: Holding[]; assets: Record<string, CryptoAsset>; totalValueConverted: number; loading: boolean; error: string | null }

export const fetchCryptoPrices = createAsyncThunk<Record<string, CryptoAsset>, void, { state: RootState; rejectValue: string }>(
  'portfolio/fetchCryptoPrices',
  async (_, { rejectWithValue }) => {
    try { return await withRetry(() => fetchCoinGeckoPrices()) }
    catch (err) { return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch crypto prices') }
  },
)

const initialState: PortfolioState = {
  holdings: [
    { coinId: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  quantity: 0.5  },
    { coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum', quantity: 2    },
    { coinId: 'solana',   symbol: 'SOL', name: 'Solana',   quantity: 20   },
  ],
  assets: {}, totalValueConverted: 0, loading: false, error: null,
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setTotalValueConverted(state, action: PayloadAction<number>) { state.totalValueConverted = action.payload },
    setHolding(state, action: PayloadAction<{ coinId: string; quantity: number }>) {
      const h = state.holdings.find((h) => h.coinId === action.payload.coinId)
      if (h) h.quantity = action.payload.quantity
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => { state.loading = false; state.assets = action.payload })
      .addCase(fetchCryptoPrices.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed' })
      .addCase(fetchRates.fulfilled, (state, action) => {
        const { rates, currency } = action.payload
        const assets = state.assets ?? {}
        const usdValue = (state.holdings ?? []).reduce((total, h) => total + (assets[h.coinId] ? assets[h.coinId].currentPrice * h.quantity : 0), 0)
        state.totalValueConverted = usdValue * (rates[currency] ?? 1)
      })
  },
})

export const { setTotalValueConverted, setHolding } = portfolioSlice.actions

export const selectHoldings            = (state: RootState) => state.portfolio.holdings ?? []
const selectAssets                     = (state: RootState) => state.portfolio.assets ?? {}
export const selectPortfolioLoading    = (state: RootState) => state.portfolio.loading
export const selectPortfolioError      = (state: RootState) => state.portfolio.error
export const selectTotalValueConverted = (state: RootState) => state.portfolio.totalValueConverted

export const selectPortfolioValue = createSelector([selectHoldings, selectAssets], (holdings, assets) =>
  holdings.reduce((total, h) => total + (assets[h.coinId] ? assets[h.coinId].currentPrice * h.quantity : 0), 0),
)
export const selectPercentageChange = createSelector([selectHoldings, selectAssets, selectPortfolioValue], (holdings, assets, totalValue) => {
  if (totalValue === 0) return 0
  return holdings.reduce((acc, h) => { const a = assets[h.coinId]; return a ? acc + (a.currentPrice * h.quantity / totalValue) * a.priceChange24h : acc }, 0)
})

export default portfolioSlice.reducer
