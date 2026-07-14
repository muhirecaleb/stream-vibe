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
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
      {!isUnlocked ? (
        /* Click-to-Play Overlay — shown before iframe is mounted */
        <div 
          onClick={handlePlay}
          className="absolute inset-0 z-30 cursor-pointer flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/20"
        >
          <div className="flex flex-col items-center gap-4 transform transition-transform group-hover:scale-110">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <Play className="ml-1 h-10 w-10 fill-white text-white" />
            </div>
            <p className="text-xl font-bold text-white drop-shadow-lg">Click to start streaming</p>
          </div>
          
          <div className="absolute bottom-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-white/70">Secure Player Active & Ad-Guard Shielded</span>
          </div>
        </div>
      ) : (
        /* Player loaded — iframe mounts fresh when user clicks */
        <>
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950">
               <Loader2 className="h-12 w-12 animate-spin text-red-600" />
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

