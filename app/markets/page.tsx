"use client"

import { useState } from "react"
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
import { MarketCard } from "@/components/market-card"
import type { Market } from "@/components/market-card"
import { motion } from "framer-motion"

const allCategories = [
  "Todos",
  "Politica",
  "Esportes",
  "Crypto",
  "Economia",
  "Tecnologia",
  "Entretenimento",
]

const allMarkets: Market[] = [
  {
    id: "1",
    slug: "lula-reeleito-2026",
    title: "Lula sera reeleito presidente em 2026?",
    category: "Politica",
    categoryColor: "",
    probabilityYes: 34,
    volume: "R$456K",
    traders: "2.1K",
    closesAt: "Out 2026",
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "bitcoin-150k-2026",
    title: "Bitcoin acima de $150K ate dezembro de 2026?",
    category: "Crypto",
    categoryColor: "",
    probabilityYes: 42,
    volume: "R$234K",
    traders: "1.8K",
    closesAt: "Dez 2026",
    isLive: true,
  },
  {
    id: "3",
    slug: "brasil-copa-2026",
    title: "Brasil vence a Copa do Mundo 2026?",
    category: "Esportes",
    categoryColor: "",
    probabilityYes: 18,
    volume: "R$789K",
    traders: "4.2K",
    closesAt: "Jul 2026",
    isLive: true,
  },
  {
    id: "4",
    slug: "selic-abaixo-10-2026",
    title: "Selic abaixo de 10% ate o fim de 2026?",
    category: "Economia",
    categoryColor: "",
    probabilityYes: 27,
    volume: "R$167K",
    traders: "987",
    closesAt: "Dez 2026",
    isLive: false,
  },
  {
    id: "5",
    slug: "spacex-marte-2030",
    title: "SpaceX pousa com sucesso em Marte ate 2030?",
    category: "Tecnologia",
    categoryColor: "",
    probabilityYes: 12,
    volume: "R$98K",
    traders: "654",
    closesAt: "Dez 2030",
    isLive: false,
  },
  {
    id: "6",
    slug: "ia-agentes-escritorios",
    title: "Mais de 50% dos escritorios usarao agentes IA ate 2027?",
    category: "Tecnologia",
    categoryColor: "",
    probabilityYes: 68,
    volume: "R$312K",
    traders: "1.5K",
    closesAt: "Dez 2027",
    isLive: true,
  },
  {
    id: "7",
    slug: "flamengo-libertadores-2026",
    title: "Flamengo vence a Libertadores 2026?",
    category: "Esportes",
    categoryColor: "",
    probabilityYes: 22,
    volume: "R$345K",
    traders: "3.1K",
    closesAt: "Nov 2026",
    isLive: true,
  },
  {
    id: "8",
    slug: "dolar-abaixo-5-reais",
    title: "Dolar abaixo de R$5.00 em 2026?",
    category: "Economia",
    categoryColor: "",
    probabilityYes: 15,
    volume: "R$523K",
    traders: "2.7K",
    closesAt: "Dez 2026",
    isLive: true,
  },
  {
    id: "9",
    slug: "ethereum-etf-brasil",
    title: "CVM aprova ETF de Ethereum spot no Brasil em 2026?",
    category: "Crypto",
    categoryColor: "",
    probabilityYes: 55,
    volume: "R$187K",
    traders: "1.2K",
    closesAt: "Dez 2026",
    isLive: false,
  },
  {
    id: "10",
    slug: "reforma-tributaria-2026",
    title: "Reforma tributaria totalmente implementada ate 2026?",
    category: "Politica",
    categoryColor: "",
    probabilityYes: 8,
    volume: "R$89K",
    traders: "567",
    closesAt: "Dez 2026",
    isLive: false,
  },
  {
    id: "11",
    slug: "oscar-brasileiro-2027",
    title: "Filme brasileiro ganha Oscar de Melhor Filme Internacional em 2027?",
    category: "Entretenimento",
    categoryColor: "",
    probabilityYes: 9,
    volume: "R$45K",
    traders: "320",
    closesAt: "Mar 2027",
    isLive: false,
  },
  {
    id: "12",
    slug: "tarcisio-governador-2026",
    title: "Tarcisio sera candidato a presidente em 2026?",
    category: "Politica",
    categoryColor: "",
    probabilityYes: 61,
    volume: "R$278K",
    traders: "1.9K",
    closesAt: "Ago 2026",
    isLive: true,
  },
]

type SortKey = "volume" | "traders" | "newest" | "closing_soon"

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortKey>("volume")
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "upcoming">("all")

  const filteredMarkets = allMarkets.filter((m) => {
    const matchesSearch =
      searchQuery === "" ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "Todos" || m.category === selectedCategory
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "live" && m.isLive) ||
      (statusFilter === "upcoming" && !m.isLive)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const activeFilterCount =
    (selectedCategory !== "Todos" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (searchQuery !== "" ? 1 : 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Page header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Mercados
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Explore todos os mercados preditivos disponiveis. Filtre por
              categoria, status ou busque por palavra-chave.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border sticky top-16 z-40 bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mercados..."
                  className="pl-9 bg-secondary border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Limpar</span>
                  </Button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort + Status */}
              <div className="flex items-center gap-2 shrink-0">
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as "all" | "live" | "upcoming")
                  }
                >
                  <SelectTrigger className="w-[130px] bg-secondary border-border text-sm h-9">
                    <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="live">Ao Vivo</SelectItem>
                    <SelectItem value="upcoming">Proximos</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(v) => setSortBy(v as SortKey)}
                >
                  <SelectTrigger className="w-[150px] bg-secondary border-border text-sm h-9">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volume">Maior Volume</SelectItem>
                    <SelectItem value="traders">Mais Traders</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="closing_soon">Fechando Logo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-mono font-semibold text-foreground">
                {filteredMarkets.length}
              </span>{" "}
              mercados encontrados
              {activeFilterCount > 0 && (
                <Button
                  variant="link"
                  className="text-primary p-0 h-auto ml-2 text-xs"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Todos")
                    setStatusFilter("all")
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </p>
          </div>

          {/* Market grid */}
          {filteredMarkets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-secondary mb-4">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">
                Nenhum mercado encontrado
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Tente ajustar seus filtros ou buscar por outro termo.
              </p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
