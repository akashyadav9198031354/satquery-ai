'use client'

import { FileDown, LoaderCircle, Share2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateReport } from '@/lib/api'
import type { AnalysisResult } from '@/lib/types'

export function ReportCard({ result }: { result: AnalysisResult }) {
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      await generateReport(result.id)
      toast.success('Report ready', {
        description: 'Your analysis report has been generated.',
      })
    } catch {
      toast.error('Could not generate report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold">Export this analysis</p>
        <p className="text-xs text-muted-foreground">
          Generate a shareable report with imagery, statistics, and the AI explanation.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={loading}>
          <Share2 />
          Share
        </Button>
        <Button size="sm" onClick={handleGenerate} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : <FileDown />}
          {loading ? 'Generating…' : 'Generate report'}
        </Button>
      </div>
    </div>
  )
}
