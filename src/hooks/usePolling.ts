'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCryptoPrices } from '../store/slices/portfolioSlice'
import { fetchRates } from '../store/slices/currencySlice'
import { selectSelectedCurrency } from '../store/slices/currencySlice'
import { tickClock } from '../store/slices/transactionsSlice'

const POLL_INTERVAL_MS = 60_000

export function usePolling() {
  const dispatch = useAppDispatch()
  const selectedCurrency = useAppSelector(selectSelectedCurrency)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tickClock())           // advance the clock so period selectors stay current
      dispatch(fetchCryptoPrices())
      dispatch(fetchRates(selectedCurrency))
    }, POLL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [dispatch, selectedCurrency])
}
