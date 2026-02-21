"use client"

import { useState, useEffect } from "react"
import { X, ShieldCheck } from "lucide-react"

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
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-primary/10 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 border-b border-primary/20 backdrop-blur-sm animate-in fade-in slide-in-from-top duration-500">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <strong className="font-semibold text-primary">Best Experience:</strong>
          <span>For the best streaming experience, we recommend using a modern browser like <strong className="text-foreground">Brave</strong> or ensuring your <strong className="text-foreground">Ad-Blocker</strong> is active.</span>
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={dismissBanner}>
          <span className="sr-only">Dismiss</span>
          <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
