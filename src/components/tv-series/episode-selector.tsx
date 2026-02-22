"use client"

import Image from "next/image";
import Link from "next/link";
import { Episode, Season } from "@/services/tmdb";
import { Play, ChevronRight, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {seasons.map((season) => (
            <Link
              key={season.id}
              href={`/watch/tv/${tvId}?season=${season.season_number}&episode=1`}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                currentSeason === season.season_number
                  ? "bg-primary text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              Season {season.season_number}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {episodes.map((episode) => {
            const isActive = currentEpisode === episode.episode_number;
            return (
              <Link
                key={episode.id}
                href={`/watch/tv/${tvId}?season=${currentSeason}&episode=${episode.episode_number}`}
                className={`group relative overflow-hidden rounded-xl border transition-all hover:border-primary/50 ${
                  isActive ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-white/5 bg-muted/20"
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 absolute inset-0 text-white/20">
                      <Play className="h-8 w-8" />
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="rounded-full bg-primary p-2">
                        <Play className="h-5 w-5 fill-white text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    EP {episode.episode_number}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-1 text-sm font-semibold text-white group-hover:text-primary transition-colors">
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
                className={`flex items-start gap-4 p-3 rounded-xl border transition-all hover:border-primary/50 ${
                  isActive ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-white/5 bg-muted/20"
                }`}
              >
                <div className="h-20 aspect-video relative rounded-lg overflow-hidden shrink-0">
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 absolute inset-0 text-white/20">
                      <Play className="h-6 w-6" />
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                       <Play className="h-4 w-4 fill-white text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">EP {episode.episode_number}</span>
                    <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-primary' : 'text-white'}`}>
                      {episode.name}
                    </h3>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                    {episode.overview || "No description available."}
                  </p>
                </div>
                <div className="self-center pr-2">
                   <ChevronRight className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
