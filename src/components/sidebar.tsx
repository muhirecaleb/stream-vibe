"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/theme-toggle"
import { Home, Search, Heart, Trophy, Sparkles } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/profile/favorites" },
  { icon: Trophy, label: "Live Sports", href: "/matches" },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-border bg-surface md:flex",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/40">
            <Image src="/logo.png" alt="" width={22} height={22} className="object-contain" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Epicstream
          </span>
        </Link>
      </div>

      {/* New badge */}
      <div className="mx-4 mb-2 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-3 py-2.5">
        <Sparkles className="h-4 w-4 text-primary" />
        <div>
          <p className="text-xs font-semibold text-primary">New this week</p>
          <p className="text-[11px] text-muted-foreground">Fresh titles added daily</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-auto px-3 py-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Menu
        </p>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110", isActive && "drop-shadow-sm")} />
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/70" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Appearance</span>
          <ModeToggle />
        </div>
      </div>
    </aside>
  )
}
