'use client'

import { NotificationBanner } from '../../components/dashboard/NotificationBanner'
import { SummaryCards }       from '../../components/dashboard/SummaryCards'
import { CategoryBreakdown }  from '../../components/dashboard/CategoryBreakdown'
import { HoldingsEditor }     from '../../components/dashboard/HoldingsEditor'

export default function DashboardPage() {
  return (
    <>
      <NotificationBanner />
      <SummaryCards />
      <HoldingsEditor />
      <CategoryBreakdown />
    </>
  )
}
