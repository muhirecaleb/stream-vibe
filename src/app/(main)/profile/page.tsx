import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/dashboard/movie-grid"

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-lg font-medium text-muted-foreground">
           JD
        </div>
        <div>
           <h1 className="text-xl font-semibold">John Doe</h1>
           <p className="text-sm text-muted-foreground">Member since 2024</p>
        </div>
        <div className="ml-auto">
           <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </div>

      <div className="border-t pt-6">
         <h2 className="text-base font-semibold mb-4">Continue Watching</h2>
         <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground max-w-md">
            No history yet
         </div>
      </div>

      <div className="border-t pt-6">
         <MovieGrid title="My List" movies={[]} />
         <p className="text-center py-8 text-sm text-muted-foreground">
            Your list is empty.
         </p>
      </div>
    </div>
  )
}
