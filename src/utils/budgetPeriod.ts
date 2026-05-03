import type { Transaction, BudgetPeriodFilter } from '../store/slices/transactionsTypes'

export function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function applyBudgetPeriod(
  items: Transaction[],
  { period, dateFrom, dateTo }: BudgetPeriodFilter,
  clockDate: string,
): Transaction[] {
  if (period === 'all') return items
  const [y, m, d] = clockDate.split('-').map(Number)
  let from: string | null = null
  let to: string | null = null
  if (period === 'month') {
    from = `${y}-${String(m).padStart(2, '0')}-01`
  } else if (period === 'week') {
    const cur = new Date(y, m - 1, d)
    const day = cur.getDay()
    cur.setDate(d - day + (day === 0 ? -6 : 1))
    from = localDateStr(cur)
  } else {
    from = dateFrom
    to = dateTo
  }
  return items.filter((txn) => {
    if (from && txn.date < from) return false
    if (to && txn.date > to) return false
    return true
  })
}
