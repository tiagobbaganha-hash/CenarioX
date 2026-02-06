"use client"

import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Volume Total",
    value: "R$ 1.84M",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Mercados Ativos",
    value: "127",
    change: "+8",
    trend: "up" as const,
    icon: BarChart3,
  },
  {
    label: "Usuarios",
    value: "3.482",
    change: "+234",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Taxa de Resolucao",
    value: "96.3%",
    change: "-0.4%",
    trend: "down" as const,
    icon: TrendingUp,
  },
]

const recentMarkets = [
  {
    title: "Lula vence eleicao 2026?",
    status: "active" as const,
    volume: "R$ 245K",
    traders: 1203,
    created: "2h atras",
  },
  {
    title: "Bitcoin acima de US$ 150K ate junho?",
    status: "active" as const,
    volume: "R$ 189K",
    traders: 856,
    created: "5h atras",
  },
  {
    title: "Selecao vence a Copa America 2025?",
    status: "resolved" as const,
    volume: "R$ 312K",
    traders: 2140,
    created: "1d atras",
  },
  {
    title: "Selic abaixo de 10% ate dezembro?",
    status: "pending" as const,
    volume: "R$ 98K",
    traders: 412,
    created: "3h atras",
  },
  {
    title: "SpaceX lancamento ate marco?",
    status: "cancelled" as const,
    volume: "R$ 45K",
    traders: 198,
    created: "2d atras",
  },
]

const recentActivity = [
  { user: "joao.silva", action: "Criou mercado", target: "Eleicao 2026", time: "2 min" },
  { user: "ana.costa", action: "Depositou", target: "R$ 500", time: "8 min" },
  { user: "pedro.m", action: "Sacou", target: "R$ 1.200", time: "15 min" },
  { user: "maria.l", action: "Registrou conta", target: "", time: "22 min" },
  { user: "lucas.r", action: "Completou KYC", target: "Nivel 2", time: "35 min" },
  { user: "admin", action: "Resolveu mercado", target: "Copa America", time: "1h" },
]

const statusConfig = {
  active: { label: "Ativo", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  resolved: { label: "Resolvido", className: "bg-primary/10 text-primary border-primary/20", icon: CheckCircle2 },
  pending: { label: "Pendente", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
  cancelled: { label: "Cancelado", className: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visao geral da plataforma CenarioX
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                    stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two columns: Recent Markets + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Markets */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Mercados Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left font-medium px-6 py-3">Mercado</th>
                    <th className="text-left font-medium px-4 py-3">Status</th>
                    <th className="text-right font-medium px-4 py-3">Volume</th>
                    <th className="text-right font-medium px-4 py-3 hidden sm:table-cell">Traders</th>
                    <th className="text-right font-medium px-6 py-3 hidden md:table-cell">Criado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMarkets.map((market) => {
                    const config = statusConfig[market.status]
                    return (
                      <tr
                        key={market.title}
                        className="border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors"
                      >
                        <td className="px-6 py-3.5 font-medium text-foreground max-w-[250px] truncate">
                          {market.title}
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant="outline" className={cn("text-[11px]", config.className)}>
                            {config.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5 text-right text-foreground tabular-nums">
                          {market.volume}
                        </td>
                        <td className="px-4 py-3.5 text-right text-muted-foreground tabular-nums hidden sm:table-cell">
                          {market.traders.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-6 py-3.5 text-right text-muted-foreground hidden md:table-cell">
                          {market.created}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-muted-foreground shrink-0 mt-0.5">
                    <span className="text-xs font-semibold uppercase">
                      {item.user.slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{item.user}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>
                      {item.target && (
                        <span className="font-medium"> {item.target}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time} atras</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts / Warnings */}
      <Card className="bg-amber-500/5 border-amber-500/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">5 denuncias pendentes</p>
              <p className="text-xs text-muted-foreground mt-1">
                Existem denuncias de mercados que precisam de revisao manual. Acesse a secao de Denuncias para avaliar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
