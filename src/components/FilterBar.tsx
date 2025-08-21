"use client";

export default function FilterBar() {
  const tabs = ["Live & Upcoming", "Outrights", "All Cricket"];
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-sm">
        {tabs.map((t, i) => (
          <button key={t} className={`px-3 py-1.5 rounded-full border ${i === 0 ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:bg-foreground/10"}`}>{t}</button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <label className="opacity-70">Display</label>
        <select className="border border-foreground/20 bg-transparent rounded px-2 py-1">
          <option>Standard</option>
          <option>Compact</option>
        </select>
        <label className="opacity-70">Market</label>
        <select className="border border-foreground/20 bg-transparent rounded px-2 py-1">
          <option>Winner</option>
        </select>
      </div>
    </div>
  );
}


