import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { fetchCryptoPrices } from './portfolioSlice'
import { loginUser } from './authSlice'

// --- types ------------------------------------------------------------------

export type NotificationType = 'info' | 'warning' | 'alert'

export interface NotificationItem {
  id: string
  message: string
  type: NotificationType
  timestamp: string
  spentUSD?: number   // raw USD spent amount — converted to display currency at render time
  budgetUSD?: number  // raw USD budget amount — converted to display currency at render time
}

export interface NotificationsState {
  items: NotificationItem[]
  loading: boolean
  error: string | null
}

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
}

// --- slice ------------------------------------------------------------------

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<NotificationItem, 'id' | 'timestamp'>>) {
      state.items.unshift({
        ...action.payload,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toISOString(),
      })
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
    clearAllNotifications(state) {
      state.items = []
    },
    clearBudgetNotifications(state) {
      state.items = state.items.filter((n) => n.type !== 'warning')
    },
  },
  extraReducers: (builder) => {
    // Cross-slice pattern 1: clear all notifications when a new user logs in.
    builder.addCase(loginUser.fulfilled, (state) => {
      state.items = []
    })
    // Cross-slice pattern 2: alert if any coin's 24h price change > 5%
    builder.addCase(fetchCryptoPrices.fulfilled, (state, action) => {
      for (const asset of Object.values(action.payload)) {
        const change = asset.priceChange24h
        if (Math.abs(change) > 5) {
          const direction = change > 0 ? 'up' : 'down'
          state.items.unshift({
            id: `notif-${Date.now()}-${asset.id}`,
            message: `${asset.name} (${asset.symbol}) moved ${direction} ${Math.abs(change).toFixed(2)}% in 24h`,
            type: 'alert',
            timestamp: new Date().toISOString(),
          })
        }
      }
    })
  },
})

export const { addNotification, removeNotification, clearAllNotifications, clearBudgetNotifications } =
  notificationsSlice.actions

// --- selectors --------------------------------------------------------------

export const selectNotifications     = (state: RootState) => state.notifications.items
export const selectNotificationCount = (state: RootState) => state.notifications.items.length

export default notificationsSlice.reducer
