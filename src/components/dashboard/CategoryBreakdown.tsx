'use client'
/**
 * CategoryBreakdown — shows total spending/income grouped by category.
 *
 * Data comes from selectCategoryBreakdownConverted which reads the currently
 * filtered transactions (whatever filters the user has active), groups them
 * by category, and converts to the active currency. No logic happens here.
 */

import { useAppSelector } from '../../store/hooks'
import {
  selectSelectedCurrency, selectCurrencySymbol, selectRatesLoaded,
} from '../../store/slices/currencySlice'
import { selectCategoryBreakdownConverted } from '../../store/selectors'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CARD_CLASS } from './shared'

export function CategoryBreakdown() {
  const selectedCurrency  = useAppSelector(selectSelectedCurrency)
  const currencySymbol    = useAppSelector(selectCurrencySymbol)
  const ratesLoaded       = useAppSelector(selectRatesLoaded)
  const categoryBreakdown = useAppSelector(selectCategoryBreakdownConverted)

  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <CardTitle>Category Breakdown ({selectedCurrency})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(categoryBreakdown) as [string, number][]).map(([cat, total]) => (
            <div
              key={cat}
              className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/30"
            >
              <p className="text-muted-foreground text-xs mb-1">{cat}</p>
              {/* Green for income (positive total), red for expenses (negative) */}
              <p className={`font-semibold text-sm ${total >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {ratesLoaded
                  ? `${currencySymbol}${Math.abs(total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '—'}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
