"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Volume Negociado", value: "R$ 2.4M", suffix: "" },
  { label: "Mercados Ativos", value: "127", suffix: "" },
  { label: "Traders", value: "8.432", suffix: "" },
  { label: "Taxa de Resolucao", value: "99.2", suffix: "%" },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-8 relative"
            >
              {index > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-px bg-border hidden md:block" />
              )}
              <span className="text-2xl md:text-3xl font-bold font-mono text-foreground">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
