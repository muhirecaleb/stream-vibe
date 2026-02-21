import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background text-foreground">
      <div className="space-y-6">
        <h1 className="text-9xl font-extrabold tracking-tighter text-primary">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Lost in Space?</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved to another galaxy.
          </p>
        </div>
        
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Decorative stars/background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
    </div>
  );
}
