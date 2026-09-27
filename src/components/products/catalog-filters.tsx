"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Category, Department, Gender, ProductFilters } from "@/src/types/store";

const footwearSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
const genders: Gender[] = ["Hombre", "Mujer", "Unisex"];
const departments: Department[] = ["Calzado", "Ropa"];

type FilterPanelProps = { brands: string[]; categories: Category[]; colors: { name: string; value: string }[]; baseFilters: ProductFilters; showGender: boolean; showDepartment: boolean };
function readList(value: string | null) { return value ? value.split(",").filter(Boolean) : []; }

function FilterPanel({ brands, categories, colors, baseFilters, showGender, showDepartment }: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 900]);
  const selectedBrands = readList(params.get("brands"));
  const selectedSizes = readList(params.get("sizes"));
  const selectedColors = readList(params.get("colors"));
  const selectedGender = params.get("gender") ?? baseFilters.gender ?? "";
  const selectedDepartment = params.get("department") ?? baseFilters.department ?? "";
  const selectedCategory = params.get("category") ?? baseFilters.category ?? "";

  useEffect(() => {
    const min = params.get("minPrice");
    const max = params.get("maxPrice");
    setPriceRange([min === null ? 100 : Number(min), max === null ? 900 : Number(max)]);
  }, [params]);

  function updateParam(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }
  function toggleList(key: string, values: string[], value: string, checked: boolean) {
    const next = new Set(values);
    if (checked) next.add(value); else next.delete(value);
    updateParam(key, [...next].join(","));
  }
  function updatePrice(values: number[]) {
    const next = new URLSearchParams(params.toString());
    const [minimum, maximum] = values;
    if (minimum <= 100) next.delete("minPrice"); else next.set("minPrice", String(minimum));
    if (maximum >= 900) next.delete("maxPrice"); else next.set("maxPrice", String(maximum));
    next.delete("page");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }
  function clearFilters() { router.replace(pathname, { scroll: false }); }
  function checkRow(label: string, checked: boolean, onCheckedChange: (checked: boolean) => void, suffix?: ReactNode) {
    const id = `catalog-filter-${label.toLocaleLowerCase("es").replace(/[^a-z0-9]+/g, "-")}`;
    return <div key={label} className="flex min-h-8 items-center gap-2.5 text-xs text-foreground/80 hover:text-foreground"><Checkbox id={id} checked={checked} onCheckedChange={(value) => onCheckedChange(value === true)} /><label htmlFor={id} className="flex flex-1 cursor-pointer items-center gap-2">{label}{suffix}</label></div>;
  }
  function section(value: string, title: string, children: ReactNode) {
    return <AccordionItem value={value} className="border-b border-border"><AccordionTrigger className="rounded-none py-3 text-[10px] font-semibold tracking-[.12em] hover:no-underline">{title}</AccordionTrigger><AccordionContent><div className="space-y-1.5">{children}</div></AccordionContent></AccordionItem>;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-medium">Filtros</h3><Button type="button" variant="link" onClick={clearFilters} className="h-auto p-0 text-[10px] text-muted-foreground">Limpiar</Button></div>
      <Accordion multiple defaultValue={[...(showDepartment ? ["department"] : []), ...(showGender ? ["gender"] : []), "category", "brand", "size", "color", "price", "availability"]}>
        {showDepartment && section("department", "DEPARTAMENTO", departments.map((item) => checkRow(item, selectedDepartment === item, (checked) => updateParam("department", checked ? item : undefined))))}
        {showGender && section("gender", "GÉNERO", genders.map((item) => checkRow(item, selectedGender === item, (checked) => updateParam("gender", checked ? item : undefined))))}
        {section("category", "CATEGORÍA", categories.map((item) => checkRow(item.name, selectedCategory === item.slug, (checked) => updateParam("category", checked ? item.slug : undefined))))}
        {section("brand", "MARCA", brands.map((item) => checkRow(item, selectedBrands.includes(item), (checked) => toggleList("brands", selectedBrands, item, checked))))}
        {section("size", "TALLA", <><p className="mb-1 text-[9px] uppercase tracking-wider text-muted-foreground">Calzado</p><div className="grid grid-cols-2">{footwearSizes.map((item) => checkRow(item, selectedSizes.includes(item), (checked) => toggleList("sizes", selectedSizes, item, checked)))}</div><p className="mb-1 mt-3 text-[9px] uppercase tracking-wider text-muted-foreground">Ropa</p><div className="grid grid-cols-2">{apparelSizes.map((item) => checkRow(item, selectedSizes.includes(item), (checked) => toggleList("sizes", selectedSizes, item, checked)))}</div></>)}
        {section("color", "COLOR", colors.slice(0, 12).map((item) => checkRow(item.name, selectedColors.includes(item.name), (checked) => toggleList("colors", selectedColors, item.name, checked), <span aria-hidden="true" className="size-3 rounded-full border border-black/15" style={{ backgroundColor: item.value }} />)))}
        {section("price", "PRECIO", <><Slider min={100} max={900} step={10} value={priceRange} onValueChange={(value) => { const range = value as number[]; setPriceRange([range[0], range[1]]); updatePrice(range); }} aria-label="Rango de precio" /><div className="mt-3 flex justify-between text-[10px] tabular-nums text-muted-foreground"><span>S/ {priceRange[0]}</span><span>S/ {priceRange[1]}{priceRange[1] === 900 ? "+" : ""}</span></div></>)}
        {section("availability", "DISPONIBILIDAD", <>{checkRow("En oferta", params.get("discounted") === "1", (checked) => updateParam("discounted", checked ? "1" : undefined))}{checkRow("Disponible ahora", params.get("available") === "1", (checked) => updateParam("available", checked ? "1" : undefined))}</>)}
      </Accordion>
    </div>
  );
}

export function CatalogFilterSidebar(props: FilterPanelProps) {
  return <aside className="sticky top-28 hidden max-h-[calc(100svh-8rem)] self-start overflow-y-auto pr-3 lg:block"><FilterPanel {...props} /></aside>;
}

export function CatalogFilterSheet(props: FilterPanelProps) {
  const [open, setOpen] = useState(false);
  return <div className="lg:hidden"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="inline-flex h-10 items-center gap-2 border border-border px-4 text-xs font-medium transition-colors hover:bg-muted"><SlidersHorizontal aria-hidden="true" className="size-4"/> Filtrar</SheetTrigger><SheetContent side="left" className="w-[min(88vw,390px)] gap-0 p-0"><SheetHeader className="border-b border-border px-5 py-5 pr-12 text-left"><SheetTitle className="text-base">Filtrar productos</SheetTitle><SheetDescription className="text-xs">Ajusta la selección a tu estilo.</SheetDescription></SheetHeader><div className="flex-1 overflow-y-auto px-5 py-5"><FilterPanel {...props}/></div><SheetFooter className="border-t border-border px-5 py-4"><Button onClick={() => setOpen(false)} className="h-11 w-full rounded-none text-xs tracking-[.12em]">VER PRODUCTOS</Button></SheetFooter></SheetContent></Sheet></div>;
}

export function ActiveFilterBadges() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const chips: { id: string; label: string; clear: (next: URLSearchParams) => void }[] = [];
  for (const key of ["brands", "sizes", "colors"] as const) {
    for (const value of readList(params.get(key))) {
      chips.push({ id: `${key}-${value}`, label: value, clear: (next) => { const remaining = readList(next.get(key)).filter((item) => item !== value); if (remaining.length) next.set(key, remaining.join(",")); else next.delete(key); } });
    }
  }
  const singleFilters = [
    ["category", "Categoría"], ["gender", "Género"], ["department", "Sección"],
  ] as const;
  for (const [key, label] of singleFilters) {
    const value = params.get(key);
    if (value) chips.push({ id: key, label: `${label}: ${value.replaceAll("-", " ")}`, clear: (next) => { next.delete(key); } });
  }
  if (params.get("q")) chips.push({ id: "q", label: `Búsqueda: ${params.get("q")}`, clear: (next) => { next.delete("q"); } });
  if (params.get("discounted") === "1") chips.push({ id: "discounted", label: "En oferta", clear: (next) => { next.delete("discounted"); } });
  if (params.get("available") === "1") chips.push({ id: "available", label: "Disponible", clear: (next) => { next.delete("available"); } });
  if (params.get("minPrice") || params.get("maxPrice")) chips.push({ id: "price", label: `S/ ${params.get("minPrice") ?? "100"}–${params.get("maxPrice") ?? "900"}`, clear: (next) => { next.delete("minPrice"); next.delete("maxPrice"); } });
  if (!chips.length) return null;
  return <div className="mt-3 flex flex-wrap gap-2">{chips.map((chip) => <Badge key={chip.id} variant="outline" className="gap-1 rounded-none px-2 py-1 text-[10px]">{chip.label}<Button type="button" variant="ghost" size="icon-xs" aria-label={`Quitar filtro ${chip.label}`} onClick={() => { const next = new URLSearchParams(params.toString()); chip.clear(next); next.delete("page"); router.push(`${pathname}?${next}`, { scroll: false }); }} className="ml-1 size-4 rounded-none p-0 text-muted-foreground">×</Button></Badge>)}</div>;
}
