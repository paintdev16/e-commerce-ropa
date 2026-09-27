import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import EditorialHero from "@/src/components/home/editorial-hero";
import DepartmentEditorial from "@/src/components/home/department-editorial";
import { ProductGrid } from "@/src/components/products/product-card";
import {
  getDiscountedProducts,
  getFeaturedProducts,
  getNewProducts,
  getProductsByDepartment,
} from "@/src/services/products.service";
import { getBannerById } from "@/src/services/banners.service";

function SectionHeading({ eyebrow, title, href, linkLabel = "VER TODO" }: { eyebrow: string; title: string; href: string; linkLabel?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-heading">{title}</h2>
      </div>
      <Link href={href} className="group inline-flex items-center gap-2 pb-1 text-[9px] font-medium tracking-[.13em] sm:text-[10px]">
        {linkLabel}<MoveRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export default function Home() {
  const heroBanner = getBannerById("drop-02");
  const apparelBanner = getBannerById("everyday-uniform");
  if (!heroBanner || !apparelBanner) throw new Error("Faltan banners locales para la portada.");

  const arrivals = getNewProducts().slice(0, 4);
  const sneakers = getProductsByDepartment("Calzado").slice(0, 4);
  const featured = getFeaturedProducts().slice(0, 4);
  const offers = getDiscountedProducts().slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        <EditorialHero banner={heroBanner} />

        <DepartmentEditorial />

        <section className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-14 lg:pb-28">
          <SectionHeading eyebrow="RECIÉN LLEGADOS · DROP 02" title="Lo nuevo, primero." href="/nuevos" linkLabel="VER NOVEDADES" />
          <ProductGrid products={arrivals} />
        </section>

        <section className="bg-[#efeee9] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
            <SectionHeading eyebrow="SNEAKERS PARA CADA DÍA" title="Pisadas que dejan huella." href="/calzado" linkLabel="VER CALZADO" />
            <ProductGrid products={sneakers} />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1600px] gap-0 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-14 lg:py-28">
          <div className="relative min-h-[390px] overflow-hidden bg-[#dfe2dc] sm:min-h-[520px]">
            <Image src={apparelBanner.image} alt={apparelBanner.imageAlt} fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-[center_42%]" />
            <span className="absolute bottom-5 left-5 text-[9px] tracking-[.16em] text-black/50 sm:bottom-7 sm:left-7">{apparelBanner.kicker}</span>
          </div>
          <div className="flex flex-col justify-center bg-[#24241f] px-6 py-10 text-white sm:px-12 sm:py-14 lg:px-14">
            <p className="text-[9px] font-medium tracking-[.2em] text-white/55">{apparelBanner.eyebrow}</p>
            <h2 className="mt-5 max-w-lg text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.94] tracking-[-.07em]">{apparelBanner.title} <span className="font-normal italic">{apparelBanner.emphasis}</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">{apparelBanner.description}</p>
            <Link href={apparelBanner.primaryCta.href} className="group mt-8 inline-flex w-fit items-center gap-5 border-b border-white/45 pb-2 text-[10px] font-medium tracking-[.12em]">
              {apparelBanner.primaryCta.label} <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-14 lg:pb-28">
          <SectionHeading eyebrow="NÓRD SELECTS" title="Los más elegidos." href="/productos" />
          <ProductGrid products={featured} />
        </section>

        <section className="relative isolate overflow-hidden bg-[#b4543b] px-5 py-16 text-white sm:px-10 sm:py-20 lg:py-24">
          <div aria-hidden="true" className="absolute -right-12 -top-20 -z-10 text-[clamp(12rem,32vw,34rem)] font-semibold leading-none tracking-[-.12em] text-white/[.08]">N.</div>
          <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold tracking-[.2em] text-white/65">PRECIO ESPECIAL · POR TIEMPO LIMITADO</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.8rem,7vw,6.8rem)] font-medium leading-[.9] tracking-[-.075em]">Tu próximo favorito, a otro precio.</h2>
            </div>
            <Link href="/ofertas" className="group inline-flex shrink-0 items-center gap-5 border-b border-white/65 pb-2 text-[10px] font-medium tracking-[.13em]">
              EXPLORAR OFERTAS <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
          <SectionHeading eyebrow="ÚLTIMAS OPORTUNIDADES" title="Piezas con descuento." href="/ofertas" linkLabel="VER TODAS LAS OFERTAS" />
          <ProductGrid products={offers} />
        </section>

        <section className="border-y border-black/10 bg-[#f7f6f3]">
          <div className="mx-auto grid max-w-[1600px] divide-y divide-black/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-14">
            {[
              ["01", "Envío gratis", "En compras desde S/ 250 a todo el Perú."],
              ["02", "Cambios sencillos", "30 días para encontrar el ajuste perfecto."],
              ["03", "Compra con confianza", "Pagos protegidos y atención cercana."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-4 py-6 sm:px-6 sm:py-8 first:sm:pl-0 last:sm:pr-0 lg:gap-6 lg:py-10">
                <span className="pt-1 text-[9px] tracking-[.16em] text-[#a44732]">{number}</span>
                <div><h3 className="text-sm font-medium">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
