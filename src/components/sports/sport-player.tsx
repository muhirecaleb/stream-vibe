"use client"

import { useState } from "react";
import { Loader2, Trophy, Maximize } from "lucide-react";

export function SportPlayer({ embedUrl }: { embedUrl?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black flex flex-col items-center justify-center text-center p-6 border border-white/10">
          <Trophy className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold text-white">No streams available</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
              We couldn&apos;t find any active streams for this specific source. Please try another stream or check back later.
          </p>
          <a href="/matches" className="mt-6 text-primary hover:underline font-medium text-sm">
              Back to Matches
          </a>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950 gap-4">
           <Loader2 className="h-12 w-12 animate-spin text-primary" />
           <div className="flex flex-col items-center gap-1">
             <p className="text-sm font-medium text-white/80">Connecting to stream...</p>
             <p className="text-[10px] text-white/40 uppercase tracking-widest">Third-party source</p>
           </div>
        </div>
      )}

      {/* Pro Hint Badge - Subtle and useful */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md shadow-xl">
          <Maximize className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold text-white uppercase tracking-tight">Tip: Go Fullscreen for Best Experience</span>
        </div>
      </div>

      <iframe 
        src={embedUrl}
        className="h-full w-full border-0" 
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        /* We omit sandbox to ensure the video actually loads */
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
