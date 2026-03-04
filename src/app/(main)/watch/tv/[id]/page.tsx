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

  const [tvShow, seasonDetails, recommendations] = await Promise.all([
     tmdb.getTVDetails(id).catch(() => null),
     tmdb.getSeasonDetails(id, seasonNum).catch(() => null),
     tmdb.getTVRecommendations(id).catch(() => ({ results: [] }))
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
                   <span className="px-2 py-1 rounded bg-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider">Now Playing</span>
                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {tvShow.vote_average.toFixed(1)}
                   </div>
                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {releaseYear || "N/A"}
                   </div>
                </div>
                <h1 className="text-3xl font-bold md:text-5xl text-white tracking-tight">
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

          <VideoPlayer tmdbId={id} season={seasonNum} episode={episodeNum} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
             <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-primary font-bold text-lg">
                      <Info className="h-5 w-5" />
                      Episode {episodeNum}: {currentEpisodeData?.name || `Episode ${episodeNum}`}
                   </div>
                   <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                      {currentEpisodeData?.overview || tvShow.overview}
                   </p>
                </div>
             </div>
             
             <div className="bg-muted/10 rounded-2xl p-6 border border-white/5 space-y-4 h-fit">
                <div className="flex items-center gap-2 font-bold text-white">
                   <ListVideo className="h-5 w-5 text-primary" />
                   Series Info
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="text-white font-medium">{tvShow.status}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seasons</span>
                      <span className="text-white font-medium">{tvShow.number_of_seasons}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Genres</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[150px]">
                         {tvShow.genres.slice(0, 3).map(g => (
                            <span key={g.id} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/70">{g.name}</span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Season & Episode Selection */}
       <div className="space-y-6 border-t border-white/5 pt-10">
          <div className="flex items-center gap-3">
             <div className="h-8 w-1 bg-primary rounded-full" />
             <h2 className="text-2xl font-bold text-white">Select Episode</h2>
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
       <div className="pt-10 border-t border-white/5">
          <MovieGrid title="You Might Also Like" movies={recommendations.results.slice(0, 10)} type="tv" />
       </div>
    </div>
  );
}
