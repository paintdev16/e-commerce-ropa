import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-5 pb-20 pt-12 md:px-10">
      <Skeleton className="h-3 w-36 rounded-none" />
      <Skeleton className="mt-7 h-14 w-64 rounded-none" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <Skeleton className="aspect-[.84] rounded-none" />
            <Skeleton className="mt-4 h-3 w-2/3 rounded-none" />
            <Skeleton className="mt-3 h-3 w-1/3 rounded-none" />
          </div>
        ))}
      </div>
    </main>
  );
}
