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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Content */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r p-6 shadow-2xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="h-7 w-7 object-contain" />
            StreamVibe
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-lg h-12",
                pathname === item.href && "bg-secondary text-primary font-semibold"
              )}
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-4">Account</p>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
             <Link href="/profile">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  UN
                </div>
                My Profile
             </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
