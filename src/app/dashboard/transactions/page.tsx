'use client'

import { AddTransactionForm } from '../../../components/dashboard/AddTransactionForm'
import { TransactionTable }   from '../../../components/dashboard/TransactionTable'

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <AddTransactionForm />
      <TransactionTable />
    </div>
  )
}
