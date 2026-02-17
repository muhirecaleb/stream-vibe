import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/theme-toggle"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Hidden on mobile by default (controlled by CSS in Sidebar component) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 transition-[margin] duration-200 ease-in-out">
        {/* Top Header for Mobile or Global Actions */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
           {/* Mobile Menu Trigger would go here */}
           <div className="md:hidden font-bold">StreamVibe</div>

           <div className="flex items-center gap-4 ml-auto">
             <ModeToggle />
             {/* User Profile Dropdown would go here */}
             <div className="h-8 w-8 rounded-full bg-primary/20" />
           </div>
        </header>

        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
