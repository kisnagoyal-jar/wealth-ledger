'use client'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setHolding, selectHoldings } from '../../store/slices/portfolioSlice'
import { selectCurrencySymbol, selectRatesLoaded } from '../../store/slices/currencySlice'
import { selectConversionRate, selectPortfolioValueConverted } from '../../store/selectors'
import type { RootState } from '../../store/store'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CARD_CLASS } from './shared'
import { useState } from 'react'
import { useAppSelector as useSel } from '../../store/hooks'

const COIN_ICON: Record<string, string>  = { bitcoin: '₿', ethereum: 'Ξ', solana: '◎' }
const COIN_COLOR: Record<string, string> = { bitcoin: 'text-amber-500', ethereum: 'text-indigo-400', solana: 'text-purple-400' }

interface RowProps { coinId: string; symbol: string; name: string; draft: string; convRate: number; currencySymbol: string; ratesLoaded: boolean; onDraftChange: (v: string) => void; onCommit: () => void }

function HoldingRow({ coinId, symbol, name, draft, convRate, currencySymbol, ratesLoaded, onDraftChange, onCommit }: RowProps) {
  const asset = useSel((s: RootState) => s.portfolio.assets[coinId])
  const price = asset?.currentPrice ?? 0
  const qty   = parseFloat(draft) || 0
  const value = qty * price * convRate
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/30">
      <div className={`text-2xl font-bold w-8 text-center shrink-0 ${COIN_COLOR[coinId] ?? 'text-foreground'}`}>{COIN_ICON[coinId] ?? '?'}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">
          {ratesLoaded && price > 0 ? `${currencySymbol}${(price * convRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} / coin` : 'Loading price…'}
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <div className="flex items-center gap-1.5">
          <input type="number" min={0} step="any" placeholder="0" value={draft}
            onChange={(e) => onDraftChange(e.target.value)} onBlur={onCommit}
            className="w-24 text-right bg-background border border-input rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <span className="text-xs text-muted-foreground w-8">{symbol}</span>
        </div>
        {ratesLoaded && qty > 0 && <div className="text-xs text-muted-foreground">≈ {currencySymbol}{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>}
      </div>
    </div>
  )
}

export function HoldingsEditor() {
  const dispatch       = useAppDispatch()
  const holdings       = useAppSelector(selectHoldings)
  const currencySymbol = useAppSelector(selectCurrencySymbol)
  const ratesLoaded    = useAppSelector(selectRatesLoaded)
  const convRate       = useAppSelector(selectConversionRate)
  const totalValue     = useAppSelector(selectPortfolioValueConverted)
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(holdings.map((h) => [h.coinId, h.quantity > 0 ? String(h.quantity) : '']))
  )
  const commit = (coinId: string) => { const n = parseFloat(drafts[coinId] ?? ''); if (!isNaN(n) && n >= 0) dispatch(setHolding({ coinId, quantity: n })) }
  return (
    <Card className={CARD_CLASS}>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle>Crypto Holdings</CardTitle>
          <span className="text-xs text-muted-foreground">Total: <span className="font-semibold text-foreground">{ratesLoaded ? `${currencySymbol}${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '—'}</span></span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {holdings.map((h) => (
          <HoldingRow key={h.coinId} coinId={h.coinId} symbol={h.symbol} name={h.name} draft={drafts[h.coinId] ?? ''} convRate={convRate} currencySymbol={currencySymbol} ratesLoaded={ratesLoaded}
            onDraftChange={(v) => setDrafts((d) => ({ ...d, [h.coinId]: v }))} onCommit={() => commit(h.coinId)} />
        ))}
        <p className="text-xs text-muted-foreground pt-1">Enter how many coins you own. Values update live with market prices.</p>
      </CardContent>
    </Card>
  )
}
