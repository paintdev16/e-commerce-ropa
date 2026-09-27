"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGrid } from "@/src/components/products/product-card";
import { getProducts } from "@/src/services/products.service";
import { useShop } from "@/src/store/shop-store";

export default function FavoritesPage() {
  const { favorites, hydrated } = useShop();
  if (!hydrated) return <main aria-label="Cargando favoritos" className="mx-auto min-h-[55vh] max-w-[1440px] px-5 py-14 md:px-10"><Skeleton className="h-3 w-32 rounded-none"/><Skeleton className="mt-4 h-10 w-64 rounded-none"/><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({length:4},(_,index)=><div key={index}><Skeleton className="aspect-[.84] rounded-none"/><Skeleton className="mt-4 h-3 w-2/3 rounded-none"/></div>)}</div></main>;
  const products = getProducts().filter((product) => favorites.includes(product.id));
  return (
    <main className="mx-auto min-h-[55vh] max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
      <p className="eyebrow">GUARDADOS</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-6">
        <div><h1 className="text-4xl tracking-[-.05em]">Tus favoritos<span className="text-[#c66b45]">.</span></h1><p className="mt-2 text-sm text-muted-foreground">{products.length} {products.length === 1 ? "pieza guardada" : "piezas guardadas"}</p></div>
        {products.length > 0 && <Link href="/productos" className="text-xs underline underline-offset-4">Seguir explorando</Link>}
      </div>
      {products.length ? <div className="mt-8"><ProductGrid products={products}/></div> : <div className="grid min-h-80 place-items-center py-16 text-center"><div><span className="mx-auto grid size-12 place-items-center border border-border"><Heart aria-hidden="true" className="size-5"/></span><p className="mt-5 text-xl">Guarda las piezas que te gustan.</p><p className="mt-2 text-sm text-muted-foreground">Podrás volver a encontrarlas aquí cuando quieras.</p><Link href="/productos" className="mt-6 inline-flex h-11 items-center justify-center bg-primary px-6 text-xs tracking-wider text-primary-foreground transition-colors hover:bg-primary/85">EXPLORAR LA TIENDA <ArrowRight aria-hidden="true" className="ml-2 size-4"/></Link></div></div>}
    </main>
  );
}
