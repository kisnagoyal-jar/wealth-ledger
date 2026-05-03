import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { withRetry } from '../../utils/retry'

export interface AuthState { user: string | null; loading: boolean; error: string | null }

interface Credentials { email: string; password: string }

async function mockAuthApi(credentials: Credentials): Promise<string> {
  await new Promise((res) => setTimeout(res, 300))
  if (!credentials.email || !credentials.password) throw new Error('Invalid credentials')
  return credentials.email
}

const makeAuthThunk = (name: string) =>
  createAsyncThunk<string, Credentials, { state: RootState; rejectValue: string }>(
    name,
    async (credentials, { rejectWithValue }) => {
      try { return await withRetry(() => mockAuthApi(credentials)) }
      catch (err) { return rejectWithValue(err instanceof Error ? err.message : 'Auth failed') }
    },
  )

export const loginUser  = makeAuthThunk('auth/loginUser')
export const signupUser = makeAuthThunk('auth/signupUser')


const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null } as AuthState,
  reducers: {
    logout(state)     { state.user = null; state.error = null },
    clearError(state) { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(loginUser.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? 'Login failed' })
      .addCase(signupUser.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(signupUser.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? 'Signup failed' })
  },
})

export const { logout, clearError } = authSlice.actions

export const selectUser              = (state: RootState) => state.auth.user
export const selectAuthLoading       = (state: RootState) => state.auth.loading
export const selectAuthError         = (state: RootState) => state.auth.error
export const selectIsAuthenticated   = (state: RootState) => state.auth.user !== null

export default authSlice.reducer
