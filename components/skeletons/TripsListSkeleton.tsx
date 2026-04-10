export function TripsListSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-12 bg-slate-600 rounded animate-pulse" />
      ))}
    </div>
  );
}
