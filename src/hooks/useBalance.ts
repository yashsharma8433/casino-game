"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import type { BalanceResponse } from "@/types/bet";

export function useBalance() {
  const qc = useQueryClient();
  const query = useQuery<BalanceResponse>({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data } = await apiClient.get<BalanceResponse>("/balance");
      return data;
    },
    refetchOnMount: true,
  });

  const setBalance = (balance: number) => {
    qc.setQueryData<BalanceResponse>(["balance"], { balance });
  };

  return { ...query, setBalance } as const;
}


