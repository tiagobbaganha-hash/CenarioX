"use client"

import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui"
import { Box, Stack, Typography } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { useMemo, use } from "react"
import { getAdminResourceLabel } from "@/lib/admin-resources"

const getRowName = (row: Record<string, unknown>) =>
  (row.name || row.title || row.email || row.code || row.slug || "-") as string

export default function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>
}) {
  const { resource: resourceName } = use(params)
  const { dataGridProps } = useDataGrid({ resource: resourceName })

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Nome",
        flex: 1,
        minWidth: 200,
        valueGetter: (_, row) => getRowName(row),
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        valueGetter: (_, row) => (row.status as string) ?? "-",
      },
      {
        field: "createdAt",
        headerName: "Criado",
        width: 180,
        valueGetter: (_, row) => (row.createdAt as string) ?? "-",
      },
      {
        field: "actions",
        headerName: "Acoes",
        width: 170,
        sortable: false,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <EditButton hideText size="small" recordItemId={row.id} />
            <ShowButton hideText size="small" recordItemId={row.id} />
            <DeleteButton hideText size="small" recordItemId={row.id} />
          </Stack>
        ),
      },
    ],
    []
  )

  return (
    <List
      title={
        <Typography variant="h5" component="h1" fontWeight={600}>
          {getAdminResourceLabel(resourceName)}
        </Typography>
      }
      headerButtons={({ defaultButtons }) => (
        <Box display="flex" gap={1}>
          <CreateButton variant="contained" />
          {defaultButtons}
        </Box>
      )}
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
        }}
      />
    </List>
  )
}
