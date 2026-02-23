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
  Sparkles,
} from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Sparkles, label: "Mood Engine", href: "/moods" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/profile/favorites" },
  { icon: Trophy, label: "Live Sports", href: "/matches" },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("hidden md:flex flex-col h-screen w-64 border-r fixed left-0 top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Image src="/logo.png" alt="StreamVibe Logo" width={32} height={32} className="h-8 w-8 object-contain" />
          StreamVibe
        </Link>
      </div>
      <div className="flex-1 px-4 space-y-2 overflow-auto">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "bg-secondary/50 font-bold")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="p-4 border-t">
       <h2>Niki niki</h2>
      </div>
    </div>
  )
}
