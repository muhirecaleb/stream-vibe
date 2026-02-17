const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  console.warn("TMDB_API_KEY is not set in environment variables.");
}

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

export type CastMember = {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
};

export type MovieDetails = Movie & {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  cast: CastMember[];
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY || "",
    ...params,
  });

  const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${searchParams.toString()}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return res.json();
}

export const tmdb = {
  getTrending: async () => {
    return fetchTMDB<{ results: Movie[] }>("/trending/movie/week");
  },
  getPopular: async () => {
    return fetchTMDB<{ results: Movie[] }>("/movie/popular");
  },
  getDetails: async (id: string) => {
    // Parallel fetch for details and credits
    const [details, credits] = await Promise.all([
      fetchTMDB<MovieDetails>(`/movie/${id}`),
      fetchTMDB<{ cast: CastMember[] }>(`/movie/${id}/credits`),
    ]);
    return { ...details, cast: credits.cast.slice(0, 10) };
  },
  searchMovies: async (query: string) => {
    return fetchTMDB<{ results: Movie[] }>("/search/movie", { query });
  },
  getRecommendations: async (id: string | number) => {
      return fetchTMDB<{ results: Movie[] }>(`/movie/${id}/recommendations`);
  },
};
