"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp, BarChart3, HelpCircle, Trophy, Info, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "@/components/search-dialog"
import { MobileMenu } from "@/components/mobile-menu"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/markets", label: "Mercados", icon: BarChart3 },
  { href: "/#como-funciona", label: "Como Funciona", icon: HelpCircle },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/sobre", label: "Sobre", icon: Info },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                CenarioX
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "")))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <SearchDialog />
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative hidden sm:inline-flex">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                2
              </span>
              <span className="sr-only">Notificacoes</span>
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <Link href="/register">Criar Conta</Link>
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
