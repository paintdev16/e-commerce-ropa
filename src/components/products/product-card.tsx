import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductActions } from "@/src/components/products/product-actions";
import type { Product } from "@/src/types/store";

function formatPrice(price: number) {
  return `S/ ${price.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group min-w-0">
      <div style={{ backgroundColor: product.tone }} className="relative overflow-hidden">
        <Link href={`/productos/${product.slug}`} aria-label={`Ver ${product.brand} ${product.name}`} className="block">
          <div className="relative aspect-[.84] transition-transform duration-500 ease-out sm:group-hover:scale-[1.025]">
            <Image
              src={product.images[0]}
              alt={`${product.name} — ${product.colors[0]?.name ?? product.department}`}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 31vw, (max-width: 1536px) 23vw, 18vw"
              className="object-contain p-6 sm:p-8"
            />
          </div>
        </Link>

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
          {product.new && (
            <Badge variant="secondary" className="h-auto rounded-none bg-background px-2 py-1 text-[8px] font-semibold tracking-[.12em] sm:text-[9px]">NUEVO</Badge>
          )}
          {product.discount && (
            <Badge className="h-auto rounded-none border-0 bg-[#a44732] px-2 py-1 text-[8px] font-semibold tracking-[.1em] text-white hover:bg-[#a44732] sm:text-[9px]">-{product.discount}%</Badge>
          )}
        </div>
        <ProductActions product={product} />
      </div>

      <div className="pt-3 sm:pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-muted-foreground sm:text-[10px]">{product.brand}</p>
        <div className="mt-1 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/productos/${product.slug}`} className="line-clamp-1 text-[13px] font-medium leading-5 hover:underline sm:text-sm">{product.name}</Link>
            <p className="mt-1 text-[9px] capitalize text-muted-foreground sm:text-[10px]">{product.category.replaceAll("-", " ")} · {product.gender}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[12px] font-medium tabular-nums sm:text-[13px]">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="mt-0.5 text-[10px] tabular-nums text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>}
          </div>
        </div>
        <div className="mt-2 flex min-h-4 items-center gap-1.5" aria-label={`Colores disponibles: ${product.colors.map((color) => color.name).join(", ")}`}>
          {product.colors.slice(0, 3).map((color) => (
            <span key={color.name} title={color.name} className="size-3 rounded-full border border-black/15" style={{ backgroundColor: color.value }} />
          ))}
          {product.colors.length > 3 && <span className="ml-1 text-[9px] text-muted-foreground">+{product.colors.length - 3}</span>}
          {product.rating > 0 && <span className="ml-auto text-[10px] text-muted-foreground">★ {product.rating.toFixed(1)}</span>}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 2 | 3 | 4 }) {
  const columnClass = columns === 2 ? "lg:grid-cols-2" : columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4 2xl:grid-cols-5";
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 ${columnClass}`}>
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
