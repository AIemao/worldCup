import { Skeleton } from "@/components/loading/Skeleton";

// Skeleton de página completa — exibido pelo Suspense durante lazy routes
export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page..." className="flex flex-1 flex-col gap-6 p-8">
      {/* header skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* content skeleton — 3 card rows */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
