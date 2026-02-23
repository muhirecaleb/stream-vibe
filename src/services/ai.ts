import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export interface AIRecommendation {
  tmdb_params: Record<string, string>;
  explanation: string;
}

export async function analyzeVibe(prompt: string): Promise<AIRecommendation> {
  const systemPrompt = `
    You are the "StreamVibe Cine-Expert," a world-class film historian and curator. 
    Your mission is to translate vague, emotional, or highly specific user "vibes" into precise TMDB Discovery API parameters.

    USER REQUEST: "${prompt}"

    STRATEGY:
    1. ANALYZE EMOTION: Is the user seeking catharsis, excitement, comfort, or intellectual stimulation?
    2. MAP GENRES: Select the 1-3 most relevant genres.
    3. EXCLUSIONS: If the user implies "not scary" or "no violence," use 'without_genres'.
    4. CULTURAL CONTEXT: If they mention a country or language (e.g., "Korean"), use 'with_original_language'.
    5. ERA: If they say "retro," "80s," "modern," or "classic," use 'primary_release_date.gte' and 'primary_release_date.lte'.
    6. KEYWORDS (CRITICAL): TMDB uses IDs. Since you don't have the ID map, use common IDs for these high-vibe themes:
       - Time Travel: 9840
       - Space: 3801
       - Based on Novel: 818
       - Revenge: 9748
       - Dystopia: 4565
       - Surrealism: 1530
       - Coming of Age: 10683
       - Heist: 9730
       - Noir: 3121
       - Cyberpunk: 12510

    RESPONSE FORMAT (JSON ONLY):
    {
      "tmdb_params": {
        "with_genres": "string (IDs)",
        "without_genres": "string (IDs of genres to avoid)",
        "with_keywords": "string (IDs)",
        "with_original_language": "string (ISO 639-1 code)",
        "sort_by": "popularity.desc | vote_average.desc | primary_release_date.desc",
        "vote_average.gte": "string (0-10)",
        "primary_release_date.gte": "YYYY-MM-DD",
        "primary_release_date.lte": "YYYY-MM-DD"
      },
      "explanation": "A sophisticated, empathetic one-sentence explanation of why these films match the soul of their request."
    }

    GENRE ID REFERENCE:
    Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80, Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36, Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, SCIFI: 878, Thriller: 53, War: 10752, Western: 37.

    STRICT RULES:
    - NO Markdown blocks (\`\`\`).
    - Return ONLY valid JSON.
    - If the request is too vague, prioritize 'Drama' (18) and high 'vote_average.gte' (7).
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
