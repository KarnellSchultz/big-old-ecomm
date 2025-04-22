import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images Skeleton */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-md" />
          ))}
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-20 w-full mb-6" />

          <div className="h-px bg-gray-200 my-6" />

          {/* Product Options Skeleton */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>

          {/* Add to Cart Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 my-6">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 mt-0.5" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 