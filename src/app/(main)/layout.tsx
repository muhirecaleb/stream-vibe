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
    <div className="relative flex min-h-screen bg-background text-foreground">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <Sidebar />
      <MobileNav />

      <div className="flex min-h-screen flex-1 flex-col md:ml-64">
        <AdvisoryBanner />

        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/80 px-5 backdrop-blur-md md:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-bold tracking-tight"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/40">
              <Image src="/logo.png" alt="" width={18} height={18} className="object-contain" />
            </div>
            Epicstream
          </Link>
        </header>

        <main className="container flex-1 py-8">{children}</main>
      </div>
    </div>
  )
}
