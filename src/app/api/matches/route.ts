import { NextResponse } from "next/server";
import { getMatches, updateOddsRandomly } from "@/server/state";

export const dynamic = "force-dynamic";

export async function GET() {
  // Simulate live updates by nudging odds occasionally
  if (Math.random() < 0.5) updateOddsRandomly();
  return NextResponse.json(getMatches());
}


