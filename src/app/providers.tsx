"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "@/lib/queryClient";
import { BettingSlipProvider } from "@/hooks/useBettingSlip";
import dynamic from "next/dynamic";
const BettingSlip = dynamic(() => import("@/components/BettingSlip"), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
  const client = getQueryClient();
  return (
    <QueryClientProvider client={client}>
      <BettingSlipProvider>
        {children}
        <BettingSlip />
      </BettingSlipProvider>
    </QueryClientProvider>
  );
}


