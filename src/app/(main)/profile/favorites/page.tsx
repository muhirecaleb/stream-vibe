"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { Button } from "@/components/ui/button";
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
      <div className="animate-pulse space-y-8">
        <div className="h-9 w-64 rounded-lg bg-muted" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-2/3 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
        <p className="mt-1.5 text-muted-foreground">
          Movies and TV shows you&apos;ve saved to your list.
        </p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid title="Saved for later" movies={favorites} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Your list is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Tap the heart icon on any title to save it here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard">Browse titles</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
