// SatQuery AI service layer.
//
// This module is the single integration boundary between the UI and the
// backend. Today every function returns mock data (see lib/mock-data.ts),
// but each maps 1:1 to a planned API route. To go live, replace the mock
// bodies with `fetch(...)` calls to the endpoints noted above each function
// and keep the same return types (see lib/types.ts).

import { DEMO_RESULT, HISTORY, SAVED_LOCATIONS } from './mock-data'
import type { AnalysisResult, HistoryEntry, Location } from './types'

const USE_MOCK = true

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export interface AnalyzeParams {
  question: string
  location: Location
}

/**
 * POST /api/analyze
 * Runs the full agentic pipeline: query understanding -> remote-sensing
 * analysis -> change detection -> evidence -> explanation.
 */
export async function analyze({ question, location }: AnalyzeParams): Promise<AnalysisResult> {
  if (USE_MOCK) {
    return delay(
      {
        ...DEMO_RESULT,
        id: `analysis-${Date.now()}`,
        question,
        location,
        createdAt: new Date().toISOString(),
      },
      2400,
    )
  }
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, location }),
  })
  if (!res.ok) throw new Error('Analysis request failed')
  return res.json()
}

/**
 * POST /api/query
 * Lightweight natural-language query understanding (intent + entities).
 */
export async function interpretQuery(question: string): Promise<{ intent: string }> {
  if (USE_MOCK) return delay({ intent: 'change-detection' }, 300)
  const res = await fetch('/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })
  if (!res.ok) throw new Error('Query request failed')
  return res.json()
}

/**
 * GET /api/satellite?locationId=...
 * Resolves available imagery scenes for a location.
 */
export async function getSatelliteScenes(locationId: string): Promise<AnalysisResult['before'][]> {
  if (USE_MOCK) return delay([DEMO_RESULT.before, DEMO_RESULT.after], 400)
  const res = await fetch(`/api/satellite?locationId=${encodeURIComponent(locationId)}`)
  if (!res.ok) throw new Error('Satellite request failed')
  return res.json()
}

/**
 * POST /api/change-detection
 * Returns change statistics between two scenes.
 */
export async function detectChange(locationId: string): Promise<AnalysisResult['stats']> {
  if (USE_MOCK) return delay(DEMO_RESULT.stats, 500)
  const res = await fetch('/api/change-detection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locationId }),
  })
  if (!res.ok) throw new Error('Change-detection request failed')
  return res.json()
}

/**
 * GET /api/history
 */
export async function getHistory(): Promise<HistoryEntry[]> {
  if (USE_MOCK) return delay(HISTORY, 300)
  const res = await fetch('/api/history')
  if (!res.ok) throw new Error('History request failed')
  return res.json()
}

/**
 * GET /api/locations — search / list saved areas of interest.
 */
export async function searchLocations(term: string): Promise<Location[]> {
  if (USE_MOCK) {
    const t = term.trim().toLowerCase()
    const list = t
      ? SAVED_LOCATIONS.filter(
          (l) => l.name.toLowerCase().includes(t) || l.region.toLowerCase().includes(t),
        )
      : SAVED_LOCATIONS
    return delay(list, 200)
  }
  const res = await fetch(`/api/locations?q=${encodeURIComponent(term)}`)
  if (!res.ok) throw new Error('Location search failed')
  return res.json()
}

/**
 * POST /api/report
 * Generates a downloadable analysis report for a completed analysis.
 */
export async function generateReport(analysisId: string): Promise<{ url: string }> {
  if (USE_MOCK) return delay({ url: `#report-${analysisId}` }, 1800)
  const res = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId }),
  })
  if (!res.ok) throw new Error('Report request failed')
  return res.json()
}
