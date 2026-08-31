'use client'

import {
  FileText,
  History,
  House,
  Map,
  Satellite,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { BrandLockup } from '@/components/brand'
import { useSatQuery, type View } from '@/components/satquery-provider'
import { cn } from '@/lib/utils'

interface NavItem {
  view: View
  label: string
  icon: LucideIcon
}

const NAV: NavItem[] = [
  { view: 'dashboard', label: 'Dashboard', icon: House },
  { view: 'satellite', label: 'Imagery', icon: Satellite },
  { view: 'map', label: 'Map Explorer', icon: Map },
  { view: 'history', label: 'History', icon: History },
  { view: 'reports', label: 'Reports', icon: FileText },
  { view: 'settings', label: 'Settings', icon: Settings },
]

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { view, setView } = useSatQuery()

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-1 pt-1">
        <BrandLockup />
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
        {NAV.map((item) => {
          const active = view === item.view
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => {
                setView(item.view)
                onNavigate?.()
              }}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
              )}
            >
              <item.icon
                className={cn('size-4 shrink-0', active && 'text-primary')}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <AiStatus />
    </div>
  )
}

function AiStatus() {
  return (
    <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-veg opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-veg" />
        </span>
        <span className="text-xs font-medium">AI Engine Online</span>
      </div>
      <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground">
        geo-vision-1 · sentinel-2 · landsat-9
      </p>
    </div>
  )
}

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
      <div className="sticky top-0 h-svh">
        <SidebarContent />
      </div>
    </aside>
  )
}
