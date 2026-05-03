'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { signupUser, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../../store/slices/authSlice'
import { AuthPageShell } from '../../../components/auth/AuthPageShell'
import { AuthFormField } from '../../../components/auth/AuthFormField'
import { SpinnerButton } from '../../../components/auth/SpinnerButton'

export default function SignUpPage() {
  const dispatch = useAppDispatch()
  const router   = useRouter()
  const loading  = useAppSelector(selectAuthLoading)
  const error    = useAppSelector(selectAuthError)
  const isAuth   = useAppSelector(selectIsAuthenticated)

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => { if (isAuth) router.push('/dashboard') }, [isAuth, router])

  return (
    <AuthPageShell accent="teal" tagline="Start tracking your finances today">
      <form
        onSubmit={(e) => { e.preventDefault(); dispatch(signupUser({ email, password })) }}
        className="animate-slide-up delay-200 relative z-10 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Create your account</h2>
        {error && <p className="mb-4 text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg px-4 py-2">{error}</p>}
        <div className="space-y-4 mb-6">
          <AuthFormField label="Full Name" type="text"     placeholder="Your Name"      value={name}     onChange={setName}     disabled={loading} required />
          <AuthFormField label="Email"     type="email"    placeholder="you@example.com" value={email}    onChange={setEmail}    disabled={loading} required />
          <AuthFormField label="Password"  type="password" placeholder="••••••••"        value={password} onChange={setPassword} disabled={loading} required />
        </div>
        <SpinnerButton loading={loading} label="Create Account" loadingLabel="Creating account…"
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-teal-500/30 transition-all duration-200 active:scale-95" />
        <p className="text-sm text-slate-500 dark:text-white/40 mt-5 text-center">
          Already have an account?{' '}<a href="/sign-in" className="text-blue-600 dark:text-blue-400 hover:underline">Sign in</a>
        </p>
      </form>
    </AuthPageShell>
  )
}
