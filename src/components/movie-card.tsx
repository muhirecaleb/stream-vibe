"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { type Movie, type TVShow } from "@/services/tmdb";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie | TVShow;
  type?: "movie" | "tv";
}

export function MovieCard({ movie, type = "movie" }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const title = (movie as Movie).title || (movie as TVShow).name;
  const date = (movie as Movie).release_date || (movie as TVShow).first_air_date;
  const link = type === "movie" ? `/watch/${movie.id}` : `/watch/tv/${movie.id}`;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: any) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((fav: any) => fav.id !== movie.id);
    } else {
      newFavorites = [...favorites, { ...movie, type }];
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    // Dispatch custom event to notify Favorites page
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div className="group relative block aspect-[2/3] overflow-hidden rounded-lg bg-card">
      <Link href={link} className="absolute inset-0">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground text-sm">
            No poster
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
             <span>{date ? new Date(date).getFullYear() : "N/A"}</span>
             <span className="flex items-center gap-1">
               <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
               {movie.vote_average.toFixed(1)}
             </span>
          </div>
        </div>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-2 top-2 z-10 rounded-full bg-black/40 hover:bg-black/60",
          isFavorite ? "text-red-500" : "text-white/70 hover:text-red-400"
        )}
        onClick={toggleFavorite}
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
      </Button>
    </div>
  );
}
