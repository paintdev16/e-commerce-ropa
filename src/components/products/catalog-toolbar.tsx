"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFilters } from "@/src/types/store";

const sortOptions: { value: NonNullable<ProductFilters["sort"]>; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "bestseller", label: "Más vendidos" },
  { value: "discount", label: "Mayor descuento" },
  { value: "rating", label: "Mejor valorados" },
];

export default function CatalogToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => setQuery(params.get("q") ?? ""), [params]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      const cleanQuery = query.trim();
      if (cleanQuery) next.set("q", cleanQuery);
      else next.delete("q");
      next.delete("page");
      if (next.toString() !== params.toString()) {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [params, pathname, query, router]);

  function setSort(value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "featured") next.set("sort", value);
    else next.delete("sort");
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-[340px]">
        <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca sneakers, marcas, ropa…"
          aria-label="Buscar en el catálogo"
          className="h-10 rounded-none border-0 border-b border-border bg-transparent pl-9 text-sm shadow-none focus-visible:ring-0"
        />
      </div>
      <Select value={params.get("sort") ?? "featured"} onValueChange={setSort}>
        <SelectTrigger aria-label="Ordenar productos" className="h-10 w-full rounded-none border-0 border-b border-border bg-transparent text-xs shadow-none focus-visible:ring-0 sm:w-[215px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent align="end">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
