'use client'

import { CircleCheckBig, LoaderCircle, TriangleAlert } from 'lucide-react'
import useSWR from 'swr'
import { useSatQuery } from '@/components/satquery-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getHistory } from '@/lib/api'
import type { AnalysisStatus, HistoryEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

const STATUS: Record<
  AnalysisStatus,
  { label: string; icon: typeof CircleCheckBig; className: string }
> = {
  completed: { label: 'Completed', icon: CircleCheckBig, className: 'text-veg' },
  processing: { label: 'Processing', icon: LoaderCircle, className: 'text-primary' },
  failed: { label: 'Failed', icon: TriangleAlert, className: 'text-change' },
}

export function HistoryTable({ compact = false }: { compact?: boolean }) {
  const { data, isLoading } = useSWR<HistoryEntry[]>('history', getHistory)
  const { runAnalysis } = useSatQuery()

  const rows = compact ? data?.slice(0, 4) : data

  return (
    <section className="rounded-2xl border border-border bg-card" aria-label="Analysis history">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold">Recent analyses</h3>
          <p className="text-xs text-muted-foreground">
            Re-run or review your previous questions
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" />
          Loading history…
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {rows?.map((entry) => {
            const status = STATUS[entry.status]
            return (
              <li
                key={entry.id}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-secondary/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{entry.question}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{entry.location}</span>
                    <span aria-hidden>·</span>
                    <span className="font-mono">{entry.date}</span>
                  </p>
                </div>

                <Badge variant="outline" className="hidden sm:inline-flex">
                  {entry.analysisType}
                </Badge>

                <span
                  className={cn(
                    'flex w-24 items-center gap-1.5 text-xs font-medium',
                    status.className,
                  )}
                >
                  <status.icon
                    className={cn('size-3.5', entry.status === 'processing' && 'animate-spin')}
                  />
                  {status.label}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={entry.status !== 'completed'}
                  onClick={() => runAnalysis(entry.question)}
                >
                  Re-run
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
