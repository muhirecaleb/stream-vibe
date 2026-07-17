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
    <div className="animate-in fade-in slide-in-from-top relative isolate flex items-center gap-x-4 border-b border-primary/20 bg-primary/5 px-5 py-2.5 duration-500">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="flex items-center gap-2 text-sm leading-6">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          <strong className="font-semibold text-primary">Best Experience:</strong>
          <span className="text-muted-foreground">
            For the best streaming experience, we recommend a modern browser like{" "}
            <strong className="font-medium text-foreground">Brave</strong>, or ensuring your{" "}
            <strong className="font-medium text-foreground">Ad-Blocker</strong> is active.
          </span>
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-2 shrink-0 rounded-md p-2 transition-colors hover:bg-accent"
          onClick={dismissBanner}
        >
          <span className="sr-only">Dismiss</span>
          <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
