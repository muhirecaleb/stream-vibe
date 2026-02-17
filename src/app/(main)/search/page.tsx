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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <SearchInput />
      </div>

      {query ? (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Found {results.results.length} results for "{query}"
          </p>
          {results.results.length > 0 ? (
            <MovieGrid title="" movies={results.results} />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              No movies found.
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground bg-muted/20">
          <p className="text-lg font-medium">Start typing to search for movies</p>
          <p className="text-sm">Find your favorite titles instantly</p>
        </div>
      )}
    </div>
  );
}
