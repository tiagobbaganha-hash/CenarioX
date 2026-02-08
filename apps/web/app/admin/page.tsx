"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
} from "lucide-react"

// Mock data - será substituído por dados reais da API
const dashboardStats = {
  totalUsers: 15234,
  activeUsers: 1823,
  totalMarkets: 142,
  activeMarkets: 87,
  totalVolume: 2543890,
  volumeGrowth: 12.5,
  totalDeposits: 1234567,
  totalWithdrawals: 987654,
  avgSessionTime: "24min",
  dailyActiveUsers: 4521,
}

const recentActivity = [
  { user: "João Silva", action: "criou mercado", market: "Copa do Mundo 2026", time: "há 5 min" },
  { user: "Maria Santos", action: "depositou", amount: "R$ 500", time: "há 12 min" },
  { user: "Pedro Costa", action: "apostou em", market: "Eleições 2026", time: "há 18 min" },
  { user: "Ana Lima", action: "sacou", amount: "R$ 1.200", time: "há 25 min" },
  { user: "Carlos Souza", action: "registrou-se", time: "há 32 min" },
]

const topMarkets = [
  { name: "Copa do Mundo 2026", volume: "R$ 234.567", trades: 1234, change: "+15%" },
  { name: "Eleições 2026", volume: "R$ 189.432", trades: 987, change: "+22%" },
  { name: "Bitcoin $100k até 2026", volume: "R$ 156.789", trades: 756, change: "+8%" },
  { name: "Taxa Selic", volume: "R$ 98.543", trades: 543, change: "-3%" },
  { name: "Inflação 2026", volume: "R$ 76.234", trades: 432, change: "+5%" },
]

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string
  value: string | number
  description: string
  icon: any
  trend?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {trend && (
            <span className={trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {trend}
            </span>
          )}{' '}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da plataforma CenarioX
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Usuários"
          value={dashboardStats.totalUsers.toLocaleString()}
          description={`${dashboardStats.activeUsers} ativos agora`}
          icon={Users}
          trend="+12%"
        />
        <DashboardCard
          title="Mercados Ativos"
          value={dashboardStats.activeMarkets}
          description={`${dashboardStats.totalMarkets} total`}
          icon={BarChart3}
          trend="+8%"
        />
        <DashboardCard
          title="Volume Total"
          value={`R$ ${(dashboardStats.totalVolume / 1000).toFixed(0)}k`}
          description={`+${dashboardStats.volumeGrowth}% este mês`}
          icon={TrendingUp}
          trend={`+${dashboardStats.volumeGrowth}%`}
        />
        <DashboardCard
          title="DAU (Usuários Ativos Diários)"
          value={dashboardStats.dailyActiveUsers.toLocaleString()}
          description={`Tempo médio: ${dashboardStats.avgSessionTime}`}
          icon={Activity}
          trend="+18%"
        />
      </div>

      {/* Finance Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
              Depósitos Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(dashboardStats.totalDeposits / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +23% vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4 text-red-500" />
              Saques Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(dashboardStats.totalWithdrawals / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Saldo em Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {((dashboardStats.totalDeposits - dashboardStats.totalWithdrawals) / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Liquidez disponível
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
          <TabsTrigger value="markets">Top Mercados</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas ações dos usuários na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.market || activity.amount}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mercados Mais Negociados</CardTitle>
              <CardDescription>
                Top 5 mercados por volume nas últimas 24h
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMarkets.map((market, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{market.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {market.trades} negociações
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{market.volume}</p>
                      <p className={`text-xs ${market.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {market.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Avançado</CardTitle>
              <CardDescription>
                Métricas detalhadas e insights da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto opacity-50" />
                  <p>Gráficos e analytics em desenvolvimento</p>
                  <p className="text-xs">Integração com dashboard de métricas em tempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acessos rápidos para funcionalidades principais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/markets/create"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Criar Mercado</span>
            </a>
            <a
              href="/admin/users"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Gerenciar Usuários</span>
            </a>
            <a
              href="/admin/withdrawals"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <ArrowDownCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Aprovar Saques</span>
            </a>
            <a
              href="/admin/audit-logs"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Ver Logs</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
