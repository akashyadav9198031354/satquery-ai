'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { SatelliteScene } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ImageComparison({
  before,
  after,
}: {
  before: SatelliteScene
  after: SatelliteScene
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return
      updateFromClientX(e.clientX)
    }
    function onUp() {
      draggingRef.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [updateFromClientX])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4))
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-xl border border-border bg-muted select-none"
    >
      {/* After (base layer) */}
      <img
        src={after.imageUrl || '/placeholder.svg'}
        alt={`Satellite imagery of the area in ${after.year}`}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
        crossOrigin="anonymous"
      />
      <SceneTag className="right-3 top-3" year={after.year} label={after.label} />

      {/* Before (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={before.imageUrl || '/placeholder.svg'}
          alt={`Satellite imagery of the area in ${before.year}`}
          className="absolute inset-0 size-full object-cover"
          draggable={false}
          crossOrigin="anonymous"
        />
        <SceneTag className="left-3 top-3" year={before.year} label={before.label} />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-primary"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after imagery"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onPointerDown={(e) => {
            e.preventDefault()
            draggingRef.current = true
          }}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ChevronLeft className="size-3.5" />
          <ChevronRight className="size-3.5 -ml-1" />
        </button>
      </div>
    </div>
  )
}

function SceneTag({
  year,
  label,
  className,
}: {
  year: string
  label: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'absolute z-20 rounded-md bg-background/85 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur',
        className,
      )}
    >
      {label} · {year}
    </span>
  )
}
