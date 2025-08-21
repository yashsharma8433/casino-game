"use client";

import MatchCard from "@/components/MatchCard";
import MatchCardSkeleton from "@/components/MatchCardSkeleton";
import { useMatches } from "@/hooks/useMatches";
import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/FilterBar";
import MatchRow from "@/components/MatchRow";

export default function MatchesPage() {
  const { data, isLoading, isError, refetch } = useMatches();

  return (
    <main className="md:pl-56 md:pr-96">
      <Sidebar />
      <div className="mx-auto max-w-6xl p-4">
        <h1 className="text-2xl font-bold mb-4">Featured Cricket</h1>
        <FilterBar />
      </div>
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-lg border border-foreground/10 overflow-hidden">
          <div className="px-4 py-3 bg-foreground/5 border-b border-foreground/10 font-medium flex items-center justify-between">
            <span>England</span>
            <button className="text-sm opacity-80">▾</button>
          </div>
          {isLoading && (
            <div className="p-4" aria-busy="true" aria-live="polite">
              {Array.from({ length: 5 }).map((_, i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          )}
          {isError && (
            <div className="p-4 flex items-center gap-2" role="alert">
              <span>Failed to load matches.</span>
              <button className="underline" onClick={() => refetch()}>Retry</button>
            </div>
          )}
          {!isLoading && !isError && (
            <div>
              {(data || []).map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


