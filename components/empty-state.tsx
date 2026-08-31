'use client'

import { MousePointerClick, Play, ScanSearch } from 'lucide-react'
import { useSatQuery } from '@/components/satquery-provider'
import { Button } from '@/components/ui/button'

export function EmptyState() {
  const { runDemo, phase } = useSatQuery()

  return (
    <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ScanSearch className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">Ask a question to begin</h3>
      <p className="mt-1 max-w-md text-pretty text-sm text-muted-foreground">
        Type a question above or pick a suggestion. SatQuery AI will retrieve the right satellite
        imagery, detect changes, and explain what it found — with evidence you can inspect.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Button onClick={runDemo} disabled={phase === 'running'}>
          <Play />
          Run demo scenario
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MousePointerClick className="size-3.5" />
          or choose a suggestion chip
        </span>
      </div>
    </section>
  )
}
