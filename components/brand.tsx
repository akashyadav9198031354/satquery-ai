import { Satellite } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm',
        className,
      )}
    >
      <Satellite className="size-5" />
    </div>
  )
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <BrandMark />
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight">SatQuery AI</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Remote Sensing
          </span>
        </div>
      )}
    </div>
  )
}
