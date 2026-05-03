'use client'

interface Props {
  children: React.ReactNode
  accent?: 'blue' | 'teal'
  tagline?: string
}

export function AuthPageShell({ children, accent = 'blue', tagline }: Props) {
  const blob1 = accent === 'teal' ? 'bg-teal-300/20 dark:bg-teal-600/15' : 'bg-blue-300/20 dark:bg-blue-600/15'
  const blob2 = accent === 'teal' ? 'bg-blue-300/20 dark:bg-blue-600/15' : 'bg-teal-300/20 dark:bg-teal-600/15'
  const logoGrad = accent === 'teal' ? 'from-teal-500 to-blue-500' : 'from-blue-500 to-teal-500'
  const tagColor = accent === 'teal' ? 'text-teal-600 dark:text-teal-300' : 'text-blue-600 dark:text-blue-300'

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-white px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full ${blob1} blur-3xl animate-shimmer`} />
        <div className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full ${blob2} blur-3xl animate-shimmer delay-500`} />
      </div>

      <div className="animate-slide-down flex flex-col items-center mb-8 relative z-10">
        <div className={`animate-float mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${logoGrad} flex items-center justify-center shadow-2xl shadow-blue-500/30`}>
          <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9" aria-hidden="true">
            <polyline points="3,22 10,13 16,17 23,8 29,10" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="29" cy="10" r="2" fill="white" />
            <line x1="3" y1="26" x2="29" y2="26" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="animate-fade-in delay-100 text-3xl font-bold tracking-tight">WealthLedger</h1>
        {tagline && <p className={`animate-fade-in delay-200 text-sm mt-1 ${tagColor}`}>{tagline}</p>}
      </div>

      {children}

      <p className="animate-fade-in delay-500 relative z-10 mt-8 text-xs text-slate-400 dark:text-white/20">
        Enter any email and password to continue
      </p>
    </main>
  )
}
