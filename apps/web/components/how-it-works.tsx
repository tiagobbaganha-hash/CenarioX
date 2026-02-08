"use client"

import { motion } from "framer-motion"
import { Search, MousePointerClick, TrendingUp, Banknote } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Escolha um Mercado",
    description: "Explore centenas de mercados sobre politica, esportes, economia e tecnologia.",
  },
  {
    icon: MousePointerClick,
    title: "Compre Sim ou Nao",
    description: "Cada contrato custa entre R$0.01 e R$0.99. O preco reflete a probabilidade do evento.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhe ao Vivo",
    description: "Veja as odds mudando em tempo real conforme novas informacoes surgem.",
  },
  {
    icon: Banknote,
    title: "Receba se Acertar",
    description: "Se o evento acontecer como voce previu, cada contrato vale R$1.00. Lucro direto via Pix.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Como Funciona
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Mercados preditivos transformam opinioes em precos. Quanto mais confiante o mercado, mais alto o preco.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 mb-6 relative">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
