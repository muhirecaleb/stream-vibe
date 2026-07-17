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
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Sports</h1>
            <p className="text-sm text-muted-foreground mt-1">Live and upcoming matches.</p>
          </div>
          <MatchSearch />
        </div>

        {!q && (
          <div className="flex flex-wrap gap-2 pb-2 border-b">
            <Link
              href="/matches?sport=live"
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                sport === "live" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Live Now
            </Link>
            <Link
              href="/matches?sport=popular"
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                sport === "popular" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Popular
            </Link>
            {sports.map((s) => (
              <Link
                key={s.id}
                href={`/matches?sport=${s.id}`}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap",
                  sport === s.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-10">
        {q ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Search Results for "{q}"</h2>
              <p className="text-sm text-muted-foreground">{searchResults.length} matches found</p>
            </div>
            {searchResults.length > 0 ? (
              <MatchGrid title="" matches={searchResults} />
            ) : (
              <div className="py-10 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">No matches found for "{q}". Try a different search.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {sport === "live" && (
              <>
                {liveMatches.length > 0 ? (
                  <MatchGrid title="Live" matches={liveMatches} />
                ) : (
                  <div className="py-10 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">No matches live right now. Check back later.</p>
                  </div>
                )}
                {popularToday.length > 0 && (
                  <MatchGrid title="Popular Today" matches={popularToday} />
                )}
              </>
            )}

            {sport === "popular" && (
              <MatchGrid title="Popular Today" matches={popularToday} />
            )}

            {sport !== "live" && sport !== "popular" && (
              <>
                {categoryMatches.length > 0 ? (
                  <MatchGrid title={`${currentSportName}`} matches={categoryMatches} />
                ) : (
                  <div className="py-10 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">No {currentSportName.toLowerCase()} matches found.</p>
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
