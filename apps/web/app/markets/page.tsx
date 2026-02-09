"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  Flame,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

interface Market {
  id: string
  title: string
  description: string
  category: string
  status: string
  yes_price: number
  no_price: number
  total_volume: number
  liquidity: number
  total_trades: number
  closes_at: string
  created_at: string
}

const categoryMap: Record<string, string> = {
  crypto: "Crypto",
  politics: "Política",
  sports: "Esportes",
  economy: "Economia",
  technology: "Tecnologia",
  entertainment: "Entretenimento",
}

const categoryColors: Record<string, string> = {
  crypto: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  politics: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  sports: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  economy: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  technology: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
  entertainment: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
}

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("volume")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMarkets() {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:4000/markets')
        if (!response.ok) {
          throw new Error('Falha ao buscar markets')
        }
        const data = await response.json()
        setMarkets(data)
        setFilteredMarkets(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        console.error('Erro ao buscar markets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  useEffect(() => {
    let result = [...markets]

    // Filtro por categoria
    if (selectedCategory !== "all") {
      result = result.filter(m => m.category === selectedCategory)
    }

    // Filtro por busca
    if (searchQuery) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Ordenação
    switch (sortBy) {
      case "volume":
        result.sort((a, b) => b.total_volume - a.total_volume)
        break
      case "probability":
        result.sort((a, b) => b.yes_price - a.yes_price)
        break
      case "recent":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "closing":
        result.sort((a, b) => new Date(a.closes_at).getTime() - new Date(b.closes_at).getTime())
        break
    }

    setFilteredMarkets(result)
  }, [markets, selectedCategory, searchQuery, sortBy])

  const allCategories = ["all", ...Object.keys(categoryMap)]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-background to-muted/20 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4" variant="secondary">
                  <Flame className="mr-1 h-3 w-3" />
                  {markets.length} Mercados Ativos
                </Badge>
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  Explore Mercados de Predição
                </h1>
                <p className="text-lg text-muted-foreground">
                  Negocie em eventos futuros e ganhe com suas previsões. Transparente, descentralizado e justo.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b bg-background py-6">
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar mercados..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volume">Maior Volume</SelectItem>
                    <SelectItem value="probability">Maior Probabilidade</SelectItem>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="closing">Fechando em Breve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {allCategories.map((category) => {
                const isActive = selectedCategory === category
                const displayName = category === "all" ? "Todos" : categoryMap[category]
                
                return (
                  <Button
                    key={category}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={isActive ? "" : ""}
                  >
                    {displayName}
                    {category !== "all" && (
                      <Badge variant="secondary" className="ml-2">
                        {markets.filter(m => m.category === category).length}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Markets Grid */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Carregando mercados...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-destructive mb-2">Erro ao carregar mercados</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            ) : filteredMarkets.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground">Nenhum mercado encontrado</p>
                  <Button className="mt-4" variant="outline" onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}>
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMarkets.map((market, index) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/markets/${market.id}`}>
                      <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
                        {/* Category Badge */}
                        <div className="mb-3 flex items-center justify-between">
                          <Badge className={categoryColors[market.category] || "bg-gray-500/10 text-gray-500"}>
                            {categoryMap[market.category] || market.category}
                          </Badge>
                          {market.status === "active" && (
                            <Badge variant="outline" className="text-xs">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Ativo
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                          {market.title}
                        </h3>

                        {/* Description */}
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          {market.description}
                        </p>

                        {/* Probability Bar */}
                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-green-500">
                              Sim {Math.round(market.yes_price * 100)}%
                            </span>
                            <span className="font-medium text-red-500">
                              Não {Math.round(market.no_price * 100)}%
                            </span>
                          </div>
                          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all"
                              style={{ width: `${market.yes_price * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            <span>R$ {(market.total_volume / 1000).toFixed(1)}K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{market.total_trades}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(market.closes_at).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 border-2 border-primary/0 rounded-lg transition-colors group-hover:border-primary/20" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
