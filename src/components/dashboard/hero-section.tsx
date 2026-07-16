import Link from "next/link";
import { Play, Info, Star } from "lucide-react";
import { type Movie } from "@/services/tmdb";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-border shadow-lg">
      {/* Backdrop. Text sits on this image in both themes, so the scrim and
          foreground colors here are intentionally fixed rather than themed. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 md:py-20 lg:w-2/3 lg:px-14">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
          {year && <span className="text-sm font-medium text-white/70">{year}</span>}
          <span className="flex items-center gap-1.5 text-sm font-medium text-white/70">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
          {movie.title}
        </h1>
        <p className="mb-8 line-clamp-3 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={`/watch/${movie.id}`}>
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            <Link href={`/watch/${movie.id}`}>
              <Info className="h-5 w-5" />
              More Info
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
