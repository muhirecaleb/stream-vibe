import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!TMDB_API_KEY) {
    return NextResponse.json({ results: [] });
  }

  if (!query || query.length < 2) {
    // Return trending movies as suggestions when query is short/empty
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json({ results: [] });
    const data = await res.json();
    return NextResponse.json({ results: data.results.slice(0, 6) });
  }

  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return NextResponse.json({ results: [] });
  }

  const data = await res.json();
  return NextResponse.json({ results: data.results.slice(0, 6) });
}
