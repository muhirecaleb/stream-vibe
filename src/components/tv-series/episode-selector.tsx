"use client"

import Image from "next/image";
import Link from "next/link";
import { Episode, Season } from "@/services/tmdb";
import { Play, ChevronRight, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EpisodeSelectorProps {
  tvId: string;
  seasons: Season[];
  currentSeason: number;
  currentEpisode: number;
  episodes: Episode[];
}

export function EpisodeSelector({
  tvId,
  seasons,
  currentSeason,
  currentEpisode,
  episodes
}: EpisodeSelectorProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          {seasons.map((season) => (
            <Link
              key={season.id}
              href={`/watch/tv/${tvId}?season=${season.season_number}&episode=1`}
              aria-current={currentSeason === season.season_number ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                currentSeason === season.season_number
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              Season {season.season_number}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              viewMode === 'grid'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              viewMode === 'list'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {episodes.map((episode) => {
            const isActive = currentEpisode === episode.episode_number;
            return (
              <Link
                key={episode.id}
                href={`/watch/tv/${tvId}?season=${currentSeason}&episode=${episode.episode_number}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md",
                  isActive
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Play className="h-8 w-8" />
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="rounded-full bg-primary p-2 shadow-lg">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    EP {episode.episode_number}
                  </div>
                </div>
                <div className="p-3">
                  <h3
                    className={cn(
                      "line-clamp-1 text-sm font-semibold transition-colors",
                      isActive ? "text-primary" : "group-hover:text-primary"
                    )}
                  >
                    {episode.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {episode.overview || "No description available."}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {episodes.map((episode) => {
            const isActive = currentEpisode === episode.episode_number;
            return (
              <Link
                key={episode.id}
                href={`/watch/tv/${tvId}?season=${currentSeason}&episode=${episode.episode_number}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-start gap-4 rounded-xl border bg-card p-3 transition-colors",
                  isActive
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <div className="relative aspect-video h-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Play className="h-5 w-5" />
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">
                      EP {episode.episode_number}
                    </span>
                    <h3
                      className={cn(
                        "truncate text-sm font-semibold",
                        isActive && "text-primary"
                      )}
                    >
                      {episode.name}
                    </h3>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {episode.overview || "No description available."}
                  </p>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 self-center",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
