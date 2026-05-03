'use client'
/**
 * BudgetPeriodSelector — the period dropdown + optional custom date inputs
 * used in the Budget Tracker header.
 *
 * Smart component: reads and updates budgetPeriod in Redux directly.
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setBudgetPeriod, selectBudgetPeriod, type BudgetPeriod } from '../../store/slices/transactionsSlice'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function BudgetPeriodSelector() {
  const dispatch     = useAppDispatch()
  const budgetPeriod = useAppSelector(selectBudgetPeriod)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Switching period resets any custom date range */}
      <Select value={budgetPeriod.period}
        onValueChange={(v) => {
          if (!v) return
          dispatch(setBudgetPeriod({ period: v as BudgetPeriod, dateFrom: null, dateTo: null }))
        }}
      >
        <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {/* Date pickers only appear when "Custom Range" is selected */}
      {budgetPeriod.period === 'custom' && (
        <>
          {/* Start date — capped at dateTo so from is always ≤ to */}
          <Input type="date" className="w-36 h-8 text-xs"
            value={budgetPeriod.dateFrom ?? ''}
            max={budgetPeriod.dateTo ?? undefined}
            onChange={(e) => {
              const from = e.target.value || null
              if (from && budgetPeriod.dateTo && from > budgetPeriod.dateTo) {
                dispatch(setBudgetPeriod({ dateFrom: from, dateTo: null }))
              } else {
                dispatch(setBudgetPeriod({ dateFrom: from }))
              }
            }}
          />
          <span className="text-xs text-muted-foreground">to</span>
          {/* End date — floored at dateFrom so to is always ≥ from */}
          <Input type="date" className="w-36 h-8 text-xs"
            value={budgetPeriod.dateTo ?? ''}
            min={budgetPeriod.dateFrom ?? undefined}
            onChange={(e) => {
              const to = e.target.value || null
              if (to && budgetPeriod.dateFrom && to < budgetPeriod.dateFrom) {
                dispatch(setBudgetPeriod({ dateFrom: null, dateTo: to }))
              } else {
                dispatch(setBudgetPeriod({ dateTo: to }))
              }
            }}
          />
        </>
      )}
    </div>
  )
}
