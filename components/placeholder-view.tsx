'use client'

import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { useSatQuery } from '@/components/satquery-provider'
import { Button } from '@/components/ui/button'

export function PlaceholderView({
  icon: Icon,
  title,
  description,
  points,
}: {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
}) {
  const { setView } = useSatQuery()
  return (
    <section className="rounded-2xl border border-border bg-card p-8">
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <h2 className="mt-4 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 max-w-xl text-pretty text-sm text-muted-foreground">{description}</p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {p}
          </li>
        ))}
      </ul>

      <Button variant="outline" size="sm" className="mt-6" onClick={() => setView('dashboard')}>
        <ArrowLeft />
        Back to workspace
      </Button>
    </section>
  )
}
