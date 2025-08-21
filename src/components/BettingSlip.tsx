"use client";

import { useBettingSlip } from "@/hooks/useBettingSlip";
import { useBalance } from "@/hooks/useBalance";
import apiClient from "@/lib/api";
import type { BetRequest, BetResponse } from "@/types/bet";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export default function BettingSlip() {
  const { selections, stake, setStake, removeSelection, clearSelections, potentialReturn } = useBettingSlip();
  const { data: balanceData, refetch: refetchBalance, setBalance } = useBalance();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(selections.length > 0);
  }, [selections.length]);

  const totalStake = stake;
  const balance = balanceData?.balance ?? 0;
  const canPlace = selections.length > 0 && totalStake > 0 && totalStake <= balance;

  const mutation = useMutation({
    mutationFn: async () => {
      const body: BetRequest = {
        stake: totalStake,
        selection: selections[0],
      };
      try {
        const { data } = await apiClient.post<BetResponse>("/bets", body);
        return data;
      } catch (err: any) {
        const fallback: BetResponse = { status: "error", message: "Unknown error" } as any;
        return (err?.response?.data as BetResponse) || fallback;
      }
    },
    onSuccess: (res) => {
      if (res.status === "success") {
        setBalance(res.newBalance);
        clearSelections();
        setStake(0);
      }
    },
  });

  const errorText = useMemo(() => {
    if (!mutation.data || mutation.data.status === "success") return "";
    const msg = mutation.data.message + (mutation.data.newOdd ? ` (New odd: ${mutation.data.newOdd})` : "");
    return msg;
  }, [mutation.data]);

  return (
    <div className="">
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed top-0 right-0 h-full w-80 border-l border-foreground/20 p-4 overflow-y-auto" style={{ backgroundColor: "var(--slip)" }}>
        <SlipContent
          selections={selections}
          stake={stake}
          setStake={setStake}
          potentialReturn={potentialReturn}
          removeSelection={removeSelection}
          canPlace={canPlace}
          place={() => mutation.mutate()}
          placing={mutation.isPending}
          errorText={errorText}
          balance={balance}
        />
      </div>

      {/* Mobile drawer */}
      <div className="md:hidden">
        <button
          className="fixed bottom-4 right-4 px-4 py-2 rounded-full bg-foreground text-background shadow"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="mobile-slip"
        >
          Slip ({selections.length})
        </button>
        <div
          id="mobile-slip"
          className={`fixed left-0 right-0 bottom-0 border-t border-foreground/20 p-4 transition-transform ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ backgroundColor: "var(--slip)" }}
        >
          <SlipContent
            selections={selections}
            stake={stake}
            setStake={setStake}
            potentialReturn={potentialReturn}
            removeSelection={removeSelection}
            canPlace={canPlace}
            place={() => mutation.mutate()}
            placing={mutation.isPending}
            errorText={errorText}
            balance={balance}
          />
        </div>
      </div>
    </div>
  );
}

interface SlipContentProps {
  selections: ReturnType<typeof useBettingSlip>["selections"];
  stake: number;
  setStake: (n: number) => void;
  potentialReturn: number;
  removeSelection: (matchId: string) => void;
  canPlace: boolean;
  place: () => void;
  placing: boolean;
  errorText: string;
  balance: number;
}

function SlipContent({ selections, stake, setStake, potentialReturn, removeSelection, canPlace, place, placing, errorText, balance }: SlipContentProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold flex items-center justify-between">
        <span>Bet Slip</span>
      </div>
      {selections.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 select-none">
          <div className="opacity-80 text-sm">Bet Slip is Empty</div>
          <div className="text-base font-medium mt-1">Start Betting Now!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {selections.map((s) => (
            <div key={s.matchId} className="border border-foreground/20 rounded p-2 flex items-center justify-between gap-2 animate-slide-in">
              <div className="text-sm">
                <div className="font-medium">{s.label}</div>
                <div className="opacity-70">@ {s.odd.toFixed(2)}</div>
              </div>
              <button aria-label="remove" className="text-xs underline opacity-80" onClick={() => removeSelection(s.matchId)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          step={1}
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
          placeholder="Stake"
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-transparent"
          aria-label="Stake"
        />
        <div className="text-sm whitespace-nowrap">Return: {potentialReturn.toFixed(2)}</div>
      </div>

      {errorText && <div role="alert" className="text-sm text-red-500">{errorText}</div>}

      <button
        disabled={!canPlace || placing}
        onClick={place}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          canPlace ? "bg-foreground text-background" : "bg-foreground/40 text-background/70 cursor-not-allowed"
        }`}
        aria-disabled={!canPlace}
      >
        {placing ? "Placing..." : "Place Bet"}
      </button>
    </div>
  );
}


