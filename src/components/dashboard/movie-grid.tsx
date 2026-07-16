import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Movie, TVShow } from "@/services/tmdb";
import { MovieCard } from "@/components/movie-card";

interface MovieGridProps {
  title?: string;
  movies: (Movie | TVShow)[];
  type?: "movie" | "tv";
  /** Renders a "View all" link beside the title. Omitted means no link. */
  viewAllHref?: string;
}

export function MovieGrid({ title, movies, type = "movie", viewAllHref }: MovieGridProps) {
  return (
    <section>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              View all
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
