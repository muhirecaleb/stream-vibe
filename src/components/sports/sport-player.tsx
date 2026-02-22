"use client"

import { useState } from "react";
import { Loader2, Play, ShieldCheck, Trophy } from "lucide-react";

export function SportPlayer({ embedUrl }: { embedUrl?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <Trophy className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold text-white">No streams available for this source</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
              We couldn&apos;t find any active streams for this specific source. Please try another match or check back later.
          </p>
          <a href="/matches" className="mt-6 text-primary hover:underline font-medium">
              Back to Matches
          </a>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950">
           <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {/* Ad-Blocker/Click-to-Unlock Overlay */}
      {!isUnlocked && !isLoading && (
        <div 
          onClick={() => setIsUnlocked(true)}
          className="absolute inset-0 z-30 cursor-pointer flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/20"
        >
          <div className="flex flex-col items-center gap-4 transform transition-transform group-hover:scale-110">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
              <Play className="ml-1 h-10 w-10 fill-white text-white" />
            </div>
            <p className="text-xl font-bold text-white drop-shadow-lg">Unlock Live Match Stream</p>
          </div>
          
          <div className="absolute bottom-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium text-white/70">Ad-Guard Shielded Connection</span>
          </div>
        </div>
      )}

      <iframe 
        src={embedUrl}
        className={`h-full w-full border-0 transition-opacity duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`} 
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        /* 
           SANDBOXING:
           Matches often use even more aggressive popups than movies.
           We must exclude allow-popups.
        */
        sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts"
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
