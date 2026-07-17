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
    <div className="flex min-h-screen">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <AdvisoryBanner />
        
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-background px-6">
           <Link href="/dashboard" className="md:hidden font-medium text-sm flex items-center gap-2">
             <Image src="/logo.png" alt="Logo" width={20} height={20} className="h-5 w-5 object-contain" />
             Epicstream
           </Link>
           <div className="md:hidden" /> 
        </header>

        <main className="container py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
