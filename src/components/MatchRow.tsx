"use client";

import OddsButton from "@/components/OddsButton";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import type { Match, Outcome } from "@/types/match";
import { useEffect, useRef, useState } from "react";

type Delta = "up" | "down" | "same";

export default function MatchRow({ match }: { match: Match }) {
  const { addSelection, selections } = useBettingSlip();
  const selectedOutcome = selections.find(s => s.matchId === match.id)?.outcome;

  const handleSelect = (outcome: Outcome, odd: number) => {
    const label = `${match.homeTeam} vs ${match.awayTeam} — ${
      outcome === "homeWin" ? "Home" : outcome === "draw" ? "Draw" : "Away"
    }`;
    addSelection({ matchId: match.id, outcome, odd, label });
  };

  const localTime = new Date(match.startTime).toLocaleString();

  const prevOddsRef = useRef(match.odds);
  const [delta, setDelta] = useState<{ homeWin: Delta; draw: Delta; awayWin: Delta }>({ homeWin: "same", draw: "same", awayWin: "same" });

  useEffect(() => {
    const prev = prevOddsRef.current;
    const compute = (p: number, n: number): Delta => (n > p ? "up" : n < p ? "down" : "same");
    setDelta({
      homeWin: compute(prev.homeWin, match.odds.homeWin),
      draw: compute(prev.draw, match.odds.draw),
      awayWin: compute(prev.awayWin, match.odds.awayWin),
    });
    prevOddsRef.current = match.odds;
  }, [match.odds.homeWin, match.odds.draw, match.odds.awayWin]);

  const badge = (d: Delta) => (d === "same" ? "" : d === "up" ? "text-green-500" : "text-red-500");

  return (
    <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 items-center border-b border-foreground/10">
      <div className="col-span-2 md:col-span-1">
        <div className="text-sm opacity-70">{localTime}</div>
        <div className="font-medium">{match.homeTeam}</div>
        <div className="opacity-80 text-sm">{match.awayTeam}</div>
      </div>
      <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-2">
        <OddsButton selected={selectedOutcome === "homeWin"} onClick={() => handleSelect("homeWin", match.odds.homeWin)}>
          <span className="flex items-center gap-1">
            Home {match.odds.homeWin.toFixed(2)}
            <span aria-hidden className={`text-xs ${badge(delta.homeWin)}`}>{delta.homeWin === "up" ? "▲" : delta.homeWin === "down" ? "▼" : ""}</span>
          </span>
        </OddsButton>
        <OddsButton selected={selectedOutcome === "draw"} onClick={() => handleSelect("draw", match.odds.draw)}>
          <span className="flex items-center gap-1">
            Draw {match.odds.draw.toFixed(2)}
            <span aria-hidden className={`text-xs ${badge(delta.draw)}`}>{delta.draw === "up" ? "▲" : delta.draw === "down" ? "▼" : ""}</span>
          </span>
        </OddsButton>
        <OddsButton selected={selectedOutcome === "awayWin"} onClick={() => handleSelect("awayWin", match.odds.awayWin)}>
          <span className="flex items-center gap-1">
            Away {match.odds.awayWin.toFixed(2)}
            <span aria-hidden className={`text-xs ${badge(delta.awayWin)}`}>{delta.awayWin === "up" ? "▲" : delta.awayWin === "down" ? "▼" : ""}</span>
          </span>
        </OddsButton>
      </div>
    </div>
  );
}


