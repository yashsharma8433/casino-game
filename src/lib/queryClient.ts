"use client";

import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

export function getQueryClient(): QueryClient {
  if (queryClient) return queryClient;
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
  return queryClient;
}


