"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 flex-col gap-2 border-r border-foreground/10 bg-background/95 backdrop-blur p-3">
      <div className="text-xl font-bold px-2 py-2">Casino Game</div>
      <nav className="flex-1 overflow-y-auto pr-1">
        <ul className="flex flex-col gap-1 text-sm">
          <li>
            <Link className="block px-2 py-2 rounded hover:bg-foreground/10" href="/matches">Cricket</Link>
          </li>
          <li>
            <a className="block px-2 py-2 rounded hover:bg-foreground/10" href="#">Football</a>
          </li>
          <li>
            <a className="block px-2 py-2 rounded hover:bg-foreground/10" href="#">Tennis</a>
          </li>
          <li>
            <a className="block px-2 py-2 rounded hover:bg-foreground/10" href="#">Basketball</a>
          </li>
        </ul>
      </nav>
      <div className="px-2"><button className="w-full text-sm rounded border border-foreground/20 px-3 py-2">Login</button></div>
    </aside>
  );
}


