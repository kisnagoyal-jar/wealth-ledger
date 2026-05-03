import type { Middleware } from '@reduxjs/toolkit'

// Scoped interface — avoids importing RootState (circular reference)
interface PersistableState {
  auth: { user: string | null }
  transactions: {
    items: unknown
    budgets: unknown
    filter: unknown
    budgetPeriod: unknown
  }
  currency: { selectedCurrency: string }
  portfolio: { holdings: unknown }
}

const STORAGE_KEY = 'wealthledger_state'

// Saves the slices that should survive a page reload.
// Skips items that change every load (loading, error, clockDate, portfolio, notifications).
function saveState(state: PersistableState) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      auth: { user: state.auth.user },
      transactions: {
        items:        state.transactions.items,
        budgets:      state.transactions.budgets,
        filter:       state.transactions.filter,
        budgetPeriod: state.transactions.budgetPeriod,
      },
      currency: { selectedCurrency: state.currency.selectedCurrency },
      portfolio: { holdings: state.portfolio.holdings },
    }))
  } catch {
    // localStorage full — silently skip
  }
}

// Saves state after every dispatched action.
export const localStorageMiddleware: Middleware<object, PersistableState> =
  (store) => (next) => (action) => {
    const result = next(action)
    saveState(store.getState())
    return result
  }

// Called once at store creation to rehydrate from localStorage.
export function loadPersistedState(): object {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>
      // Ensure currency.rates exists — it's not persisted (expires) but must be present
      // so the slice doesn't start with an undefined rates field when preloadedState is used.
      if (parsed.currency && typeof parsed.currency === 'object') {
        parsed.currency = { rates: {}, ...(parsed.currency as object) }
      }
      // clockDate is never persisted (it's ticked by polling), but it must exist so
      // selectors that call .split() on it don't crash before the first tickClock fires.
      if (parsed.transactions && typeof parsed.transactions === 'object') {
        parsed.transactions = {
          clockDate: new Date().toISOString().split('T')[0],
          ...(parsed.transactions as object),
        }
      }
      // assets are never persisted (live prices), but the field must exist so
      // holdings.reduce(() => assets[coinId]) doesn't crash on an undefined object.
      if (parsed.portfolio && typeof parsed.portfolio === 'object') {
        const p = parsed.portfolio as Record<string, unknown>
        const holdings = p.holdings as Array<{ quantity: number }> | undefined
        if (!holdings || holdings.every((h) => h.quantity === 0)) {
          delete parsed.portfolio
        } else {
          parsed.portfolio = { assets: {}, totalValueConverted: 0, loading: false, error: null, ...p }
        }
      }
      return parsed
    }

    // Migrate: support old single-key format from previous sessions
    const oldCurrency = localStorage.getItem('selectedCurrency')
    if (oldCurrency) return { currency: { rates: {}, selectedCurrency: oldCurrency } }

    return {}
  } catch {
    return {}
  }
}
