"use client";

import { ReactNode } from "react";

interface OddsButtonProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export default function OddsButton({ selected, onClick, children }: OddsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/40 ${
        selected ? "bg-foreground text-background border-foreground" : "bg-transparent border-foreground/20 hover:bg-foreground/10"
      }`}
    >
      {children}
    </button>
  );
}


