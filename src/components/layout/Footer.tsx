'use client'
// Footer — shown only on the marketing/home page (not dashboard or auth pages).

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogoMark } from '../dashboard/LogoMark'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/sign-in',   label: 'Sign In'   },
  { href: '/sign-up',   label: 'Sign Up'   },
]

export function Footer() {
  const pathname = usePathname()

  // Only show on the landing page
  if (pathname !== '/') return null

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <div>
              <p className="font-bold text-base leading-tight">WealthLedger</p>
              <p className="text-xs text-muted-foreground leading-tight">Personal Finance Dashboard</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-700/30 text-center text-xs text-muted-foreground">
          © 2026 WealthLedger — Built with Next.js, Redux Toolkit &amp; Tailwind CSS
        </div>
      </div>
    </footer>
  )
}
