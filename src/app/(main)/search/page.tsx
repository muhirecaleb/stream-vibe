import { Search, SearchX } from "lucide-react";
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
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          <p className="mt-1.5 text-muted-foreground">Find movies across the catalog.</p>
        </div>
        <SearchInput />
      </div>

      {query ? (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {results.results.length} {results.results.length === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
          </p>
          {results.results.length > 0 ? (
            <MovieGrid title="" movies={results.results} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
              <SearchX className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No movies found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different title or check the spelling.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-20 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium">Start typing to search for movies</p>
          <p className="mt-1 text-sm text-muted-foreground">Find your favorite titles instantly</p>
        </div>
      )}
    </div>
  );
}
