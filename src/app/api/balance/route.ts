import { NextResponse } from "next/server";
import { getBalance } from "@/server/state";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ balance: getBalance() });
}


