"use client"

import { useState } from "react";
import { Loader2, Play } from "lucide-react";

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
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {!isUnlocked ? (
        <div 
          onClick={handlePlay}
          className="absolute inset-0 z-30 cursor-pointer flex flex-col items-center justify-center bg-black/50 transition-colors hover:bg-black/30"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
              <Play className="ml-0.5 h-8 w-8 fill-white text-white" />
            </div>
            <p className="text-sm font-medium text-white">Click to play</p>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
               <Loader2 className="h-8 w-8 animate-spin text-white/50" />
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
