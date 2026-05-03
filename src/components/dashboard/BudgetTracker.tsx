'use client'
/**
 * BudgetTracker — spending vs budget per category, for a selected time period.
 *
 * The period selector and its custom date inputs live in BudgetPeriodSelector.
 * Each category row is handled by BudgetRow (editable inline budget input).
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setBudgetWithCurrency, selectBudgetPeriod } from '../../store/slices/transactionsSlice'
import { selectSelectedCurrency, selectCurrencySymbol, selectRatesLoaded } from '../../store/slices/currencySlice'
import { selectBudgetStatusConverted } from '../../store/selectors'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { BudgetRow }            from './BudgetRow'
import { BudgetPeriodSelector } from './BudgetPeriodSelector'
import { CARD_CLASS } from './shared'

export function BudgetTracker() {
  const dispatch         = useAppDispatch()
  const selectedCurrency = useAppSelector(selectSelectedCurrency)
  const currencySymbol   = useAppSelector(selectCurrencySymbol)
  const ratesLoaded      = useAppSelector(selectRatesLoaded)
  const budgetPeriod     = useAppSelector(selectBudgetPeriod)
  const budgetStatus     = useAppSelector(selectBudgetStatusConverted)

  const periodLabel =
    budgetPeriod.period === 'month'  ? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
    budgetPeriod.period === 'week'   ? 'This week' :
    budgetPeriod.period === 'all'    ? 'All time' :
    (budgetPeriod.dateFrom || budgetPeriod.dateTo)
      ? `${budgetPeriod.dateFrom ?? '…'} → ${budgetPeriod.dateTo ?? '…'}`
      : 'Pick a range'

  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Budget Tracker</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{periodLabel} · {selectedCurrency}</p>
          </div>
          <BudgetPeriodSelector />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {(Object.entries(budgetStatus) as [string, { spent: number; budget: number; exceeded: boolean; percentageUsed: number }][])
          .map(([cat, status]) => (
            <BudgetRow
              key={`${cat}-${selectedCurrency}`}
              category={cat}
              spent={status.spent}
              budget={status.budget}
              exceeded={status.exceeded}
              percentageUsed={status.percentageUsed}
              currencySymbol={currencySymbol}
              ratesLoaded={ratesLoaded}
              onSave={(amount) => dispatch(setBudgetWithCurrency({ category: cat as never, amount }))}
            />
          ))}
      </CardContent>
    </Card>
  )
}
