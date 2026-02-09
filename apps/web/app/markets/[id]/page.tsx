"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  resolved?: boolean
  resolution?: "yes" | "no" | "invalid"
  resolved_at?: string
}

interface PricePoint {
  timestamp: string
  yes_price: number
  no_price: number
  volume: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleDateString("pt-BR")
}

export default function MarketDetailPage() {
  const params = useParams()
  const marketId = typeof params?.id === "string" ? params.id : ""

  const [market, setMarket] = useState<Market | null>(null)
  const [history, setHistory] = useState<PricePoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const probabilityYes = useMemo(() => {
    if (!market) return 0
    return Math.round(market.yes_price * 100)
  }, [market])

  useEffect(() => {
    if (!marketId) return

    const fetchMarket = async () => {
      try {
        setLoading(true)
        setError(null)

        const marketResponse = await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: `/markets/${marketId}`,
            method: "GET",
          }),
        })

        if (!marketResponse.ok) {
          throw new Error("Falha ao carregar mercado")
        }

        const marketData = await marketResponse.json()
        setMarket(marketData)

        const historyResponse = await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: `/markets/${marketId}/history`,
            method: "GET",
          }),
        })

        if (historyResponse.ok) {
          const historyData = await historyResponse.json()
          setHistory(Array.isArray(historyData) ? historyData : [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchMarket()
  }, [marketId])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Mercados</p>
            <h1 className="text-2xl font-bold">Detalhes do Mercado</h1>
          </div>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/markets">Voltar para mercados</Link>
          </Button>
        </div>

        {loading ? (
          <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Carregando dados do mercado...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
            {error}
          </div>
        ) : market ? (
          <div className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{market.category}</Badge>
                <Badge variant="outline" className="bg-transparent">
                  {market.status.toUpperCase()}
                </Badge>
                {market.resolved && market.resolution && (
                  <Badge variant="secondary">Resolvido: {market.resolution.toUpperCase()}</Badge>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{market.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {market.description}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-md border border-border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Probabilidade SIM</p>
                  <p className="text-2xl font-bold text-success">{probabilityYes}%</p>
                  <p className="text-sm text-muted-foreground">Preco SIM: {formatCurrency(market.yes_price)}</p>
                </div>
                <div className="rounded-md border border-border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Probabilidade NAO</p>
                  <p className="text-2xl font-bold text-destructive">{100 - probabilityYes}%</p>
                  <p className="text-sm text-muted-foreground">Preco NAO: {formatCurrency(market.no_price)}</p>
                </div>
                <div className="rounded-md border border-border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Volume total</p>
                  <p className="text-2xl font-bold">{formatCurrency(market.total_volume)}</p>
                  <p className="text-sm text-muted-foreground">Trades: {market.total_trades}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span>Fecha em {formatDate(market.closes_at)}</span>
                <span>Criado em {formatDate(market.created_at)}</span>
                <span>Liquidez: {formatCurrency(market.liquidity)}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Historico de precos</h3>
              {history.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">Sem historico disponivel.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs text-muted-foreground">
                      <tr>
                        <th className="py-2">Data</th>
                        <th className="py-2">SIM</th>
                        <th className="py-2">NAO</th>
                        <th className="py-2">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(-8).reverse().map((point, index) => (
                        <tr key={`${point.timestamp}-${index}`} className="border-t border-border">
                          <td className="py-2">{formatDate(point.timestamp)}</td>
                          <td className="py-2">{formatCurrency(point.yes_price)}</td>
                          <td className="py-2">{formatCurrency(point.no_price)}</td>
                          <td className="py-2">{formatCurrency(point.volume)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  )
}
