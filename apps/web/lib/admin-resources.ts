import type { ResourceProps } from "@refinedev/core"

export type AdminResourceCategory = {
  label: string
  icon?: string
  resources: ResourceProps[]
}

// Mapeamento de labels dos recursos
const resourceLabels: Record<string, { singular: string; plural: string }> = {
  // Core
  markets: { singular: "Mercado", plural: "Mercados" },
  users: { singular: "Usuário", plural: "Usuários" },
  transactions: { singular: "Transação", plural: "Transações" },
  
  // Leaderboards
  "leaderboards-depositors": { singular: "Leaderboard de Depósitos", plural: "Leaderboards de Depósitos" },
  "leaderboards-time": { singular: "Leaderboard de Tempo", plural: "Leaderboards de Tempo" },
  "leaderboards-withdrawals": { singular: "Leaderboard de Saques", plural: "Leaderboards de Saques" },
  
  // Admin & Roles
  roles: { singular: "Função", plural: "Funções" },
  permissions: { singular: "Permissão", plural: "Permissões" },
  "admin-users": { singular: "Administrador", plural: "Administradores" },
  
  // Marketing
  "promo-codes": { singular: "Código Promocional", plural: "Códigos Promocionais" },
  campaigns: { singular: "Campanha", plural: "Campanhas" },
  
  // Content Management
  banners: { singular: "Banner", plural: "Banners" },
  "front-images": { singular: "Imagem de Capa", plural: "Imagens de Capa" },
  "signup-images": { singular: "Imagem de Cadastro", plural: "Imagens de Cadastro" },
  pages: { singular: "Página", plural: "Páginas" },
  articles: { singular: "Artigo", plural: "Artigos" },
  
  // Reports
  "user-reports": { singular: "Denúncia de Usuário", plural: "Denúncias de Usuários" },
  "payment-reports": { singular: "Relatório de Pagamento", plural: "Relatórios de Pagamentos" },
  "deposit-reports": { singular: "Relatório de Depósito", plural: "Relatórios de Depósitos" },
  "merchandise-reports": { singular: "Relatório de Merchandise", plural: "Relatórios de Merchandise" },
  
  // Finance
  withdrawals: { singular: "Saque", plural: "Saques" },
  deposits: { singular: "Depósito", plural: "Depósitos" },
  "ledger-entries": { singular: "Lançamento Contábil", plural: "Lançamentos Contábeis" },
  wallets: { singular: "Carteira", plural: "Carteiras" },
  "payment-methods": { singular: "Método de Pagamento", plural: "Métodos de Pagamento" },
  
  // Settings & Config
  avatars: { singular: "Avatar", plural: "Avatars" },
  "whats-new": { singular: "Novidade", plural: "Novidades" },
  games: { singular: "Jogo", plural: "Jogos" },
  assets: { singular: "Asset", plural: "Assets" },
  branding: { singular: "Branding", plural: "Branding" },
  modules: { singular: "Módulo", plural: "Módulos" },
  
  // Audit & Security
  "audit-logs": { singular: "Log de Auditoria", plural: "Logs de Auditoria" },
  "login-history": { singular: "Histórico de Login", plural: "Históricos de Login" },
}

export function getAdminResourceLabel(
  resourceName: string,
  singular: boolean = false
): string {
  const labels = resourceLabels[resourceName]
  if (!labels) return resourceName
  return singular ? labels.singular : labels.plural
}

export function createAdminResources(): ResourceProps[] {
  const baseResources: ResourceProps[] = [
    // Core Resources
    {
      name: "markets",
      list: "/admin/markets",
      create: "/admin/markets/create",
      edit: "/admin/markets/edit/:id",
      show: "/admin/markets/show/:id",
      meta: {
        label: getAdminResourceLabel("markets"),
        icon: "BarChart3",
        category: "core",
      },
    },
    {
      name: "users",
      list: "/admin/users",
      create: "/admin/users/create",
      edit: "/admin/users/edit/:id",
      show: "/admin/users/show/:id",
      meta: {
        label: getAdminResourceLabel("users"),
        icon: "Users",
        category: "core",
      },
    },
    {
      name: "transactions",
      list: "/admin/transactions",
      create: "/admin/transactions/create",
      edit: "/admin/transactions/edit/:id",
      show: "/admin/transactions/show/:id",
      meta: {
        label: getAdminResourceLabel("transactions"),
        icon: "Receipt",
        category: "finance",
      },
    },
    
    // Leaderboards
    {
      name: "leaderboards-depositors",
      list: "/admin/leaderboards-depositors",
      meta: {
        label: "Depósitos",
        icon: "TrendingUp",
        category: "leaderboards",
      },
    },
    {
      name: "leaderboards-time",
      list: "/admin/leaderboards-time",
      meta: {
        label: "Tempo de Uso",
        icon: "Clock",
        category: "leaderboards",
      },
    },
    {
      name: "leaderboards-withdrawals",
      list: "/admin/leaderboards-withdrawals",
      meta: {
        label: "Saques",
        icon: "ArrowDown",
        category: "leaderboards",
      },
    },
    
    // Admin & Roles
    {
      name: "roles",
      list: "/admin/roles",
      create: "/admin/roles/create",
      edit: "/admin/roles/edit/:id",
      show: "/admin/roles/show/:id",
      meta: {
        label: getAdminResourceLabel("roles"),
        icon: "Shield",
        category: "admin-management",
      },
    },
    {
      name: "permissions",
      list: "/admin/permissions",
      create: "/admin/permissions/create",
      edit: "/admin/permissions/edit/:id",
      meta: {
        label: getAdminResourceLabel("permissions"),
        icon: "Key",
        category: "admin-management",
      },
    },
    {
      name: "admin-users",
      list: "/admin/admin-users",
      create: "/admin/admin-users/create",
      edit: "/admin/admin-users/edit/:id",
      show: "/admin/admin-users/show/:id",
      meta: {
        label: "Administradores",
        icon: "UserCog",
        category: "admin-management",
      },
    },
    
    // Marketing
    {
      name: "promo-codes",
      list: "/admin/promo-codes",
      create: "/admin/promo-codes/create",
      edit: "/admin/promo-codes/edit/:id",
      show: "/admin/promo-codes/show/:id",
      meta: {
        label: getAdminResourceLabel("promo-codes"),
        icon: "Tag",
        category: "marketing",
      },
    },
    {
      name: "campaigns",
      list: "/admin/campaigns",
      create: "/admin/campaigns/create",
      edit: "/admin/campaigns/edit/:id",
      show: "/admin/campaigns/show/:id",
      meta: {
        label: getAdminResourceLabel("campaigns"),
        icon: "Megaphone",
        category: "marketing",
      },
    },
    
    // Content Management
    {
      name: "banners",
      list: "/admin/banners",
      create: "/admin/banners/create",
      edit: "/admin/banners/edit/:id",
      show: "/admin/banners/show/:id",
      meta: {
        label: getAdminResourceLabel("banners"),
        icon: "Image",
        category: "content",
      },
    },
    {
      name: "front-images",
      list: "/admin/front-images",
      create: "/admin/front-images/create",
      edit: "/admin/front-images/edit/:id",
      meta: {
        label: "Imagens de Capa",
        icon: "ImagePlus",
        category: "content",
      },
    },
    {
      name: "signup-images",
      list: "/admin/signup-images",
      create: "/admin/signup-images/create",
      edit: "/admin/signup-images/edit/:id",
      meta: {
        label: "Imagens de Cadastro",
        icon: "ImagePlus",
        category: "content",
      },
    },
    {
      name: "pages",
      list: "/admin/pages",
      create: "/admin/pages/create",
      edit: "/admin/pages/edit/:id",
      show: "/admin/pages/show/:id",
      meta: {
        label: getAdminResourceLabel("pages"),
        icon: "FileText",
        category: "content",
      },
    },
    
    // Reports
    {
      name: "user-reports",
      list: "/admin/user-reports",
      show: "/admin/user-reports/show/:id",
      meta: {
        label: "Denúncias",
        icon: "Flag",
        category: "reports",
      },
    },
    {
      name: "payment-reports",
      list: "/admin/payment-reports",
      meta: {
        label: "Pagamentos",
        icon: "DollarSign",
        category: "reports",
      },
    },
    {
      name: "deposit-reports",
      list: "/admin/deposit-reports",
      meta: {
        label: "Depósitos",
        icon: "ArrowUp",
        category: "reports",
      },
    },
    {
      name: "merchandise-reports",
      list: "/admin/merchandise-reports",
      meta: {
        label: "Merchandise",
        icon: "Package",
        category: "reports",
      },
    },
    
    // Finance
    {
      name: "withdrawals",
      list: "/admin/withdrawals",
      show: "/admin/withdrawals/show/:id",
      edit: "/admin/withdrawals/edit/:id",
      meta: {
        label: getAdminResourceLabel("withdrawals"),
        icon: "ArrowDownCircle",
        category: "finance",
      },
    },
    {
      name: "deposits",
      list: "/admin/deposits",
      show: "/admin/deposits/show/:id",
      meta: {
        label: getAdminResourceLabel("deposits"),
        icon: "ArrowUpCircle",
        category: "finance",
      },
    },
    {
      name: "ledger-entries",
      list: "/admin/ledger-entries",
      show: "/admin/ledger-entries/show/:id",
      meta: {
        label: "Ledger / Winning Balance",
        icon: "BookOpen",
        category: "finance",
      },
    },
    {
      name: "wallets",
      list: "/admin/wallets",
      show: "/admin/wallets/show/:id",
      meta: {
        label: getAdminResourceLabel("wallets"),
        icon: "Wallet",
        category: "finance",
      },
    },
    {
      name: "payment-methods",
      list: "/admin/payment-methods",
      create: "/admin/payment-methods/create",
      edit: "/admin/payment-methods/edit/:id",
      meta: {
        label: "Métodos de Pagamento",
        icon: "CreditCard",
        category: "finance",
      },
    },
    
    // Settings
    {
      name: "avatars",
      list: "/admin/avatars",
      create: "/admin/avatars/create",
      edit: "/admin/avatars/edit/:id",
      meta: {
        label: getAdminResourceLabel("avatars"),
        icon: "User",
        category: "settings",
      },
    },
    {
      name: "whats-new",
      list: "/admin/whats-new",
      create: "/admin/whats-new/create",
      edit: "/admin/whats-new/edit/:id",
      meta: {
        label: "Novidades",
        icon: "Sparkles",
        category: "settings",
      },
    },
    {
      name: "games",
      list: "/admin/games",
      create: "/admin/games/create",
      edit: "/admin/games/edit/:id",
      show: "/admin/games/show/:id",
      meta: {
        label: getAdminResourceLabel("games"),
        icon: "Gamepad",
        category: "settings",
      },
    },
    {
      name: "assets",
      list: "/admin/assets",
      create: "/admin/assets/create",
      meta: {
        label: "Upload de Assets",
        icon: "Upload",
        category: "settings",
      },
    },
    {
      name: "branding",
      list: "/admin/branding",
      edit: "/admin/branding/edit/1",
      meta: {
        label: "Branding",
        icon: "Palette",
        category: "settings",
      },
    },
    {
      name: "modules",
      list: "/admin/modules",
      edit: "/admin/modules/edit/:id",
      meta: {
        label: getAdminResourceLabel("modules"),
        icon: "Grid",
        category: "settings",
      },
    },
    
    // Audit & Security
    {
      name: "audit-logs",
      list: "/admin/audit-logs",
      show: "/admin/audit-logs/show/:id",
      meta: {
        label: getAdminResourceLabel("audit-logs"),
        icon: "FileSearch",
        category: "audit",
      },
    },
    {
      name: "login-history",
      list: "/admin/login-history",
      show: "/admin/login-history/show/:id",
      meta: {
        label: "Histórico de Login",
        icon: "History",
        category: "audit",
      },
    },
  ]

  return baseResources
}

export function getResourcesByCategory(): Record<string, ResourceProps[]> {
  const resources = createAdminResources()
  const categorized: Record<string, ResourceProps[]> = {}

  resources.forEach((resource) => {
    const category = resource.meta?.category || "other"
    if (!categorized[category]) {
      categorized[category] = []
    }
    categorized[category].push(resource)
  })

  return categorized
}

export const adminCategories = [
  { id: "core", label: "Principal", icon: "Home" },
  { id: "leaderboards", label: "Leaderboards", icon: "Trophy" },
  { id: "admin-management", label: "Gestão de Acesso", icon: "Shield" },
  { id: "marketing", label: "Marketing", icon: "Megaphone" },
  { id: "content", label: "Conteúdo", icon: "FileText" },
  { id: "reports", label: "Relatórios", icon: "BarChart" },
  { id: "finance", label: "Financeiro", icon: "DollarSign" },
  { id: "settings", label: "Configurações", icon: "Settings" },
  { id: "audit", label: "Auditoria", icon: "Shield" },
]
