'use client'

import { MapPin } from 'lucide-react'
import { AgentTrace } from '@/components/agent-trace'
import { AiInsightCard } from '@/components/ai-insight-card'
import { ImageComparison } from '@/components/image-comparison'
import { ReportCard } from '@/components/report-card'
import { StatisticsCards } from '@/components/statistics-cards'
import { Badge } from '@/components/ui/badge'
import type { AnalysisResult } from '@/lib/types'
import { cn } from '@/lib/utils'

const LEGEND = [
  { label: 'Vegetation', dot: 'bg-veg' },
  { label: 'Water', dot: 'bg-water' },
  { label: 'Built-up', dot: 'bg-builtup' },
  { label: 'Change', dot: 'bg-change' },
]

export function ResultsPanel({ result }: { result: AnalysisResult }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Imagery column */}
      <div className="flex flex-col gap-4 lg:col-span-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm font-medium">{result.location.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {result.location.coordinates.lat.toFixed(4)},{' '}
                {result.location.coordinates.lng.toFixed(4)}
              </span>
            </div>
            <Badge variant="secondary">{result.analysisType}</Badge>
          </div>

          <ImageComparison before={result.before} after={result.after} />

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Legend
            </span>
            {LEGEND.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs">
                <span className={cn('size-2.5 rounded-sm', item.dot)} />
                {item.label}
              </span>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">
              Drag the divider to compare
            </span>
          </div>
        </div>

        <StatisticsCards stats={result.stats} />
      </div>

      {/* Insight column */}
      <div className="flex flex-col gap-4 lg:col-span-2">
        <AiInsightCard insight={result.insight} />
        <AgentTrace result={result} />
        <ReportCard result={result} />
      </div>
    </div>
  )
}
