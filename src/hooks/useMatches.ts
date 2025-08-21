"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import type { Match } from "@/types/match";

export function useMatches() {
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      const { data } = await apiClient.get<Match[]>("/matches");
      return data;
    },
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
}


