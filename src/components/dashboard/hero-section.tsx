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
    <section className="relative w-full overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-white/10">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:px-12 lg:w-2/3 lg:px-16 xl:py-24">
        <span className="mb-4 inline-block w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
          Featured Movie
        </span>
        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {movie.title}
        </h1>
        <p className="mb-8 line-clamp-3 text-lg text-muted-foreground md:text-xl">
          {movie.overview}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            <Link href={`/watch/${movie.id}`}>
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10">
            <Link href={`/movie/${movie.id}`}>
              <Info className="h-5 w-5" />
              More Info
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
