"use client"

import { Show, TextFieldComponent as TextField } from "@refinedev/mui"
import { Stack, Typography } from "@mui/material"
import { useShow } from "@refinedev/core"
import { getAdminResourceLabel } from "@/lib/admin-resources"
import { use } from "react"

export default function ResourceShowPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>
}) {
  const { resource: resourceName, id } = use(params)

  const { queryResult } = useShow({
    resource: resourceName,
    id: id,
  })

  const { data, isLoading } = queryResult
  const record = data?.data

  return (
    <Show
      isLoading={isLoading}
      title={
        <Typography variant="h5" component="h1" fontWeight={600}>
          Visualizar {getAdminResourceLabel(resourceName, true)}
        </Typography>
      }
    >
      <Stack spacing={2}>
        <TextField value={record?.id} label="ID" />
        <TextField
          value={
            record?.name || record?.title || record?.email || record?.slug || "-"
          }
          label="Nome"
        />
        <TextField value={record?.description} label="Descrição" />
        <TextField value={record?.status} label="Status" />
        <TextField value={record?.createdAt} label="Criado" />
        <TextField value={record?.updatedAt} label="Atualizado" />
      </Stack>
    </Show>
  )
}
