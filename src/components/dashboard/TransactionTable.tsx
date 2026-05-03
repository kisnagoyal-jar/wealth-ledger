'use client'
// Paginated, filterable transaction list.
// Filters are stored in Redux (TransactionFilters dispatches them).
// Page resets to 1 whenever the filtered result count changes.

import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectSelectedCurrency, selectCurrencySymbol, selectRatesLoaded } from '../../store/slices/currencySlice'
import { selectFilteredTransactionsConverted } from '../../store/selectors'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { TransactionFilters } from './TransactionFilters'
import { TransactionRow }     from './TransactionRow'
import { TablePagination }    from './TablePagination'
import { CARD_CLASS } from './shared'

const PAGE_SIZE = 10

export function TransactionTable() {
  const selectedCurrency = useAppSelector(selectSelectedCurrency)
  const currencySymbol   = useAppSelector(selectCurrencySymbol)
  const ratesLoaded      = useAppSelector(selectRatesLoaded)
  const all              = useAppSelector(selectFilteredTransactionsConverted)

  const [page, setPage] = useState(1)
  const totalPages   = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const transactions = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [all.length])

  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <CardTitle className="mb-2">Transactions ({selectedCurrency})</CardTitle>
        <TransactionFilters />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount ({selectedCurrency})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TransactionRow key={txn.id} txn={txn} currencySymbol={currencySymbol} ratesLoaded={ratesLoaded} />
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <td colSpan={4} className="py-10 text-center text-muted-foreground text-sm">
                  No transactions match the current filters.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={all.length}
            onPageChange={setPage}
          />
        )}
      </CardContent>
    </Card>
  )
}
