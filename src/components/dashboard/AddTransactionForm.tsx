'use client'
/**
 * AddTransactionForm — card for logging a new income or expense.
 *
 * State and submission logic are handled by useTransactionForm (a custom hook).
 * Rendering is split between TransactionFormFields (the 4 inputs) and TypeToggle.
 */

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useTransactionForm }    from '../../hooks/useTransactionForm'
import { TransactionFormFields } from './TransactionFormFields'
import { TypeToggle }            from './TypeToggle'
import { CARD_CLASS } from './shared'

export function AddTransactionForm() {
  const [open, setOpen] = useState(false)

  // Hook owns form state, validation, and the dispatch call
  const { form, setForm, error, reset, handleSubmit } = useTransactionForm(
    () => setOpen(false),  // called on successful submission
  )

  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Add Transaction</CardTitle>
          <Button
            variant={open ? 'outline' : 'default'} size="sm"
            onClick={() => { setOpen((o) => !o); reset() }}
          >
            {open ? 'Cancel' : '+ New'}
          </Button>
        </div>
      </CardHeader>

      {open && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TransactionFormFields
              form={form}
              onChange={(partial) => setForm((f) => ({ ...f, ...partial }))}
            />
            <TypeToggle
              type={form.type}
              onChange={(type) => setForm((f) => ({ ...f, type }))}
            />
            {error && <p className="text-destructive text-xs">{error}</p>}
            <Button type="submit" className="w-full">Add Transaction</Button>
          </form>
        </CardContent>
      )}
    </Card>
  )
}
