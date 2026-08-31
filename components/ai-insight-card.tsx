'use client'

import { Sparkles } from 'lucide-react'
import type { AiInsight } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

export function AiInsightCard({ insight }: { insight: AiInsight }) {
  return (
    <section
      className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/8 to-card p-5"
      aria-label="AI explanation"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <div className="flex flex-1 items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">AI Explanation</h3>
          <Badge variant="outline" className="border-primary/40 text-primary">
            {insight.confidence}% confidence
          </Badge>
        </div>
      </div>

      <p className="text-pretty text-sm leading-relaxed text-foreground/90">{insight.summary}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Detected change
          </p>
          <p className="mt-1 text-sm font-semibold text-change">{insight.detectedChange}</p>
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Affected area
          </p>
          <p className="mt-1 font-mono text-sm font-semibold">
            {insight.affectedAreaKm2.toFixed(1)} km²
          </p>
        </div>
      </div>
    </section>
  )
}
