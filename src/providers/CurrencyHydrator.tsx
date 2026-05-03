'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setSelectedCurrency } from '../store/slices/currencySlice'

export function CurrencyHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const stored = localStorage.getItem('selectedCurrency')
    dispatch(setSelectedCurrency(stored ?? 'INR'))  // default to INR if no preference saved
  }, [dispatch])

  return null
}
