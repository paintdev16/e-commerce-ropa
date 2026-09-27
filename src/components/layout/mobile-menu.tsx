"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, Menu, MoveRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/src/components/layout/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Nuevos lanzamientos", href: "/nuevos" },
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Calzado", href: "/calzado" },
  { label: "Ropa", href: "/ropa" },
  { label: "Ofertas", href: "/ofertas" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menú de navegación"
        className="grid size-10 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.6} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(88vw,380px)] gap-0 p-0">
        <SheetHeader className="border-b border-border px-6 py-6 text-left">
          <SheetTitle className="font-sans text-2xl font-semibold tracking-[.18em]">
            NÓRD<span className="text-[#b4543b]">.</span>
          </SheetTitle>
          <SheetDescription className="text-xs tracking-[.12em]">
            ROPA Y CALZADO PARA MOVERTE
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Navegación principal móvil" className="px-6 py-4">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex min-h-14 items-center justify-between border-b border-border/70 text-lg font-medium tracking-tight transition-colors hover:text-[#b4543b]"
            >
              <span>
                <span className="mr-4 text-[10px] font-normal tracking-widest text-muted-foreground">
                  0{index + 1}
                </span>
                {item.label}
              </span>
              <MoveRight className="size-4 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-6 pb-8">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <Link href="/favoritos" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 border border-border px-3 text-xs"><Heart aria-hidden="true" className="size-4"/> Favoritos</Link>
            <Link href="/perfil" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 border border-border px-3 text-xs"><UserRound aria-hidden="true" className="size-4"/> Mi cuenta</Link>
          </div>
          <div className="mb-4"><ThemeToggle mobile /></div>
          <Button
            nativeButton={false}
            render={<Link href="/productos" onClick={() => setOpen(false)} />}
            className="h-12 w-full justify-between rounded-none px-5 text-xs tracking-[.12em]"
          >
            EXPLORAR TODA LA TIENDA
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Button>
          <p className="mt-5 text-[10px] tracking-[.14em] text-muted-foreground">
            ENVÍO GRATIS DESDE S/ 350
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
