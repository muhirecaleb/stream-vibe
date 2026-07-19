import { sportsService } from "@/services/sports";
import { MatchGrid } from "@/components/sports/match-grid";
import { MatchSearch } from "@/components/sports/match-search";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type APIMatch } from "@/services/sports";

interface PageProps {
  searchParams: Promise<{ sport?: string; q?: string }>;
}

export const revalidate = 300; // 5 minutes

const tabClass = (isActive: boolean) =>
  cn(
    "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
    isActive
      ? "bg-primary text-primary-foreground shadow-sm"
      : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
  );

export default async function MatchesPage({ searchParams }: PageProps) {
  const { sport = "live", q = "" } = await searchParams;
  
  const [sports, liveMatches, popularToday, allToday, categoryMatches] = await Promise.all([
    sportsService.getSports().catch(() => []),
    sportsService.getLiveMatches().catch(() => []),
    sportsService.getPopularToday().catch(() => []),
    q ? sportsService.getAllToday().catch(() => []) : Promise.resolve([]),
    sport !== "live" && sport !== "popular" 
      ? sportsService.getMatchesBySport(sport).catch(() => []) 
      : Promise.resolve([]),
  ]);

  const currentSportName = sports.find(s => s.id === sport)?.name || (sport === "live" ? "Live" : "Popular");

  let searchResults: APIMatch[] = [];
  if (q) {
    const query = q.toLowerCase().trim();
    // Aggregate all data sources to ensure we have the most matches available for search
    const allMatchesPool = [
      ...liveMatches,
      ...popularToday,
      ...allToday,
      ...categoryMatches
    ];
    
    // Dedup matches by ID
    const uniqueMatchesMap = new Map<string, APIMatch>();
    allMatchesPool.forEach(match => {
      if (match && match.id) {
        uniqueMatchesMap.set(match.id, match);
      }
    });

    const dedupedMatches = Array.from(uniqueMatchesMap.values());
    
    searchResults = dedupedMatches.filter(match => {
      const matchTitle = match.title?.toLowerCase() || "";
      const matchCategory = match.category?.toLowerCase() || "";
      const homeTeam = match.teams?.home?.name?.toLowerCase() || "";
      const awayTeam = match.teams?.away?.name?.toLowerCase() || "";
      
      return (
        matchTitle.includes(query) || 
        matchCategory.includes(query) ||
        homeTeam.includes(query) || 
        awayTeam.includes(query)
      );
    });
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sports</h1>
            <p className="mt-1.5 text-muted-foreground">
              Watch your favorite live sports matches.
            </p>
          </div>
          <MatchSearch />
        </div>

        {/* Category Tabs */}
        {!q && (
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            <Link href="/matches?sport=live" className={tabClass(sport === "live")}>
              Live Now
            </Link>
            <Link href="/matches?sport=popular" className={tabClass(sport === "popular")}>
              Popular
            </Link>
            {sports.map((s) => (
              <Link
                key={s.id}
                href={`/matches?sport=${s.id}`}
                className={tabClass(sport === s.id)}
              >
                {s.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-12">
        {q ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Results for &ldquo;{q}&rdquo;
              </h2>
              <p className="shrink-0 text-sm text-muted-foreground">
                {searchResults.length} {searchResults.length === 1 ? "match" : "matches"}
              </p>
            </div>
            {searchResults.length > 0 ? (
              <MatchGrid title="" matches={searchResults} />
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                <h2 className="text-lg font-semibold">No matches found for &ldquo;{q}&rdquo;</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try searching for a different team or sport.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {sport === "live" && (
              <>
                {liveMatches.length > 0 ? (
                  <MatchGrid title="Live Matches" matches={liveMatches} />
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                    <h2 className="text-lg font-semibold">No matches live right now</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Check back later or explore other categories.
                    </p>
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
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                    <h2 className="text-lg font-semibold">No {currentSportName} matches found</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try a different category or check back soon.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
