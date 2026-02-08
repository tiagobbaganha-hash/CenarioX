"use client"

import { Create } from "@refinedev/mui"
import { Box, TextField, Stack, Typography } from "@mui/material"
import { useForm } from "@refinedev/react-hook-form"
import { getAdminResourceLabel } from "@/lib/admin-resources"
import { use } from "react"

export default function ResourceCreatePage({
  params,
}: {
  params: Promise<{ resource: string }>
}) {
  const { resource: resourceName } = use(params)

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      resource: resourceName,
    },
  })

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        variant: "contained",
      }}
      title={
        <Typography variant="h5" component="h1" fontWeight={600}>
          Criar {getAdminResourceLabel(resourceName, true)}
        </Typography>
      }
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Stack spacing={3}>
          <TextField
            {...register("name", {
              required: "Este campo é obrigatório",
            })}
            error={!!(errors as any)?.name}
            helperText={(errors as any)?.name?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Nome"
            name="name"
          />

          <TextField
            {...register("description")}
            error={!!(errors as any)?.description}
            helperText={(errors as any)?.description?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            multiline
            rows={4}
            label="Descrição"
            name="description"
          />

          <TextField
            {...register("status")}
            error={!!(errors as any)?.status}
            helperText={(errors as any)?.status?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Status"
            name="status"
            placeholder="active, inactive, pending..."
          />
        </Stack>
      </Box>
    </Create>
  )
}
