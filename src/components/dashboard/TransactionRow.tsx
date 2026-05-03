'use client'
/**
 * TransactionRow — a single row in the transactions table.
 *
 * Dumb component: receives a transaction and display currency info as props.
 * Income amounts are shown in green (+), expenses in red (–).
 * Shows "—" while exchange rates are loading to avoid misleading USD values.
 */

import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

interface Props {
  txn: {
    id: string
    date: string
    description: string
    category: string
    amount: number
  }
  currencySymbol: string
  ratesLoaded: boolean
}

export function TransactionRow({ txn, currencySymbol, ratesLoaded }: Props) {
  const isIncome = txn.amount >= 0
  const amountColor = isIncome
    ? 'text-emerald-600 dark:text-emerald-400'
    : 'text-red-600 dark:text-red-400'

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-sm">{txn.date}</TableCell>
      <TableCell className="text-sm">{txn.description}</TableCell>
      <TableCell>
        <Badge variant="secondary" className="text-xs font-normal">{txn.category}</Badge>
      </TableCell>
      <TableCell className={`text-right font-mono text-sm font-medium ${amountColor}`}>
        {ratesLoaded
          ? `${isIncome ? '+' : ''}${currencySymbol}${Math.abs(txn.amount).toFixed(2)}`
          : '—'}
      </TableCell>
    </TableRow>
  )
}
