'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectIsAuthenticated, logout } from '../../store/slices/authSlice'
import { setSelectedCurrency, fetchRates, SUPPORTED_CURRENCIES, selectSelectedCurrency } from '../../store/slices/currencySlice'
import { LogoMark } from '../dashboard/LogoMark'
import { ThemeToggle } from '../dashboard/ThemeToggle'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SECTION_LINKS } from './navConstants'
import { NavMobileMenu } from './NavMobileMenu'

const linkCls = (active: boolean) =>
  `px-3 py-1.5 text-sm rounded-lg transition-colors ${active ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`

export function Navbar() {
  const pathname         = usePathname()
  const router           = useRouter()
  const dispatch         = useAppDispatch()
  const isAuth           = useAppSelector(selectIsAuthenticated)
  const selectedCurrency = useAppSelector(selectSelectedCurrency)
  const [open, setOpen]  = useState(false)

  if (pathname === '/sign-in' || pathname === '/sign-up') return null
  const isDash = pathname.startsWith('/dashboard')
  const handleLogout = () => { dispatch(logout()); router.push('/'); setOpen(false) }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-700/30 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark />
          <span className="font-bold text-lg tracking-tight hidden sm:block">WealthLedger</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 flex-1">
          <Link href="/" className={linkCls(pathname === '/')}>Home</Link>
          {isDash ? SECTION_LINKS.map((s) => <Link key={s.href} href={s.href} className={linkCls(pathname === s.href)}>{s.label}</Link>)
                  : <Link href="/dashboard" className={linkCls(false)}>Dashboard</Link>}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block">
            <Select value={selectedCurrency} onValueChange={(v) => { if (!v) return; dispatch(setSelectedCurrency(v)); dispatch(fetchRates(v)) }}>
              <SelectTrigger className="w-24 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{SUPPORTED_CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <ThemeToggle />
          {isDash || isAuth
            ? <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs" onClick={handleLogout}>{isDash ? 'Log Out' : 'Sign Out'}</Button>
            : <Link href="/sign-in" className="hidden sm:block"><Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white border-0 text-xs">Sign In</Button></Link>}
          <button className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && <NavMobileMenu isDash={isDash} onClose={() => setOpen(false)} onLogout={handleLogout} />}
    </header>
  )
}
