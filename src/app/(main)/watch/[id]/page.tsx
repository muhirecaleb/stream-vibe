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
    <div className="space-y-6 pb-8">
       <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
             <h1 className="text-xl font-semibold">{movie.title}</h1>
             <p className="max-w-2xl text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
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

       <VideoPlayer imdbId={movie.imdb_id || ''} />

       <div className="pt-6">
          <MovieGrid title="Related" movies={recommendations.results.slice(0, 10)} />
       </div>
    </div>
  );
}
