import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "@/components/video-player";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { EpisodeSelector } from "@/components/tv-series/episode-selector";
import { DownloadTrigger } from "@/components/download-trigger";
import { Star } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string; episode?: string }>;
}

export default async function WatchTVPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { season = "1", episode = "1" } = await searchParams;
  
  const seasonNum = parseInt(season);
  const episodeNum = parseInt(episode);

  const [tvShow, seasonDetails, recommendations, externalIds] = await Promise.all([
     tmdb.getTVDetails(id).catch(() => null),
     tmdb.getSeasonDetails(id, seasonNum).catch(() => null),
     tmdb.getTVRecommendations(id).catch(() => ({ results: [] })),
     tmdb.getTVExternalIds(id).catch(() => ({ imdb_id: null }))
  ]);

  if (!tvShow) {
    notFound();
  }

  const currentEpisodeData = seasonDetails?.episodes.find(ep => ep.episode_number === episodeNum);
  const releaseYear = tvShow.first_air_date ? tvShow.first_air_date.split('-')[0] : "";

  return (
    <div className="space-y-8 pb-8">
       <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
             <h1 className="text-xl font-semibold">{tvShow.name}</h1>
             <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{releaseYear || "N/A"}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {tvShow.vote_average.toFixed(1)}
                </span>
             </div>
          </div>

          <div className="shrink-0">
             <DownloadTrigger 
                title={tvShow.name}
                tmdbId={id}
                year={releaseYear}
                type="tv"
                season={seasonNum}
                episode={episodeNum}
             />
          </div>
       </div>

       <VideoPlayer imdbId={externalIds?.imdb_id || id} season={seasonNum} episode={episodeNum} />
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2">
             <p className="text-sm font-medium">Episode {episodeNum}: {currentEpisodeData?.name || `Episode ${episodeNum}`}</p>
             <p className="text-sm text-muted-foreground">
                {currentEpisodeData?.overview || tvShow.overview}
             </p>
          </div>
          
          <div className="rounded-lg border p-4 space-y-2">
             <p className="text-sm font-medium">Series Info</p>
             <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                   <span className="text-muted-foreground">Status</span>
                   <span>{tvShow.status}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-muted-foreground">Seasons</span>
                   <span>{tvShow.number_of_seasons}</span>
                </div>
             </div>
          </div>
       </div>

       <div className="space-y-4 pt-6 border-t">
          <h2 className="text-base font-semibold">Episodes</h2>
          <EpisodeSelector 
            tvId={id}
            seasons={tvShow.seasons.filter(s => s.season_number > 0)}
            currentSeason={seasonNum}
            currentEpisode={episodeNum}
            episodes={seasonDetails?.episodes || []}
          />
       </div>

       <div className="pt-6 border-t">
          <MovieGrid title="Related" movies={recommendations.results.slice(0, 10)} type="tv" />
       </div>
    </div>
  );
}
