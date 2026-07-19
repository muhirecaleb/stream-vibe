"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Play } from "lucide-react";
import { type Movie, type TVShow } from "@/services/tmdb";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie | TVShow;
  type?: "movie" | "tv";
  className?: string;
}

export function MovieCard({ movie, type = "movie", className }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false;
    const favorites: { id: number }[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.some((fav) => fav.id === movie.id);
  });
  const title = (movie as Movie).title || (movie as TVShow).name;
  const date = (movie as Movie).release_date || (movie as TVShow).first_air_date;
  const link = type === "movie" ? `/watch/${movie.id}` : `/watch/tv/${movie.id}`;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites: { id: number }[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, { ...movie, type }];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div
      className={cn(
        "group relative aspect-2/3 overflow-hidden rounded-md bg-muted ring-1 ring-border/60",
        "transition-all duration-300 hover:-translate-y-1.5 hover:ring-primary",
        "hover:shadow-2xl hover:shadow-primary/25",
        className
      )}
    >
      <Link href={link} className="absolute inset-0">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-108"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
            No Image
          </div>
        )}

        {/* Bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/95 via-black/60 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-13 w-13 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/50 ring-2 ring-white/25 transition-transform duration-200 group-hover:scale-110">
            <Play className="ml-0.5 h-5.5 w-5.5 fill-white text-white" />
          </span>
        </div>

        {/* Rating pill — top-left */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-[11px] font-semibold tabular-nums text-white">{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Title + year */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-1 text-sm font-bold text-white drop-shadow">{title}</h3>
          <p className="mt-0.5 text-xs text-white/60">{date ? new Date(date).getFullYear() : "N/A"}</p>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={isFavorite}
        className={cn(
          "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-sm backdrop-blur-sm transition-all duration-200",
          "focus-visible:opacity-100 group-hover:opacity-100",
          // Active state is a light chip with a crimson heart so it stays legible
          // against the crimson play button that shares the same hover moment.
          isFavorite
            ? "bg-white text-primary opacity-100 shadow-lg shadow-black/40"
            : "bg-black/60 text-white/80 opacity-0 hover:bg-white hover:text-primary"
        )}
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
      </button>
    </div>
  );
}
