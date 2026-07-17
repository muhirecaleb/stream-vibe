"use client"

import { useState } from "react";
import { Loader2, Play, ShieldCheck } from "lucide-react";

export function VideoPlayer({ 
  imdbId, 
  season, 
  episode 
}: { 
  imdbId: string; 
  season?: number; 
  episode?: number; 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const src = season && episode 
    ? `https://vidsrcme.ru/embed/${imdbId}/${season}-${episode}`
    : `https://vidsrcme.ru/embed/${imdbId}`;

  const handlePlay = () => {
    setIsUnlocked(true);
    setIsLoading(true);
  };

  return (
    /* The player surface stays dark in both themes — standard for video chrome. */
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-border">
      {!isUnlocked ? (
        /* Click-to-Play Overlay — shown before iframe is mounted */
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Start streaming"
          className="absolute inset-0 z-30 flex cursor-pointer flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-colors duration-300 hover:bg-black/20"
        >
          <div className="flex transform flex-col items-center gap-4 transition-transform group-hover:scale-105">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
              <Play className="ml-1 h-9 w-9 fill-white text-white" />
            </div>
            <p className="text-lg font-semibold text-white drop-shadow-lg">Click to start streaming</p>
          </div>

          <div className="absolute bottom-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-white/70">Secure Player Active &amp; Ad-Guard Shielded</span>
          </div>
        </button>
      ) : (
        /* Player loaded — iframe mounts fresh when user clicks */
        <>
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
               <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          <iframe 
            src={src}
            className="h-full w-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}

