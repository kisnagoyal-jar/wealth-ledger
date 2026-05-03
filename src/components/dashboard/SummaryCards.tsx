'use client'
/**
 * SummaryCards — the three metric tiles at the top of the dashboard.
 *
 *  • Net Worth    — sum of all transaction amounts, converted to active currency
 *  • Portfolio    — crypto holdings value in the active currency
 *  • 24h Change   — percentage change in portfolio over the last 24 hours
 *
 * Values show "Loading…" until exchange rates arrive so users never see
 * misleading USD amounts when they've chosen a different display currency.
 */

import { useAppSelector } from '../../store/hooks'
import {
  selectSelectedCurrency, selectCurrencyLoading,
  selectCurrencySymbol, selectRatesLoaded,
} from '../../store/slices/currencySlice'
import {
  selectPortfolioValue, selectPercentageChange, selectPortfolioLoading,
} from '../../store/slices/portfolioSlice'
import { selectNetWorthConverted, selectPortfolioValueConverted } from '../../store/selectors'
import { SummaryCard } from './SummaryCard'

export function SummaryCards() {
  const selectedCurrency    = useAppSelector(selectSelectedCurrency)
  const currencySymbol      = useAppSelector(selectCurrencySymbol)
  const ratesLoaded         = useAppSelector(selectRatesLoaded)
  const portfolioLoading    = useAppSelector(selectPortfolioLoading)
  const currencyLoading     = useAppSelector(selectCurrencyLoading)
  const netWorthConverted   = useAppSelector(selectNetWorthConverted)
  const portfolioValue      = useAppSelector(selectPortfolioValue)
  const percentageChange    = useAppSelector(selectPercentageChange)
  const portfolioConverted  = useAppSelector(selectPortfolioValueConverted)

  // Format a number as currency or fall back to a loading indicator
  const money = (n: number) =>
    ratesLoaded
      ? `${currencySymbol}${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : <span className="text-muted-foreground animate-pulse text-lg">Loading…</span>

  const changeColor = percentageChange >= 0 ? 'text-emerald-500' : 'text-red-500'
  const changeSign  = percentageChange >= 0 ? '+' : ''

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title={`Net Worth (${selectedCurrency})`}
        value={money(netWorthConverted)}
      />
      <SummaryCard
        title={`Portfolio ${currencyLoading || portfolioLoading ? '(updating…)' : `(${selectedCurrency})`}`}
        value={money(portfolioConverted > 0 ? portfolioConverted : portfolioValue)}
      />
      <SummaryCard
        title="24h Change"
        value={<span className={changeColor}>{changeSign}{percentageChange.toFixed(2)}%</span>}
      />
    </div>
  )
}
