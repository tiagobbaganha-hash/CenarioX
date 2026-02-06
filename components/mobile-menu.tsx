"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, TrendingUp, BarChart3, HelpCircle, Trophy, Info, LogIn, UserPlus, Users } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-card border-border p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary">
              <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            CenarioX
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full py-4">
          <div className="px-4 space-y-1">
            {[
              { href: "/markets", label: "Mercados", icon: BarChart3 },
              { href: "/#como-funciona", label: "Como Funciona", icon: HelpCircle },
              { href: "/ranking", label: "Ranking", icon: Trophy },
              { href: "/sobre", label: "Sobre", icon: Info },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="px-4 space-y-2">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent" onClick={() => setOpen(false)}>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
            <Button asChild className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpen(false)}>
              <Link href="/register">
                <UserPlus className="mr-2 h-4 w-4" />
                Criar Conta
              </Link>
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="px-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
              Categorias
            </h3>
            <div className="space-y-1">
              {["Politica", "Esportes", "Crypto", "Economia", "Tecnologia", "Entretenimento"].map(
                (category) => (
                  <Link
                    key={category}
                    href="#"
                    className="flex items-center px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {category}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
