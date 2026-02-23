"use server";

import { analyzeVibe, AIRecommendation } from "@/services/ai";
import { tmdb, Movie } from "@/services/tmdb";

export async function getMoviesByVibeAction(prompt: string) {
  if (!prompt || prompt.length < 3) {
    throw new Error("Prompt too short");
  }

  const analysis: AIRecommendation = await analyzeVibe(prompt);
  const movies = await tmdb.discoverMovies(analysis.tmdb_params);

  return {
    movies: movies.results,
    explanation: analysis.explanation
  };
}
