"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useShop } from "@/src/store/shop-store";
import type { Product } from "@/src/types/store";

export function ProductActions({ product }: { product: Product }) {
  const { add, favorites, toggleFavorite } = useShop();
  const liked = favorites.includes(product.id);
  const needsOptions = product.sizes.length > 0;
  function handleFavorite() {
    toggleFavorite(product.id);
    toast.success(liked ? "Eliminado de favoritos." : "Agregado a favoritos.");
  }

  return (
    <>
      <Tooltip><TooltipTrigger render={<Button type="button" variant="ghost" size="icon" onClick={handleFavorite} aria-label={liked ? "Quitar de favoritos" : "Guardar en favoritos"} aria-pressed={liked} className="absolute right-3 top-3 rounded-full bg-white/90 hover:bg-white"/>}><Heart aria-hidden="true" className={`size-4 ${liked ? "fill-[#a44732] text-[#a44732]" : ""}`} /></TooltipTrigger><TooltipContent>{liked ? "Quitar de favoritos" : "Guardar en favoritos"}</TooltipContent></Tooltip>
      {needsOptions ? (
        <Link href={`/productos/${product.slug}`} className="absolute bottom-3 left-3 right-3 inline-flex translate-y-0 items-center justify-center gap-2 bg-[#24241f] py-3 text-[11px] font-semibold tracking-[.1em] text-white transition duration-200 hover:bg-[#a44732] focus-visible:outline-2 focus-visible:outline-offset-2 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <ShoppingBag aria-hidden="true" className="size-3.5"/> ELEGIR TALLA
        </Link>
      ) : (
        <Button type="button" disabled={product.stock <= 0} onClick={() => { add(product); toast.success("Producto agregado a tu bolsa."); }} className="absolute bottom-3 left-3 right-3 h-auto translate-y-0 rounded-none bg-[#24241f] py-3 text-[11px] font-semibold tracking-[.1em] text-white transition duration-200 hover:bg-[#a44732] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          {product.stock > 0 ? "AÑADIR A LA BOLSA" : "AGOTADO"}
        </Button>
      )}
    </>
  );
}
