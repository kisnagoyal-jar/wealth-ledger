'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { usePolling } from '../../hooks/usePolling'
import { fetchTransactions } from '../../store/slices/transactionsSlice'
import { fetchCryptoPrices } from '../../store/slices/portfolioSlice'
import { fetchRates, selectSelectedCurrency } from '../../store/slices/currencySlice'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch         = useAppDispatch()
  const selectedCurrency = useAppSelector(selectSelectedCurrency)
  const mountCurrency    = useRef(selectedCurrency)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    dispatch(fetchTransactions())
    dispatch(fetchCryptoPrices())
    dispatch(fetchRates(mountCurrency.current))
  }, [dispatch])

  usePolling()

  if (!mounted) return null

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-slate-50/70 via-white/60 to-blue-50/40 dark:from-slate-950 dark:via-slate-900/95 dark:to-slate-900 text-foreground p-6 transition-colors">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/15 blur-3xl animate-shimmer" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-teal-400/10 dark:bg-teal-600/15 blur-3xl animate-shimmer delay-500" />
      </div>
      <div className="max-w-6xl mx-auto space-y-6">
        {children}
      </div>
    </main>
  )
}
