import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export interface AIRecommendation {
  tmdb_params: Record<string, string>;
  explanation: string;
}

export async function analyzeVibe(prompt: string): Promise<AIRecommendation> {
  const systemPrompt = `
    You are a cinematic expert for StreamVibe. Your job is to translate a user's "vibe" or movie request into TMDB API parameters.
    
    Translate this user request: "${prompt}"
    
    Return ONLY a JSON object with the following structure:
    {
      "tmdb_params": {
        "with_genres": "genre_ids_comma_separated",
        "with_keywords": "keyword_ids_comma_separated (use common sense keywords if you know them, or omit)",
        "sort_by": "popularity.desc",
        "vote_average.gte": "number_as_string",
        "primary_release_year": "year_if_requested"
      },
      "explanation": "A short, poetic one-sentence reason why these movies fit the vibe."
    }

    Common TMDB Genre IDs:
    Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80, Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36, Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, Science Fiction: 878, TV Movie: 10770, Thriller: 53, War: 10752, Western: 37.

    If they ask for something specific like "old movies", use primary_release_year or primary_release_date.lte.
    
    IMPORTANT: Respond ONLY with the JSON. No markdown blocks.
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/gi, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      tmdb_params: { with_genres: "18", sort_by: "popularity.desc" },
      explanation: "Falling back to some classic drama for your current vibe."
    };
  }
}
