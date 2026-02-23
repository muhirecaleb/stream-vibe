import { tmdb } from "@/services/tmdb";
import { HeroSection } from "@/components/dashboard/hero-section";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { MoodBanner } from "@/components/dashboard/mood-banner";

export const revalidate = 3600; // Revalidate every hour

export default async function DashboardPage() {
  const [trending, popular, trendingTV, popularTV] = await Promise.all([
    tmdb.getTrending(),
    tmdb.getPopular(),
    tmdb.getTrendingTV(),
    tmdb.getPopularTV(),
  ]);

  const featuredMovie = trending.results[0];

  return (
    <div className="space-y-12 pb-10">
      <HeroSection movie={featuredMovie} />
      
      <MovieGrid title="Trending Movies" movies={trending.results.slice(1)} />
      <MovieGrid title="Trending TV Shows" movies={trendingTV.results} type="tv" />
      
      <MoodBanner />
      
      <MovieGrid title="Popular Movies" movies={popular.results} />
      <MovieGrid title="Popular TV Shows" movies={popularTV.results} type="tv" />
    </div>
  );
}
