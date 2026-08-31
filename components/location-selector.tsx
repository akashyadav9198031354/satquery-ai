'use client'

import { Check, ChevronDown, MapPin } from 'lucide-react'
import { useSatQuery } from '@/components/satquery-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SAVED_LOCATIONS } from '@/lib/mock-data'

export function LocationSelector() {
  const { location, setLocation } = useSatQuery()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="max-w-[220px]">
            <MapPin className="text-primary" />
            <span className="truncate">{location.name}</span>
            <ChevronDown className="text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Saved areas of interest</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SAVED_LOCATIONS.map((loc) => {
          const active = loc.id === location.id
          return (
            <DropdownMenuItem
              key={loc.id}
              onClick={() => setLocation(loc)}
              className="flex items-start gap-2"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{loc.name}</span>
                <span className="text-xs text-muted-foreground">{loc.region}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {loc.coordinates.lat.toFixed(4)}, {loc.coordinates.lng.toFixed(4)}
                </span>
              </span>
              {active && <Check className="mt-0.5 size-4 shrink-0 text-primary" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
