import { sportsService } from "@/services/sports";
import { Globe, Zap } from "lucide-react";
import { SportPlayer } from "@/components/sports/sport-player";
import { cn } from "@/lib/utils";

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
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
                <Zap className="h-3 w-3 fill-current" />
                Live
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Sports Stream
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Watching Live Sports</h1>
        </div>

        {streams.length > 1 && (
            <div className="flex flex-wrap gap-2">
                {streams.map((stream, idx) => (
                    <a
                        key={idx}
                        href={`?s=${idx}`}
                        aria-current={streamIndex === idx ? "true" : undefined}
                        className={cn(
                          "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                          streamIndex === idx
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 font-semibold">
                  <Globe className="h-5 w-5 shrink-0 text-primary" />
                  Stream Information
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                  This content is provided by third-party sources. Stream quality and availability may vary based on your location and connection speed. If a stream lags, try switching to another option if available.
              </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 font-semibold text-primary">
                  <Zap className="h-5 w-5 shrink-0" />
                  Pro Tip
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                  For the best experience, use a modern browser and ensure your ad-blocker is configured correctly as some external embedding sites may contain intrusive elements.
              </p>
          </div>
      </div>
    </div>
  );
}
