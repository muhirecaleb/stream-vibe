import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "@/components/video-player";
import { MovieGrid } from "@/components/dashboard/movie-grid";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string; episode?: string }>;
}

export default async function WatchTVPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { season = "1", episode = "1" } = await searchParams;
  
  const [tvShow, recommendations] = await Promise.all([
     tmdb.getTVDetails(id).catch(() => null),
     tmdb.getTVRecommendations(id).catch(() => ({ results: [] }))
  ]);

  if (!tvShow) {
    notFound();
  }

  const seasonNum = parseInt(season);
  const episodeNum = parseInt(episode);

  return (
    <div className="space-y-8 pb-10">
       <div className="space-y-4">
          <h1 className="text-2xl font-bold md:text-3xl">Now Watching: <span className="text-primary">{tvShow.name}</span></h1>
          <p className="text-lg text-muted-foreground">Season {seasonNum} • Episode {episodeNum}</p>
          <p className="max-w-3xl text-sm text-muted-foreground line-clamp-2">{tvShow.overview}</p>
       </div>

       {/* Player */}
       <VideoPlayer tmdbId={id} season={seasonNum} episode={episodeNum} />

       {/* Simple Season/Episode Controls (Enhanced version would be a proper selector) */}
       <div className="flex gap-4 p-4 bg-muted/20 rounded-lg">
          <div className="text-sm text-muted-foreground">
             <p>To change episode, use the player controls or URL parameters:</p>
             <code className="bg-muted px-2 py-1 rounded">?season=1&episode=2</code>
          </div>
       </div>

       {/* Related content */}
       <div className="pt-8">
          <MovieGrid title="Related Shows" movies={recommendations.results.slice(0, 10)} type="tv" />
       </div>
    </div>
  );
}
