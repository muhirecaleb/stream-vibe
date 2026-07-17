"use client"

import Image from "next/image";
import Link from "next/link";
import { Episode, Season } from "@/services/tmdb";
import { Play } from "lucide-react";

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
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {seasons.map((season) => (
          <Link
            key={season.id}
            href={`/watch/tv/${tvId}?season=${season.season_number}&episode=1`}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
              currentSeason === season.season_number
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            S{season.season_number}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {episodes.map((episode) => {
          const isActive = currentEpisode === episode.episode_number;
          return (
            <Link
              key={episode.id}
              href={`/watch/tv/${tvId}?season=${currentSeason}&episode=${episode.episode_number}`}
              className={`rounded-lg border overflow-hidden transition-colors hover:bg-accent ${
                isActive ? "border-foreground" : "border-border"
              }`}
            >
              <div className="aspect-video relative bg-muted">
                {episode.still_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                    alt={episode.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Play className="h-6 w-6" />
                  </div>
                )}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                )}
                <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1.5 py-0.5 rounded">
                  EP {episode.episode_number}
                </span>
              </div>
              <div className="p-2.5">
                <h3 className={`text-xs font-medium truncate ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {episode.name}
                </h3>
                {episode.overview && (
                  <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">
                    {episode.overview}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
