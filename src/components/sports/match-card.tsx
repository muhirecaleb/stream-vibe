import Link from "next/link";
import Image from "next/image";
import { type APIMatch } from "@/services/sports";
import { Play } from "lucide-react";

interface MatchCardProps {
  match: APIMatch;
}

export function MatchCard({ match }: MatchCardProps) {
  // Use the first source for the link
  const source = match.sources[0];
  const link = source ? `/matches/watch/${source.source}/${source.id}` : "#";

  return (
    <Link 
      href={link} 
      className="group relative block aspect-video overflow-hidden rounded-xl bg-muted transition-all hover:scale-[1.02] hover:shadow-2xl hover:ring-2 hover:ring-primary/50"
    >
      {/* Background/Poster */}
      {match.poster ? (
        <Image
          src={`https://streamed.pk${match.poster}`}
          alt={match.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary/50 to-muted p-4 text-center">
            <div className="flex items-center justify-center gap-6 mb-2">
                <div className="flex flex-col items-center gap-2 max-w-[100px]">
                    {match.teams?.home?.badge && (
                        <img src={`https://streamed.pk${match.teams.home.badge}`} alt="" className="h-12 w-12 object-contain" />
                    )}
                    <span className="text-xs font-bold line-clamp-2 leading-tight">
                        {match.teams?.home?.name || match.title.split(' vs ')[0]}
                    </span>
                </div>
                
                <span className="text-xl font-black italic text-primary">VS</span>
                
                <div className="flex flex-col items-center gap-2 max-w-[100px]">
                    {match.teams?.away?.badge && (
                        <img src={`https://streamed.pk${match.teams.away.badge}`} alt="" className="h-12 w-12 object-contain" />
                    )}
                    <span className="text-xs font-bold line-clamp-2 leading-tight">
                        {match.teams?.away?.name || match.title.split(' vs ')[1] || ""}
                    </span>
                </div>
            </div>
            <div className="text-[10px] font-medium opacity-50 uppercase tracking-[0.2em] mt-2">{match.category}</div>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="flex items-start justify-between gap-2">
            <div>
                <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {match.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-[10px] font-bold text-primary uppercase">
                        {match.category}
                    </span>
                    {match.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-[10px] font-bold text-yellow-500 uppercase">
                            Popular
                        </span>
                    )}
                </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                <Play className="h-5 w-5 fill-current text-white" />
            </div>
        </div>
      </div>
    </Link>
  );
}
