import type { Outcome } from "./match";

export interface BalanceResponse {
  balance: number;
}

export interface BetSelection {
  matchId: string;
  outcome: Outcome;
  odd: number;
  label: string; // e.g., "FC Barcelona vs Real Madrid — Home"
}

export interface BetRequest {
  stake: number;
  selection: BetSelection;
}

export interface BetSuccessResponse {
  status: "success";
  newBalance: number;
  potentialReturn: number;
}

export interface BetErrorResponse {
  status: "error";
  message: string;
  newOdd?: number;
}

export type BetResponse = BetSuccessResponse | BetErrorResponse;


