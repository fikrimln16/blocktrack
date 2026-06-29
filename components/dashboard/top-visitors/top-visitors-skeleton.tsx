export function TopVisitorsSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
