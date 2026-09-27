"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Minus, Plus, Ruler, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Product } from "@/src/types/store";
import { cartItemKey, useShop } from "@/src/store/shop-store";

const money = (value: number) => `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const footLengths: Record<string, string> = { "36": "22.5–23 cm", "37": "23–23.5 cm", "38": "23.5–24 cm", "39": "24.5–25 cm", "40": "25–25.5 cm", "41": "25.5–26 cm", "42": "26.5–27 cm", "43": "27–27.5 cm", "44": "27.5–28 cm", "45": "28.5–29 cm" };
const chestMeasures: Record<string, string> = { XS: "84–92 cm", S: "92–100 cm", M: "100–108 cm", L: "108–116 cm", XL: "116–124 cm", XXL: "124–132 cm" };

export default function ProductDetail({ product }: { product: Product }) {
  const { add, cart, favorites, toggleFavorite } = useShop();
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const liked = favorites.includes(product.id);
  const selectedColor = product.colors.find((item) => item.name === color);
  const selectedSize = product.sizes.find((item) => item.value === size);
  const sizeStock = selectedSize?.stock ?? product.stock;
  const image = selectedColor?.image ?? product.images[imageIndex] ?? product.images[0];
  const needsSize = product.sizes.length > 0;
  const unavailable = product.stock <= 0;
  const isWaistSize = product.category === "pantalones" || product.category === "jeans" || product.category === "shorts";

  function addToBag() {
    if (unavailable) return;
    if (needsSize && !size) {
      toast.info("Selecciona una talla para continuar.");
      return;
    }
    const variants: Record<string, string> = {};
    if (color) variants.Color = color;
    if (size) variants.Talla = size;
    const key = cartItemKey({ productId: product.id, variants });
    const inBag = cart.find((item) => cartItemKey(item) === key)?.quantity ?? 0;
    const amount = Math.min(quantity, Math.max(0, sizeStock - inBag));
    if (amount === 0) {
      toast.info("Ya tienes todo el stock disponible de esta variante en tu bolsa.");
      return;
    }
    for (let index = 0; index < amount; index += 1) add(product, variants);
    toast.success(amount === quantity ? "Producto agregado a tu bolsa." : `Se agregaron ${amount} unidades; alcanzaste el stock disponible.`);
  }

  function handleFavorite() {
    toggleFavorite(product.id);
    toast.success(liked ? "Eliminado de favoritos." : "Agregado a favoritos.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
      <div>
        <div style={{ backgroundColor: product.tone }} className="relative aspect-[.9] overflow-hidden">
          <Image src={image} alt={`${product.name}${color ? `, ${color}` : ""}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8 md:p-16" />
          {product.discount ? <Badge className="absolute left-4 top-4 h-auto rounded-none border-0 bg-[#a44732] px-3 py-2 text-[10px] font-semibold tracking-wider text-white hover:bg-[#a44732]">-{product.discount}%</Badge> : null}
        </div>
        {product.images.length > 1 && <div className="mt-3 grid grid-cols-4 gap-3">{product.images.map((src, index) => <Button key={`${src}-${index}`} type="button" variant="ghost" size="icon" onClick={() => setImageIndex(index)} aria-label={`Ver imagen ${index + 1}`} aria-pressed={imageIndex === index} style={{ backgroundColor: product.tone }} className={`relative h-auto w-full aspect-square rounded-none border ${imageIndex === index ? "border-foreground" : "border-transparent"}`}><Image src={src} alt="" fill sizes="120px" className="object-contain p-3" /></Button>)}</div>}
      </div>

      <section className="py-2 lg:py-8">
        <p className="eyebrow">{product.brand} / {product.department}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-.05em] md:text-5xl">{product.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground" aria-label={`${product.rating} de 5 estrellas, ${product.reviews} reseñas`}>★ <span className="text-foreground">{product.rating.toFixed(1)}</span> · {product.reviews} reseñas</p>
        <div className="mt-7 flex flex-wrap items-center gap-3"><span className="text-2xl">{money(product.price)}</span>{product.oldPrice && <><span className="text-sm text-muted-foreground line-through">{money(product.oldPrice)}</span><Badge variant="secondary" className="rounded-none text-[10px]">-{product.discount}%</Badge></>}</div>
        <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">{product.description}</p>

        {product.colors.length > 0 && <fieldset className="mt-8"><legend className="mb-3 text-xs font-semibold">Color <span className="font-normal text-muted-foreground">· {color}</span></legend><ToggleGroup value={color ? [color] : []} onValueChange={(values) => { if (values[0]) { setColor(values[0]); setImageIndex(0); } }} aria-label="Seleccionar color" className="flex flex-wrap gap-3">{product.colors.map((item) => <ToggleGroupItem key={item.name} value={item.name} aria-label={`Color ${item.name}`} title={item.name} className="size-10 rounded-full border border-border p-1 data-pressed:border-foreground"><span className="size-7 rounded-full border border-black/10" style={{ backgroundColor: item.value }} /></ToggleGroupItem>)}</ToggleGroup></fieldset>}

        {needsSize && <fieldset className="mt-8"><div className="mb-3 flex items-center justify-between gap-3"><legend className="text-xs font-semibold">Selecciona tu talla{size ? ` · ${size}` : ""}</legend><Button type="button" variant="link" onClick={() => setGuideOpen(true)} className="h-auto gap-1.5 p-0 text-xs"><Ruler aria-hidden="true" className="size-3.5"/> Guía de tallas</Button></div><ToggleGroup value={size ? [size] : []} onValueChange={(values) => { const nextSize = values[0] ?? ""; setSize(nextSize); const stock = product.sizes.find((item) => item.value === nextSize)?.stock ?? product.stock; if (nextSize) setQuantity((value) => Math.min(value, stock)); }} aria-label="Seleccionar talla" className="flex flex-wrap gap-2">{product.sizes.map((item) => <ToggleGroupItem key={item.value} value={item.value} disabled={!item.available || (item.stock ?? product.stock) <= 0} className="h-11 min-w-12 rounded-none border border-border px-3 text-xs data-pressed:bg-foreground data-pressed:text-background">{item.value}</ToggleGroupItem>)}</ToggleGroup></fieldset>}

        <div className="mt-8 flex items-center justify-between border-y border-border py-4"><p className="text-xs text-muted-foreground">{unavailable ? "Agotado" : `● ${size ? sizeStock : product.stock} unidades disponibles`}</p><div className="flex h-10 items-center border border-border"><Button type="button" variant="ghost" size="icon" aria-label="Reducir cantidad" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-none"><Minus className="size-3.5"/></Button><span className="min-w-8 text-center text-xs tabular-nums">{quantity}</span><Button type="button" variant="ghost" size="icon" aria-label="Aumentar cantidad" disabled={quantity >= (size ? sizeStock : product.stock)} onClick={() => setQuantity((value) => Math.min(size ? sizeStock : product.stock, value + 1))} className="rounded-none"><Plus className="size-3.5"/></Button></div></div>

        <Button type="button" onClick={addToBag} disabled={unavailable} className="mt-5 h-14 w-full rounded-none text-xs tracking-[.12em]"><ShoppingBag aria-hidden="true" className="size-4"/>{unavailable ? "AGOTADO" : `AÑADIR A LA BOLSA — ${money(product.price * quantity)}`}</Button>
        <Tooltip><TooltipTrigger render={<Button type="button" variant="outline" onClick={handleFavorite} aria-pressed={liked} className="mt-3 h-12 w-full rounded-none text-xs tracking-[.1em]"/>}><Heart aria-hidden="true" className={`size-4 ${liked ? "fill-[#b4543b] text-[#b4543b]" : ""}`}/>{liked ? "GUARDADO EN FAVORITOS" : "GUARDAR EN FAVORITOS"}</TooltipTrigger><TooltipContent>{liked ? "Quitar de favoritos" : "Guardar en favoritos"}</TooltipContent></Tooltip>
        <div className="mt-6 border-t border-border"><Accordion multiple defaultValue={["shipping"]}><AccordionItem value="details"><AccordionTrigger>Detalles del producto</AccordionTrigger><AccordionContent><p className="leading-6 text-muted-foreground">{product.description}</p><p className="mt-3 text-xs text-muted-foreground">Marca: {product.brand} · Categoría: {product.category.replaceAll("-", " ")} · Colección: {product.collection.replaceAll("-", " ")}</p></AccordionContent></AccordionItem><AccordionItem value="care"><AccordionTrigger>Materiales y cuidados</AccordionTrigger><AccordionContent><p className="leading-6 text-muted-foreground">Consulta la etiqueta del producto para conocer su composición y seguir las recomendaciones de cuidado específicas de esta pieza.</p></AccordionContent></AccordionItem><AccordionItem value="shipping"><AccordionTrigger>Envíos y cambios</AccordionTrigger><AccordionContent><p className="leading-6 text-muted-foreground">Envío gratis en compras desde S/ 350. Puedes solicitar cambios o devoluciones dentro de los 30 días posteriores a la entrega, según las condiciones de la tienda.</p></AccordionContent></AccordionItem></Accordion></div>
      </section>

      <Dialog open={guideOpen} onOpenChange={setGuideOpen}><DialogContent className="max-h-[85svh] max-w-[min(92vw,520px)] overflow-y-auto"><DialogHeader><p className="eyebrow">NÓRD FIT GUIDE</p><DialogTitle className="text-2xl">Guía de tallas</DialogTitle><DialogDescription>Medidas de referencia aproximadas para esta pieza.</DialogDescription></DialogHeader><div className="grid grid-cols-[.8fr_1fr_auto] gap-x-3 border-b border-t border-border py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"><span>Talla</span><span>{product.department === "Calzado" ? "Largo del pie" : isWaistSize ? "Cintura" : "Pecho"}</span><span>Estado</span></div><div className="divide-y divide-border">{product.sizes.map((item) => { const cm = product.department === "Calzado" ? (footLengths[item.value] ?? "Consultar marca") : isWaistSize && /^\d+$/.test(item.value) ? `${Math.round(Number(item.value) * 2.54)} cm aprox.` : chestMeasures[item.value] ?? "Consultar marca"; return <div key={item.value} className="grid grid-cols-[.8fr_1fr_auto] items-center gap-x-3 py-3 text-xs"><span className="font-medium">{item.value}</span><span className="text-muted-foreground">{cm}</span><Badge variant={item.available ? "secondary" : "outline"} className="rounded-none text-[9px]">{item.available ? "Disponible" : "Agotada"}</Badge></div>; })}</div><p className="text-xs leading-5 text-muted-foreground">Son medidas corporales orientativas y pueden variar por marca y calce. Para medir el pie, apoya el talón contra una pared y mide hasta el dedo más largo. Para prendas, compara tu contorno con una prenda similar que te quede cómoda.</p></DialogContent></Dialog>
    </div>
  );
}
