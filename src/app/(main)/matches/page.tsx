import { sportsService } from "@/services/sports";
import { MatchGrid } from "@/components/sports/match-grid";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ sport?: string }>;
}

export const revalidate = 300; // 5 minutes

export default async function MatchesPage({ searchParams }: PageProps) {
  const { sport = "live" } = await searchParams;
  
  const [sports, liveMatches, popularToday, categoryMatches] = await Promise.all([
    sportsService.getSports().catch(() => []),
    sportsService.getLiveMatches().catch(() => []),
    sportsService.getPopularToday().catch(() => []),
    sport !== "live" && sport !== "popular" 
      ? sportsService.getMatchesBySport(sport).catch(() => []) 
      : Promise.resolve([]),
  ]);

  const currentSportName = sports.find(s => s.id === sport)?.name || (sport === "live" ? "Live" : "Popular");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Sports</h1>
          <p className="text-muted-foreground mt-2">Watch your favorite live sports matches.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-white/5">
          <Link
            href="/matches?sport=live"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-muted",
              sport === "live" ? "bg-primary text-black" : "bg-muted/50 text-muted-foreground"
            )}
          >
            Live Now
          </Link>
          <Link
            href="/matches?sport=popular"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-muted",
              sport === "popular" ? "bg-primary text-black" : "bg-muted/50 text-muted-foreground"
            )}
          >
            Popular
          </Link>
          {sports.map((s) => (
            <Link
              key={s.id}
              href={`/matches?sport=${s.id}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-muted whitespace-nowrap",
                sport === s.id ? "bg-primary text-black" : "bg-muted/50 text-muted-foreground"
              )}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {sport === "live" && (
          <>
            {liveMatches.length > 0 ? (
              <MatchGrid title="Live Matches" matches={liveMatches} />
            ) : (
              <div className="p-12 border rounded-2xl bg-muted/10 text-center">
                <h2 className="text-xl font-bold">No matches live right now</h2>
                <p className="text-muted-foreground mt-2">Check back later or explore other categories.</p>
              </div>
            )}
            {popularToday.length > 0 && (
              <MatchGrid title="Popular Today" matches={popularToday} />
            )}
          </>
        )}

        {sport === "popular" && (
          <MatchGrid title="Most Popular Today" matches={popularToday} />
        )}

        {sport !== "live" && sport !== "popular" && (
          <>
            {categoryMatches.length > 0 ? (
              <MatchGrid title={`${currentSportName} Matches`} matches={categoryMatches} />
            ) : (
              <div className="p-12 border rounded-2xl bg-muted/10 text-center">
                <h2 className="text-xl font-bold">No {currentSportName} matches found</h2>
                <p className="text-muted-foreground mt-2">Try a different category or check back soon.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
