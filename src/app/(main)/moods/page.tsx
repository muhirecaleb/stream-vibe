"use client";

import { useState } from "react";
import { Movie } from "@/services/tmdb";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getMoviesByVibeAction } from "@/app/actions/ai-actions";



export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [vibePrompt, setVibePrompt] = useState("");
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleVibeSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!vibePrompt.trim() || isLoading) return;

    setIsLoading(true);
    setSelectedMood("custom");
    try {
      const result = await getMoviesByVibeAction(vibePrompt);
      setMovies(result.movies);
      setAiExplanation(result.explanation);
    } catch (error) {
      console.error("Vibe search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* Removed preset mood effect as we are focusing on AI search only */

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          How are you feeling today?
        </h1>
        <p className="text-muted-foreground text-lg">
          Forget genres. Tell us your vibe, and let our engine map the emotional trajectory for you.
        </p>

        <form 
          onSubmit={handleVibeSearch}
          className="mt-8 relative group max-w-xl mx-auto"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative flex items-center bg-card border rounded-2xl p-2 shadow-xl">
            <input
              type="text"
              value={vibePrompt}
              onChange={(e) => setVibePrompt(e.target.value)}
              placeholder="Describe your vibe (e.g., 'A rainy night in Paris with a mystery')..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !vibePrompt.trim()}
              className="rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>Match Vibe</span>
                </div>
              )}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold px-2">Popular:</span>
            {["High stakes", "Redemption arc", "Nostalgic", "Unreliable narrator"].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setVibePrompt(tag)}
                className="text-xs px-2 py-1 rounded-md bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>



      {selectedMood && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-primary/20 pt-12 gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Your Cinematic Match
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  <span className="italic text-primary">
                    &ldquo;{aiExplanation || "Analyzing your vibe to find the perfect cinematic experience..."}&rdquo;
                  </span>
                </p>
              </div>
              <Button variant="outline" className="gap-2 rounded-full border-primary/20 hover:bg-primary/5" onClick={() => setSelectedMood(null)}>
                Clear Vibe
              </Button>
           </div>

           {isLoading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="aspect-[2/3] rounded-xl bg-secondary animate-pulse" />
               ))}
             </div>
           ) : (
             <MovieGrid title="" movies={movies} />
           )}
        </div>
      )}
    </div>
  );
}
