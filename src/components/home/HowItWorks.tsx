import { Card, CardContent } from '../ui/card'

const STEPS = [
  { n: '01', title: 'Sign up',        desc: 'Create a free account in seconds. No credit card, no setup.' },
  { n: '02', title: 'Add holdings',   desc: 'Enter how much crypto you own — live prices do the rest.' },
  { n: '03', title: 'Set budgets',    desc: 'Define monthly limits per category and track spending.' },
  { n: '04', title: 'Watch it grow',  desc: 'Get real-time alerts, currency conversion, and net worth.' },
]

export function HowItWorks() {
  return (
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
  )
}
