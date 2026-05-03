'use client'
/**
 * TransactionFilters — category dropdown + date range inputs + "Clear" button.
 *
 * Smart component: dispatches setFilter and clearFilter actions to Redux.
 * Filters are stored in the store so they persist if the component remounts.
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setFilter, clearFilter, type Category } from '../../store/slices/transactionsSlice'
import { selectTransactionFilter } from '../../store/slices/transactionsSelectors'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ALL_CATEGORIES } from './shared'

export function TransactionFilters() {
  const dispatch = useAppDispatch()
  const filter   = useAppSelector(selectTransactionFilter)

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filter by spending category */}
      <Select
        defaultValue="all"
        onValueChange={(v) => dispatch(setFilter({ category: v === 'all' ? null : v as Category }))}
      >
        <SelectTrigger className="w-44 h-8 text-xs">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {ALL_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>

      {/* Filter by start date — capped at dateTo so from is always ≤ to */}
      <Input
        type="date" className="w-36 h-8 text-xs"
        value={filter.dateFrom ?? ''}
        max={filter.dateTo ?? undefined}
        onChange={(e) => {
          const from = e.target.value || null
          if (from && filter.dateTo && from > filter.dateTo) {
            dispatch(setFilter({ dateFrom: from, dateTo: null }))
          } else {
            dispatch(setFilter({ dateFrom: from }))
          }
        }}
      />

      {/* Filter by end date — floored at dateFrom so to is always ≥ from */}
      <Input
        type="date" className="w-36 h-8 text-xs"
        value={filter.dateTo ?? ''}
        min={filter.dateFrom ?? undefined}
        onChange={(e) => {
          const to = e.target.value || null
          if (to && filter.dateFrom && to < filter.dateFrom) {
            dispatch(setFilter({ dateFrom: null, dateTo: to }))
          } else {
            dispatch(setFilter({ dateTo: to }))
          }
        }}
      />

      {/* Resets all active filters to null */}
      <Button
        variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground"
        onClick={() => dispatch(clearFilter())}
      >
        Clear filters
      </Button>
    </div>
  )
}
