"use client"

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function VideoPlayer({ tmdbId }: { tmdbId: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
           <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <iframe 
        src={`https://www.vidking.net/embed/movie/${tmdbId}`}
        className="h-full w-full border-0" 
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
