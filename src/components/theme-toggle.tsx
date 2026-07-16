"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

const subscribe = () => () => {}

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  // `theme` is only known once the client reads localStorage, so the active
  // state is withheld until after hydration to keep the server and client
  // markup identical.
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-0.5",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              "text-muted-foreground hover:text-foreground",
              isActive && "bg-background text-foreground shadow-sm ring-1 ring-border"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        )
      })}
    </div>
  )
}
