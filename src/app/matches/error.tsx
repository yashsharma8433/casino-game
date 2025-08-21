"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-6xl p-4 md:pr-96">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <div role="alert" className="border border-red-500/40 bg-red-500/10 text-red-600 rounded p-4">
        <div className="font-semibold mb-2">Something went wrong</div>
        <div className="text-sm mb-3">{error.message}</div>
        <button className="underline text-sm" onClick={reset}>Try again</button>
      </div>
    </main>
  );
}


