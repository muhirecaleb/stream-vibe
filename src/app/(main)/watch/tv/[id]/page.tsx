import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "@/components/video-player";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { EpisodeSelector } from "@/components/tv-series/episode-selector";
import { DownloadTrigger } from "@/components/download-trigger";
import { Calendar, Star, Info, ListVideo } from "lucide-react";

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
    <div className="space-y-10 pb-20">
       {/* Hero/Player Section */}
       <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
             <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Now Playing</span>
                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {tvShow.vote_average.toFixed(1)}
                   </div>
                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {releaseYear || "N/A"}
                   </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                   {tvShow.name}
                </h1>
             </div>

             <div className="shrink-0 pb-1">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
             <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                   <div className="flex items-center gap-2 text-lg font-semibold">
                      <Info className="h-5 w-5 shrink-0 text-primary" />
                      Episode {episodeNum}: {currentEpisodeData?.name || `Episode ${episodeNum}`}
                   </div>
                   <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground">
                      {currentEpisodeData?.overview || tvShow.overview}
                   </p>
                </div>
             </div>
             
             <div className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 font-semibold">
                   <ListVideo className="h-5 w-5 text-primary" />
                   Series Info
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium">{tvShow.status}</span>
                   </div>
                   <div className="flex justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">Seasons</span>
                      <span className="font-medium">{tvShow.number_of_seasons}</span>
                   </div>
                   <div className="flex justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">Genres</span>
                      <div className="flex max-w-40 flex-wrap justify-end gap-1">
                         {tvShow.genres.slice(0, 3).map(g => (
                            <span key={g.id} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{g.name}</span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Season & Episode Selection */}
       <div className="space-y-6 border-t border-border pt-10">
          <div className="flex items-center gap-3">
             <div className="h-7 w-1 rounded-full bg-primary" />
             <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Select Episode</h2>
          </div>
          <EpisodeSelector 
            tvId={id}
            seasons={tvShow.seasons.filter(s => s.season_number > 0)} // Filter out specials usually
            currentSeason={seasonNum}
            currentEpisode={episodeNum}
            episodes={seasonDetails?.episodes || []}
          />
       </div>

       {/* Related content */}
       <div className="border-t border-border pt-10">
          <MovieGrid title="You Might Also Like" movies={recommendations.results.slice(0, 10)} type="tv" />
       </div>
    </div>
  );
}
