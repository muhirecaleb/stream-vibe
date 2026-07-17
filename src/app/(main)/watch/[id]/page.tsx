import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "@/components/video-player";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { DownloadTrigger } from "@/components/download-trigger";

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

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : "";

  return (
    <div className="space-y-8 pb-10">
       <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
             <span className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Now Playing
             </span>
             <h1 className="text-2xl font-bold tracking-tight md:text-4xl">{movie.title}</h1>
             <p className="line-clamp-2 max-w-3xl text-sm text-muted-foreground">{movie.overview}</p>
          </div>
          
          <div className="shrink-0">
             <DownloadTrigger 
                title={movie.title}
                tmdbId={id}
                year={releaseYear}
                type="movie"
             />
          </div>
       </div>

       {/* Player */}
       <VideoPlayer imdbId={movie.imdb_id || ''} />

       {/* Related content */}
       <div className="border-t border-border pt-8">
          <MovieGrid title="Related Movies" movies={recommendations.results.slice(0, 10)} />
       </div>
    </div>
  );
}
