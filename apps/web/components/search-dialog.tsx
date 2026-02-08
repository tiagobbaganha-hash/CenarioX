"use client"

import { useState } from "react"
import { Search, X, TrendingUp, Clock, BarChart3 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = {
    markets: [
      { id: 1, title: "Lula sera reeleito em 2026?", probability: 34, category: "Politica", volume: "R$123K" },
      { id: 2, title: "Bitcoin acima de $100K ate junho 2026?", probability: 62, category: "Crypto", volume: "R$89K" },
      { id: 3, title: "Brasil vence a Copa do Mundo 2026?", probability: 18, category: "Esportes", volume: "R$456K" },
    ],
    categories: [
      { id: 1, name: "Politica", count: 42 },
      { id: 2, name: "Crypto", count: 38 },
      { id: 3, name: "Esportes", count: 31 },
    ],
    recent: [
      { id: 1, title: "Selic abaixo de 10% em 2026?" },
      { id: 2, title: "SpaceX pousa em Marte ate 2030?" },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar mercados</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="sr-only">Buscar</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar mercados, categorias..."
              className="pl-10 pr-10 py-6 text-lg bg-secondary border-border focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Limpar busca</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Recent searches */}
          {!searchQuery && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Buscas Recentes</h3>
                <Button variant="link" className="text-primary p-0 h-auto text-xs">Limpar</Button>
              </div>
              <div className="space-y-2">
                {searchResults.recent.map((item) => (
                  <Link
                    key={item.id}
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Markets */}
          {searchQuery && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Mercados</h3>
              <div className="space-y-2">
                {searchResults.markets.map((market) => (
                  <Link
                    key={market.id}
                    href="#"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 shrink-0">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{market.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px]">{market.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <BarChart3 className="h-3 w-3" />
                          {market.volume}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-primary">{market.probability}%</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {searchQuery && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                {searchResults.categories.map((category) => (
                  <Link
                    key={category.id}
                    href="#"
                    onClick={() => setIsOpen(false)}
                  >
                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent transition-colors px-3 py-1.5">
                      {category.name}
                      <span className="ml-1.5 text-muted-foreground">{category.count}</span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
