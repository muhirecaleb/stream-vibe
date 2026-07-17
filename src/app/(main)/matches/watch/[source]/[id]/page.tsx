import { sportsService } from "@/services/sports";
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
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Live Sports</h1>
        </div>
        
        {streams.length > 1 && (
            <div className="flex flex-wrap gap-2">
                {streams.map((stream, idx) => (
                    <a
                        key={idx}
                        href={`?s=${idx}`}
                        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            streamIndex === idx 
                            ? "bg-foreground text-background" 
                            : "bg-accent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Stream {stream.streamNo}
                    </a>
                ))}
            </div>
        )}
      </div>

      <div>
        <SportPlayer embedUrl={currentStream?.embedUrl} />
      </div>

      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          <p>This content is provided by third-party sources. Switch streams if you experience issues.</p>
      </div>
    </div>
  );
}
