import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import transactionsReducer from './slices/transactionsSlice'
import portfolioReducer from './slices/portfolioSlice'
import notificationsReducer from './slices/notificationsSlice'
import currencyReducer from './slices/currencySlice'
import { listenerMiddleware } from './listeners'
import { localStorageMiddleware, loadPersistedState } from './middleware/localStorage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    portfolio: portfolioReducer,
    notifications: notificationsReducer,
    currency: currencyReducer,
  },
  // Rehydrate persisted slices on startup — slices' initialState fills in any missing keys
  preloadedState: loadPersistedState() as Parameters<typeof configureStore>[0]['preloadedState'],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
