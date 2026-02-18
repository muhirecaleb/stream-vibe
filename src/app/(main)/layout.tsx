import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

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
           <Link href="/dashboard" className="md:hidden font-bold flex items-center gap-2">
             <Image src="/logo.png" alt="Logo" width={24} height={24} className="h-6 w-6 object-contain" />
             StreamVibe
           </Link>

           
        </header>

        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
