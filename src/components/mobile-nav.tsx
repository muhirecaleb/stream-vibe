"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Search, Heart, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/profile/favorites" },
  { icon: Trophy, label: "Live Sports", href: "/matches" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
        className="fixed top-3 right-3 z-45 bg-background border"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background p-6 transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="h-6 w-6 object-contain" />
            Epicstream
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === item.href 
                  ? "bg-accent text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
