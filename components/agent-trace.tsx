'use client'

import { ChevronDown, Cpu, Database, Layers, Radar } from 'lucide-react'
import { useState } from 'react'
import type { AnalysisResult } from '@/lib/types'
import { cn } from '@/lib/utils'

export function AgentTrace({ result }: { result: AnalysisResult }) {
  const [open, setOpen] = useState(false)

  const tools = [
    {
      icon: Cpu,
      name: 'query_understanding',
      detail: `Parsed intent → “${result.analysisType}” over ${result.location.name}`,
    },
    {
      icon: Database,
      name: 'imagery_retrieval',
      detail: `Loaded Sentinel-2 scenes for ${result.before.year} and ${result.after.year}`,
    },
    {
      icon: Layers,
      name: 'spectral_index',
      detail: 'Computed NDVI, NDWI and built-up index for both scenes',
    },
    {
      icon: Radar,
      name: 'change_detection',
      detail: `Differenced layers → ${result.insight.affectedAreaKm2.toFixed(1)} km² affected`,
    },
  ]

  return (
    <section className="rounded-2xl border border-border bg-card" aria-label="Agent tool trace">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <Radar className="size-4 text-primary" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">How the agent reached this answer</p>
          <p className="text-xs text-muted-foreground">
            {tools.length} tools · full reasoning trace
          </p>
        </div>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ol className="border-t border-border px-5 py-4">
          {tools.map((tool, i) => (
            <li key={tool.name} className="relative flex gap-3 pb-4 last:pb-0">
              {i < tools.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border" />
              )}
              <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <tool.icon className="size-4" />
              </span>
              <div className="pt-1">
                <p className="font-mono text-xs font-medium text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
