"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdminProviders } from "./providers"
import {
  TrendingUp,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Bell,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Trophy,
  Megaphone,
  FileText,
  DollarSign,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { getResourcesByCategory, adminCategories } from "@/lib/admin-resources"

const iconMap: Record<string, any> = {
  Home,
  Trophy,
  Shield: ShieldCheck,
  Megaphone,
  FileText,
  BarChart: BarChart3,
  DollarSign,
  Settings,
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "core",
  ])

  const resourcesByCategory = getResourcesByCategory()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <AdminProviders>
      <div className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 overflow-y-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border shrink-0">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-foreground">
                  CenarioX
                </span>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[9px] px-1.5 py-0" variant="outline">
                  Admin
                </Badge>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Dashboard link */}
          <div className="px-3 pt-4 pb-2 shrink-0">
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                pathname === "/admin"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              Dashboard
            </Link>
          </div>

          {/* Nav links by category */}
          <nav className="flex-1 px-3 pb-4 overflow-y-auto">
            <div className="space-y-1">
              {adminCategories.map((category) => {
                const resources = resourcesByCategory[category.id] || []
                if (resources.length === 0) return null

                const isExpanded = expandedCategories.includes(category.id)
                const Icon = iconMap[category.icon] || Home

                return (
                  <div key={category.id} className="mb-2">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        {category.label}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-1 space-y-0.5 pl-3">
                        {resources.map((resource) => {
                          const resourcePath = resource.list || "#"
                          const isActive = pathname === resourcePath
                          
                          return (
                            <Link
                              key={resource.name}
                              href={resourcePath}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              )}
                            >
                              <div className="w-1 h-1 rounded-full bg-current" />
                              {resource.meta?.label || resource.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>

          {/* Settings link */}
          <div className="px-3 pb-4 border-t border-border shrink-0">
            <Link
              href="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 mt-4",
                pathname === "/admin/settings"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Settings className="h-4.5 w-4.5" />
              Configurações Gerais
            </Link>
          </div>

          {/* Admin user section */}
          <div className="px-3 py-4 border-t border-border shrink-0">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-destructive/10 text-destructive text-xs font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium truncate">Admin</p>
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  admin@cenariox.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu lateral"
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">
                Administração
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="bg-transparent text-xs hidden sm:inline-flex">
                <Link href="/">Ver Site</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  5
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-destructive/10 text-destructive text-xs font-semibold">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
        </div>
      </div>
    </AdminProviders>
  )
}
