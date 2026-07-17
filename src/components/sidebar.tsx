"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Search, 
  Heart,
  Trophy,
} from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/profile/favorites" },
  { icon: Trophy, label: "Live Sports", href: "/matches" },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div 
      className={cn("hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-background border-r", className)}
    >
      <div className="p-6">
        <Link href="/dashboard" className="text-xl font-semibold text-white flex items-center gap-2">
          <Image src="/logo.png" alt="epicstream Logo" width={28} height={28} className="h-7 w-7 object-contain" />
          Epicstream
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-auto">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start", 
              pathname === item.href ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
