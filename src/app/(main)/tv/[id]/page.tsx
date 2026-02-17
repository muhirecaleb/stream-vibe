import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Play, Star, Calendar, Layers } from "lucide-react";
import { tmdb } from "@/services/tmdb";
import { Button } from "@/components/ui/button";
import { MovieGrid } from "@/components/dashboard/movie-grid";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TVDetailsPage({ params }: PageProps) {
  const { id } = await params;
  
  // Parallel fetch details and recommendations
  const [tvShow, recommendations] = await Promise.all([
     tmdb.getTVDetails(id).catch(() => null),
     tmdb.getTVRecommendations(id).catch(() => ({ results: [] }))
  ]);

  if (!tvShow) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Backdrop Header */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
         <div className="absolute inset-0">
            {tvShow.backdrop_path && (
               <Image
                  src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
                  alt={tvShow.name}
                  fill
                  className="object-cover"
                  priority
               />
            )}
            <div className="absolute inset-0 bg-black/40" />
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">{tvShow.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
               <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" /> 
                  <span className="text-foreground">{tvShow.vote_average.toFixed(1)}</span>
               </span>
               <span>•</span>
               <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(tvShow.first_air_date).getFullYear()}
               </span>
               <span>•</span>
               <span className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  {tvShow.number_of_seasons} Seasons
               </span>
               <span>•</span>
               <div className="flex gap-2">
                  {tvShow.genres.map(g => (
                     <span key={g.id} className="rounded-full border bg-background/50 px-2 py-0.5 text-xs backdrop-blur">
                        {g.name}
                     </span>
                  ))}
               </div>
            </div>

            <div className="flex gap-4">
               <Button asChild size="lg" className="h-12 px-8 text-lg gap-2 bg-white text-black hover:bg-gray-200 border-0">
                  <Link href={`/watch/tv/${tvShow.id}`}>
                     <Play className="h-5 w-5 fill-current" />
                     Watch Series
                  </Link>
               </Button>
            </div>
         </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
         <div className="space-y-8">
            <section>
               <h2 className="text-2xl font-semibold mb-4">Overview</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  {tvShow.overview}
               </p>
            </section>
            
            <section>
               <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {tvShow.cast?.map((actor) => (
                     <div key={actor.id} className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                           {actor.profile_path ? (
                              <Image 
                                 src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                 alt={actor.name}
                                 fill
                                 className="object-cover"
                              />
                           ) : null}
                        </div>
                        <div className="text-sm">
                           <p className="font-medium leading-none">{actor.name}</p>
                           <p className="text-muted-foreground text-xs">{actor.character}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </div>
      </div>

      {/* Recommendations */}
      {recommendations.results && recommendations.results.length > 0 && (
          <MovieGrid title="You May Also Like" movies={recommendations.results.slice(0,10)} type="tv" />
      )}
    </div>
  );
}
