"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Play } from "lucide-react";
import { type Movie, type TVShow } from "@/services/tmdb";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MovieCardProps {
  movie: Movie | TVShow;
  type?: "movie" | "tv";
  className?: string;
}

export function MovieCard({ movie, type = "movie", className }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const title = (movie as Movie).title || (movie as TVShow).name;
  const date = (movie as Movie).release_date || (movie as TVShow).first_air_date;
  const link = type === "movie" ? `/watch/${movie.id}` : `/watch/tv/${movie.id}`;

  useEffect(() => {
    const favorites: { id: number }[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites: { id: number }[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, { ...movie, type }];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    // Dispatch custom event to notify Favorites page
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div
      className={cn(
        "group relative aspect-2/3 overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/50",
        className
      )}
    >
      <Link href={link} className="absolute inset-0">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
            No Image
          </div>
        )}

        {/* Scrim keeps the title legible on light posters, not just on hover. */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg backdrop-blur-sm">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-white drop-shadow-sm">
            {title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
            <span>{date ? new Date(date).getFullYear() : "N/A"}</span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={isFavorite}
        className={cn(
          "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60",
          "focus-visible:opacity-100 group-hover:opacity-100",
          isFavorite ? "text-red-500 opacity-100" : "text-white opacity-0 hover:text-red-400"
        )}
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
      </button>
    </div>
  );
}
