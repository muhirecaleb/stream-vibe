import { tmdb } from "@/services/tmdb";
import { SearchInput } from "@/components/search-input";
import { MovieGrid } from "@/components/dashboard/movie-grid";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;
  const results = query ? await tmdb.searchMovies(query) : { results: [] };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-semibold">Search</h1>
        <SearchInput />
      </div>

      {query ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {results.results.length} results for "{query}"
          </p>
          {results.results.length > 0 ? (
            <MovieGrid title="" movies={results.results} />
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No movies found.
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          <p className="text-sm">Start typing to search for movies</p>
        </div>
      )}
    </div>
  );
}
