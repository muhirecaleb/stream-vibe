import { type APIMatch } from "@/services/sports";
import { MatchCard } from "@/components/sports/match-card";

interface MatchGridProps {
  title: string;
  matches: APIMatch[];
}

export function MatchGrid({ title, matches }: MatchGridProps) {
  if (!matches || matches.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}
