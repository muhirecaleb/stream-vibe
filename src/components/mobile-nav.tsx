"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Search, Heart, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Sparkles, label: "Mood Engine", href: "/moods" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/profile/favorites" },
  { icon: Trophy, label: "Live Sports", href: "/matches" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Trigger Button - Fixed to Top Right to stay consistent */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-3 right-4 z-[45] bg-black border border-white/10 hover:bg-white/10"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Actual Sidebar Content */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-[110] w-[300px] p-6 shadow-2xl transition-transform duration-300 ease-in-out transform border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* FORCED SOLID BLACK LAYER */}
        <div className="absolute inset-0 bg-black z-[-1]" style={{ opacity: 1 }} />
        
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="flex items-center gap-2 font-black text-2xl text-white">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
            StreamVibe
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="space-y-6">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-xl h-14 transition-all rounded-xl",
                pathname === item.href 
                  ? "bg-white text-black font-black shadow-xl" 
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <item.icon className="mr-5 h-6 w-6" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-6 right-6">
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                SV
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-tighter">Guest Mode</p>
                <p className="text-[10px] text-white/40 uppercase font-medium">Free Tier</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
