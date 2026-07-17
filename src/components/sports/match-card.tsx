import Link from "next/link";
import Image from "next/image";
import { type APIMatch } from "@/services/sports";

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
      className="group relative block aspect-video overflow-hidden rounded-lg bg-card"
    >
      {match.poster ? (
        <Image
          src={`https://streamed.pk${match.poster}`}
          alt={match.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4 text-center">
            <div className="flex items-center gap-4 mb-4">
                {match.teams?.home?.badge && (
                    <img src={`https://streamed.pk${match.teams.home.badge}`} alt="" className="h-10 w-10 object-contain" />
                )}
                <span className="text-base font-semibold">VS</span>
                {match.teams?.away?.badge && (
                    <img src={`https://streamed.pk${match.teams.away.badge}`} alt="" className="h-10 w-10 object-contain" />
                )}
            </div>
            <div className="text-xs text-muted-foreground">{match.category}</div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="flex items-start justify-between gap-2">
            <div>
                <h3 className="text-sm font-medium text-white line-clamp-1">
                    {match.title}
                </h3>
                <span className="text-[10px] text-white/60 uppercase mt-0.5 block">
                    {match.category}
                </span>
            </div>
        </div>
      </div>
    </Link>
  );
}
