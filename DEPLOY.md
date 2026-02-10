# 🚀 Deploy CenarioX no Render.com

## ✅ PRONTO PARA DEPLOY

O projeto está configurado com:
- ✅ `render.yaml` - Blueprint automático
- ✅ 6 commits pushados para `origin/main`
- ✅ PostgreSQL + API + Web configurados

## 🎯 DEPLOY AUTOMÁTICO (5 minutos)

### 1. Acesse Render Dashboard:
👉 https://dashboard.render.com/

### 2. Criar Blueprint:
- Click **"New"** → **"Blueprint"**
- Conectar: `tiagobbaganha-hash/CenarioX`
- Branch: `main`
- Render detectará `render.yaml`

### 3. Configurar Secrets (IMPORTANTE):
```
JWT_SECRET: (gerar 32+ caracteres aleatórios)
NEXTAUTH_SECRET: (gerar 32+ caracteres aleatórios)
```

### 4. Click "Apply"

O Render criará automaticamente:
- 🗄️  PostgreSQL: `cenariox-db`
- 🔧 API: `cenariox-api`
- 🌐 Web: `cenariox-web`

## 🔗 URLs Produção

- **API:** https://cenariox-api.onrender.com
- **Web:** https://cenariox-web.onrender.com
- **Health:** https://cenariox-api.onrender.com/health

## ✅ Validar Deploy (após 5-10 min)

```bash
# Health check
curl https://cenariox-api.onrender.com/health

# Seed markets (OBRIGATÓRIO)
curl -X POST https://cenariox-api.onrender.com/markets/seed

# Listar markets
curl https://cenariox-api.onrender.com/markets
```

## ⚠️ Known Issues (Documentados)

1. **AuthModule não responde (P0)** - Login/Register retornam 404
2. **MarketsService usa mock (P1)** - Dados em memória
3. Usar POST /markets/seed para popular dados

## 📊 Status: 85% Completo

- ✅ FASES 1-6 implementadas
- 🚀 FASE 7 em andamento (deploy)
- 🔄 FASE 7.1-7.3 pós-deploy (fixes)
