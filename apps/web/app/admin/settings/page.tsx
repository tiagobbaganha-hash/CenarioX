"use client";

import { Box, Card, CardContent, Stack, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "CenarioX",
    maintenanceMode: false,
    allowNewUsers: true,
    minDepositAmount: 10,
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Configurações
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configurações gerais da plataforma
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Geral
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Nome do Site"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                />
              }
              label="Modo de Manutenção"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.allowNewUsers}
                  onChange={(e) => setSettings({ ...settings, allowNewUsers: e.target.checked })}
                />
              }
              label="Permitir Novos Usuários"
            />
            <TextField
              label="Depósito Mínimo (BRL)"
              type="number"
              value={settings.minDepositAmount}
              onChange={(e) => setSettings({ ...settings, minDepositAmount: Number(e.target.value) })}
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>

      <Box>
        <Button variant="contained" size="large" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </Box>
    </Stack>
  );
}
