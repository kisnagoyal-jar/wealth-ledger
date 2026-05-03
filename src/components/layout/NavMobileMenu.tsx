'use client'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated } from '../../store/slices/authSlice'
import { setSelectedCurrency, fetchRates, SUPPORTED_CURRENCIES, selectSelectedCurrency } from '../../store/slices/currencySlice'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SECTION_LINKS } from './navConstants'

interface Props { isDash: boolean; onClose: () => void; onLogout: () => void }

export function NavMobileMenu({ isDash, onClose, onLogout }: Props) {
  const dispatch        = useAppDispatch()
  const isAuth          = useAppSelector(selectIsAuthenticated)
  const selectedCurrency = useAppSelector(selectSelectedCurrency)
  return (
    <div className="md:hidden border-t border-slate-200/60 dark:border-slate-700/30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
      <Link href="/" className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>Home</Link>
      {isDash
        ? SECTION_LINKS.map((s) => <Link key={s.href} href={s.href} className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>{s.label}</Link>)
        : <Link href="/dashboard" className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>Dashboard</Link>
      }
      <div className="pt-2 flex items-center gap-2 flex-wrap">
        <Select value={selectedCurrency} onValueChange={(v) => { if (!v) return; dispatch(setSelectedCurrency(v)); dispatch(fetchRates(v)) }}>
          <SelectTrigger className="w-24 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>{SUPPORTED_CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        {isDash || isAuth
          ? <Button variant="ghost" size="sm" onClick={onLogout}>Log Out</Button>
          : <Link href="/sign-in" onClick={onClose}><Button size="sm">Sign In</Button></Link>
        }
      </div>
    </div>
  )
}
