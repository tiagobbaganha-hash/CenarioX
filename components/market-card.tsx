"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Users, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export interface Market {
  id: string
  slug: string
  title: string
  category: string
  categoryColor: string
  probabilityYes: number
  volume: string
  traders: string
  closesAt: string
  isLive?: boolean
  isFeatured?: boolean
}

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const probabilityNo = 100 - market.probabilityYes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/market/${market.slug}`}>
        <Card
          className="bg-card border-border overflow-hidden group relative h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-5">
            {/* Top row: category + live indicator */}
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="secondary"
                className="text-xs font-medium"
              >
                {market.category}
              </Badge>
              {market.isLive && (
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-xs font-medium text-primary">AO VIVO</span>
                </div>
              )}
            </div>

            {/* Market question */}
            <h3 className="font-semibold text-sm leading-snug mb-4 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
              {market.title}
            </h3>

            {/* Probability bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono font-semibold text-success">
                  Sim {market.probabilityYes}%
                </span>
                <span className="font-mono font-semibold text-destructive">
                  {probabilityNo}% Nao
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden flex">
                <motion.div
                  className="h-full bg-success rounded-l-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${market.probabilityYes}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="h-full bg-destructive rounded-r-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${probabilityNo}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Buy buttons */}
            <div className="flex gap-2 mb-4">
              <Button
                size="sm"
                className="flex-1 bg-success/10 text-success hover:bg-success hover:text-success-foreground border border-success/20 transition-all duration-200 font-mono font-semibold text-xs h-9"
                variant="outline"
              >
                Sim R${(market.probabilityYes / 100).toFixed(2)}
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20 transition-all duration-200 font-mono font-semibold text-xs h-9"
                variant="outline"
              >
                Nao R${(probabilityNo / 100).toFixed(2)}
              </Button>
            </div>

            {/* Bottom metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  {market.volume}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {market.traders}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {market.closesAt}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
