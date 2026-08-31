'use client'

import { Bell, Menu, Play, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AppSidebarMobile } from '@/components/app-sidebar-mobile'
import { LocationSelector } from '@/components/location-selector'
import { useSatQuery } from '@/components/satquery-provider'
import { Button } from '@/components/ui/button'

const VIEW_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Analysis Workspace', subtitle: 'Ask a question about any location on Earth' },
  satellite: { title: 'Imagery', subtitle: 'Available scenes for the selected area' },
  map: { title: 'Map Explorer', subtitle: 'Draw and inspect areas of interest' },
  history: { title: 'History', subtitle: 'Your previous analyses' },
  reports: { title: 'Reports', subtitle: 'Generated analysis documents' },
  settings: { title: 'Settings', subtitle: 'Data sources and preferences' },
}

export function AppHeader() {
  const { view, phase, runDemo } = useSatQuery()
  const [mobileOpen, setMobileOpen] = useState(false)
  const meta = VIEW_TITLES[view] ?? VIEW_TITLES.dashboard

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <AppSidebarMobile open={mobileOpen} onOpenChange={setMobileOpen}>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
          >
            <Menu />
          </Button>
        </AppSidebarMobile>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
            {meta.title}
          </h1>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            {meta.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LocationSelector />
          <Button
            variant="secondary"
            size="sm"
            onClick={runDemo}
            disabled={phase === 'running'}
            className="hidden sm:inline-flex"
          >
            <Play className="text-primary" />
            Demo
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-change" />
          </Button>
          <span className="hidden size-8 items-center justify-center rounded-full bg-accent text-accent-foreground sm:flex">
            <Sparkles className="size-4 text-primary" />
          </span>
        </div>
      </div>
    </header>
  )
}
