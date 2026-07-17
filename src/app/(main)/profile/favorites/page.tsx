"use client";

import { MovieGrid } from "@/components/dashboard/movie-grid";
import { useState, useEffect } from "react";
import { type Movie, type TVShow } from "@/services/tmdb";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = () => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(saved);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    const handleUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("favorites-updated", handleUpdate);
    return () => window.removeEventListener("favorites-updated", handleUpdate);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold">Favorites</h1>
        <p className="text-sm text-muted-foreground mt-1">Movies and TV shows you&apos;ve saved.</p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid 
          title="" 
          movies={favorites} 
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-muted-foreground">No favorites yet. Tap the heart icon to save movies and shows.</p>
        </div>
      )}
    </div>
  );
}
