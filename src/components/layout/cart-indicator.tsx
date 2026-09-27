"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/src/services/products.service";
import { cartItemKey, useShop } from "@/src/store/shop-store";

const money = (value: number) => `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const FREE_SHIPPING = 350;

export default function CartIndicator() {
  const { cart, hydrated, remove, setQuantity } = useShop();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const products = getProducts();
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product, key: cartItemKey(line) }] : [];
  });
  const subtotal = lines.reduce((total, { line, product }) => total + line.quantity * product.price, 0);

  return (
    <Sheet>
      <SheetTrigger aria-label={hydrated ? `Abrir bolsa, ${count} productos` : "Abrir bolsa"} title="Bolsa" className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2">
        <ShoppingBag aria-hidden="true" className="size-[19px]" strokeWidth={1.6}/>
        {hydrated && count > 0 && <Badge className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] rounded-full border-0 bg-[#b4543b] px-1 text-[9px] font-semibold text-white hover:bg-[#b4543b]">{count > 99 ? "99+" : count}</Badge>}
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(94vw,440px)] max-w-none gap-0 p-0">
        <SheetHeader className="border-b border-border px-5 py-5 pr-14 text-left">
          <SheetTitle className="text-lg">Tu bolsa <span className="font-normal text-muted-foreground">({count})</span></SheetTitle>
          <SheetDescription className="text-xs">Tu selección de NÓRD Studio.</SheetDescription>
        </SheetHeader>
        {!hydrated ? <div className="flex-1 p-5"><Skeleton className="h-24 rounded-none"/><Skeleton className="mt-4 h-24 rounded-none"/></div> : lines.length ? <>
          <ScrollArea className="min-h-0 flex-1 px-5"><div className="divide-y divide-border">{lines.map(({ line, product, key }) => {
            const selectedSize = product.sizes.find((size) => size.value === line.variants.Talla);
            const maxQuantity = selectedSize?.stock ?? product.stock;
            return <article key={key} className="flex gap-3 py-4 first:pt-5"><Link href={`/productos/${product.slug}`} style={{ backgroundColor: product.tone }} className="relative size-20 shrink-0"><Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-contain p-2"/></Link><div className="min-w-0 flex-1"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">{product.brand}</p><Link href={`/productos/${product.slug}`} className="mt-1 line-clamp-2 block text-xs font-medium">{product.name}</Link><p className="mt-1 text-[10px] text-muted-foreground">{Object.entries(line.variants).map(([name,value]) => `${name}: ${value}`).join(" · ")}</p><div className="mt-3 flex items-center justify-between gap-2"><div className="flex h-8 items-center border border-border"><Button type="button" variant="ghost" size="icon-sm" aria-label={`Reducir cantidad de ${product.name}`} disabled={line.quantity <= 1} onClick={() => setQuantity(key,line.quantity-1)} className="rounded-none"><Minus className="size-3"/></Button><span className="min-w-6 text-center text-[10px]">{line.quantity}</span><Button type="button" variant="ghost" size="icon-sm" aria-label={`Aumentar cantidad de ${product.name}`} disabled={line.quantity >= maxQuantity} onClick={() => setQuantity(key,line.quantity+1)} className="rounded-none"><Plus className="size-3"/></Button></div><span className="text-xs tabular-nums">{money(product.price*line.quantity)}</span></div><Button type="button" variant="link" size="xs" onClick={() => { remove(key); toast.success("Producto eliminado de la bolsa."); }} className="mt-2 h-auto gap-1 p-0 text-[10px] text-muted-foreground"><Trash2 className="size-3"/> Quitar</Button></div></article>;
          })}</div></ScrollArea>
          <SheetFooter className="mt-0 border-t border-border px-5 py-5">
            {subtotal < FREE_SHIPPING && <p className="text-xs text-muted-foreground">Te faltan <strong className="text-foreground">{money(FREE_SHIPPING-subtotal)}</strong> para el envío gratis.</p>}
            {subtotal >= FREE_SHIPPING && <p className="text-xs text-green-800">¡Tu pedido tiene envío gratis!</p>}
            <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <Separator/>
            <SheetClose nativeButton={false} render={<Link href="/checkout" className="inline-flex h-11 w-full items-center justify-center bg-primary px-4 text-xs tracking-wider text-primary-foreground hover:bg-primary/85"/>}>IR AL CHECKOUT <ArrowRight className="ml-2 size-4"/></SheetClose>
            <SheetClose nativeButton={false} render={<Link href="/carrito" className="text-center text-xs underline underline-offset-4"/>}>Ver bolsa completa</SheetClose>
          </SheetFooter>
        </> : <div className="grid flex-1 place-items-center px-6 text-center"><div><ShoppingBag aria-hidden="true" className="mx-auto size-8 text-muted-foreground"/><p className="mt-4 text-lg">Tu bolsa está vacía</p><p className="mt-2 text-xs text-muted-foreground">Encuentra algo que te guste y guárdalo aquí.</p><SheetClose nativeButton={false} render={<Link href="/productos" className="mt-5 inline-flex h-10 items-center justify-center bg-primary px-5 text-xs tracking-wider text-primary-foreground"/>}>EXPLORAR LA TIENDA</SheetClose></div></div>}
      </SheetContent>
    </Sheet>
  );
}
