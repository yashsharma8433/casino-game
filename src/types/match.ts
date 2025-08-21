export type Outcome = "homeWin" | "draw" | "awayWin";

export interface Odds {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO
  odds: Odds;
}


