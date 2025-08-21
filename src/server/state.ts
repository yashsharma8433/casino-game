import type { Match } from "@/types/match";

let balance = 100.0;

let matches: Match[] = [
  {
    id: "match_1",
    homeTeam: "FC Barcelona",
    awayTeam: "Real Madrid",
    startTime: "2025-08-20T18:00:00Z",
    odds: { homeWin: 2.1, draw: 3.4, awayWin: 2.9 },
  },
  {
    id: "match_2",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    startTime: "2025-08-21T19:30:00Z",
    odds: { homeWin: 1.9, draw: 3.6, awayWin: 3.8 },
  },
  {
    id: "match_3",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    startTime: "2025-08-22T17:00:00Z",
    odds: { homeWin: 2.2, draw: 3.3, awayWin: 3.1 },
  },
];

export function getBalance() {
  return balance;
}

export function setBalance(newBalance: number) {
  balance = Number(newBalance.toFixed(2));
}

export function getMatches() {
  return matches;
}

export function updateOddsRandomly() {
  // Randomly nudge odds by up to ±0.1 to simulate live changes
  matches = matches.map((m) => {
    const nudge = () => {
      const delta = (Math.random() - 0.5) * 0.2; // -0.1..0.1
      const next = Math.max(1.2, Number((delta).toFixed(2)));
      return next;
    };
    const jitter = (v: number) => {
      const delta = (Math.random() - 0.5) * 0.2;
      const next = Math.max(1.2, v + delta);
      return Number(next.toFixed(2));
    };
    return {
      ...m,
      odds: {
        homeWin: jitter(m.odds.homeWin),
        draw: jitter(m.odds.draw),
        awayWin: jitter(m.odds.awayWin),
      },
    };
  });
}

export function setMatches(next: Match[]) {
  matches = next;
}


