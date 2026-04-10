export function TripsFilterSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="h-10 bg-slate-600 rounded animate-pulse" />
      <div className="h-8 bg-slate-600 rounded animate-pulse" />
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-slate-600 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
