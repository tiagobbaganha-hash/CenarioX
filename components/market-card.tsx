"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, BarChart3 } from "lucide-react"
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
  image?: string
  isLive?: boolean
  isFeatured?: boolean
}

interface MarketCardProps {
  market: Market
}

function ProbabilityRing({
  probability,
  size = 56,
}: { probability: number; size?: number }) {
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (probability / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={probability >= 50 ? "hsl(var(--success))" : "hsl(var(--primary))"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold font-mono text-foreground leading-none">
          {probability}%
        </span>
        <span className="text-[9px] text-muted-foreground leading-none mt-0.5">chance</span>
      </div>
    </div>
  )
}

export function MarketCard({ market }: MarketCardProps) {
  const probabilityNo = 100 - market.probabilityYes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/market/${market.slug}`}>
        <Card className="bg-card border-border overflow-hidden group relative h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
          <CardContent className="p-4">
            {/* Top row: Image + Title + Probability Ring */}
            <div className="flex items-start gap-3 mb-3">
              {/* Thumbnail */}
              <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-secondary">
                {market.image ? (
                  <Image
                    src={market.image || "/placeholder.svg"}
                    alt={market.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                )}
                {market.isLive && (
                  <span className="absolute top-0.5 left-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="flex-1 font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
                {market.title}
              </h3>

              {/* Probability Ring */}
              <div className="shrink-0">
                <ProbabilityRing probability={market.probabilityYes} />
              </div>
            </div>

            {/* Buy buttons */}
            <div className="flex gap-2 mb-3">
              <Button
                size="sm"
                className="flex-1 bg-success/15 text-success hover:bg-success hover:text-success-foreground border border-success/20 transition-all duration-200 font-semibold text-xs h-8"
                variant="outline"
              >
                Sim
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-destructive/15 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20 transition-all duration-200 font-semibold text-xs h-8"
                variant="outline"
              >
                Nao
              </Button>
            </div>

            {/* Bottom metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                {market.volume} Vol.
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Termina em {market.closesAt}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
