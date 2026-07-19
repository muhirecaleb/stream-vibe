"use client"

import { useState } from "react";
import Link from "next/link";
import { Loader2, Trophy, Maximize } from "lucide-react";

export function SportPlayer({ embedUrl }: { embedUrl?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!embedUrl) {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
          <Trophy className="mb-4 h-12 w-12 text-muted-foreground opacity-40" />
          <h2 className="text-lg font-semibold">No streams available</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn&apos;t find any active streams for this specific source. Please try another stream or check back later.
          </p>
          <Link href="/matches" className="mt-6 text-sm font-medium text-primary hover:underline">
              Back to Matches
          </Link>
      </div>
    );
  }

  return (
    /* The player surface stays dark in both themes — standard for video chrome. */
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg ring-1 ring-border">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black">
           <Loader2 className="h-10 w-10 animate-spin text-primary" />
           <div className="flex flex-col items-center gap-1">
             <p className="text-sm font-medium text-white/80">Connecting to stream...</p>
             <p className="text-[10px] uppercase tracking-widest text-white/40">Third-party source</p>
           </div>
        </div>
      )}

      {/* Pro Hint Badge - Subtle and useful */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 shadow-lg backdrop-blur-md">
          <Maximize className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-tight text-white">Tip: Go Fullscreen for Best Experience</span>
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
