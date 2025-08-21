"use client";

import OddsButton from "@/components/OddsButton";
import { useBettingSlip } from "@/hooks/useBettingSlip";
import type { Match, Outcome } from "@/types/match";
import { useEffect, useRef, useState } from "react";

interface MatchCardProps {
  match: Match;
}

type Delta = "up" | "down" | "same";

export default function MatchCard({ match }: MatchCardProps) {
  const { addSelection, selections } = useBettingSlip();
  const selectedOutcome = selections.find(s => s.matchId === match.id)?.outcome;

  const prevOddsRef = useRef(match.odds);
  const [delta, setDelta] = useState<{ homeWin: Delta; draw: Delta; awayWin: Delta }>({ homeWin: "same", draw: "same", awayWin: "same" });

  useEffect(() => {
    const prev = prevOddsRef.current;
    const compute = (prevVal: number, nextVal: number): Delta => (nextVal > prevVal ? "up" : nextVal < prevVal ? "down" : "same");
    setDelta({
      homeWin: compute(prev.homeWin, match.odds.homeWin),
      draw: compute(prev.draw, match.odds.draw),
      awayWin: compute(prev.awayWin, match.odds.awayWin),
    });
    prevOddsRef.current = match.odds;
  }, [match.odds.homeWin, match.odds.draw, match.odds.awayWin]);

  const handleSelect = (outcome: Outcome, odd: number) => {
    const label = `${match.homeTeam} vs ${match.awayTeam} — ${
      outcome === "homeWin" ? "Home" : outcome === "draw" ? "Draw" : "Away"
    }`;
    addSelection({ matchId: match.id, outcome, odd, label });
  };

  const localTime = new Date(match.startTime).toLocaleString();

  const badge = (d: Delta) => (
    d === "same" ? "" : d === "up" ? "text-green-600" : "text-red-600"
  );

  return (
    <div className="border border-foreground/20 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{match.homeTeam}</div>
        <div className="text-xs opacity-70">{localTime}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{match.awayTeam}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2">
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


