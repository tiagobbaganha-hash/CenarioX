"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDownCircle, TrendingDown, DollarSign, Users } from "lucide-react"

const leaderboardData = [
  { rank: 1, user: "Ana Lima", avatar: null, totalWithdrawals: 145000, withdrawalCount: 12, lastWithdrawal: "1 dia atrás", avgWithdrawal: 12083, status: "approved" },
  { rank: 2, user: "Ricardo Alves", avatar: null, totalWithdrawals: 98000, withdrawalCount: 8, lastWithdrawal: "3 dias atrás", avgWithdrawal: 12250, status: "approved" },
  { rank: 3, user: "Fernanda Dias", avatar: null, totalWithdrawals: 87500, withdrawalCount: 10, lastWithdrawal: "2 dias atrás", avgWithdrawal: 8750, status: "pending" },
]

const stats = {
  totalWithdrawals: 330500,
  totalUsers: 3,
  avgWithdrawal: 10287,
  pendingCount: 1,
}

export default function LeaderboardWithdrawalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard de Saques</h1>
        <p className="text-muted-foreground">Ranking dos usuários com maiores volumes de saque</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total Sacado</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(stats.totalWithdrawals / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">Top 3 sacadores</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por Saque</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(stats.avgWithdrawal / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">Ticket médio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saques Pendentes</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCount}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">No ranking</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Saques</CardTitle>
          <CardDescription>Usuários ordenados por volume total de saques realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((entry) => (
              <div key={entry.rank} className={`flex items-center justify-between p-4 rounded-lg border ${entry.rank <= 3 ? 'bg-secondary/50' : 'bg-background'}`}>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12">
                    <Badge variant={entry.rank <= 3 ? "default" : "outline"}>#{entry.rank}</Badge>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || undefined} />
                    <AvatarFallback>{entry.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{entry.user}</p>
                      {entry.status === "pending" && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pendente</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.withdrawalCount} saques · Último: {entry.lastWithdrawal} · Média: R$ {entry.avgWithdrawal.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">R$ {entry.totalWithdrawals.toLocaleString('pt-BR')}</p>
                    <p className="text-sm text-muted-foreground">Total sacado</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
