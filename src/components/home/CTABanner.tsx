import Link from 'next/link'
import { Button } from '../ui/button'

export function CTABanner() {
  return (
    <section className="px-4 sm:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to take control?</h2>
        <p className="text-muted-foreground text-lg">
          Start tracking your finances today — no setup required, no data leaves your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/sign-up">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white border-0 shadow-lg shadow-blue-500/20 px-8">
              Create Free Account
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="px-8">Sign In</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
