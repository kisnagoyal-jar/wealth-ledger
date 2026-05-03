'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

const MOCK_TRANSACTIONS = [
  { label: 'Salary deposit',   amount: '+$4,200', color: 'text-emerald-500' },
  { label: 'Rent payment',     amount: '-$1,200', color: 'text-red-500'     },
  { label: 'Grocery run',      amount: '-$89',    color: 'text-red-500'     },
  { label: 'Freelance work',   amount: '+$650',   color: 'text-emerald-500' },
]

function Sparkline() {
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10 text-blue-500" fill="none" stroke="currentColor">
      <polyline
        points="0,35 20,28 40,30 60,18 80,20 100,10 120,6"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline
        points="0,35 20,28 40,30 60,18 80,20 100,10 120,6 120,40 0,40"
        fill="currentColor" opacity="0.08" stroke="none"
      />
    </svg>
  )
}

export function MockDashboard() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => (n + 1) % MOCK_TRANSACTIONS.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      {/* Glow behind the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-400/20 blur-3xl rounded-3xl" />

      <Card className="relative border-slate-200/60 dark:border-slate-700/30 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Worth</span>
            <Badge className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs border-0">↑ 12.4%</Badge>
          </div>

          <div>
            <p className="text-3xl font-bold tracking-tight">$24,580</p>
            <Sparkline />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Portfolio', value: '$12,450', sub: 'BTC · ETH · SOL' },
              { label: 'This month', value: '$1,840', sub: 'monthly spending' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
                <p className="font-semibold text-sm">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-700/30 pt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Latest transaction</p>
            <div key={tick} className="flex items-center justify-between animate-fade-in">
              <span className="text-sm text-foreground">{MOCK_TRANSACTIONS[tick].label}</span>
              <span className={`text-sm font-semibold ${MOCK_TRANSACTIONS[tick].color}`}>
                {MOCK_TRANSACTIONS[tick].amount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="absolute -bottom-3 -right-3 bg-amber-50 dark:bg-amber-900/60 border border-amber-200 dark:border-amber-700/60 rounded-xl px-3 py-1.5 shadow-lg text-xs text-amber-800 dark:text-amber-200 animate-float">
        ⚠️ Budget alert: Food 94%
      </div>
    </div>
  )
}
