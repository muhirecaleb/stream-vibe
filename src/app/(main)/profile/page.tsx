import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary ring-1 ring-primary/20">
           JD
        </div>
        <div>
           <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
           <p className="text-sm text-muted-foreground">Member since 2024</p>
        </div>
        <div className="ml-auto">
           <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      <div className="border-t border-border pt-8">
         <h2 className="mb-5 text-xl font-semibold tracking-tight">Continue Watching</h2>
         <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-16 text-sm text-muted-foreground">
            No history yet
         </div>
      </div>

      <div className="border-t border-border pt-8">
         <h2 className="mb-5 text-xl font-semibold tracking-tight">My List</h2>
         <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="text-sm text-muted-foreground">Your list is empty.</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
               <Link href="/dashboard">Browse titles</Link>
            </Button>
         </div>
      </div>
    </div>
  )
}
