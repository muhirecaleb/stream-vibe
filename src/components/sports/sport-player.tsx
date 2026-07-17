"use client"

import { useState } from "react";
import { Loader2, Trophy } from "lucide-react";

export function SportPlayer({ embedUrl }: { embedUrl?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-card flex flex-col items-center justify-center text-center p-8">
          <Trophy className="h-10 w-10 text-muted-foreground mb-3" />
          <h2 className="text-base font-semibold">No streams available</h2>
          <p className="text-muted-foreground mt-1 max-w-md text-sm">
              Try another stream or check back later.
          </p>
          <a href="/matches" className="mt-4 text-sm text-muted-foreground hover:text-foreground underline">
              Back to Matches
          </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
           <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      )}

      <iframe 
        src={embedUrl}
        className="h-full w-full border-0" 
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
