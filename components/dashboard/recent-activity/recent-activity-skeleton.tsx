export function RecentActivitySkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
