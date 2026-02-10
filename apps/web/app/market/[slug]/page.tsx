"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  Share2,
  BookmarkPlus,
  Info,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  MessageSquare,
  CheckSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

// Mock market data
const market = {
  id: "1",
  slug: "lula-reeleito-2026",
  title: "Lula sera reeleito presidente em 2026?",
  description:
    "Este mercado resolve como SIM se Luiz Inacio Lula da Silva for eleito presidente do Brasil nas eleicoes de 2026. Considera-se tanto o primeiro quanto o segundo turno. O mercado resolve como NAO se qualquer outro candidato vencer a eleicao presidencial.",
  category: "Politica",
  probabilityYes: 34,
  volume: "R$456.230",
  traders: 2100,
  palpites: 48,
  comments: 12,
  closesAt: "5 de Outubro, 2026",
  createdAt: "15 de Janeiro, 2025",
  isLive: true,
  image: "/images/markets/politica-eleicao.jpg",
  suggestedBy: "0xb79D...AeD1",
  resolutionSource: "Tribunal Superior Eleitoral (TSE)",
  resolutionCriteria:
    "Resultado oficial declarado pelo TSE apos a apuracao completa dos votos.",
}

const orderBook = {
  bids: [
    { price: 0.33, quantity: 1200, total: "R$396" },
    { price: 0.32, quantity: 3400, total: "R$1.088" },
    { price: 0.31, quantity: 5600, total: "R$1.736" },
    { price: 0.30, quantity: 8900, total: "R$2.670" },
    { price: 0.29, quantity: 12300, total: "R$3.567" },
  ],
  asks: [
    { price: 0.35, quantity: 980, total: "R$343" },
    { price: 0.36, quantity: 2100, total: "R$756" },
    { price: 0.37, quantity: 4500, total: "R$1.665" },
    { price: 0.38, quantity: 7200, total: "R$2.736" },
    { price: 0.39, quantity: 9800, total: "R$3.822" },
  ],
}

const recentTrades = [
  { side: "buy", price: 0.34, quantity: 150, time: "2 min atras", user: "trader_123" },
  { side: "sell", price: 0.34, quantity: 80, time: "5 min atras", user: "maria_invest" },
  { side: "buy", price: 0.33, quantity: 500, time: "12 min atras", user: "joao_pred" },
  { side: "sell", price: 0.35, quantity: 200, time: "18 min atras", user: "carlos_mk" },
  { side: "buy", price: 0.33, quantity: 340, time: "25 min atras", user: "ana_trader" },
  { side: "buy", price: 0.32, quantity: 1000, time: "32 min atras", user: "pedro_inv" },
  { side: "sell", price: 0.35, quantity: 120, time: "41 min atras", user: "lucas_bet" },
  { side: "buy", price: 0.33, quantity: 670, time: "55 min atras", user: "julia_fx" },
]

const comments = [
  {
    user: "AnalistaPolitico",
    avatar: "AP",
    time: "2h atras",
    text: "Considerando as pesquisas recentes, acho que o mercado esta subestimando a chance de reeleicao. Historicamente, presidentes em exercicio tem vantagem.",
    likes: 24,
  },
  {
    user: "EconomistaChefe",
    avatar: "EC",
    time: "5h atras",
    text: "O cenario economico vai ser determinante. Se a inflacao ficar controlada, as chances aumentam consideravelmente.",
    likes: 18,
  },
  {
    user: "DataAnalyst",
    avatar: "DA",
    time: "8h atras",
    text: "Cruzando dados de aprovacao com resultados eleitorais historicos, 34% me parece justo para o momento atual. Muita coisa pode mudar.",
    likes: 12,
  },
]

// Mock probability history for the chart
const probabilityHistory = [32, 35, 33, 38, 36, 34, 37, 35, 33, 31, 34, 36, 34]

export default function MarketDetailPage() {
  const [buyAmount, setBuyAmount] = useState("")
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes")
  const probabilityNo = 100 - marketData.probabilityYes

  const potentialPayout = buyAmount
    ? selectedSide === "yes"
      ? (Number.parseFloat(buyAmount) / (marketData.probabilityYes / 100)).toFixed(2)
      : (Number.parseFloat(buyAmount) / (probabilityNo / 100)).toFixed(2)
    : "0.00"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/markets" className="hover:text-foreground transition-colors">
                Mercados
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {marketData.category}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero banner image */}
        <div className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
          <Image
            src={marketData.image || "/placeholder.svg"}
            alt={marketData.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Suggested by badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
              Sugerido por {marketData.suggestedBy}
            </Badge>
          </div>
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              {marketData.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Market info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Market header stats */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{marketData.category}</Badge>
                  {marketData.isLive && (
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      <span className="text-xs font-medium text-primary">AO VIVO</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  {marketData.description}
                </p>

                {/* Stats row like the reference */}
                <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare className="h-4 w-4" />
                    <span className="text-foreground font-semibold">{marketData.palpites}</span> Palpites
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-foreground font-semibold">{marketData.comments}</span> Comentarios
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="h-4 w-4" />
                    Valor transacionado <span className="text-primary font-semibold font-mono">{marketData.volume}</span>
                  </span>
                  <Badge variant="outline" className="bg-transparent gap-1.5">
                    <span className="font-semibold">{marketData.category}</span>
                  </Badge>
                </div>

                {/* Probability display */}
                <div className="flex items-center gap-6 mb-4">
                  <div>
                    <span className="text-4xl font-bold font-mono text-success">
                      {marketData.probabilityYes}%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">Sim</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold font-mono text-destructive">
                      {probabilityNo}%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">Nao</span>
                  </div>
                </div>

                {/* Probability bar */}
                <div className="h-3 rounded-full bg-secondary overflow-hidden flex mb-4">
                  <motion.div
                    className="h-full bg-success rounded-l-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${marketData.probabilityYes}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <motion.div
                    className="h-full bg-destructive rounded-r-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${probabilityNo}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {marketData.traders.toLocaleString()} traders
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Fecha em {marketData.closesAt}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm" className="bg-transparent text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent text-muted-foreground">
                    <BookmarkPlus className="h-4 w-4 mr-1.5" />
                    Salvar
                  </Button>
                </div>
              </div>

              {/* Probability chart placeholder */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Historico de Probabilidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end gap-1">
                    {probabilityHistory.map((prob, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-primary/20 rounded-t-sm relative group"
                        initial={{ height: 0 }}
                        animate={{ height: `${(prob / 50) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded px-1.5 py-0.5 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {prob}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
                    <span>Jan</span>
                    <span>Fev</span>
                    <span>Mar</span>
                    <span>Abr</span>
                    <span>Mai</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Ago</span>
                    <span>Set</span>
                    <span>Out</span>
                    <span>Nov</span>
                    <span>Dez</span>
                    <span>Hoje</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs: Order Book, Trades, Comments */}
              <Tabs defaultValue="orderbook">
                <TabsList className="bg-secondary w-full grid grid-cols-3">
                  <TabsTrigger value="orderbook">Order Book</TabsTrigger>
                  <TabsTrigger value="trades">Trades Recentes</TabsTrigger>
                  <TabsTrigger value="comments">Comentarios</TabsTrigger>
                </TabsList>

                <TabsContent value="orderbook" className="mt-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-2">
                        {/* Bids */}
                        <div className="p-4 border-r border-border">
                          <h4 className="text-xs font-semibold text-success uppercase tracking-wider mb-3">
                            Compras (Bids)
                          </h4>
                          <div className="space-y-1.5">
                            {orderBook.bids.map((bid, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-xs relative"
                              >
                                <div
                                  className="absolute inset-0 bg-success/5 rounded-sm"
                                  style={{ width: `${(bid.quantity / 12300) * 100}%` }}
                                />
                                <span className="font-mono text-success relative z-10">
                                  R${bid.price.toFixed(2)}
                                </span>
                                <span className="font-mono text-muted-foreground relative z-10">
                                  {bid.quantity.toLocaleString()}
                                </span>
                                <span className="font-mono text-muted-foreground relative z-10">
                                  {bid.total}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Asks */}
                        <div className="p-4">
                          <h4 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3">
                            Vendas (Asks)
                          </h4>
                          <div className="space-y-1.5">
                            {orderBook.asks.map((ask, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-xs relative"
                              >
                                <div
                                  className="absolute inset-0 bg-destructive/5 rounded-sm"
                                  style={{ width: `${(ask.quantity / 9800) * 100}%` }}
                                />
                                <span className="font-mono text-destructive relative z-10">
                                  R${ask.price.toFixed(2)}
                                </span>
                                <span className="font-mono text-muted-foreground relative z-10">
                                  {ask.quantity.toLocaleString()}
                                </span>
                                <span className="font-mono text-muted-foreground relative z-10">
                                  {ask.total}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trades" className="mt-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {recentTrades.map((trade, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 text-sm border-b border-border last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              {trade.side === "buy" ? (
                                <ArrowUp className="h-4 w-4 text-success" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-destructive" />
                              )}
                              <span className="font-mono text-xs text-muted-foreground">
                                {trade.user}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="font-mono">
                                R${trade.price.toFixed(2)}
                              </span>
                              <span className="font-mono text-muted-foreground">
                                x{trade.quantity}
                              </span>
                              <span className="text-muted-foreground w-20 text-right">
                                {trade.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comments" className="mt-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {comments.map((comment, i) => (
                          <div
                            key={i}
                            className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                          >
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback className="bg-secondary text-xs font-semibold">
                                {comment.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold">
                                  {comment.user}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground text-center">
                        <Link href="/login" className="text-primary hover:underline">
                          Faca login
                        </Link>{" "}
                        para comentar.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column - Trade panel + Info */}
            <div className="space-y-6">
              {/* Trade panel */}
              <Card className="bg-card border-border sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    Negociar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Side selector */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedSide("yes")}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSide === "yes"
                          ? "border-success bg-success/10"
                          : "border-border hover:border-success/30"
                      }`}
                    >
                      <span
                        className={`text-xl font-bold font-mono ${
                          selectedSide === "yes"
                            ? "text-success"
                            : "text-muted-foreground"
                        }`}
                      >
                        Sim
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        R${(marketData.probabilityYes / 100).toFixed(2)}
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedSide("no")}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSide === "no"
                          ? "border-destructive bg-destructive/10"
                          : "border-border hover:border-destructive/30"
                      }`}
                    >
                      <span
                        className={`text-xl font-bold font-mono ${
                          selectedSide === "no"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        Nao
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        R${(probabilityNo / 100).toFixed(2)}
                      </span>
                    </button>
                  </div>

                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="buy-amount"
                      className="text-xs text-muted-foreground mb-1.5 block"
                    >
                      Valor (R$)
                    </label>
                    <Input
                      id="buy-amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-secondary border-border font-mono"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                    />
                  </div>

                  {/* Quick amounts */}
                  <div className="flex gap-2">
                    {["10", "25", "50", "100"].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBuyAmount(amount)}
                        className="flex-1 px-2 py-1.5 rounded-md text-xs font-mono bg-secondary hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                      >
                        R${amount}
                      </button>
                    ))}
                  </div>

                  <Separator />

                  {/* Payout info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Preco por contrato</span>
                      <span className="font-mono">
                        R$
                        {selectedSide === "yes"
                          ? (marketData.probabilityYes / 100).toFixed(2)
                          : (probabilityNo / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Contratos</span>
                      <span className="font-mono">
                        {buyAmount
                          ? Math.floor(
                              Number.parseFloat(buyAmount) /
                                (selectedSide === "yes"
                                  ? marketData.probabilityYes / 100
                                  : probabilityNo / 100),
                            )
                          : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">
                        Pagamento potencial
                      </span>
                      <span className="font-mono text-primary">
                        R${potentialPayout}
                      </span>
                    </div>
                  </div>

                  {/* Buy button */}
                  <Button
                    className={`w-full h-11 font-semibold ${
                      selectedSide === "yes"
                        ? "bg-success text-success-foreground hover:bg-success/90"
                        : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    }`}
                  >
                    Comprar {selectedSide === "yes" ? "Sim" : "Nao"}
                    {buyAmount && ` - R$${buyAmount}`}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    Ao negociar, voce concorda com os{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Termos de Uso
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>

              {/* Market info */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Detalhes do Mercado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Descricao
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {marketData.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criado em</span>
                      <span>{marketData.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha em</span>
                      <span>{marketData.closesAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fonte de Resolucao</span>
                      <span className="text-right max-w-[180px]">
                        {marketData.resolutionSource}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Criterio de Resolucao
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {marketData.resolutionCriteria}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
