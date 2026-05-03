const STATS = [
  { value: '100%', label: 'Privacy — runs in your browser' },
  { value: '60s',  label: 'Live crypto price refresh'      },
  { value: '7+',   label: 'Supported currencies'           },
  { value: '0',    label: 'Servers storing your data'      },
]

export function StatsBar() {
  return (
    <section className="border-y border-slate-200/60 dark:border-slate-700/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
