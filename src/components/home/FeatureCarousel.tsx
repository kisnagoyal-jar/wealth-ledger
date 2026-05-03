'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'

const FEATURES = [
  { title: 'Smart Transaction Tracking', desc: 'Log income and expenses instantly. Filter by category, date, or amount with powerful search.', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { title: 'Budget Management', desc: 'Set category budgets and get real-time alerts the moment you approach your spending limits.', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { title: 'Multi-Currency Support', desc: 'View all your finances in 10+ currencies. Live exchange rates updated every 60 seconds.', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-900/20',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg> },
  { title: 'Crypto Portfolio', desc: 'Track Bitcoin, Ethereum, and Solana holdings with live prices and 24-hour performance.', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-900/20',
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
]

export function FeatureCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % FEATURES.length), 4000)
    return () => clearInterval(t)
  }, [])
  const f = FEATURES[active]
  return (
    <div className="space-y-6">
      <Card className="border-slate-200/60 dark:border-slate-700/30 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className={`${f.bg} flex items-center justify-center p-12`}>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg text-white`}>{f.icon}</div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {FEATURES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Feature ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {FEATURES.map((feat, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${i === active ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              {feat.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
