"use client";

import { useState, useEffect } from "react";
import { tmdb, Movie } from "@/services/tmdb";
import { MovieGrid } from "@/components/dashboard/movie-grid";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Zap, Ghost, Smile, Compass, Flame, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMoviesByVibeAction } from "@/app/actions/ai-actions";

const MOODS = [
  {
    id: "lost",
    label: "I feel lost",
    description: "Deep, thought-provoking stories to get lost in.",
    icon: Compass,
    color: "from-blue-600/20 to-indigo-600/20",
    hoverColor: "hover:border-blue-500/50",
    activeColor: "border-blue-500 bg-blue-500/10",
  },
  {
    id: "comforting",
    label: "I want something comforting",
    description: "Feel-good movies that feel like a warm hug.",
    icon: Heart,
    color: "from-pink-600/20 to-rose-600/20",
    hoverColor: "hover:border-pink-500/50",
    activeColor: "border-pink-500 bg-pink-500/10",
  },
  {
    id: "motivated",
    label: "I want to feel motivated",
    description: "Inspiring journeys and high-stakes action.",
    icon: Zap,
    color: "from-amber-600/20 to-orange-600/20",
    hoverColor: "hover:border-amber-500/50",
    activeColor: "border-amber-500 bg-amber-500/10",
  },
  {
    id: "chaotic-funny",
    label: "Something chaotic but funny",
    description: "Absurd, dark humor and wild scenarios.",
    icon: Smile,
    color: "from-emerald-600/20 to-teal-600/20",
    hoverColor: "hover:border-emerald-500/50",
    activeColor: "border-emerald-500 bg-emerald-500/10",
  },
  {
    id: "thrilled",
    label: "I want to be thrilled",
    description: "Edge-of-your-seat suspense and mysteries.",
    icon: Ghost,
    color: "from-purple-600/20 to-fuchsia-600/20",
    hoverColor: "hover:border-purple-500/50",
    activeColor: "border-purple-500 bg-purple-500/10",
  },
  {
    id: "romantic",
    label: "I'm feeling romantic",
    description: "Sweet stories of love and connection.",
    icon: Flame,
    color: "from-red-600/20 to-orange-600/20",
    hoverColor: "hover:border-red-500/50",
    activeColor: "border-red-500 bg-red-500/10",
  },
];

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

  useEffect(() => {
    if (selectedMood && selectedMood !== "custom") {
      const fetchMovies = async () => {
        setIsLoading(true);
        setAiExplanation(null);
        try {
          const data = await tmdb.getByMood(selectedMood);
          setMovies(data.results);
        } catch (error) {
          console.error("Failed to fetch mood movies:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovies();
    }
  }, [selectedMood]);

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Powered by Mood AI
        </div>
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
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-foreground placeholder:text-muted-foreground"
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
                  <Sparkles className="h-4 w-4" />
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-muted/30"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Or choose a preset mood</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {MOODS.map((mood) => {
          const Icon = mood.icon;
          const isActive = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={cn(
                "relative group flex flex-col items-start p-6 rounded-2xl border bg-card transition-all duration-300 text-left overflow-hidden",
                mood.hoverColor,
                isActive ? mood.activeColor : "hover:scale-[1.02] hover:shadow-xl"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                mood.color
              )} />
              
              <div className="relative z-10 w-full">
                <div className={cn(
                  "p-3 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300",
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{mood.label}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {mood.description}
                </p>
              </div>

              {isActive && (
                <div className="absolute top-4 right-4">
                   <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-primary/20 pt-12 gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  {selectedMood === "custom" ? "Your Cinematic Match" : "Recommended for you"}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {selectedMood === "custom" ? (
                    <span className="italic text-primary">
                      &ldquo;{aiExplanation || "Analyzing your vibe to find the perfect cinematic experience..."}&rdquo;
                    </span>
                  ) : (
                    <>Movies matching the <span className="text-primary font-medium">{MOODS.find(m => m.id === selectedMood)?.label.toLowerCase()}</span> vibe.</>
                  )}
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
