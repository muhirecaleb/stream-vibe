"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Star, Loader2 } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Suggestion {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
}

export function SearchInput() {
  const searchParams = useSearchParams()
  const { replace, push } = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const [query, setQuery] = React.useState(searchParams.get("query") || "")
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [hasSearched, setHasSearched] = React.useState(false)

  const fetchSuggestions = useDebouncedCallback(async (term: string) => {
    if (term.length < 2 && term.length > 0) {
      setSuggestions([])
      setIsOpen(false)
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (term) params.set("q", term)
      const res = await fetch(`/api/search?${params.toString()}`)
      const data = await res.json()
      setSuggestions(data.results || [])
      setHasSearched(true)
      setIsOpen(true)
    } catch {
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, 250)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)

    if (!value) {
      setSuggestions([])
      setHasSearched(false)
    }

    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("query", value)
    } else {
      params.delete("query")
    }
    replace(`/search?${params.toString()}`)

    fetchSuggestions(value)
  }

  const handleFocus = () => {
    if (suggestions.length > 0 || hasSearched) {
      setIsOpen(true)
    } else if (!query) {
      fetchSuggestions("")
    }
  }

  const handleBlur = () => {
    // Delay close to allow click on suggestion
    setTimeout(() => setIsOpen(false), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          push(`/watch/${suggestions[selectedIndex].id}`)
          setIsOpen(false)
          inputRef.current?.blur()
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search movies..."
        className="w-full rounded-md border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring md:w-[240px]"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      />

      {isLoading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
      )}

      {isOpen && (
        <div
          className="absolute top-full mt-1 left-0 right-0 bg-card border rounded-lg shadow-lg overflow-hidden z-50"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.length > 0 ? (
            suggestions.map((movie, index) => {
              const year = movie.release_date
                ? movie.release_date.split("-")[0]
                : ""
              const isSelected = index === selectedIndex
              return (
                <Link
                  key={movie.id}
                  href={`/watch/${movie.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                    isSelected
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  )}
                >
                  <div className="h-10 w-7 rounded bg-muted overflow-hidden shrink-0">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt=""
                        width={28}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <Search className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{movie.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {year && <span>{year}</span>}
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            !isLoading && hasSearched && (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                No movies found
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
