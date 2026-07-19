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
      className="group relative block aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/50"
    >
      {/* Background/Poster */}
      {match.poster ? (
        <Image
          src={`https://streamed.pk${match.poster}`}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-secondary to-muted p-4 text-center">
            <div className="mb-4 flex items-center gap-4">
                {match.teams?.home?.badge && (
                    <div className="relative h-12 w-12">
                      <Image src={`https://streamed.pk${match.teams.home.badge}`} alt="" fill className="object-contain" />
                    </div>
                )}
                <span className="text-lg font-bold italic text-muted-foreground">VS</span>
                {match.teams?.away?.badge && (
                    <div className="relative h-12 w-12">
                      <Image src={`https://streamed.pk${match.teams.away.badge}`} alt="" fill className="object-contain" />
                    </div>
                )}
            </div>
            <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{match.category}</div>
        </div>
      )}

      {/* Scrim keeps the title legible over any poster. */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity group-hover:from-black/95" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
                <h3 className="line-clamp-1 font-semibold text-white">
                    {match.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
                        {match.category}
                    </span>
                    {match.popular && (
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                            Popular
                        </span>
                    )}
                </div>
            </div>
            <div className="flex h-10 w-10 shrink-0 translate-y-2 transform items-center justify-center rounded-full bg-primary opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
            </div>
        </div>
      </div>
    </Link>
  );
}
