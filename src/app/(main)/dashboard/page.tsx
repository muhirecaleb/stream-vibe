import { tmdb } from "@/services/tmdb";
import { HeroSection } from "@/components/dashboard/hero-section";
import { MovieGrid } from "@/components/dashboard/movie-grid";

export const revalidate = 3600; // Revalidate every hour

export default async function DashboardPage() {
  const [trending, popular] = await Promise.all([
    tmdb.getTrending(),
    tmdb.getPopular(),
  ]);

  const featuredMovie = trending.results[0];

  return (
    <div className="space-y-12 pb-10">
      <HeroSection movie={featuredMovie} />
      
      <MovieGrid title="Trending Now" movies={trending.results.slice(1)} />
      
      <MovieGrid title="Popular Movies" movies={popular.results} />
    </div>
  );
}
