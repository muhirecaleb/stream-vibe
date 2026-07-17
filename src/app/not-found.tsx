import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      <div className="space-y-6">
        <p className="text-7xl font-bold tracking-tighter text-primary sm:text-8xl">404</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Lost in Space?</h1>
          <p className="mx-auto max-w-md text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved to another galaxy.
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/dashboard">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Decorative background wash */}
      <div className="absolute inset-0 -z-10 bg-radial-[circle_at_center] from-primary/10 to-background" />
    </div>
  );
}
