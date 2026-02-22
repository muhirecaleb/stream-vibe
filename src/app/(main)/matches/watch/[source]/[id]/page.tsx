import { sportsService } from "@/services/sports";
import { Globe, Zap } from "lucide-react";
import { SportPlayer } from "@/components/sports/sport-player";

interface PageProps {
  params: Promise<{ source: string; id: string }>;
  searchParams: Promise<{ s?: string }>;
}

export default async function SportsWatchPage({ params, searchParams }: PageProps) {
  const { source, id } = await params;
  const { s = "0" } = await searchParams;
  
  const streams = await sportsService.getStreams(source, id).catch(() => []);
  
  if (streams.length === 0) {
    // If no specific streams found, we might need to check if there's a fallback or show "No streams"
    // For now, let's show the player area if we have a source/id, maybe it's direct
  }

  const streamIndex = parseInt(s);
  const currentStream = streams[streamIndex] || streams[0];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-500 text-[10px] font-bold text-white uppercase animate-pulse">
                <Zap className="h-3 w-3 fill-current" />
                Live
            </span>
            <span className="px-2 py-1 rounded bg-primary/20 text-[10px] font-bold text-primary uppercase">
                Sports Stream
            </span>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">Watching Live Sports</h1>
        </div>
        
        {streams.length > 1 && (
            <div className="flex flex-wrap gap-2">
                {streams.map((stream, idx) => (
                    <a
                        key={idx}
                        href={`?s=${idx}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            streamIndex === idx 
                            ? "bg-primary text-white" 
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                    >
                        Stream {stream.streamNo} ({stream.language})
                    </a>
                ))}
            </div>
        )}
      </div>

      {/* Player Area */}
      <div className="w-full">
        <SportPlayer embedUrl={currentStream?.embedUrl} />
      </div>


      {/* Info/Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-muted/20 border border-white/5 space-y-4">
              <div className="flex items-center gap-2 font-bold">
                  <Globe className="h-5 w-5 text-primary" />
                  Stream Information
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                  This content is provided by third-party sources. Stream quality and availability may vary based on your location and connection speed. If a stream lags, try switching to another option if available.
              </p>
          </div>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
              <div className="flex items-center gap-2 font-bold text-primary">
                  <Zap className="h-5 w-5" />
                  Pro Tip
              </div>
              <p className="text-sm text-primary/80 leading-relaxed">
                  For the best experience, use a modern browser and ensure your ad-blocker is configured correctly as some external embedding sites may contain intrusive elements.
              </p>
          </div>
      </div>
    </div>
  );
}
