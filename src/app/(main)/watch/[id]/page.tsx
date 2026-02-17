import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "@/components/video-player";
import { MovieGrid } from "@/components/dashboard/movie-grid";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  
  const [movie, recommendations] = await Promise.all([
     tmdb.getDetails(id).catch(() => null),
     tmdb.getRecommendations(id).catch(() => ({ results: [] }))
  ]);

  if (!movie) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-10">
       <div className="space-y-4">
          <h1 className="text-2xl font-bold md:text-3xl">Now Watching: <span className="text-primary">{movie.title}</span></h1>
          <p className="max-w-3xl text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
       </div>

       {/* Player */}
       <VideoPlayer tmdbId={id} />

       {/* Related content */}
       <div className="pt-8">
          <MovieGrid title="Related Movies" movies={recommendations.results.slice(0, 10)} />
       </div>
    </div>
  );
}
