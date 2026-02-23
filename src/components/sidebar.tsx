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
    <div 
      className={cn("hidden md:flex flex-col h-screen w-64 border-r fixed left-0 top-0 z-50", className)}
      style={{ backgroundColor: '#000000', opacity: 1 }}
    >
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Image src="/logo.png" alt="StreamVibe Logo" width={32} height={32} className="h-8 w-8 object-contain" />
          StreamVibe
        </Link>
      </div>
      <div className="flex-1 px-4 space-y-2 overflow-auto">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start transition-all duration-200", 
              pathname === item.href ? "bg-white text-black font-bold hover:bg-white/90" : "text-white/70 hover:text-white hover:bg-white/10"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3">
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-medium text-white truncate">Niki niki</p>
           </div>
        </div>
      </div>
    </div>
  )
}
