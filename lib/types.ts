// Shared domain types for SatQuery AI.
// Backend responses should conform to these shapes so the mock service layer
// in lib/api.ts can be swapped for real API calls without touching the UI.

export interface Coordinates {
  lat: number
  lng: number
}

export interface Location {
  id: string
  name: string
  region: string
  coordinates: Coordinates
}

export type AnalysisType =
  | 'Vegetation Change'
  | 'Change Detection'
  | 'Flood Impact'
  | 'Construction Detection'
  | 'Multi-Temporal'

export type AnalysisStatus = 'completed' | 'processing' | 'failed'

export interface ChangeStat {
  label: string
  /** signed percentage change, e.g. -18.4 or 7.2 */
  value: number
  kind: 'veg' | 'water' | 'builtup' | 'change'
}

export interface SatelliteScene {
  label: string
  year: string
  imageUrl: string
}

export interface AiInsight {
  summary: string
  confidence: number
  detectedChange: string
  affectedAreaKm2: number
}

export interface AnalysisResult {
  id: string
  question: string
  location: Location
  analysisType: AnalysisType
  before: SatelliteScene
  after: SatelliteScene
  stats: ChangeStat[]
  insight: AiInsight
  createdAt: string
}

export interface HistoryEntry {
  id: string
  question: string
  location: string
  analysisType: AnalysisType
  date: string
  status: AnalysisStatus
}

export interface SuggestionChip {
  id: string
  icon: string
  label: string
  query: string
}

export interface AnalysisStep {
  id: string
  label: string
}
