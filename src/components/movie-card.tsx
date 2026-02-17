import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type Movie, type TVShow } from "@/services/tmdb";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie | TVShow;
  type?: "movie" | "tv";
  className?: string;
}

export function MovieCard({ movie, type = "movie", className }: MovieCardProps) {
  const title = (movie as Movie).title || (movie as TVShow).name;
  const date = (movie as Movie).release_date || (movie as TVShow).first_air_date;
  const link = type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`;

  return (
    <Link href={link} className={cn("group relative block aspect-[2/3] overflow-hidden rounded-lg bg-muted transition-all hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-primary/50", className)}>
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
          No Image
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-300">
           <span>{date ? new Date(date).getFullYear() : "N/A"}</span>
           <span className="flex items-center gap-1 text-yellow-500">
             <Star className="h-3 w-3 fill-current" />
             {movie.vote_average.toFixed(1)}
           </span>
        </div>
      </div>
    </Link>
  );
}
