# WealthLedger — Claude Implementation Guide

You are an expert Next.js and Redux Toolkit developer.

We are building **WealthLedger**, a frontend-only personal finance dashboard focused on **Redux architecture, not UI complexity**.

You must strictly follow all constraints.

---

# 🎯 Objective

Build a scalable frontend app using:

* Next.js (App Router)
* TypeScript (strict)
* Tailwind CSS
* Redux Toolkit

Focus on:

* clean architecture
* state management
* async flows
* cross-slice communication

---

# 🚫 1. Absolute Constraints (NON-NEGOTIABLE)

## ❌ No API calls in components

* `fetch` and `axios` are strictly banned in `.tsx`
* All async logic must be inside `createAsyncThunk`

---

## ❌ No business logic in components

Components may ONLY:

* dispatch actions
* read state via selectors

Components must NOT:

* filter data
* calculate values
* transform data

---

## 🧱 Smart vs Dumb Components

### Dumb Components:

* layout only
* no Redux
* receive props only

### Smart Components:

* use `useAppSelector`
* dispatch actions
* no layout responsibility

---

## 🎨 Styling Rules

* Tailwind CSS ONLY
* No inline styles
* No style objects
* Support Dark Mode using:

  * `next-themes`
  * Tailwind `dark:` classes

---

# 🧠 2. Redux Architecture (MANDATORY)

## 🔁 Data Flow

Component → dispatch(thunk/action)
→ thunk executes async logic
→ slice reducers update state
→ selectors compute derived data
→ component reads via selector

---

## 🧩 Required Slices

Create EXACTLY these slices:

1. authSlice
2. transactionsSlice
3. portfolioSlice
4. currencySlice
5. notificationsSlice

Each slice must include:

* loading
* error
* typed state

---

## 🧾 TypeScript Rules (STRICT)

* NO `any`
* Define interfaces for every slice

Example:

```ts
interface AuthState {
  user: string | null
  loading: boolean
  error: string | null
}
```

* Typed thunks
* Typed selectors
* Use `RootState` everywhere

---

## 🪝 Typed Hooks (REQUIRED)

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

Use these ONLY.

---

# 🔄 3. Thunks (Async Layer)

All API calls must be implemented using `createAsyncThunk`.

Required thunks:

* fetchTransactions
* fetchCryptoPrices
* fetchRates
* loginUser

Each thunk must:

* handle loading
* handle error
* return typed data

---

# 🔥 4. Cross-Slice Architecture (CRITICAL)

Every thunk must update at least **2 slices** using `extraReducers`.

### REQUIRED PATTERNS:

---

### 1. loginUser.fulfilled

authSlice:

* set user

Also trigger:

* fetchTransactions
* fetchCryptoPrices

---

### 2. fetchCryptoPrices.fulfilled

portfolioSlice:

* update portfolio value

notificationsSlice:

* trigger alert if price change > 5%

---

### 3. fetchRates.fulfilled

currencySlice:

* store exchange rates

portfolioSlice:

* convert total value

---

Minimum:

* 3 cross-slice patterns REQUIRED

---

# 🧮 5. Selectors (VERY IMPORTANT)

Use `createSelector` for ALL derived data.

Minimum required selectors:

* selectFilteredTransactions
* selectNetWorth
* selectCategoryBreakdown
* selectPortfolioValue
* selectPercentageChange

---

## 🚫 Rules

* NO calculations in components
* NO filtering in components
* NO derived state in slices

---

# 💳 6. Transactions Rules (STRICT)

* Store ONLY raw transactions
* NEVER store filtered data
* NEVER duplicate derived state

Filtering must be done ONLY via selectors.

---

# 🌐 7. Data Sources

## Transactions

* Use static JSON or Mockaroo
* Must be deterministic

---

## Crypto Prices

Use CoinGecko

* No API key required
* Fetch BTC, ETH, SOL
* Include 24h change

---

## Currency Rates

Use ExchangeRate API

---

## ⚠️ Resilience (REQUIRED)

Because we are using free public APIs:

ALL thunks must implement:

* retry mechanism
* exponential backoff strategy

Example behavior:

* Retry 3 times
* Delay increases (e.g., 500ms → 1000ms → 2000ms)
* Only fail after retries exhausted

---

# ⚙️ 8. Middleware

## LocalStorage Middleware

Persist:

* selected currency

---

## listenerMiddleware (MANDATORY)

Use Redux Toolkit `createListenerMiddleware`:

Trigger:

* budget threshold exceeded

Effect:

* dispatch notification

---

# 🔁 9. Polling (REQUIRED)

Implement polling using a custom hook:

```ts
const dispatch = useAppDispatch()

useEffect(() => {
  const interval = setInterval(() => {
    dispatch(fetchCryptoPrices())
    dispatch(fetchRates())
  }, 60000)

  return () => clearInterval(interval)
}, [dispatch])
```

---

# 🧱 10. Project Structure

```
/app
/store
  store.ts
  hooks.ts
  /slices
    authSlice.ts
    transactionsSlice.ts
    portfolioSlice.ts
    currencySlice.ts
    notificationsSlice.ts
/components
/hooks
/utils
/providers
  StoreProvider.tsx
```

---

## 🧩 Redux Provider Setup (IMPORTANT)

Since Next.js App Router uses Server Components:

You MUST:

* create a client component `StoreProvider`
* wrap Redux Provider inside it

Example:

```tsx
"use client"

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
```

Then use it in `layout.tsx`.

---

# 🧪 11. Implementation Order

Follow STRICTLY:

### Step 1

* Setup project
* Redux store
* authSlice

### Step 2

* transactionsSlice
* selectors for filtering

### Step 3

* crypto API
* portfolioSlice
* cross-slice logic

### Step 4

* currencySlice
* conversion logic

### Step 5

* dashboard page (selectors only)

### Step 6

* notifications
* listenerMiddleware

---

# 🧨 12. Anti-Patterns (STRICTLY FORBIDDEN)

* API calls in components
* useEffect for business logic
* storing derived state
* using `any`
* mixing layout and state logic
* filtering inside JSX

---

# 🧠 13. Development Instructions for Claude

* Generate code incrementally (one feature at a time)
* Explain every file
* Ensure project compiles after each step
* Do NOT generate full project at once
* Prioritize architecture over UI

---

# ✅ 14. Success Criteria

* Clean Redux architecture
* 3+ cross-slice patterns
* 5+ selectors using createSelector
* No logic in components
* Fully typed TypeScript
* Middleware + listenerMiddleware used correctly
* Retry strategy implemented in all thunks

---

END OF FILE
