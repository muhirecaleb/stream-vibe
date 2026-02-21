const SPORTS_API_BASE_URL = "https://streamed.pk/api";

export interface APIMatch {
  id: string;
  title: string;
  category: string;
  date: number;
  poster?: string;
  popular: boolean;
  teams?: {
    home?: {
      name: string;
      badge: string;
    };
    away?: {
      name: string;
      badge: string;
    };
  };
  sources: {
    source: string;
    id: string;
  }[];
}

export interface Stream {
  id: string;
  streamNo: number;
  language: string;
  hd: boolean;
  embedUrl: string;
  source: string;
}

async function fetchSports<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${SPORTS_API_BASE_URL}${endpoint}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes (sports are real-time)
  });

  if (!res.ok) {
    throw new Error(`Sports API Error: ${res.statusText}`);
  }

  return res.json();
}

export interface Sport {
  id: string;
  name: string;
}

export const sportsService = {
  getSports: async () => {
    return fetchSports<Sport[]>("/sports");
  },
  getLiveMatches: async () => {
    return fetchSports<APIMatch[]>("/matches/live");
  },
  getPopularToday: async () => {
    return fetchSports<APIMatch[]>("/matches/all-today/popular");
  },
  getAllToday: async () => {
    return fetchSports<APIMatch[]>("/matches/all-today");
  },
  getMatchesBySport: async (sport: string) => {
    return fetchSports<APIMatch[]>(`/matches/${sport}`);
  },
  getStreams: async (source: string, id: string) => {
    return fetchSports<Stream[]>(`/stream/${source}/${id}`);
  },
};
