'use client'
/**
 * SummaryCard — a single metric tile used in the SummaryCards grid.
 *
 * Dumb component: receives a title string and a value React node.
 * The value can be a formatted string or a "Loading…" spinner element.
 */

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CARD_CLASS } from './shared'

interface Props {
  title: string
  value: React.ReactNode
}

export function SummaryCard({ title, value }: Props) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
