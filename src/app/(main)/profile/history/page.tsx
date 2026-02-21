import { tmdb } from "@/services/tmdb";
import { MovieGrid } from "@/components/dashboard/movie-grid";

export default async function HistoryPage() {
  const { results: history } = await tmdb.getTrending();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Watch History</h1>
        <p className="text-muted-foreground mt-2">Movies and TV shows you&apos;ve recently watched.</p>
      </div>

      <MovieGrid 
        title="Recently Watched" 
        movies={history.slice(0, 15)} 
      />

      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-muted-foreground">↺</span>
          </div>
          <h2 className="text-2xl font-bold">No history found</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            You haven&apos;t watched anything yet. Start exploring and your history will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
