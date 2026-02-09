"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, Flame, Clock, BarChart3 } from "lucide-react"
import { ActivityTicker } from "@/components/activity-ticker"
import { AnimatedBackground } from "@/components/animated-background"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { MarketCard, type Market as CardMarket } from "@/components/market-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StatsBar } from "@/components/stats-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ApiMarket = {
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

type MarketStats = {
  total: number
  active: number
  closed: number
  resolved: number
  totalVolume: number
  totalTrades: number
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value)

const categories = [
  { name: "Politica", count: 42, icon: "🏛" },
  { name: "Esportes", count: 31, icon: "⚽" },
  { name: "Cripto", count: 28, icon: "₿" },
  { name: "Economia", count: 19, icon: "📊" },
  { name: "Tecnologia", count: 15, icon: "💻" },
  { name: "Entretenimento", count: 12, icon: "🎬" },
]

export default function HomePage() {
  const [markets, setMarkets] = useState<ApiMarket[]>([])
  const [stats, setStats] = useState<MarketStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: "/markets",
            method: "GET",
          }),
        })

        if (!response.ok) {
          throw new Error(\`Erro ao buscar mercados: \${response.status}\`)
        }

        const data = await response.json()
        
        if (!data.markets || data.markets.length === 0) {
          console.log("Nenhum mercado encontrado, executando seed...")
          
          const seedResponse = await fetch("/api/proxy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              endpoint: "/markets/seed",
              method: "POST",
            }),
          })

          if (seedResponse.ok) {
            const seedData = await seedResponse.json()
            setMarkets(seedData.markets || [])
            setStats(seedData.stats || null)
          }
        } else {
          setMarkets(data.markets)
          setStats(data.stats || null)
        }
      } catch (err) {
        console.error("Erro ao carregar mercados:", err)
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  const featuredMarkets = useMemo<CardMarket[]>(
    () =>
      markets.slice(0, 6).map((market) => ({
        id: market.id,
        title: market.title,
        category: market.category,
        categoryColor: "bg-primary/10 text-primary",
        probabilityYes: Math.round(market.yes_price * 100),
        priceYes: formatCurrency(market.yes_price),
        priceNo: formatCurrency(market.no_price),
        volume: formatCurrency(market.total_volume),
        traders: market.total_trades.toString(),
        closesAt: new Date(market.closes_at).toLocaleDateString("pt-BR"),
        isLive: market.status === "active",
      })),
    [markets]
  )

  const trendingMarkets = useMemo<CardMarket[]>(
    () =>
      markets.slice(6, 10).map((market) => ({
        id: market.id,
        title: market.title,
        category: market.category,
        categoryColor: "bg-primary/10 text-primary",
        probabilityYes: Math.round(market.yes_price * 100),
        priceYes: formatCurrency(market.yes_price),
        priceNo: formatCurrency(market.no_price),
        volume: formatCurrency(market.total_volume),
        traders: market.total_trades.toString(),
        closesAt: new Date(market.closes_at).toLocaleDateString("pt-BR"),
        isLive: market.status === "active",
      })),
    [markets]
  )

  const statsItems = stats
    ? [
        {
          label: "Volume Negociado",
          value: formatCurrency(stats.totalVolume),
          suffix: "",
        },
        {
          label: "Mercados Ativos",
          value: stats.active.toLocaleString("pt-BR"),
          suffix: "",
        },
        {
          label: "Trades",
          value: stats.totalTrades.toLocaleString("pt-BR"),
          suffix: "",
        },
        {
          label: "Resolucao",
          value: stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0,
          suffix: "%",
        },
      ]
    : undefined

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* Stats Bar */}
        <StatsBar stats={statsItems} />

        {/* Featured Markets */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                  <Flame className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Mercados em Destaque</h2>
              </div>
              <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                <Link href="/markets">
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {loading ? (
              <div className="rounded-lg border border-border bg-card/60 p-6 text-sm text-muted-foreground">
                Carregando mercados...
              </div>
            ) : error ? (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-sm text-destructive">
                {error}
              </div>
            ) : featuredMarkets.length === 0 ? (
              <div className="rounded-lg border border-border bg-card/60 p-6 text-sm text-muted-foreground">
                Nenhum mercado disponivel no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Explorar por Categoria</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={\`/markets?category=\${category.name.toLowerCase()}\`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card/60 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:bg-card/80"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {category.count} mercados
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Markets */}
        {!loading && !error && trendingMarkets.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Em Alta</h2>
                </div>
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                  <Link href="/markets">
                    Ver Todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <div className="border-t border-border bg-card/30">
          <HowItWorks />
        </div>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Pronto para negociar o futuro?
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Crie sua conta gratuita e comece a operar em mercados preditivos com Pix instantaneo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-semibold">
                  <Link href="/register">
                    Criar Conta Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent px-8 h-12 text-base">
                  <Link href="/markets">
                    Explorar Mercados
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
