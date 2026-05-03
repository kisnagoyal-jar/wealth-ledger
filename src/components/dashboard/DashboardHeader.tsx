'use client'
/**
 * DashboardHeader — top bar with logo, currency selector, and theme toggle.
 *
 * Delegates visual sub-parts to LogoMark and ThemeToggle so this file
 * focuses only on the flex layout and the currency selector interaction.
 */

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setSelectedCurrency, fetchRates,
  SUPPORTED_CURRENCIES, selectSelectedCurrency,
} from '../../store/slices/currencySlice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { LogoMark }    from './LogoMark'
import { ThemeToggle } from './ThemeToggle'

export function DashboardHeader() {
  const dispatch         = useAppDispatch()
  const selectedCurrency = useAppSelector(selectSelectedCurrency)

  return (
    <div className="flex items-center justify-between">

      {/* Logo + brand name */}
      <div className="flex items-center gap-3">
        <LogoMark />
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-tight">WealthLedger</h1>
          <p className="text-xs text-muted-foreground leading-tight">Personal Finance Dashboard</p>
        </div>
      </div>

      {/* Currency selector + theme toggle */}
      <div className="flex items-center gap-2">
        {/* Changing currency re-fetches exchange rates immediately */}
        <Select
          value={selectedCurrency}
          onValueChange={(v) => {
            if (!v) return
            dispatch(setSelectedCurrency(v))
            dispatch(fetchRates(v))
          }}
        >
          <SelectTrigger className="w-24 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SUPPORTED_CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <ThemeToggle />
      </div>
    </div>
  )
}
