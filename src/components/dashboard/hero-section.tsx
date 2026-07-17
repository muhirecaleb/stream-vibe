import Link from "next/link";
import { Play, Info } from "lucide-react";
import { type Movie } from "@/services/tmdb";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;

  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-card">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:px-12 lg:w-2/3 lg:px-16 xl:py-24">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {movie.title}
        </h1>
        <p className="mb-8 line-clamp-2 text-sm text-muted-foreground md:text-base max-w-2xl">
          {movie.overview}
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button asChild size="default">
            <Link href={`/watch/${movie.id}`}>
              <Play className="h-4 w-4 fill-current" />
              Watch
            </Link>
          </Button>
          <Button asChild variant="outline" size="default">
            <Link href={`/watch/${movie.id}`}>
              <Info className="h-4 w-4" />
              Details
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
