import Link from "next/link";
import { Play, Info, Star, TrendingUp } from "lucide-react";
import { type Movie } from "@/services/tmdb";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const genres = (movie as { genre_ids?: number[] }).genre_ids?.slice(0, 3) ?? [];

  const genreMap: Record<number, string> = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 53: "Thriller",
    10752: "War", 37: "Western",
  };

  return (
    <section className="vignette relative w-full overflow-hidden rounded-lg border border-border shadow-2xl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      />
      {/* Scrims */}
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/30" />

      {/* Trending badge top-right */}
      <div className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-sm border border-gold/30 bg-gold/10 px-3 py-1 backdrop-blur-sm">
        <TrendingUp className="h-3.5 w-3.5 text-gold" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">Trending #1</span>
      </div>

      <div className="relative z-10 flex flex-col justify-end px-6 py-14 sm:px-10 md:min-h-[520px] md:justify-center md:py-24 lg:w-3/5 lg:px-14">
        {/* Meta row */}
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/40">
            Featured
          </span>
          {year && (
            <span className="rounded-sm border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium tabular-nums text-white/80 backdrop-blur-sm">
              {year}
            </span>
          )}
          <span className="flex items-center gap-1 rounded-sm border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-gold backdrop-blur-sm">
            <Star className="h-3 w-3 fill-gold" />
            {movie.vote_average.toFixed(1)}
          </span>
          {genres.map((id: number) =>
            genreMap[id] ? (
              <span key={id} className="rounded-sm border border-white/15 bg-white/8 px-2.5 py-0.5 text-xs text-white/70 backdrop-blur-sm">
                {genreMap[id]}
              </span>
            ) : null
          )}
        </div>

        <h1 className="mb-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {movie.title}
        </h1>
        <p className="mb-8 line-clamp-3 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="gap-2 rounded-md bg-primary px-7 font-semibold uppercase tracking-wide shadow-xl shadow-primary/40 hover:bg-primary/90 hover:shadow-primary/60"
          >
            <Link href={`/watch/${movie.id}`}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </span>
              Watch Now
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 rounded-md border-white/20 bg-white/10 px-7 font-semibold uppercase tracking-wide text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/20 hover:text-white"
          >
            <Link href={`/watch/${movie.id}`}>
              <Info className="h-4.5 w-4.5" />
              More Info
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
