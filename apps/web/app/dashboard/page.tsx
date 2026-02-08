"use client"

import Link from "next/link"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const stats = [
  {
    label: "Saldo Disponivel",
    value: "R$2.450,00",
    change: "+12.5%",
    changePositive: true,
    icon: Wallet,
  },
  {
    label: "Lucro Total",
    value: "R$890,50",
    change: "+8.2%",
    changePositive: true,
    icon: TrendingUp,
  },
  {
    label: "Posicoes Abertas",
    value: "7",
    change: "3 Sim / 4 Nao",
    changePositive: true,
    icon: BarChart3,
  },
  {
    label: "Mercados Seguidos",
    value: "15",
    change: "+2 novos",
    changePositive: true,
    icon: Eye,
  },
]

const openPositions = [
  {
    id: "1",
    title: "Lula sera reeleito presidente em 2026?",
    side: "Sim",
    contracts: 500,
    avgPrice: 0.32,
    currentPrice: 0.34,
    pnl: "+R$10,00",
    pnlPositive: true,
    category: "Politica",
  },
  {
    id: "2",
    title: "Bitcoin acima de $150K ate dezembro de 2026?",
    side: "Nao",
    contracts: 200,
    avgPrice: 0.55,
    currentPrice: 0.58,
    pnl: "-R$6,00",
    pnlPositive: false,
    category: "Crypto",
  },
  {
    id: "3",
    title: "Brasil vence a Copa do Mundo 2026?",
    side: "Sim",
    contracts: 1000,
    avgPrice: 0.15,
    currentPrice: 0.18,
    pnl: "+R$30,00",
    pnlPositive: true,
    category: "Esportes",
  },
  {
    id: "4",
    title: "Selic abaixo de 10% ate o fim de 2026?",
    side: "Nao",
    contracts: 300,
    avgPrice: 0.70,
    currentPrice: 0.73,
    pnl: "-R$9,00",
    pnlPositive: false,
    category: "Economia",
  },
]

const recentActivity = [
  {
    type: "buy",
    title: "Comprou Sim - Lula sera reeleito?",
    amount: "R$160,00",
    time: "2h atras",
  },
  {
    type: "sell",
    title: "Vendeu Nao - Bitcoin acima de $150K?",
    amount: "R$55,00",
    time: "5h atras",
  },
  {
    type: "deposit",
    title: "Deposito via PIX",
    amount: "R$500,00",
    time: "1 dia atras",
  },
  {
    type: "buy",
    title: "Comprou Sim - Brasil vence Copa 2026?",
    amount: "R$150,00",
    time: "2 dias atras",
  },
  {
    type: "win",
    title: "Mercado resolvido - IPCA acima de 5% em Jan?",
    amount: "+R$240,00",
    time: "3 dias atras",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Ola, Joao Pedro
          </h1>
          <p className="text-sm text-muted-foreground">
            Aqui esta o resumo da sua conta hoje.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            Depositar
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/markets">Explorar Mercados</Link>
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
                    <stat.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      stat.changePositive
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold font-mono text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open positions */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Posicoes Abertas
                </CardTitle>
                <Link
                  href="/dashboard/portfolio"
                  className="text-xs text-primary hover:underline"
                >
                  Ver todas
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {pos.category}
                        </Badge>
                        <Badge
                          className={`text-[10px] px-1.5 py-0 ${
                            pos.side === "Sim"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}
                          variant="outline"
                        >
                          {pos.side}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {pos.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pos.contracts} contratos @ R${pos.avgPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <p
                        className={`text-sm font-semibold font-mono ${
                          pos.pnlPositive
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {pos.pnl}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        R${pos.currentPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Atividade Recente
              </CardTitle>
              <Link
                href="/dashboard/history"
                className="text-xs text-primary hover:underline"
              >
                Ver historico
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0 last:pb-0"
                >
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${
                      activity.type === "buy"
                        ? "bg-success/10"
                        : activity.type === "sell"
                          ? "bg-destructive/10"
                          : activity.type === "win"
                            ? "bg-primary/10"
                            : "bg-secondary"
                    }`}
                  >
                    {activity.type === "buy" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : activity.type === "sell" ? (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    ) : activity.type === "win" ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium shrink-0">
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
