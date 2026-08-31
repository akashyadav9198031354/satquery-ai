'use client'

import { FileText, Map, Settings } from 'lucide-react'
import { AnalysisProgress } from '@/components/analysis-progress'
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { EmptyState } from '@/components/empty-state'
import { HistoryTable } from '@/components/history-table'
import { ImageryGallery } from '@/components/imagery-gallery'
import { PlaceholderView } from '@/components/placeholder-view'
import { QuerySection } from '@/components/query-section'
import { ResultsPanel } from '@/components/results-panel'
import { useSatQuery } from '@/components/satquery-provider'

function Workspace() {
  const { phase, result } = useSatQuery()
  return (
    <div className="flex flex-col gap-4">
      <QuerySection />
      {phase === 'running' && <AnalysisProgress />}
      {phase === 'complete' && result && <ResultsPanel result={result} />}
      {(phase === 'idle' || phase === 'error') && <EmptyState />}
      <HistoryTable compact />
    </div>
  )
}

function MainContent() {
  const { view } = useSatQuery()

  switch (view) {
    case 'dashboard':
      return <Workspace />
    case 'satellite':
      return <ImageryGallery />
    case 'history':
      return <HistoryTable />
    case 'reports':
      return (
        <PlaceholderView
          icon={FileText}
          title="Reports"
          description="Every analysis can be exported as a shareable report. Generated reports will appear here with imagery, statistics, and the AI explanation."
          points={[
            'PDF and web report formats',
            'Embeddable imagery comparisons',
            'Change statistics & confidence',
            'Shareable links for stakeholders',
          ]}
        />
      )
    case 'map':
      return (
        <PlaceholderView
          icon={Map}
          title="Map Explorer"
          description="Draw an area of interest directly on an interactive map to scope your analysis, then ask a question about it."
          points={[
            'Draw polygons & bounding boxes',
            'Search places and coordinates',
            'Basemap & satellite layers',
            'Save areas of interest',
          ]}
        />
      )
    case 'settings':
      return (
        <PlaceholderView
          icon={Settings}
          title="Settings"
          description="Configure data sources, imagery providers, and analysis preferences for your workspace."
          points={[
            'Imagery providers (Sentinel, Landsat)',
            'Default analysis parameters',
            'API keys & data connections',
            'Team & sharing preferences',
          ]}
        />
      )
    default:
      return <Workspace />
  }
}

export function Dashboard() {
  return (
    <div className="flex min-h-svh bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6">
          <MainContent />
        </main>
      </div>
    </div>
  )
}
