import { Sidebar } from "@/components/sidebar"
import { AdvisoryBanner } from "@/components/advisory-banner"
import { MobileNav } from "@/components/mobile-nav"
import Image from "next/image"
import Link from "next/link"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* Sidebar - Hidden on mobile by default */}
      <Sidebar />
      
      {/* Mobile Sidebar - Separated from header stacking context */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen bg-black">
        <AdvisoryBanner />
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-black px-6">
           <Link href="/dashboard" className="md:hidden font-bold flex items-center gap-2">
             <Image src="/logo.png" alt="Logo" width={24} height={24} className="h-6 w-6 object-contain" />
             StreamVibe
           </Link>
           
           {/* Only the trigger button will be seen here if we position it right, 
               but for now let's just ensure the layout is clean. */}
           <div className="md:hidden" /> 
        </header>

        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
