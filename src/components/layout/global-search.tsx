"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getCategories } from "@/src/services/categories.service";
import { getCollections, getProducts } from "@/src/services/products.service";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const products = getProducts();
  const categories = getCategories();
  const collections = getCollections();

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<Button type="button" variant="ghost" size="icon-lg" aria-label="Buscar productos" onClick={() => setOpen(true)} className="rounded-full" />}>
          <Search aria-hidden="true" className="size-[19px]" strokeWidth={1.6} />
        </TooltipTrigger>
        <TooltipContent>Buscar productos</TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen} title="Buscar en NÓRD" description="Encuentra productos, marcas, categorías y colecciones" className="top-[18%] max-w-[min(92vw,640px)] translate-y-0 sm:max-w-[min(92vw,640px)]">
        <CommandInput placeholder="Busca prendas, marcas, categorías…" />
        <CommandList className="max-h-[min(60vh,460px)] p-2">
          <CommandEmpty>No encontramos resultados.</CommandEmpty>
          <CommandGroup heading="Productos">
            {products.map((product) => <CommandItem key={product.id} value={`${product.name} ${product.brand} ${product.category}`} onSelect={() => go(`/productos/${product.slug}`)}>{product.name}<span className="ml-auto text-xs text-muted-foreground">{product.brand}</span></CommandItem>)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categorías">
            {categories.map((category) => <CommandItem key={category.id} value={`${category.name} ${category.slug}`} onSelect={() => go(`/categorias/${category.slug}`)}>{category.name}<span className="ml-auto text-xs text-muted-foreground">{category.department}</span></CommandItem>)}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Colecciones">
            {collections.map((collection) => <CommandItem key={collection.id} value={`${collection.name} ${collection.description}`} onSelect={() => go(`/productos?collection=${encodeURIComponent(collection.slug)}`)}>{collection.name}</CommandItem>)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
