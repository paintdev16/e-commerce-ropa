import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
      <Skeleton className="h-4 w-52 rounded-none" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[.9] rounded-none" />
        <div className="space-y-5 py-4"><Skeleton className="h-3 w-36 rounded-none"/><Skeleton className="h-12 w-3/4 rounded-none"/><Skeleton className="h-6 w-36 rounded-none"/><Skeleton className="mt-8 h-24 w-full rounded-none"/><Skeleton className="mt-10 h-12 w-full rounded-none"/></div>
      </div>
    </main>
  );
}
