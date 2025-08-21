export default function MatchCardSkeleton() {
  return (
    <div className="border border-foreground/20 rounded-lg p-4 animate-pulse">
      <div className="h-4 bg-foreground/20 rounded w-1/2 mb-2" />
      <div className="h-4 bg-foreground/10 rounded w-2/3 mb-4" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-9 bg-foreground/10 rounded" />
        <div className="h-9 bg-foreground/10 rounded" />
        <div className="h-9 bg-foreground/10 rounded" />
      </div>
    </div>
  );
}


