import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const departments = [
  { name: "Calzado", detail: "SNEAKERS · RUNNING · LIFESTYLE", href: "/calzado", image: "/banners/nord-drop-02-hero.png", tone: "#e5e2dc", position: "68% center" },
  { name: "Ropa", detail: "CAPAS · DENIM · ESENCIALES", href: "/ropa", image: "/banners/nord-everyday-uniform.png", tone: "#dfe2dc", position: "center" },
  { name: "Hombre", detail: "PIEZAS PARA TODOS LOS DÍAS", href: "/hombre", image: "/banners/nord-drop-02-hero.png", tone: "#e3e0da", position: "72% center" },
  { name: "Mujer", detail: "NUEVAS FORMAS DE EXPRESARTE", href: "/mujer", image: "/banners/nord-everyday-uniform.png", tone: "#e5dfdc", position: "center" },
];

export default function DepartmentEditorial() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
      <div className="mb-8 flex items-end justify-between sm:mb-10">
        <div>
          <p className="eyebrow">ENCUENTRA TU SIGUIENTE FAVORITO</p>
          <h2 className="section-heading">Explora Nórd.</h2>
        </div>
        <span className="hidden text-[10px] tracking-[.15em] text-muted-foreground sm:block">01 / 04</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4 lg:gap-6">
        {departments.map((item, index) => (
          <Link key={item.href} href={item.href} className="group">
            <div style={{ backgroundColor: item.tone }} className={`relative overflow-hidden ${index % 2 === 0 ? "aspect-[.83]" : "mt-5 aspect-[.83] sm:mt-10"}`}>
              <Image src={item.image} alt={`Explorar ${item.name}`} fill sizes="(max-width: 640px) 47vw, (max-width: 1024px) 45vw, 24vw" style={{ objectPosition: item.position }} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 transition-colors group-hover:bg-[#24241f] group-hover:text-white sm:right-4 sm:top-4">
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </div>
            <div className="flex items-start justify-between gap-2 pt-3 sm:pt-4">
              <div>
                <h3 className="text-base font-medium tracking-tight sm:text-lg">{item.name}</h3>
                <p className="mt-1 text-[8px] tracking-[.12em] text-muted-foreground sm:text-[9px]">{item.detail}</p>
              </div>
              <span className="pt-1 text-[9px] text-muted-foreground">0{index + 1}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
