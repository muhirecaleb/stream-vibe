"use client"

import { useState } from "react";
import { Loader2, Play, ShieldCheck, Trophy } from "lucide-react";

export function SportPlayer({ embedUrl }: { embedUrl?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [safeMode, setSafeMode] = useState(true);

  if (!embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black flex flex-col items-center justify-center text-center p-6 border border-white/10">
          <Trophy className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold text-white">No streams available</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
              We couldn't find any active streams for this specific source.
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
          className="absolute inset-0 z-40 cursor-pointer flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-4 transform transition-transform group-hover:scale-110">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_rgba(220,38,38,0.6)]">
              <Play className="ml-1 h-10 w-10 fill-white text-white" />
            </div>
            <div className="text-center px-4">
                <p className="text-xl font-bold text-white drop-shadow-lg text-pretty">Unlock Live Match</p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Initial Ad-Shield Active</p>
            </div>
          </div>
        </div>
      )}

      {/* 
          SAFE MODE SHIELD (Invisible Ad-Catcher):
          Blocks clicks on the edges where invisible popups usually hide.
      */}
      {isUnlocked && safeMode && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Edge Guards - Invisible but clickable to block sub-clicks */}
          <div className="absolute top-0 left-0 right-0 h-14 pointer-events-auto cursor-default" />
          <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-auto cursor-default" />
          <div className="absolute top-0 bottom-0 left-0 w-14 pointer-events-auto cursor-default" />
          <div className="absolute top-0 bottom-0 right-0 w-14 pointer-events-auto cursor-default" />
          
          <div className="absolute top-4 right-4 pointer-events-auto">
            <button 
                onClick={() => setSafeMode(false)}
                className="flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md hover:bg-red-600 transition-colors shadow-lg"
            >
                <ShieldCheck className="h-3 w-3" />
                OFF AD-SHIELD
            </button>
          </div>
        </div>
      )}

      <iframe 
        src={embedUrl}
        className={`h-full w-full border-0 transition-opacity duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`} 
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
