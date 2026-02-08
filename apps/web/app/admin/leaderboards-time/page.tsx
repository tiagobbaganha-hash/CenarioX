"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Timer, Zap, Target } from "lucide-react"

const leaderboardData = [
  { rank: 1, user: "Carlos Souza", avatar: null, totalTime: 1820, sessions: 87, avgSession: 21, streak: 45, lastActive: "online" },
  { rank: 2, user: "Ana Lima", avatar: null, totalTime: 1650, sessions: 79, avgSession: 21, streak: 38, lastActive: "2 min atrás" },
  { rank: 3, user: "João Silva", avatar: null, totalTime: 1480, sessions: 71, avgSession: 21, streak: 32, lastActive: "online" },
  { rank: 4, user: "Maria Santos", avatar: null, totalTime: 1320, sessions: 65, avgSession: 20, streak: 28, lastActive: "15 min atrás" },
  { rank: 5, user: "Pedro Costa", avatar: null, totalTime: 1180, sessions: 58, avgSession: 20, streak: 24, lastActive: "1 hora atrás" },
]

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export default function LeaderboardTimePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard de Tempo na Plataforma</h1>
        <p className="text-muted-foreground">Ranking dos usuários mais engajados por tempo de uso</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMinutes(leaderboardData.reduce((sum, u) => sum + u.totalTime, 0))}</div>
            <p className="text-xs text-muted-foreground">Top 5 usuários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média/Sessão</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21 min</div>
            <p className="text-xs text-muted-foreground">Tempo médio por visita</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Streak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 dias</div>
            <p className="text-xs text-muted-foreground">{leaderboardData[0].user}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Agora</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaderboardData.filter(u => u.lastActive === "online").length}</div>
            <p className="text-xs text-muted-foreground">Usuários ativos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking por Tempo de Uso</CardTitle>
          <CardDescription>Usuários ordenados por tempo total na plataforma</CardDescription>
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
                      {entry.lastActive === "online" && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">• Online</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.sessions} sessões · Streak: {entry.streak} dias · Última: {entry.lastActive}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatMinutes(entry.totalTime)}</p>
                    <p className="text-sm text-muted-foreground">~{entry.avgSession} min/sessão</p>
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
