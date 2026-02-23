import { Movie, TVShow } from "@/services/tmdb";
import { MovieCard } from "@/components/movie-card";

interface MovieGridProps {
  title?: string;
  movies: (Movie | TVShow)[];
  type?: "movie" | "tv";
}

export function MovieGrid({ title, movies, type = "movie" }: MovieGridProps) {
  return (
    <section>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <a href="#" className="text-primary text-sm font-medium hover:underline">View All</a>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </section>
  );
}
