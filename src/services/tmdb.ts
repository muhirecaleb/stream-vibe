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
  imdb_id: string | null;
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

export type TVShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
};

export type Season = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  air_date: string;
};

export type SeasonDetails = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episodes: Episode[];
};

export type TVDetails = TVShow & {
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  cast: CastMember[];
  seasons: Season[];
};

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
  // TV Methods
  getTrendingTV: async () => {
    return fetchTMDB<{ results: TVShow[] }>("/trending/tv/week");
  },
  getPopularTV: async () => {
    return fetchTMDB<{ results: TVShow[] }>("/tv/popular");
  },
  getTVDetails: async (id: string) => {
    const [details, credits] = await Promise.all([
      fetchTMDB<TVDetails>(`/tv/${id}`),
      fetchTMDB<{ cast: CastMember[] }>(`/tv/${id}/credits`),
    ]);
    return { ...details, cast: credits.cast.slice(0, 10) };
  },
  getSeasonDetails: async (tvId: string, seasonNumber: number) => {
    return fetchTMDB<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);
  },
  getTVRecommendations: async (id: string | number) => {
    return fetchTMDB<{ results: TVShow[] }>(`/tv/${id}/recommendations`);
  },    searchTV: async (query: string) => {
    return fetchTMDB<{ results: TVShow[] }>("/search/tv", { query });
  },
    getTVExternalIds: async (id: string) => {
      return fetchTMDB<{ imdb_id: string | null }>(`/tv/${id}/external_ids`);
    },
    discoverMovies: async (params: Record<string, string>) => {
    return fetchTMDB<{ results: Movie[] }>("/discover/movie", params);
  },
};

