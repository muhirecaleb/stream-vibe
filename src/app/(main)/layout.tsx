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
      <Sidebar />

      {/* Mobile drawer - kept outside the header's stacking context */}
      <MobileNav />

      <div className="flex min-h-screen flex-1 flex-col md:ml-64">
        <AdvisoryBanner />

        {/* The desktop brand and theme controls live in the sidebar, so this
            header only carries the mobile chrome. */}
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/80 px-5 backdrop-blur-md md:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-bold tracking-tight"
          >
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            Epicstream
          </Link>
        </header>

        <main className="container flex-1 py-8">{children}</main>
      </div>
    </div>
  )
}
