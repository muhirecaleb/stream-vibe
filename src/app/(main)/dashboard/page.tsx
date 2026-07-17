import { tmdb } from "@/services/tmdb";
import { HeroSection } from "@/components/dashboard/hero-section";
import { MovieGrid } from "@/components/dashboard/movie-grid";

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
    <div className="space-y-10 pb-8">
      <HeroSection movie={featuredMovie} />
      
      <MovieGrid title="Trending Movies" movies={trending.results.slice(1)} />
      <MovieGrid title="Trending TV Shows" movies={trendingTV.results} type="tv" />
      <MovieGrid title="Popular Movies" movies={popular.results} />
      <MovieGrid title="Popular TV Shows" movies={popularTV.results} type="tv" />
    </div>
  );
}
