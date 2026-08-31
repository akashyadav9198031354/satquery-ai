// Mock data for SatQuery AI.
// This is UI-demonstration data only. Values are illustrative samples.
// Keep this file isolated from lib/api.ts so real API responses can replace it.

import type {
  AnalysisResult,
  AnalysisStep,
  HistoryEntry,
  Location,
  SuggestionChip,
} from './types'

export const DEFAULT_LOCATION: Location = {
  id: 'lucknow',
  name: 'Lucknow',
  region: 'Uttar Pradesh, India',
  coordinates: { lat: 26.8467, lng: 80.9462 },
}

export const SAVED_LOCATIONS: Location[] = [
  DEFAULT_LOCATION,
  {
    id: 'delhi',
    name: 'Delhi',
    region: 'National Capital Territory, India',
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga',
    region: 'Assam, India',
    coordinates: { lat: 26.5775, lng: 93.1711 },
  },
  {
    id: 'chennai',
    name: 'Chennai Coast',
    region: 'Tamil Nadu, India',
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
]

export const SUGGESTION_CHIPS: SuggestionChip[] = [
  {
    id: 'veg',
    icon: 'trees',
    label: 'Detect vegetation change',
    query: 'Where has vegetation decreased in this area?',
  },
  {
    id: 'flood',
    icon: 'waves',
    label: 'Analyze flood impact',
    query: 'What was the flood impact in this region?',
  },
  {
    id: 'construction',
    icon: 'building-2',
    label: 'Find new construction',
    query: 'Where has new construction appeared recently?',
  },
  {
    id: 'compare',
    icon: 'globe',
    label: 'Compare two dates',
    query: 'What major changes happened between 2024 and 2026?',
  },
  {
    id: 'image',
    icon: 'satellite',
    label: 'Analyze this image',
    query: 'Analyze this satellite image and describe what you see.',
  },
]

export const ANALYSIS_STEPS: AnalysisStep[] = [
  { id: 'understand', label: 'Understanding question' },
  { id: 'area', label: 'Identifying area' },
  { id: 'select', label: 'Selecting analysis' },
  { id: 'process', label: 'Processing imagery' },
  { id: 'detect', label: 'Detecting changes' },
  { id: 'explain', label: 'Generating explanation' },
]

export const DEMO_RESULT: AnalysisResult = {
  id: 'demo-lucknow-2024-2026',
  question: 'What major changes happened in this area between 2024 and 2026?',
  location: DEFAULT_LOCATION,
  analysisType: 'Change Detection',
  before: {
    label: 'Before',
    year: '2024',
    imageUrl: '/satellite-before-2024.png',
  },
  after: {
    label: 'After',
    year: '2026',
    imageUrl: '/satellite-after-2026.png',
  },
  stats: [
    { label: 'Vegetation Change', value: -18.4, kind: 'veg' },
    { label: 'Built-up Change', value: 7.2, kind: 'builtup' },
    { label: 'Water Change', value: -4.8, kind: 'water' },
  ],
  insight: {
    summary:
      'The selected region shows a noticeable decrease in vegetation between 2024 and 2026, with the strongest changes concentrated in the northern section of the selected area. This coincides with an expansion of built-up land and new road networks.',
    confidence: 91,
    detectedChange: 'Vegetation Loss',
    affectedAreaKm2: 12.6,
  },
  createdAt: '2026-08-31T10:24:00.000Z',
}

export const HISTORY: HistoryEntry[] = [
  {
    id: 'h1',
    question: 'Where did vegetation decrease?',
    location: 'Lucknow',
    analysisType: 'Vegetation Change',
    date: '31 Aug 2026',
    status: 'completed',
  },
  {
    id: 'h2',
    question: 'Show major land changes',
    location: 'Delhi',
    analysisType: 'Change Detection',
    date: '30 Aug 2026',
    status: 'completed',
  },
  {
    id: 'h3',
    question: 'Estimate flood-affected farmland',
    location: 'Kaziranga',
    analysisType: 'Flood Impact',
    date: '28 Aug 2026',
    status: 'completed',
  },
  {
    id: 'h4',
    question: 'Detect new construction near the coast',
    location: 'Chennai Coast',
    analysisType: 'Construction Detection',
    date: '27 Aug 2026',
    status: 'processing',
  },
  {
    id: 'h5',
    question: 'Compare optical and radar imagery',
    location: 'Lucknow',
    analysisType: 'Multi-Temporal',
    date: '25 Aug 2026',
    status: 'failed',
  },
]
