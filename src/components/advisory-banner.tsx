"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function AdvisoryBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem("advisory-banner-dismissed")
    if (!isDismissed) {
      queueMicrotask(() => setIsVisible(true))
    }
  }, [])

  const dismissBanner = () => {
    setIsVisible(false)
    localStorage.setItem("advisory-banner-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="flex items-center gap-x-4 bg-accent px-6 py-2">
      <p className="text-xs text-muted-foreground flex-1">
        Use a modern browser with an ad-blocker for the best streaming experience.
      </p>
      <button type="button" onClick={dismissBanner} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
