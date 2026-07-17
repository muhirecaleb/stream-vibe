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
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </section>
  );
}
