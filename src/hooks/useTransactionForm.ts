/**
 * useTransactionForm — manages state and submission logic for AddTransactionForm.
 *
 * Separating this into a hook keeps the component file focused on rendering.
 * The hook reads the current currency from Redux, validates with Zod, and
 * dispatches addTransactionWithCurrency (which converts to USD before storing).
 */

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTransactionWithCurrency } from '../store/slices/transactionsSlice'
import { selectSelectedCurrency } from '../store/slices/currencySlice'
import { addTransactionSchema } from '../schemas/transaction'
import type { TransactionFormData } from '../components/dashboard/shared'

const blankForm = (currency: string): TransactionFormData => ({
  description: '', amount: '', currency,
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
})

export function useTransactionForm(onSuccess: () => void) {
  const dispatch         = useAppDispatch()
  const selectedCurrency = useAppSelector(selectSelectedCurrency)

  const [error, setError] = useState<string | null>(null)
  const [form, setForm]   = useState<TransactionFormData>(blankForm(selectedCurrency))

  function reset() {
    setForm(blankForm(selectedCurrency))
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Zod validates all fields and returns typed data or a list of errors
    const result = addTransactionSchema.safeParse(form)
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Invalid input'); return }
    dispatch(addTransactionWithCurrency({
      description: result.data.description,
      amount:      parseFloat(result.data.amount),
      currency:    result.data.currency,
      category:    result.data.category,
      date:        result.data.date,
      type:        result.data.type,
    }))
    reset()
    onSuccess()
  }

  return { form, setForm, error, reset, handleSubmit }
}
