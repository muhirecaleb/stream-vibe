"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

export function MatchSearch() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }
    replace(`/matches?${params.toString()}`)
  }, 300)

  return (
    <div className="relative w-full md:w-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search matches, teams or sports..."
        className="w-full rounded-md border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring md:w-[260px]"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  )
}
