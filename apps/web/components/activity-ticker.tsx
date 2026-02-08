"use client"

import { useEffect, useRef } from "react"

interface Activity {
  wallet: string
  outcome: string
  outcomeColor: "success" | "destructive" | "primary"
  value: string
  market: string
}

const activities: Activity[] = [
  { wallet: "0xe...99d", outcome: "NAO", outcomeColor: "destructive", value: "R$0,50", market: "em IPCA 15 de fevereiro de 2026..." },
  { wallet: "0x5...1ae", outcome: "NAO", outcomeColor: "destructive", value: "R$0,50", market: "em Cessar-fogo entre Russia e U..." },
  { wallet: "0x5...1ae", outcome: "PALMEIRAS", outcomeColor: "primary", value: "R$1,00", market: "em Corinthians X Palmeiras em ..." },
  { wallet: "0x5...1ae", outcome: "SIM", outcomeColor: "success", value: "R$0,50", market: "em A prima..." },
  { wallet: "0xa...3f2", outcome: "SIM", outcomeColor: "success", value: "R$2,00", market: "em Lula sera reeleito presidente..." },
  { wallet: "0x7...c8b", outcome: "NAO", outcomeColor: "destructive", value: "R$1,50", market: "em Bitcoin acima de $150K..." },
  { wallet: "0xd...4e1", outcome: "SIM", outcomeColor: "success", value: "R$0,75", market: "em Selic abaixo de 10%..." },
  { wallet: "0x3...9a7", outcome: "FLAMENGO", outcomeColor: "primary", value: "R$3,00", market: "em Flamengo vence Libertadores..." },
  { wallet: "0xf...2b5", outcome: "NAO", outcomeColor: "destructive", value: "R$0,50", market: "em SpaceX pousa em Marte..." },
  { wallet: "0x1...6d0", outcome: "SIM", outcomeColor: "success", value: "R$1,00", market: "em Dolar abaixo de R$5..." },
]

const outcomeStyles: Record<string, string> = {
  success: "bg-success/20 text-success",
  destructive: "bg-destructive/20 text-destructive",
  primary: "bg-primary/20 text-primary",
}

function TickerItem({ activity }: { activity: Activity }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">ATIVIDADE</span>
      <span className="text-[11px] font-mono text-foreground">{activity.wallet}</span>
      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${outcomeStyles[activity.outcomeColor]}`}>
        {activity.outcome}
      </span>
      <span className="text-[11px] font-mono font-semibold text-primary">{activity.value}</span>
      <span className="text-[11px] text-muted-foreground">{activity.market}</span>
    </span>
  )
}

export function ActivityTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let pos = 0

    const scroll = () => {
      pos += 0.5
      if (pos >= el.scrollWidth / 2) {
        pos = 0
      }
      el.style.transform = `translateX(-${pos}px)`
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="w-full bg-card/80 border-b border-border overflow-hidden h-8 flex items-center">
      <div ref={scrollRef} className="flex items-center gap-8 will-change-transform">
        {/* Duplicate for seamless loop */}
        {[...activities, ...activities].map((activity, i) => (
          <TickerItem key={`${activity.wallet}-${activity.market}-${i}`} activity={activity} />
        ))}
      </div>
    </div>
  )
}
