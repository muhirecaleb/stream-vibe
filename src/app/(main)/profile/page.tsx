import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/dashboard/movie-grid"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
           JD
        </div>
        <div>
           <h1 className="text-3xl font-bold">John Doe</h1>
           <p className="text-muted-foreground">Member since 2024</p>
        </div>
        <div className="ml-auto">
           <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      <div className="border-t pt-6">
         <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for Continue Watching */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
               No history yet
            </div>
         </div>
      </div>

      <div className="border-t pt-6">
         {/* Reusing MovieGrid with empty list or placeholders if we had them */}
         <MovieGrid title="My List" movies={[]} />
         <div className="text-center py-10 text-muted-foreground">
            Your list is empty. Start adding movies!
         </div>
      </div>
    </div>
  )
}
