"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Tag } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/src/services/products.service";
import { useShop } from "@/src/store/shop-store";

const SHIPPING_FEE = 15;
const FREE_SHIPPING_FROM = 350;
const money = (value: number) => `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const locations: Record<string, string[]> = {
  Lima: ["Lima", "Callao"],
  Arequipa: ["Arequipa", "Caylloma"],
  Cusco: ["Cusco", "Urubamba"],
  LaLibertad: ["Trujillo", "Pacasmayo"],
};
const districts: Record<string, string[]> = {
  Lima: ["Miraflores", "Barranco", "San Isidro", "Surco", "Lima Cercado"],
  Callao: ["Callao", "La Punta", "Bellavista"],
  Arequipa: ["Arequipa Cercado", "Yanahuara", "Cayma"],
  Caylloma: ["Chivay", "Majes"],
  Cusco: ["Cusco Cercado", "San Sebastián", "San Jerónimo"],
  Urubamba: ["Urubamba", "Ollantaytambo"],
  Trujillo: ["Trujillo", "Víctor Larco", "La Esperanza"],
  Pacasmayo: ["Pacasmayo", "Chepén"],
};

export default function CheckoutForm() {
  const { cart, clear, hydrated } = useShop();
  const [done, setDone] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [department, setDepartment] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [promo, setPromo] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const products = useMemo(() => getProducts(), []);
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product }] : [];
  });
  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = delivery === "express" ? 25 : subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;

  function applyCoupon() {
    if (promo.trim().toUpperCase() === "NORD10") {
      setCouponApplied(true);
      toast.success("Código NORD10 aplicado: 10% de descuento.");
    } else {
      setCouponApplied(false);
      toast.error("Ese código no es válido. Prueba NORD10.");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = `ND-${Math.floor(10000 + Math.random() * 89999)}`;
    setConfirmedTotal(total);
    setDone(reference);
    clear();
    toast.success("Pedido de demostración confirmado.");
  }

  if (!hydrated) return <main className="mx-auto min-h-[55vh] max-w-[1100px] px-5 py-14 md:px-10"><Skeleton className="h-4 w-32 rounded-none"/><Skeleton className="mt-5 h-12 w-60 rounded-none"/><Skeleton className="mt-10 h-64 rounded-none"/></main>;
  if (done) return <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-6 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e5ece2] text-2xl"><Check aria-hidden="true" className="size-6"/></span><p className="eyebrow mt-6">PEDIDO CONFIRMADO</p><h1 className="mt-3 text-4xl tracking-tight">Gracias por elegir NÓRD.</h1><p className="mt-4 text-sm text-muted-foreground">Tu pedido <strong>{done}</strong> por <strong>{money(confirmedTotal)}</strong> está confirmado. Esta es una compra de demostración.</p><Button nativeButton={false} render={<Link href="/productos"/>} className="mt-7 h-11 rounded-none px-6 text-xs">VOLVER A LA TIENDA</Button></div></main>;
  if (!lines.length) return <main className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-6 text-center"><div><h1 className="text-3xl">Tu bolsa está vacía.</h1><p className="mt-2 text-sm text-muted-foreground">Agrega tus favoritos antes de pasar por caja.</p><Button nativeButton={false} render={<Link href="/productos"/>} className="mt-6 h-11 rounded-none px-6 text-xs">DESCUBRE LA TIENDA ↗</Button></div></main>;

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-14">
      <p className="eyebrow">ÚLTIMO PASO</p><h1 className="mt-3 text-4xl tracking-[-.05em]">Checkout<span className="text-[#c66b45]">.</span></h1>
      <form onSubmit={submit} className="mt-9 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-14">
        <div className="space-y-9">
          <section><h2 className="mb-5 text-lg font-medium">1. Tus datos</h2><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs">Nombre completo<Input name="name" autoComplete="name" required minLength={2} placeholder="Nombre y apellidos" className="h-11 rounded-none"/></label><label className="grid gap-2 text-xs">Correo electrónico<Input name="email" autoComplete="email" type="email" required placeholder="nombre@correo.com" className="h-11 rounded-none"/></label><label className="grid gap-2 text-xs sm:col-span-2">Teléfono<Input name="phone" autoComplete="tel" type="tel" required minLength={7} placeholder="+51 999 999 999" className="h-11 rounded-none"/></label></div></section>
          <section><h2 className="mb-5 text-lg font-medium">2. Dirección de entrega</h2><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs sm:col-span-2">Dirección<Input name="address" autoComplete="street-address" required minLength={5} placeholder="Av. / calle y número" className="h-11 rounded-none"/></label><label className="grid gap-2 text-xs">Departamento<Select name="department" required value={department} onValueChange={(value) => { const next = value ?? ""; setDepartment(next); setProvince(""); setDistrict(""); }}><SelectTrigger className="h-11 w-full rounded-none"><SelectValue placeholder="Selecciona"/></SelectTrigger><SelectContent>{Object.keys(locations).map((item) => <SelectItem key={item} value={item}>{item === "LaLibertad" ? "La Libertad" : item}</SelectItem>)}</SelectContent></Select></label><label className="grid gap-2 text-xs">Provincia<Select name="province" required value={province} onValueChange={(value) => { setProvince(value ?? ""); setDistrict(""); }} disabled={!department}><SelectTrigger className="h-11 w-full rounded-none"><SelectValue placeholder="Selecciona"/></SelectTrigger><SelectContent>{(locations[department] ?? []).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label><label className="grid gap-2 text-xs">Distrito<Select name="district" required value={district} onValueChange={(value) => setDistrict(value ?? "")} disabled={!province}><SelectTrigger className="h-11 w-full rounded-none"><SelectValue placeholder="Selecciona"/></SelectTrigger><SelectContent>{(districts[province] ?? []).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label><label className="grid gap-2 text-xs">Referencia <span className="text-muted-foreground">(opcional)</span><Input name="reference" autoComplete="off" placeholder="Punto de referencia" className="h-11 rounded-none"/></label></div></section>
          <section><h2 className="mb-5 text-lg font-medium">3. Método de envío</h2><RadioGroup name="delivery" required value={delivery} onValueChange={setDelivery} className="grid gap-2 sm:grid-cols-2"><label className="flex min-h-[72px] cursor-pointer items-center gap-3 border border-border p-4 has-[:checked]:border-foreground"><RadioGroupItem value="standard"/><span><span className="block text-sm font-medium">Estándar</span><span className="mt-1 block text-xs text-muted-foreground">2–4 días · {subtotal >= FREE_SHIPPING_FROM ? "Gratis" : money(SHIPPING_FEE)}</span></span></label><label className="flex min-h-[72px] cursor-pointer items-center gap-3 border border-border p-4 has-[:checked]:border-foreground"><RadioGroupItem value="express"/><span><span className="block text-sm font-medium">Express</span><span className="mt-1 block text-xs text-muted-foreground">1–2 días · {money(25)}</span></span></label></RadioGroup><p className="mt-3 text-xs text-muted-foreground">Envíos de demostración a las principales ciudades del Perú.</p></section>
          <section><h2 className="mb-5 text-lg font-medium">4. Método de pago</h2><RadioGroup name="payment" required value={payment} onValueChange={setPayment} className="grid gap-2 sm:grid-cols-2">{[{ value: "card", label: "Tarjeta", detail: "Crédito o débito" }, { value: "yape", label: "Yape", detail: "Pago móvil" }, { value: "plin", label: "Plin", detail: "Pago móvil" }, { value: "delivery", label: "Contra entrega", detail: "Paga al recibir" }].map((item) => <label key={item.value} className="flex min-h-[72px] cursor-pointer items-center gap-3 border border-border p-4 has-[:checked]:border-foreground"><RadioGroupItem value={item.value}/><span><span className="block text-sm font-medium">{item.label}</span><span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span></span></label>)}</RadioGroup><p className="mt-3 text-xs text-muted-foreground">Simulación visual. No se solicitarán datos bancarios ni se realizará ningún cobro.</p></section>
        </div>

        <aside className="h-fit border border-border p-5 sm:p-6"><h2 className="text-lg font-medium">Tu pedido</h2><div className="mt-4 max-h-64 space-y-4 overflow-auto">{lines.map(({ line, product }) => <div key={`${product.id}-${JSON.stringify(line.variants)}`} className="flex items-center gap-3"><div style={{ backgroundColor: product.tone }} className="relative size-14 shrink-0"><Image src={product.images[0]} alt="" fill sizes="56px" className="object-contain p-1"/><Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[9px]">{line.quantity}</Badge></div><div className="min-w-0 flex-1"><p className="line-clamp-1 text-xs font-medium">{product.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{Object.values(line.variants).join(" · ")}</p></div><span className="text-xs tabular-nums">{money(product.price * line.quantity)}</span></div>)}</div>
          <div className="mt-5 flex gap-2"><Input aria-label="Código promocional" value={promo} onChange={(event) => { setPromo(event.target.value); setCouponApplied(false); }} placeholder="Código promocional" className="h-10 rounded-none text-xs"/><Button type="button" variant="outline" onClick={applyCoupon} className="h-10 rounded-none px-3 text-xs"><Tag aria-hidden="true" className="mr-1 size-3.5"/>Aplicar</Button></div>{couponApplied && <Badge variant="secondary" className="mt-2 rounded-none">NORD10 · −10%</Badge>}
          <Separator className="my-5"/><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{money(subtotal)}</span></div>{couponApplied && <div className="flex justify-between"><span className="text-muted-foreground">Descuento</span><span>−{money(discount)}</span></div>}<div className="flex justify-between"><span className="text-muted-foreground">Envío {delivery === "express" ? "express" : "estándar"}</span><span>{shipping ? money(shipping) : "Gratis"}</span></div></div><Separator className="my-5"/><div className="flex justify-between font-medium"><span>Total</span><strong>{money(total)}</strong></div><p className="mt-2 text-[10px] text-muted-foreground">Impuestos incluidos.</p><Button type="submit" className="mt-6 h-12 w-full rounded-none text-xs tracking-[.1em]">CONFIRMAR PEDIDO</Button><p className="mt-3 text-center text-[10px] text-muted-foreground">Compra de demostración · sin cobro real</p></aside>
      </form>
    </main>
  );
}
