"use client"

import React from "react"
import { Refine } from "@refinedev/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAdminResources } from "@/lib/admin-resources"
import dataProvider from "@refinedev/simple-rest"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Refine
        dataProvider={dataProvider(
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
        )}
        resources={createAdminResources()}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        {children}
      </Refine>
    </QueryClientProvider>
  )
}
