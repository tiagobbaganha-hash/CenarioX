import Link from "next/link"
import { ArrowRight, TrendingUp, Flame, Clock, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { MarketCard } from "@/components/market-card"
import { HowItWorks } from "@/components/how-it-works"
import { ActivityTicker } from "@/components/activity-ticker"
import type { Market } from "@/components/market-card"

const featuredMarkets: Market[] = [
  {
    id: "1",
    slug: "lula-reeleito-2026",
    title: "Lula sera reeleito presidente em 2026?",
    category: "Politica",
    categoryColor: "bg-blue-500/10 text-blue-400",
    probabilityYes: 34,
    volume: "R$456K",
    traders: "2.1K",
    closesAt: "Out 2026",
    image: "/images/markets/politica-eleicao.jpg",
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "bitcoin-100k-2026",
    title: "Bitcoin acima de $150K ate dezembro de 2026?",
    category: "Crypto",
    categoryColor: "bg-amber-500/10 text-amber-400",
    probabilityYes: 42,
    volume: "R$234K",
    traders: "1.8K",
    closesAt: "Dez 2026",
    image: "/images/markets/bitcoin-150k.jpg",
    isLive: true,
  },
  {
    id: "3",
    slug: "brasil-copa-2026",
    title: "Brasil vence a Copa do Mundo 2026?",
    category: "Esportes",
    categoryColor: "bg-green-500/10 text-green-400",
    probabilityYes: 18,
    volume: "R$789K",
    traders: "4.2K",
    closesAt: "Jul 2026",
    image: "/images/markets/brasil-copa.jpg",
    isLive: true,
  },
  {
    id: "4",
    slug: "selic-abaixo-10-2026",
    title: "Selic abaixo de 10% ate o fim de 2026?",
    category: "Economia",
    categoryColor: "bg-cyan-500/10 text-cyan-400",
    probabilityYes: 27,
    volume: "R$167K",
    traders: "987",
    closesAt: "Dez 2026",
    image: "/images/markets/selic-economia.jpg",
    isLive: false,
  },
  {
    id: "5",
    slug: "spacex-marte-2030",
    title: "SpaceX pousa com sucesso em Marte ate 2030?",
    category: "Tecnologia",
    categoryColor: "bg-purple-500/10 text-purple-400",
    probabilityYes: 12,
    volume: "R$98K",
    traders: "654",
    closesAt: "Dez 2030",
    image: "/images/markets/spacex-marte.jpg",
    isLive: false,
  },
  {
    id: "6",
    slug: "ia-substituir-empregos",
    title: "Mais de 50% dos escritorios usarao agentes IA ate 2027?",
    category: "Tecnologia",
    categoryColor: "bg-purple-500/10 text-purple-400",
    probabilityYes: 68,
    volume: "R$312K",
    traders: "1.5K",
    closesAt: "Dez 2027",
    image: "/images/markets/ia-agentes.jpg",
    isLive: true,
  },
]

const trendingMarkets: Market[] = [
  {
    id: "7",
    slug: "flamengo-libertadores-2026",
    title: "Flamengo vence a Libertadores 2026?",
    category: "Esportes",
    categoryColor: "bg-green-500/10 text-green-400",
    probabilityYes: 22,
    volume: "R$345K",
    traders: "3.1K",
    closesAt: "Nov 2026",
    image: "/images/markets/flamengo-libertadores.jpg",
    isLive: true,
  },
  {
    id: "8",
    slug: "dolar-abaixo-5-reais",
    title: "Dolar abaixo de R$5.00 em 2026?",
    category: "Economia",
    categoryColor: "bg-cyan-500/10 text-cyan-400",
    probabilityYes: 15,
    volume: "R$523K",
    traders: "2.7K",
    closesAt: "Dez 2026",
    image: "/images/markets/dolar-real.jpg",
    isLive: true,
  },
  {
    id: "9",
    slug: "ethereum-etf-brasil",
    title: "CVM aprova ETF de Ethereum spot no Brasil em 2026?",
    category: "Crypto",
    categoryColor: "bg-amber-500/10 text-amber-400",
    probabilityYes: 55,
    volume: "R$187K",
    traders: "1.2K",
    closesAt: "Dez 2026",
    image: "/images/markets/ethereum-etf.jpg",
    isLive: false,
  },
  {
    id: "10",
    slug: "reforma-tributaria-2026",
    title: "Reforma tributaria totalmente implementada ate 2026?",
    category: "Politica",
    categoryColor: "bg-blue-500/10 text-blue-400",
    probabilityYes: 8,
    volume: "R$89K",
    traders: "567",
    closesAt: "Dez 2026",
    image: "/images/markets/reforma-tributaria.jpg",
    isLive: false,
  },
]

const categories = [
  { name: "Politica", count: 42, icon: "🏛" },
  { name: "Esportes", count: 31, icon: "⚽" },
  { name: "Crypto", count: 38, icon: "₿" },
  { name: "Economia", count: 24, icon: "📊" },
  { name: "Tecnologia", count: 19, icon: "💻" },
  { name: "Entretenimento", count: 15, icon: "🎬" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <ActivityTicker />
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* Stats Bar */}
        <StatsBar />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/markets">
                  Ver Todos os Mercados
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-y border-border bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Categorias</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href="#"
                  className="flex flex-col items-center justify-center p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-200 group"
                >
                  <span className="text-2xl mb-2" role="img" aria-label={cat.name}>{cat.icon}</span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">{cat.count} mercados</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Markets */}
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
