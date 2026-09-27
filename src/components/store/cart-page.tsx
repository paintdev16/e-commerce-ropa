"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/src/services/products.service";
import { cartItemKey, useShop } from "@/src/store/shop-store";

const money = (value: number) => `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const FREE_SHIPPING = 350;
const SHIPPING_COST = 15;

export default function CartPage() {
  const { cart, setQuantity, remove, hydrated } = useShop();
  const products = getProducts();
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product, key: cartItemKey(line) }] : [];
  });
  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const remainingForShipping = Math.max(0, FREE_SHIPPING - subtotal);

  if (!hydrated) return <main aria-label="Cargando bolsa" className="mx-auto min-h-[55vh] max-w-[1100px] px-5 py-14 md:px-10"><Skeleton className="h-3 w-32 rounded-none"/><Skeleton className="mt-4 h-10 w-56 rounded-none"/><Skeleton className="mt-10 h-40 rounded-none"/></main>;

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1200px] px-5 py-10 md:px-10 md:py-14">
      <p className="eyebrow">TU SELECCIÓN</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-6">
        <div><h1 className="text-4xl tracking-[-.05em]">La bolsa<span className="text-[#c66b45]">.</span></h1><p className="mt-2 text-sm text-muted-foreground">{lines.reduce((count, { line }) => count + line.quantity, 0)} artículos</p></div>
        {lines.length > 0 && <Link href="/productos" className="text-xs underline underline-offset-4">Seguir explorando</Link>}
      </div>
      {lines.length ? (
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <section aria-label="Artículos de la bolsa" className="divide-y divide-border">
            {lines.map(({ line, product, key }) => {
              const selectedSize = product.sizes.find((size) => size.value === line.variants.Talla);
              const maxQuantity = selectedSize?.stock ?? product.stock;
              return (
                <article key={key} className="flex gap-4 py-5 first:pt-0 sm:gap-6">
                  <Link href={`/productos/${product.slug}`} style={{ backgroundColor: product.tone }} className="relative aspect-[.8] w-24 shrink-0 sm:w-32">
                    <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 96px, 128px" className="object-contain p-3 sm:p-4" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 sm:flex-row">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-muted-foreground">{product.brand}</p>
                      <Link href={`/productos/${product.slug}`} className="mt-1 block text-sm font-medium hover:underline">{product.name}</Link>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">{Object.entries(line.variants).map(([name, value]) => <span key={name}>{name}: {value}</span>)}</div>
                      <p className="mt-3 text-xs">{maxQuantity > 0 ? "Disponible" : "Agotado"}</p>
                      <Button type="button" variant="link" onClick={() => { remove(key); toast.success("Producto eliminado de la bolsa."); }} className="mt-4 h-auto gap-1.5 p-0 text-xs text-muted-foreground"><Trash2 aria-hidden="true" className="size-3.5"/> Quitar</Button>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-between">
                      <div className="flex h-9 items-center border border-border" aria-label={`Cantidad de ${product.name}`}>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Reducir cantidad de ${product.name}`} disabled={line.quantity <= 1} onClick={() => setQuantity(key, line.quantity - 1)} className="size-8 rounded-none"><Minus aria-hidden="true" className="size-3.5"/></Button>
                        <span aria-live="polite" className="min-w-8 text-center text-xs tabular-nums">{line.quantity}</span>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Aumentar cantidad de ${product.name}`} disabled={line.quantity >= maxQuantity} onClick={() => setQuantity(key, line.quantity + 1)} className="size-8 rounded-none"><Plus aria-hidden="true" className="size-3.5"/></Button>
                      </div>
                      <p className="text-sm font-medium tabular-nums">{money(product.price * line.quantity)}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="h-fit border border-border p-5 sm:p-6">
            <h2 className="text-lg font-medium">Resumen del pedido</h2>
            {remainingForShipping > 0 ? <div className="mt-5"><p className="text-xs leading-5 text-muted-foreground">Te faltan <strong className="text-foreground">{money(remainingForShipping)}</strong> para obtener envío gratis.</p><div className="mt-3 h-1.5 overflow-hidden bg-muted"><div className="h-full bg-[#a44732] transition-[width]" style={{ width: `${Math.min(100, subtotal / FREE_SHIPPING * 100)}%` }}/></div></div> : <p className="mt-5 text-xs text-green-800">¡Tu pedido tiene envío gratis!</p>}
            <Separator className="my-5"/>
            <div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{shipping === 0 ? "Gratis" : money(shipping)}</span></div></div>
            <Separator className="my-5"/>
            <div className="flex justify-between font-medium"><span>Total</span><span className="tabular-nums">{money(subtotal + shipping)}</span></div>
            <p className="mt-2 text-[10px] text-muted-foreground">Impuestos incluidos. El envío se confirma en el siguiente paso.</p>
            <Link href="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center bg-primary px-4 text-xs tracking-[.1em] text-primary-foreground transition-colors hover:bg-primary/85">CONTINUAR AL CHECKOUT <ArrowRight aria-hidden="true" className="ml-2 size-4"/></Link>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground"><span aria-hidden="true">⌑</span> Compra de demostración · sin cobro real</div>
          </aside>
        </div>
      ) : (
        <div className="grid min-h-80 place-items-center py-16 text-center"><div><p className="text-xl">Tu bolsa está esperando.</p><p className="mt-2 text-sm text-muted-foreground">Cuando encuentres algo que te guste, estará aquí.</p><Link href="/productos" className="mt-6 inline-flex h-11 items-center justify-center bg-primary px-6 text-xs tracking-wider text-primary-foreground transition-colors hover:bg-primary/85">EXPLORAR LA TIENDA <ArrowRight aria-hidden="true" className="ml-2 size-4"/></Link></div></div>
      )}
    </main>
  );
}
