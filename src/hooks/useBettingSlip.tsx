"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BetSelection } from "@/types/bet";

interface BettingSlipContextValue {
  selections: BetSelection[];
  stake: number;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string) => void;
  clearSelections: () => void;
  setStake: (stake: number) => void;
  potentialReturn: number;
}

const BettingSlipContext = createContext<BettingSlipContextValue | undefined>(undefined);

const STORAGE_KEY = "betting-slip";

export function BettingSlipProvider({ children }: { children: React.ReactNode }) {
  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [stake, setStake] = useState<number>(0);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { selections: BetSelection[]; stake: number };
        setSelections(parsed.selections || []);
        setStake(parsed.stake || 0);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selections, stake }));
    } catch {}
  }, [selections, stake, hydrated]);

  const addSelection = useCallback((selection: BetSelection) => {
    setSelections(prev => {
      const filtered = prev.filter(s => s.matchId !== selection.matchId);
      return [...filtered, selection];
    });
  }, []);

  const removeSelection = useCallback((matchId: string) => {
    setSelections(prev => prev.filter(s => s.matchId !== matchId));
  }, []);

  const clearSelections = useCallback(() => setSelections([]), []);

  const potentialReturn = useMemo(() => {
    if (stake <= 0 || selections.length === 0) return 0;
    const productOdd = selections.reduce((acc, s) => acc * s.odd, 1);
    return Number((stake * productOdd).toFixed(2));
  }, [stake, selections]);

  const value = useMemo(
    () => ({ selections, stake, addSelection, removeSelection, clearSelections, setStake, potentialReturn }),
    [selections, stake, addSelection, removeSelection, clearSelections, potentialReturn]
  );

  return <BettingSlipContext.Provider value={value}>{children}</BettingSlipContext.Provider>;
}

export function useBettingSlip() {
  const ctx = useContext(BettingSlipContext);
  if (!ctx) throw new Error("useBettingSlip must be used within BettingSlipProvider");
  return ctx;
}


