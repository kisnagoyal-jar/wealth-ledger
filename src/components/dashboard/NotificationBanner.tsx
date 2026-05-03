'use client'
/**
 * NotificationBanner — shows system alerts as dismissible amber banners.
 *
 * Budget notifications store raw USD amounts (spentUSD/budgetUSD) and
 * convert them to the active display currency here at render time, so
 * the shown amount always matches whatever currency the user has selected.
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectNotifications, removeNotification } from '../../store/slices/notificationsSlice'
import { selectConversionRate } from '../../store/selectors'
import { selectCurrencySymbol } from '../../store/slices/currencySlice'
import { Button } from '../ui/button'

export function NotificationBanner() {
  const dispatch      = useAppDispatch()
  const notifications = useAppSelector(selectNotifications)
  const convRate      = useAppSelector(selectConversionRate)
  const symbol        = useAppSelector(selectCurrencySymbol)

  if (notifications.length === 0) return null

  return (
    <div className="space-y-2">
      {notifications.map((n) => {
        // Budget warnings carry raw USD amounts — convert to display currency at render time
        const amountInfo = n.spentUSD != null && n.budgetUSD != null
          ? ` — ${symbol}${(n.spentUSD * convRate).toFixed(0)} of ${symbol}${(n.budgetUSD * convRate).toFixed(0)}`
          : ''

        return (
          <div
            key={n.id}
            className="flex items-center justify-between bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-sm border border-amber-200 dark:border-amber-800/60 rounded-xl px-4 py-2.5 text-sm"
          >
            <span className="text-amber-800 dark:text-amber-200">{n.message}{amountInfo}</span>
            <Button
              variant="ghost" size="sm"
              className="h-6 text-xs text-amber-600 dark:text-amber-400 hover:text-foreground ml-4 px-2"
              onClick={() => dispatch(removeNotification(n.id))}
            >
              dismiss
            </Button>
          </div>
        )
      })}
    </div>
  )
}
