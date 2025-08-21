import MatchCardSkeleton from "@/components/MatchCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl p-4 md:pr-96">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}


