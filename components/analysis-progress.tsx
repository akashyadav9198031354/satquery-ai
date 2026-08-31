'use client'

import { CircleCheckBig, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ANALYSIS_STEPS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function AnalysisProgress() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setActiveStep(0)
    const interval = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, ANALYSIS_STEPS.length - 1))
    }, 380)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="rounded-2xl border border-border bg-card p-6"
      aria-label="Analysis in progress"
      aria-live="polite"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <LoaderCircle className="size-5 animate-spin" />
        </span>
        <div>
          <p className="text-sm font-semibold">Agent working…</p>
          <p className="text-xs text-muted-foreground">
            Orchestrating remote-sensing tools to answer your question
          </p>
        </div>
      </div>

      <ol className="grid gap-2.5">
        {ANALYSIS_STEPS.map((step, i) => {
          const done = i < activeStep
          const active = i === activeStep
          return (
            <li
              key={step.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors',
                active
                  ? 'border-primary/40 bg-primary/5'
                  : done
                    ? 'border-border bg-secondary/40'
                    : 'border-border/60 bg-transparent opacity-60',
              )}
            >
              <span className="flex size-5 shrink-0 items-center justify-center">
                {done ? (
                  <CircleCheckBig className="size-4 text-veg" />
                ) : active ? (
                  <LoaderCircle className="size-4 animate-spin text-primary" />
                ) : (
                  <span className="size-2 rounded-full bg-muted-foreground/40" />
                )}
              </span>
              <span
                className={cn(
                  'text-sm',
                  active ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {done ? 'done' : active ? 'running' : 'queued'}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
