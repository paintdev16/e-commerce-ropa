import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ActiveFilterBadges, CatalogFilterSidebar, CatalogFilterSheet } from "@/src/components/products/catalog-filters";
import CatalogToolbar from "@/src/components/products/catalog-toolbar";
import { ProductGrid } from "@/src/components/products/product-card";
import { getCategories, getFilteredProducts, getProducts } from "@/src/services/products.service";
import type { ProductFilters } from "@/src/types/store";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export type CatalogSearchParams = Promise<Record<string, string | string[] | undefined>>;
type CatalogPageProps = {
  title: string;
  description: string;
  searchParams?: CatalogSearchParams;
  baseFilters?: ProductFilters;
  showGender?: boolean;
  showDepartment?: boolean;
};
const list = (value?: string | string[]) => (Array.isArray(value) ? value.join(",") : value)?.split(",").filter(Boolean);
const scalar = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;

export default async function CatalogPage({ title, description, searchParams, baseFilters = {}, showGender = true, showDepartment = true }: CatalogPageProps) {
  const params = searchParams ? await searchParams : {};
  const filters: ProductFilters = {
    query: scalar(params.q), gender: baseFilters.gender ?? (scalar(params.gender) as ProductFilters["gender"]),
    department: baseFilters.department ?? (scalar(params.department) as ProductFilters["department"]),
    category: baseFilters.category ?? scalar(params.category), collection: baseFilters.collection ?? scalar(params.collection),
    brands: list(params.brands), sizes: list(params.sizes), colors: list(params.colors),
    minPrice: scalar(params.minPrice) ? Number(scalar(params.minPrice)) : undefined,
    maxPrice: scalar(params.maxPrice) ? Number(scalar(params.maxPrice)) : undefined,
    discounted: scalar(params.discounted) === "1" || baseFilters.discounted,
    available: scalar(params.available) === "1", newOnly: baseFilters.newOnly,
    sort: (scalar(params.sort) as ProductFilters["sort"]) ?? "featured",
  };
  const products = getFilteredProducts(filters);
  const allProducts = getProducts();
  const brands = [...new Set(allProducts.map((product) => product.brand))].sort();
  const colors = [...new Map(allProducts.flatMap((product) => product.colors).map((color) => [color.name, color])).values()];
  const categories = getCategories().filter((category) => !filters.department || category.department === filters.department);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const page = Math.min(Math.max(1, Number(scalar(params.page)) || 1), totalPages);
  const visible = products.slice((page - 1) * pageSize, page * pageSize);
  const filterProps = { brands, categories, colors, baseFilters, showGender, showDepartment };

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1600px] px-5 pb-20 pt-8 md:px-10 md:pt-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList><BreadcrumbItem><BreadcrumbLink render={<Link href="/" />}>Inicio</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList>
      </Breadcrumb>
      <header className="border-b border-border pb-7">
        <p className="eyebrow">NÓRD STUDIO / OBJETOS PARA CADA DÍA</p>
        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><h1 className="text-4xl font-medium tracking-[-.055em] md:text-6xl">{title}.</h1><p className="mt-3 max-w-xl text-sm text-muted-foreground">{description}</p></div>
          <Badge variant="secondary" className="w-fit rounded-none px-3 py-1.5 text-xs">{products.length} {products.length === 1 ? "producto" : "productos"}</Badge>
        </div>
      </header>
      <div className="grid gap-8 pt-6 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)]">
        <CatalogFilterSidebar {...filterProps} />
        <section aria-label="Catálogo de productos" className="min-w-0">
          <div className="mb-6"><div className="flex items-center gap-4"><CatalogFilterSheet {...filterProps} /><CatalogToolbar /></div><ActiveFilterBadges /></div>
          {visible.length ? <ProductGrid products={visible} /> : <div className="grid min-h-72 place-items-center border border-dashed border-border text-center"><div><h2 className="text-xl">No encontramos productos</h2><p className="mt-2 text-sm text-muted-foreground">Prueba cambiar la búsqueda o los filtros.</p><Link href={baseFilters.category ? `/categorias/${baseFilters.category}` : "/productos"} className="mt-5 inline-block text-xs underline underline-offset-4">Limpiar filtros</Link></div></div>}
          {totalPages > 1 && <Pagination className="mt-12"><PaginationContent>{Array.from({ length: totalPages }, (_, index) => { const next = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (Array.isArray(value)) value.forEach((part) => next.append(key, part)); else if (value) next.set(key, value); }); next.set("page", String(index + 1)); return <PaginationItem key={index}><PaginationLink href={`?${next}`} isActive={page === index + 1} aria-label={`Página ${index + 1}`} className="rounded-none">{index + 1}</PaginationLink></PaginationItem>; })}</PaginationContent></Pagination>}
        </section>
      </div>
    </main>
  );
}
