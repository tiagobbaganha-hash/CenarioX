"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Plus, Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"

interface Market {
  id: string
  title: string
  description: string
  category: string
  status: string
  yes_price: number
  no_price: number
  total_volume: number
  total_trades: number
  closes_at: string
  created_at: string
  resolved?: boolean
  resolution?: 'yes' | 'no' | 'invalid'
  resolved_at?: string
}

const categoryColors: Record<string, string> = {
  crypto: "bg-orange-500/10 text-orange-500",
  politics: "bg-blue-500/10 text-blue-500",
  sports: "bg-green-500/10 text-green-500",
  economy: "bg-purple-500/10 text-purple-500",
  technology: "bg-cyan-500/10 text-cyan-500",
  entertainment: "bg-pink-500/10 text-pink-500",
}

export default function AdminMarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [resolving, setResolving] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [selectedResolution, setSelectedResolution] = useState<'yes' | 'no' | 'invalid'>('yes')

  useEffect(() => {
    fetchMarkets()
  }, [])

  async function fetchMarkets() {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/markets')
      if (response.ok) {
        const data = await response.json()
        setMarkets(data)
      }
    } catch (err) {
      console.error('Erro ao buscar markets:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleResolve(marketId: string, resolution: 'yes' | 'no' | 'invalid') {
    try {
      setResolving(marketId)
      const response = await fetch(\`http://localhost:4000/markets/\${marketId}/resolve\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution }),
      })

      if (response.ok) {
        await fetchMarkets()
        setResolving(null)
      } else {
        throw new Error('Erro ao resolver mercado')
      }
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao resolver mercado')
      setResolving(null)
    }
  }

  async function handleDelete(marketId: string) {
    try {
      const response = await fetch(\`http://localhost:4000/markets/\${marketId}\`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchMarkets()
        setDeleteConfirm(null)
      } else {
        throw new Error('Erro ao deletar mercado')
      }
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao deletar mercado')
    }
  }

  async function handleUpdateStatus(marketId: string, newStatus: string) {
    try {
      const response = await fetch(\`http://localhost:4000/markets/\${marketId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        await fetchMarkets()
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err)
    }
  }

  const stats = {
    total: markets.length,
    active: markets.filter(m => m.status === 'active').length,
    closed: markets.filter(m => m.status === 'closed' && !m.resolved).length,
    resolved: markets.filter(m => m.resolved).length,
    needsResolution: markets.filter(m => m.status === 'closed' && !m.resolved).length,
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-4xl font-bold">Painel Administrativo</h1>
                  <p className="text-muted-foreground">Gerenciamento de mercados</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={fetchMarkets} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{stats.active}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Fechados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">{stats.closed}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Resolvidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">{stats.resolved}</div>
                </CardContent>
              </Card>

              <Card className={stats.needsResolution > 0 ? "border-orange-500" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">{stats.needsResolution}</div>
                  <p className="text-xs text-muted-foreground mt-1">Precisam resolução</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Mercados</CardTitle>
                <CardDescription>Gerencie todos os mercados da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {markets.map((market) => (
                    <div
                      key={market.id}
                      className="rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={categoryColors[market.category]}>
                              {market.category}
                            </Badge>
                            {market.resolved ? (
                              <Badge 
                                className={
                                  market.resolution === 'yes' 
                                    ? 'bg-green-500 text-white' 
                                    : market.resolution === 'no' 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-gray-500 text-white'
                                }
                              >
                                {market.resolution === 'yes' ? '✓ SIM' : market.resolution === 'no' ? '✓ NÃO' : '↻ INVÁLIDO'}
                              </Badge>
                            ) : (
                              <Badge variant={market.status === 'active' ? 'default' : 'secondary'}>
                                {market.status === 'active' ? 'Ativo' : 'Fechado'}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              ID: {market.id}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-1">{market.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                            {market.description}
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Volume</p>
                              <p className="font-medium">R$ {(market.total_volume / 1000).toFixed(1)}K</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Trades</p>
                              <p className="font-medium">{market.total_trades}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Preço SIM</p>
                              <p className="font-medium">{(market.yes_price * 100).toFixed(0)}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {!market.resolved && market.status === 'closed' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Resolver
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Resolver Mercado</DialogTitle>
                                  <DialogDescription>
                                    Escolha o resultado final deste mercado
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p className="font-semibold mb-4">{market.title}</p>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Resolução:</label>
                                    <Select 
                                      value={selectedResolution} 
                                      onValueChange={(v) => setSelectedResolution(v as 'yes' | 'no' | 'invalid')}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="yes">
                                          SIM - Evento ocorreu
                                        </SelectItem>
                                        <SelectItem value="no">
                                          NÃO - Evento não ocorreu
                                        </SelectItem>
                                        <SelectItem value="invalid">
                                          INVÁLIDO - Reembolsar todos
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() => handleResolve(market.id, selectedResolution)}
                                    disabled={resolving === market.id}
                                  >
                                    {resolving === market.id ? (
                                      <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                        Resolvendo...
                                      </>
                                    ) : (
                                      'Confirmar Resolução'
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          {!market.resolved && (
                            <Select
                              value={market.status}
                              onValueChange={(v) => handleUpdateStatus(market.id, v)}
                            >
                              <SelectTrigger className="w-[130px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Ativar</SelectItem>
                                <SelectItem value="closed">Fechar</SelectItem>
                              </SelectContent>
                            </Select>
                          )}

                          <Button asChild variant="outline" size="sm">
                            <Link href={\`/markets/\${market.id}\`}>
                              Ver
                            </Link>
                          </Button>

                          <Dialog open={deleteConfirm === market.id} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setDeleteConfirm(market.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmar Exclusão</DialogTitle>
                                <DialogDescription>
                                  Tem certeza que deseja deletar este mercado? Esta ação não pode ser desfeita.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                                  Cancelar
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(market.id)}>
                                  Deletar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
