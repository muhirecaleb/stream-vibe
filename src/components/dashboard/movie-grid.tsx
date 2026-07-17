import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Movie, TVShow } from "@/services/tmdb";
import { MovieCard } from "@/components/movie-card";

interface MovieGridProps {
  title?: string;
  movies: (Movie | TVShow)[];
  type?: "movie" | "tv";
  viewAllHref?: string;
}

export function MovieGrid({ title, movies, type = "movie", viewAllHref }: MovieGridProps) {
  return (
    <section>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-primary shadow-sm shadow-primary/60" />
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/8 hover:text-primary"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </section>
  );
}
