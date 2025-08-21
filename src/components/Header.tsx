"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-transparent border-b border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold ml-20 text-lg">Welcome Back, Yash!</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="underline" href="/matches">Matches</Link>
        </nav>
      </div>
    </header>
  );
}


