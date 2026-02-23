import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MoodBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/5 to-background border border-primary/20 p-8 md:p-12">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            New Feature
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Not sure what to watch?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Try our new <span className="text-primary font-bold">Mood-Based Movie Engine</span>. 
            Tell us how you feel, and we&apos;ll find the perfect film to match your emotional frequency.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="rounded-full gap-2 px-8">
              <Link href="/moods">
                Try Mood Engine
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <div className="grid grid-cols-2 gap-3 rotate-12 scale-110 opacity-40 group-hover:opacity-100 transition-opacity">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-32 rounded-lg bg-secondary animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    </div>
  );
}
