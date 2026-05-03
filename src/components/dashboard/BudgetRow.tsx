'use client'
/**
 * BudgetRow — one category row inside the Budget Tracker card.
 *
 * Shows the category name, an "Over budget" badge if needed,
 * the current spend vs an editable budget input, and a colour-coded
 * progress bar (green → amber at 80% → red when exceeded).
 *
 * Dumb component: all data and callbacks come from props.
 */

import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

interface Props {
  category: string
  spent: number
  budget: number
  exceeded: boolean
  percentageUsed: number
  currencySymbol: string
  ratesLoaded: boolean
  onSave: (amount: number) => void
}

export function BudgetRow({ category, spent, budget, exceeded, percentageUsed, currencySymbol, ratesLoaded, onSave }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{category}</span>
          {exceeded && (
            <Badge variant="destructive" className="text-xs px-1.5 py-0">Over budget</Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{ratesLoaded ? `${currencySymbol}${spent.toFixed(0)}` : '—'}</span>
          <span>/</span>
          <span>{currencySymbol}</span>
          {/* Inline editable budget — saves on blur */}
          <input
            type="number" min={0}
            className="w-20 bg-muted border border-input rounded px-2 py-0.5 text-xs text-right text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            defaultValue={budget}
            onBlur={(e) => {
              const n = parseFloat(e.target.value)
              if (!isNaN(n) && n > 0) onSave(n)
            }}
          />
        </div>
      </div>
      <Progress
        value={percentageUsed}
        className={`h-2 ${exceeded ? '[&>div]:bg-destructive' : percentageUsed > 80 ? '[&>div]:bg-amber-500' : '[&>div]:bg-blue-500'}`}
      />
    </div>
  )
}
