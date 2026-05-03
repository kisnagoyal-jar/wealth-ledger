import { z } from 'zod'
import { SUPPORTED_CURRENCIES } from '../store/slices/currencySlice'

const CATEGORY_VALUES = [
  'Food', 'Transport', 'Entertainment', 'Housing',
  'Healthcare', 'Shopping', 'Income', 'Utilities',
] as const

export const addTransactionSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be under 100 characters'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0,
      'Enter a positive number',
    ),
  currency: z.enum(SUPPORTED_CURRENCIES, { error: 'Select a valid currency' }),
  category: z.enum(CATEGORY_VALUES, { error: 'Select a category' }),
  date: z.string().min(1, 'Date is required'),
  type: z.enum(['income', 'expense']),
})

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>
