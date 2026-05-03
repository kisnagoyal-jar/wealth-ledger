import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { FeatureCarousel } from '../components/home/FeatureCarousel'
import { MockDashboard } from '../components/home/MockDashboard'

const STATS = [
  { value: '10+',  label: 'Currencies supported' },
  { value: '3',    label: 'Live crypto assets'    },
  { value: '60s',  label: 'Refresh cycle'         },
  { value: '100%', label: 'Client-side & private' },
]

const STEPS = [
  { n: '01', title: 'Create an account',     desc: 'Sign up in seconds — no credit card, no setup fee.' },
  { n: '02', title: 'Log your transactions', desc: 'Add income and expenses with category tagging and date.' },
  { n: '03', title: 'Set category budgets', desc: 'Define spending limits per category. Get alerted the moment you go over.' },
  { n: '04', title: 'Watch wealth grow',     desc: 'Real-time charts and alerts keep you on track daily.' },
]

export default function HomePage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">

      <section className="relative overflow-hidden px-4 sm:px-6 pt-16 pb-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-400/10 dark:bg-teal-600/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-7 animate-slide-down">
            <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-0 px-3 py-1 text-xs">Personal Finance Dashboard</Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Take control of your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">financial future</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">WealthLedger tracks your spending, manages budgets, and monitors your crypto portfolio — all in one beautiful, real-time dashboard.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up"><Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white border-0 shadow-lg shadow-blue-500/25 px-6">Get Started — it&apos;s free</Button></Link>
              <Link href="/dashboard"><Button size="lg" variant="outline" className="px-6">View Demo Dashboard</Button></Link>
            </div>
            <p className="text-xs text-muted-foreground">No credit card required · Runs entirely in your browser</p>
          </div>
          <div className="animate-slide-up delay-200 lg:pl-8"><MockDashboard /></div>
        </div>
      </section>

      <section className="border-y border-slate-200/60 dark:border-slate-700/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg">Built for people who take their finances seriously.</p>
          </div>
          <FeatureCarousel />
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 bg-slate-50/80 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Up and running in minutes</h2>
            <p className="text-muted-foreground text-lg">No spreadsheets. No manual imports. Just open and track.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <Card key={step.n} className="border-slate-200/60 dark:border-slate-700/30 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-4xl font-black text-slate-200 dark:text-slate-700 mb-3 leading-none">{step.n}</p>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to take control?</h2>
          <p className="text-muted-foreground text-lg">Start tracking your finances today — no setup required, no data leaves your browser.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sign-up"><Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white border-0 shadow-lg shadow-blue-500/20 px-8">Create Free Account</Button></Link>
            <Link href="/sign-in"><Button size="lg" variant="outline" className="px-8">Sign In</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
