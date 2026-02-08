"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, TrendingUp, Award, Medal } from "lucide-react"

const leaderboardData = [
  { rank: 1, user: "João Silva", avatar: null, totalDeposits: 125000, depositCount: 45, lastDeposit: "2 horas atrás", trend: "+15%" },
  { rank: 2, user: "Maria Santos", avatar: null, totalDeposits: 98500, depositCount: 38, lastDeposit: "5 horas atrás", trend: "+22%" },
  { rank: 3, user: "Pedro Costa", avatar: null, totalDeposits: 87300, depositCount: 41, lastDeposit: "1 dia atrás", trend: "+8%" },
  { rank: 4, user: "Ana Lima", avatar: null, totalDeposits: 76200, depositCount: 35, lastDeposit: "3 horas atrás", trend: "+12%" },
  { rank: 5, user: "Carlos Souza", avatar: null, totalDeposits: 65400, depositCount: 29, lastDeposit: "6 horas atrás", trend: "+5%" },
  { rank: 6, user: "Juliana Rocha", avatar: null, totalDeposits: 54800, depositCount: 27, lastDeposit: "12 horas atrás", trend: "+18%" },
  { rank: 7, user: "Ricardo Alves", avatar: null, totalDeposits: 48900, depositCount: 24, lastDeposit: "1 dia atrás", trend: "+3%" },
  { rank: 8, user: "Fernanda Dias", avatar: null, totalDeposits: 42100, depositCount: 22, lastDeposit: "8 horas atrás", trend: "+9%" },
  { rank: 9, user: "Bruno Martins", avatar: null, totalDeposits: 38600, depositCount: 19, lastDeposit: "4 horas atrás", trend: "+7%" },
  { rank: 10, user: "Camila Ferreira", avatar: null, totalDeposits: 35200, depositCount: 18, lastDeposit: "10 horas atrás", trend: "+11%" },
]

const stats = {
  totalDeposits: 671000,
  totalUsers: 10,
  avgDeposit: 22370,
  topDepositor: 125000,
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-muted-foreground">#{rank}</span>
  }
}

function getRankBadge(rank: number) {
  if (rank === 1) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  if (rank === 2) return "bg-gray-400/10 text-gray-500 border-gray-400/20"
  if (rank === 3) return "bg-amber-600/10 text-amber-600 border-amber-600/20"
  return "bg-muted text-muted-foreground"
}

export default function LeaderboardDepositorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard de Depositantes</h1>
        <p className="text-muted-foreground">
          Ranking dos usuários com maiores volumes de depósito
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(stats.totalDeposits / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Top 10 depositantes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por Usuário</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(stats.avgDeposit / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">Média dos top 10</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Depositante</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(stats.topDepositor / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">{leaderboardData[0].user}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">No ranking atual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Depositantes</CardTitle>
          <CardDescription>
            Usuários ordenados por volume total de depósitos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  entry.rank <= 3 ? 'bg-secondary/50' : 'bg-background'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12">
                    <Badge variant="outline" className={getRankBadge(entry.rank)}>
                      {entry.rank <= 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
                    </Badge>
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || undefined} />
                    <AvatarFallback>{entry.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className="font-medium">{entry.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.depositCount} depósitos · Último: {entry.lastDeposit}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">R$ {entry.totalDeposits.toLocaleString('pt-BR')}</p>
                    <p className="text-sm text-green-500">{entry.trend} este mês</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Ranking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• O ranking é atualizado em tempo real conforme novos depósitos são realizados</p>
          <p>• Apenas depósitos confirmados são contabilizados no volume total</p>
          <p>• A tendência (%) representa o crescimento nos últimos 30 dias</p>
          <p>• Os 3 primeiros colocados recebem badges especiais</p>
        </CardContent>
      </Card>
    </div>
  )
}
