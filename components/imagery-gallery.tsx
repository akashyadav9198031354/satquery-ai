'use client'

import { Calendar, Satellite as SatelliteIcon } from 'lucide-react'
import { useSatQuery } from '@/components/satquery-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DEMO_RESULT } from '@/lib/mock-data'

const SCENES = [
  {
    ...DEMO_RESULT.after,
    provider: 'Sentinel-2 L2A',
    cloud: '2%',
    resolution: '10 m',
  },
  {
    ...DEMO_RESULT.before,
    provider: 'Sentinel-2 L2A',
    cloud: '5%',
    resolution: '10 m',
  },
]

export function ImageryGallery() {
  const { location, runAnalysis } = useSatQuery()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Available scenes for{' '}
          <span className="font-medium text-foreground">{location.name}</span>
        </p>
        <Badge variant="secondary">{SCENES.length} scenes</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SCENES.map((scene) => (
          <div key={scene.year} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[16/10]">
              <img
                src={scene.imageUrl || '/placeholder.svg'}
                alt={`Satellite scene from ${scene.year}`}
                className="size-full object-cover"
                crossOrigin="anonymous"
              />
              <Badge className="absolute left-3 top-3 bg-background/85 text-foreground backdrop-blur">
                <Calendar className="text-primary" />
                {scene.year}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <SatelliteIcon className="size-4 text-primary" />
                <span className="text-sm font-medium">{scene.provider}</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-secondary/50 px-2.5 py-2">
                  <dt className="text-muted-foreground">Resolution</dt>
                  <dd className="mt-0.5 font-mono font-medium">{scene.resolution}</dd>
                </div>
                <div className="rounded-lg bg-secondary/50 px-2.5 py-2">
                  <dt className="text-muted-foreground">Cloud cover</dt>
                  <dd className="mt-0.5 font-mono font-medium">{scene.cloud}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="self-start"
        onClick={() => runAnalysis('What changed between these two scenes?')}
      >
        Compare these scenes
      </Button>
    </div>
  )
}
