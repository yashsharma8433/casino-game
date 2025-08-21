import { NextResponse } from "next/server";
import type { BetRequest } from "@/types/bet";
import { getBalance, getMatches, setBalance } from "@/server/state";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json()) as BetRequest;
  const { stake, selection } = body;

  if (!stake || stake <= 0 || !selection) {
    return NextResponse.json({ status: "error", message: "Invalid bet" }, { status: 400 });
  }

  const matches = getMatches();
  const match = matches.find((m) => m.id === selection.matchId);
  if (!match) {
    return NextResponse.json({ status: "error", message: "Match not found" }, { status: 404 });
  }

  const currentOdd = match.odds[selection.outcome];
  if (Math.abs(currentOdd - selection.odd) > 1e-9) {
    return NextResponse.json({ status: "error", message: "Odds changed", newOdd: currentOdd }, { status: 409 });
  }

  const balance = getBalance();
  if (stake > balance) {
    return NextResponse.json({ status: "error", message: "Insufficient funds" }, { status: 402 });
  }

  const newBalance = Number((balance - stake).toFixed(2));
  setBalance(newBalance);
  const potentialReturn = Number((stake * currentOdd).toFixed(2));

  return NextResponse.json({ status: "success", newBalance, potentialReturn });
}


