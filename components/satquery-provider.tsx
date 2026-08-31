'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { analyze } from '@/lib/api'
import { DEFAULT_LOCATION, DEMO_RESULT } from '@/lib/mock-data'
import type { AnalysisResult, Location } from '@/lib/types'

export type AnalysisPhase = 'idle' | 'running' | 'complete' | 'error'
export type View =
  | 'dashboard'
  | 'satellite'
  | 'map'
  | 'history'
  | 'reports'
  | 'settings'

interface SatQueryState {
  view: View
  setView: (v: View) => void

  query: string
  setQuery: (q: string) => void

  location: Location
  setLocation: (l: Location) => void

  phase: AnalysisPhase
  result: AnalysisResult | null

  runAnalysis: (question?: string) => Promise<void>
  runDemo: () => Promise<void>
  reset: () => void
}

const SatQueryContext = createContext<SatQueryState | null>(null)

export function useSatQuery() {
  const ctx = useContext(SatQueryContext)
  if (!ctx) throw new Error('useSatQuery must be used within SatQueryProvider')
  return ctx
}

export function SatQueryProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>('dashboard')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)
  const [phase, setPhase] = useState<AnalysisPhase>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const runAnalysis = useCallback(
    async (question?: string) => {
      const q = (question ?? query).trim()
      if (!q) {
        toast.error('Please enter a question first', {
          description: 'Try: “What changed in this area between 2024 and 2026?”',
        })
        return
      }
      setQuery(q)
      setPhase('running')
      setResult(null)
      setView('dashboard')
      try {
        const res = await analyze({ question: q, location })
        setResult(res)
        setPhase('complete')
        toast.success('Analysis complete', {
          description: `${res.insight.detectedChange} detected in ${location.name}.`,
        })
      } catch (err) {
        console.log('[v0] analysis error:', err)
        setPhase('error')
        toast.error('Analysis failed', {
          description: 'We couldn’t complete the analysis right now. Please try again.',
        })
      }
    },
    [query, location],
  )

  const runDemo = useCallback(async () => {
    setLocation(DEMO_RESULT.location)
    setQuery(DEMO_RESULT.question)
    setPhase('running')
    setResult(null)
    setView('dashboard')
    toast('Demo Mode', { description: 'Loading a sample Lucknow scenario…' })
    await new Promise((r) => setTimeout(r, 2600))
    setResult(DEMO_RESULT)
    setPhase('complete')
  }, [])

  const reset = useCallback(() => {
    setPhase('idle')
    setResult(null)
    setQuery('')
  }, [])

  const value = useMemo<SatQueryState>(
    () => ({
      view,
      setView,
      query,
      setQuery,
      location,
      setLocation,
      phase,
      result,
      runAnalysis,
      runDemo,
      reset,
    }),
    [view, query, location, phase, result, runAnalysis, runDemo, reset],
  )

  return <SatQueryContext.Provider value={value}>{children}</SatQueryContext.Provider>
}
