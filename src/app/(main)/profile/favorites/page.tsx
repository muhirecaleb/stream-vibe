import { tmdb } from "@/services/tmdb";
import { MovieGrid } from "@/components/dashboard/movie-grid";

export default async function FavoritesPage() {
  const { results: favorites } = await tmdb.getPopular();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">My Favorites</h1>
        <p className="text-muted-foreground mt-2">Movies and TV shows you&apos;ve saved to your list.</p>
      </div>

      <MovieGrid 
        title="Saved for later" 
        movies={favorites.slice(0, 10)} 
      />
      
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-muted-foreground">?</span>
          </div>
          <h2 className="text-2xl font-bold">Your list is empty</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Start adding movies and TV shows to your favorites to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
