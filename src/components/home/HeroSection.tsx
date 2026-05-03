import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { MockDashboard } from '../../components/home/MockDashboard'

export function HeroSection() {
  return (
    <section className="px-4 sm:px-6 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-700/40 text-xs font-medium text-blue-700 dark:text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Live crypto prices · Multi-currency · Real-time
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Take control of{' '}
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              your money
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Track spending, set budgets, and monitor your crypto portfolio — all in one beautiful dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white border-0 shadow-lg shadow-blue-500/25 px-6">
                Get Started — it&apos;s free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-6">View Demo Dashboard</Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">No credit card required · Runs entirely in your browser</p>
        </div>
        <div className="animate-slide-up delay-200 lg:pl-8"><MockDashboard /></div>
      </div>
    </section>
  )
}
