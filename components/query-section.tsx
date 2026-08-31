'use client'

import {
  Building2,
  Globe,
  Mic,
  Satellite,
  Send,
  Trees,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import { useRef } from 'react'
import { useSatQuery } from '@/components/satquery-provider'
import { Button } from '@/components/ui/button'
import { SUGGESTION_CHIPS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = {
  trees: Trees,
  waves: Waves,
  'building-2': Building2,
  globe: Globe,
  satellite: Satellite,
}

export function QuerySection() {
  const { query, setQuery, runAnalysis, phase, location } = useSatQuery()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const running = phase === 'running'

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      runAnalysis()
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-label="Ask a question">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-pretty text-xl font-semibold tracking-tight sm:text-2xl">
          What do you want to know about{' '}
          <span className="text-primary">{location.name}</span>?
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask in plain language. SatQuery AI selects the right imagery and analysis, then explains
          what changed with visual evidence.
        </p>
      </div>

      <div
        className={cn(
          'group rounded-xl border border-input bg-background p-2 transition-colors focus-within:border-ring',
        )}
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={running}
          placeholder="e.g. Where has vegetation decreased between 2024 and 2026?"
          className="w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
        />
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {location.coordinates.lat.toFixed(3)}, {location.coordinates.lng.toFixed(3)}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              aria-label="Voice input"
              disabled={running}
            >
              <Mic />
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => runAnalysis()}
              disabled={running}
            >
              <Send />
              {running ? 'Analyzing…' : 'Analyze'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTION_CHIPS.map((chip) => {
          const Icon = ICONS[chip.icon] ?? Globe
          return (
            <button
              key={chip.id}
              type="button"
              disabled={running}
              onClick={() => runAnalysis(chip.query)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-secondary disabled:opacity-50"
            >
              <Icon className="size-3.5 text-primary" />
              {chip.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
