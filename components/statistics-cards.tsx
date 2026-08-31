'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import type { ChangeStat } from '@/lib/types'
import { cn } from '@/lib/utils'

const KIND_STYLES: Record<ChangeStat['kind'], { dot: string; bar: string; label: string }> = {
  veg: { dot: 'bg-veg', bar: 'bg-veg', label: 'Vegetation' },
  water: { dot: 'bg-water', bar: 'bg-water', label: 'Water' },
  builtup: { dot: 'bg-builtup', bar: 'bg-builtup', label: 'Built-up' },
  change: { dot: 'bg-change', bar: 'bg-change', label: 'Change' },
}

export function StatisticsCards({ stats }: { stats: ChangeStat[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const style = KIND_STYLES[stat.kind]
        const positive = stat.value >= 0
        const magnitude = Math.min(100, Math.abs(stat.value) * 3)
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className={cn('size-2 rounded-full', style.dot)} />
                {stat.label}
              </span>
              {positive ? (
                <TrendingUp className="size-4 text-builtup" />
              ) : (
                <TrendingDown className="size-4 text-change" />
              )}
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-tight">
              {positive ? '+' : ''}
              {stat.value.toFixed(1)}%
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full', style.bar)}
                style={{ width: `${magnitude}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
